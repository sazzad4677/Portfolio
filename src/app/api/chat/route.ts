import {
  createUIMessageStreamResponse,
  extractReasoningMiddleware,
  streamText,
  wrapLanguageModel,
  type ModelMessage,
  type UIMessageChunk,
} from "ai";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import {
  getEnabledProvidersWithProbedModels,
  isConfigError,
  isCreditExhausted,
  languageModelFor,
  type Provider,
} from "@/lib/chatProviders";
import {
  checkGlobalBudget,
  checkVisitorLimit,
  clientIp,
  getCachedReply,
  setCachedReply,
} from "@/lib/chatLimits";
import { isOffTopic, offTopicRefusal } from "@/lib/topicGuard";

// Run on the Edge runtime for cold-start in ~50ms instead of ~300ms (Node).
export const runtime = "edge";
export const maxDuration = 30; // seconds — keep streaming within Vercel Edge limit

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_HISTORY_TURNS = 6; // most questions only need the last ~3 turns
const MAX_OUTPUT_TOKENS = 320; // concise answers, faster first token
const TEMPERATURE = 0.3;
const MAX_CONTENT_LENGTH = 4000;
const MAX_MESSAGES = 50;
// Free models regularly take 5-10s on cold start; aborting early lets the
// route fall through to the next candidate instead of making the user wait.
// Once the first token lands, the stream continues uninterrupted. 8s is the
// practical floor: shorter and a healthy first candidate gets unfairly
// killed; longer and a genuinely broken provider makes the user stare.
const FIRST_TOKEN_TIMEOUT_MS = 8_000;

const MID_STREAM_ERROR = "The response was interrupted — please try again.";

// ─── Request parsing ──────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * `useChat` sends UIMessages (`{ role, parts: [{ type: "text", text }] }`).
 * Only text parts are honoured; anything else (files, tools) is ignored.
 */
function textOf(message: Record<string, unknown>): string | null {
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter(
        (p): p is { type: "text"; text: string } =>
          typeof p === "object" && p !== null && p.type === "text" && typeof p.text === "string"
      )
      .map((p) => p.text)
      .join("");
  }
  return typeof message.content === "string" ? message.content : null;
}

function parseMessages(raw: unknown): ChatMessage[] | string {
  if (!Array.isArray(raw) || raw.length === 0) return "messages must be a non-empty array.";
  if (raw.length > MAX_MESSAGES) return "Too many messages.";
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (typeof m !== "object" || m === null) return "Each message must be an object.";
    const { role } = m as { role?: unknown };
    if (role !== "user" && role !== "assistant") return "Message role must be 'user' or 'assistant'.";
    const content = textOf(m as Record<string, unknown>);
    if (content === null) return "Each message must have text content.";
    if (content.length > MAX_CONTENT_LENGTH) return "Message content exceeds maximum allowed length.";
    // Skip empty assistant turns (e.g. a stopped generation); reject empty user turns.
    if (content.trim().length === 0) {
      if (role === "user") return "Message content must not be empty.";
      continue;
    }
    out.push({ role, content });
  }
  if (out[out.length - 1]?.role !== "user") return "The last message must be from the user.";
  return out;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<Response> {
  // ── 1. Per-visitor rate limit (before any work) ──
  const limit = await checkVisitorLimit(clientIp(req));
  if (!limit.ok) return errorResponse(limit.message, 429, limit.retryAfterSeconds);

  // ── 2. Parse + validate ──
  let body: { messages?: unknown; projectSlug?: unknown };
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid JSON body.", 400);
  }

  const messages = parseMessages(body.messages);
  if (typeof messages === "string") return errorResponse(messages, 400);

  // projectSlug is optional; validated downstream by getProjectBySlug.
  const { projectSlug } = body;
  if (projectSlug !== undefined && typeof projectSlug !== "string") {
    return errorResponse("projectSlug must be a string when provided.", 400);
  }
  if (projectSlug && projectSlug.length > 64) {
    return errorResponse("projectSlug is too long.", 400);
  }

  const lastUserContent = messages[messages.length - 1].content;

  // ── 3. Topic guard — refuse obvious junk without calling a model ──
  if (isOffTopic(lastUserContent)) return textResponse(offTopicRefusal());

  // ── 4. Cache — only opening questions, since follow-ups like "tell me
  //       more" depend on the conversation, not just the last message ──
  const cacheable = messages.length === 1;
  if (cacheable) {
    const cached = await getCachedReply(lastUserContent, projectSlug);
    if (cached !== null) return textResponse(cached);
  }

  // ── 5. Site-wide budget on real model calls ──
  const budget = await checkGlobalBudget();
  if (!budget.ok) return errorResponse(budget.message, 503, budget.retryAfterSeconds);

  // ── 6. Try each (provider, model) until one produces a first token ──
  // getEnabledProvidersWithProbedModels() hits each provider's /v1/models
  // once per Edge isolate per hour, filters to free models, and merges
  // with the static fallback list.
  const providers = await getEnabledProvidersWithProbedModels();
  if (providers.length === 0) {
    console.error("[chat/route] No providers configured (AI_GATEWAY_API_KEY and OPENROUTER_API_KEY both missing).");
    return errorResponse("Server configuration error.", 500);
  }

  const system = buildSystemPrompt({ projectSlug });
  const history: ModelMessage[] = messages.slice(-MAX_HISTORY_TURNS);
  const started = await startFirstAvailable(providers, system, history, req.signal);
  if (!started) {
    console.error("[chat/route] All providers/models failed.");
    return errorResponse(
      "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      502
    );
  }

  // ── 7. Pipe the winning stream to the client, caching the full reply ──
  const { reader, buffered } = started;
  let fullReply = "";
  let failed = false;
  const track = (chunk: UIMessageChunk) => {
    if (chunk.type === "text-delta") fullReply += chunk.delta;
    if (chunk.type === "error") failed = true;
  };

  const stream = new ReadableStream<UIMessageChunk>({
    start(controller) {
      for (const chunk of buffered) {
        track(chunk);
        controller.enqueue(chunk);
      }
    },
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        if (cacheable && !failed && fullReply.trim()) {
          await setCachedReply(lastUserContent, projectSlug, fullReply);
        }
        return;
      }
      track(value);
      controller.enqueue(value);
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });

  return createUIMessageStreamResponse({ stream });
}

// ─── Provider fallback ────────────────────────────────────────────────────────

interface StartedStream {
  reader: ReadableStreamDefaultReader<UIMessageChunk>;
  /** Chunks read while waiting for the first token — replayed to the client. */
  buffered: UIMessageChunk[];
}

async function startFirstAvailable(
  providers: Provider[],
  system: string,
  messages: ModelMessage[],
  clientSignal: AbortSignal
): Promise<StartedStream | null> {
  for (const provider of providers) {
    for (const modelId of provider.candidateModels) {
      if (clientSignal.aborted) return null;
      const attempt = await tryCandidate(provider, modelId, system, messages, clientSignal);
      if ("reader" in attempt) return attempt;

      const message = attempt.error instanceof Error ? attempt.error.message : String(attempt.error);
      console.warn(`[chat/route] ${provider.name}/${modelId} failed: ${message}`);
      // Credit exhaustion and 401/403 affect the whole provider — retrying
      // other models on it would fail identically.
      if (isCreditExhausted(attempt.error) || isConfigError(attempt.error)) break;
    }
  }
  return null;
}

async function tryCandidate(
  provider: Provider,
  modelId: string,
  system: string,
  messages: ModelMessage[],
  clientSignal: AbortSignal
): Promise<StartedStream | { error: unknown }> {
  // One controller for both the first-token timeout and client disconnects
  // (the Edge runtime has no AbortSignal.any).
  const controller = new AbortController();
  const onClientAbort = () => controller.abort(clientSignal.reason);
  clientSignal.addEventListener("abort", onClientAbort, { once: true });
  const timer = setTimeout(
    () => controller.abort(new Error(`no first token within ${FIRST_TOKEN_TIMEOUT_MS}ms`)),
    FIRST_TOKEN_TIMEOUT_MS
  );

  let streamError: unknown;
  const result = streamText({
    // Strips <think>…</think> blocks some free reasoning models emit.
    model: wrapLanguageModel({
      model: languageModelFor(provider, modelId),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    system,
    messages,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    temperature: TEMPERATURE,
    maxRetries: 0, // fallback to the next candidate is our retry strategy
    abortSignal: controller.signal,
    onError: ({ error }) => {
      streamError = error;
    },
  });

  const reader = result
    .toUIMessageStream({ sendReasoning: false, onError: () => MID_STREAM_ERROR })
    .getReader();

  // Read until the first text token (success) or an error/end (failure).
  const buffered: UIMessageChunk[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done || value.type === "error" || value.type === "abort") break;
      buffered.push(value);
      if (value.type === "text-delta") {
        clearTimeout(timer);
        return { reader, buffered };
      }
    }
  } catch (err) {
    streamError ??= err;
  }

  clearTimeout(timer);
  clientSignal.removeEventListener("abort", onClientAbort);
  reader.cancel().catch(() => {});
  return { error: streamError ?? controller.signal.reason ?? new Error("empty response") };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function errorResponse(message: string, status: number, retryAfterSeconds?: number): Response {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (retryAfterSeconds) headers["Retry-After"] = String(retryAfterSeconds);
  return new Response(JSON.stringify({ error: message }), { status, headers });
}

/** A complete assistant reply (cache hit or canned refusal) as a UI message stream. */
function textResponse(text: string): Response {
  const id = crypto.randomUUID();
  const chunks: UIMessageChunk[] = [
    { type: "start" },
    { type: "text-start", id },
    { type: "text-delta", id, delta: text },
    { type: "text-end", id },
    { type: "finish" },
  ];
  return createUIMessageStreamResponse({
    stream: new ReadableStream({
      start(controller) {
        chunks.forEach((c) => controller.enqueue(c));
        controller.close();
      },
    }),
  });
}
