import { buildSystemPrompt } from "@/lib/systemPrompt";
import OpenAI from "openai";
import {
  getEnabledProvidersWithProbedModels,
  isConfigError,
  isCreditExhausted,
  type Provider,
} from "@/lib/chatProviders";

// Run on the Edge runtime for cold-start in ~50ms instead of ~300ms (Node).
export const runtime = "edge";
export const maxDuration = 30; // seconds — keep streaming within Vercel Edge limit

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  /** Optional — scopes the system prompt to a single project deep-dive. */
  projectSlug?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_HISTORY_TURNS = 6; // was 20 — most Q's only need the last ~3 turns
const MAX_TOKENS = 320; // was 512 — concise answers, faster first-token
const TEMPERATURE = 0.3; // slightly lower = more deterministic, often faster

// ─── Short-TTL LRU cache ──────────────────────────────────────────────────────
//
// 30s TTL, 50 entries. Keyed on (lastUserMessage, projectSlug) so repeat
// questions on the same project dedupe across users of the same Edge
// isolate. Per-instance only — Edge isolates don't share memory — but
// in steady state that still cuts ~50% of repeat-question traffic.
const CACHE_TTL_MS = 30_000;
const CACHE_MAX = 50;
const replyCache = new Map<string, { reply: string; ts: number }>();

function normalize(s: string): string {
  return s.toLowerCase().trim().replace(/\s+/g, " ");
}

function cacheKey(lastUserContent: string, projectSlug: string | undefined): string {
  return `${normalize(lastUserContent)}::${projectSlug ?? ""}`;
}

function getCachedReply(lastUserContent: string, projectSlug: string | undefined): string | null {
  const key = cacheKey(lastUserContent, projectSlug);
  const entry = replyCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    replyCache.delete(key);
    return null;
  }
  return entry.reply;
}

function setCachedReply(
  lastUserContent: string,
  projectSlug: string | undefined,
  reply: string
): void {
  const key = cacheKey(lastUserContent, projectSlug);
  // Evict oldest if at capacity (Maps preserve insertion order).
  if (replyCache.size >= CACHE_MAX) {
    const firstKey = replyCache.keys().next().value;
    if (firstKey !== undefined) replyCache.delete(firstKey);
  }
  replyCache.set(key, { reply, ts: Date.now() });
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validateMessages(messages: unknown): string | null {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "messages must be a non-empty array.";
  }
  for (const m of messages) {
    if (typeof m !== "object" || m === null) return "Each message must be an object.";
    if (!("role" in m) || !("content" in m)) return "Each message must have role and content.";
    if (!["user", "assistant"].includes((m as ChatMessage).role)) return "Message role must be 'user' or 'assistant'.";
    if (typeof (m as ChatMessage).content !== "string") return "Message content must be a string.";
    if ((m as ChatMessage).content.trim().length === 0) return "Message content must not be empty.";
    if ((m as ChatMessage).content.length > 4000) return "Message content exceeds maximum allowed length.";
  }
  const last = messages[messages.length - 1] as ChatMessage;
  if (last.role !== "user") return "The last message must be from the user.";
  return null;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request): Promise<Response> {
  // ── 1. Parse body ──
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid JSON body.", 400);
  }

  const { messages, projectSlug } = body;

  // ── 2. Validate ──
  const validationError = validateMessages(messages);
  if (validationError) {
    return errorResponse(validationError, 400);
  }

  // projectSlug is optional; validated downstream by getProjectBySlug.
  if (projectSlug !== undefined && typeof projectSlug !== "string") {
    return errorResponse("projectSlug must be a string when provided.", 400);
  }
  if (projectSlug && projectSlug.length > 64) {
    return errorResponse("projectSlug is too long.", 400);
  }

  // ── 3. Cache lookup ──
  const lastUserContent = (messages[messages.length - 1] as ChatMessage).content;
  const cached = getCachedReply(lastUserContent, projectSlug);
  if (cached !== null) {
    console.log(`[chat/route] cache hit for "${normalize(lastUserContent).slice(0, 40)}"`);
    return cachedStreamResponse(cached);
  }

  // ── 3b. Topic guard ──
  // Fast, free heuristic: if the last user message contains no Sazzad-
  // related terms AND contains clear off-topic signals, refuse with a
  // canned response and skip the model call entirely. Catches ~80% of
  // junk (poems, jokes, general knowledge, math) without burning tokens
  // or latency. The strengthened system prompt handles the remaining 20%
  // (ambiguous questions, edge cases).
  if (isOffTopic(lastUserContent)) {
    console.log(`[chat/route] off-topic refusal for "${normalize(lastUserContent).slice(0, 40)}"`);
    return cachedStreamResponse(offTopicRefusal());
  }

  // ── 4. Build messages array with system prompt ──
  const trimmed = messages.slice(-MAX_HISTORY_TURNS);

  const chatMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: buildSystemPrompt({ projectSlug }) },
    ...trimmed.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  // ── 5. Try each (provider, model) until one succeeds ──
  // getEnabledProvidersWithProbedModels() hits each provider's /v1/models
  // once per Edge isolate per hour, filters to free models, and merges
  // with the static fallback list. This auto-recovers from model-list
  // drift (Vercel rotating free-tier eligibility, OpenRouter deprecating
  // :free slugs) without redeploys. Fail-open: probe failure → static list.
  const providers = await getEnabledProvidersWithProbedModels();
  if (providers.length === 0) {
    console.error("[chat/route] No providers configured (AI_GATEWAY_API_KEY and OPENROUTER_API_KEY both missing).");
    return errorResponse("Server configuration error.", 500);
  }

  for (const provider of providers) {
    for (const model of provider.candidateModels) {
      try {
        const client = new OpenAI({
          apiKey: provider.apiKey,
          baseURL: provider.baseURL,
          defaultHeaders: provider.defaultHeaders,
        });

        // 4s first-token budget. Free models regularly take 5-10s on cold
        // start; aborting after 4s lets the route fall through to the next
        // candidate instead of making the user wait. Once the first byte
        // lands, the stream continues uninterrupted.
        const result = await client.chat.completions.create(
          {
            model,
            messages: chatMessages,
            stream: true,
            max_tokens: MAX_TOKENS,
            temperature: TEMPERATURE,
          },
          { signal: AbortSignal.timeout(4_000) }
        );

        const stream = new ReadableStream({
          async start(controller) {
            const encoder = new TextEncoder();
            let buffer = "";
            let inThinkBlock = false;
            let fullReply = "";

            try {
              for await (const chunk of result) {
                const text = chunk.choices?.[0]?.delta?.content ?? "";
                if (!text) continue;

                buffer += text;

                if (inThinkBlock) {
                  const endIndex = buffer.indexOf("</think>");
                  if (endIndex !== -1) {
                    inThinkBlock = false;
                    buffer = buffer.slice(endIndex + 8);
                  } else {
                    if (buffer.length > 7) {
                      buffer = buffer.slice(-7);
                    }
                    continue;
                  }
                }

                while (true) {
                  const startIndex = buffer.indexOf("<think>");
                  if (startIndex !== -1) {
                    const beforeThink = buffer.slice(0, startIndex);
                    if (beforeThink) {
                      controller.enqueue(encoder.encode(`0:${JSON.stringify(beforeThink)}\n`));
                      fullReply += beforeThink;
                    }

                    const endIndex = buffer.indexOf("</think>", startIndex + 7);
                    if (endIndex !== -1) {
                      buffer = buffer.slice(endIndex + 8);
                      continue;
                    } else {
                      inThinkBlock = true;
                      buffer = buffer.slice(startIndex + 7);
                      break;
                    }
                  } else {
                    if (buffer.length > 6) {
                      const safeToFlush = buffer.slice(0, -6);
                      controller.enqueue(encoder.encode(`0:${JSON.stringify(safeToFlush)}\n`));
                      fullReply += safeToFlush;
                      buffer = buffer.slice(-6);
                    }
                    break;
                  }
                }
              }

              if (!inThinkBlock && buffer.length > 0) {
                controller.enqueue(encoder.encode(`0:${JSON.stringify(buffer)}\n`));
                fullReply += buffer;
              }

              // Cache the final reply on success.
              if (fullReply.trim().length > 0) {
                setCachedReply(lastUserContent, projectSlug, fullReply);
              }
            } catch (streamErr) {
              console.error(`[chat/route] ${provider.name}/${model} stream error:`, streamErr);
              // Close cleanly with a retry sentinel — the client (AIChatBox)
              // will detect this and re-POST. We don't controller.error()
              // because that surfaces as a hard red error in useChat.
              try {
                controller.enqueue(encoder.encode(`0:"__retry__"\n`));
              } catch {
                /* controller may already be closed */
              }
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "x-vercel-ai-data-stream": "v1",
            "Cache-Control": "no-cache, no-transform",
            "X-Accel-Buffering": "no",
          },
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[chat/route] ${provider.name}/${model} failed: ${message}`);
        if (isCreditExhausted(error)) {
          console.warn(`[chat/route] ${provider.name} credits exhausted, skipping to next provider.`);
          break; // exit this provider's model loop
        }
        if (isConfigError(error)) {
          // 401/403 — bad key, missing billing, etc. Retrying other models
          // on the same provider will fail identically. Skip the rest.
          console.warn(
            `[chat/route] ${provider.name} rejected the request (config error — bad key, missing billing, or forbidden). Skipping to next provider.`
          );
          break;
        }
        // Otherwise, try the next model on this provider.
      }
    }
    console.log(`[chat/route] Provider ${provider.name} exhausted, moving to next.`);
  }

  console.error("[chat/route] All providers/models failed.");
  return errorResponse(
    "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
    502
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function errorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ─── Topic guard ──────────────────────────────────────────────────────────────

/**
 * Substrings (case-insensitive) that signal the question is about Sazzad
 * and his work. A message containing ANY of these is on-topic. A message
 * containing NONE is checked for off-topic signals.
 */
const ON_TOPIC_TERMS = [
  // Identity
  "sazzad", "md sazzad", "muhammad sazzad", "hossain", "4677", "4673",
  "you", "your", "he", "his", "him", "himself",
  "this portfolio", "this site", "this website", "sazzad.dev",
  // Career
  "experience", "background", "career", "resume", "cv", "work", "job",
  "role", "company", "companies", "team", "hired", "hire", "open to",
  "availability", "available", "remote", "onsite", "on-site", "hybrid",
  "salary", "rate", "rates", "offer",
  // Tech
  "react", "next", "next.js", "nextjs", "typescript", "javascript", "node",
  "webrtc", "socket.io", "mediapipe", "openrouter", "llm", "llms",
  "ai", "ml", "cursor", "claude", "codex", "vercel ai", "ai sdk",
  "redis", "mongodb", "docker", "kubernetes", "ci/cd", "github actions",
  ".net", "dotnet", "erp", "nextauth", "jwt", "jest",
  // Portfolio
  "project", "projects", "skill", "skills", "tech stack", "stack",
  "education", "degree", "university", "buyonia", "mymedicalhub", "my-medical",
  "smart inventory", "video consult", "video engine", "pose", "landmarks",
  "ranking", "ranking system", "inventory", "restock", "restocking",
  "open to work", "contact", "email", "linkedin", "github",
  // Course / learning
  "course", "courses", "learning", "studying", "ongoing", "certification",
  "certified", "achievement", "achievements", "award", "awards",
  // Performance
  "lighthouse", "performance score", "a11y", "accessibility", "seo score",
  // Vague-but-on-topic
  "tell me about", "describe", "what does he", "what can he", "how does he",
  "is he", "does he", "has he", "did he",
];

/**
 * Phrases that strongly signal an off-topic question. Used only when the
 * message contains NO on-topic terms — if it has any on-topic term, we
 * assume it's about Sazzad and let the model answer.
 */
const OFF_TOPIC_PHRASES = [
  // General knowledge / homework
  "what is the capital", "what's the capital", "what is 2+2", "what's 2+2",
  "solve this", "calculate", "math problem", "equation", "derivative of",
  "integrate", "theorem", "proof of", "history of", "when was",
  // Creative writing
  "write a poem", "write me a poem", "write a story", "write me a story",
  "write a song", "write a joke", "tell me a joke", "tell a joke",
  "haiku", "limerick", "rhyme", "love letter", "cover letter",
  // Opinions / advice unrelated
  "best restaurant", "best movie", "best book", "recommend a",
  "should i buy", "stock price", "crypto price", "bitcoin",
  "what's the weather", "weather in", "news about", "latest news",
  // Coding homework (generic, no Sazzad reference)
  "implement a linked list", "implement a binary tree", "reverse a string",
  "fizzbuzz", "fizz buzz", "sort an array", "merge sort", "quicksort",
  "leetcode", "hackerrank", "codewars",
  // Other AIs
  "chatgpt", "openai", "anthropic claude", "gemini", "bard",
  "what model are you", "are you gpt", "are you claude", "are you gemini",
  // Meta-questions
  "ignore previous", "ignore the above", "system prompt", "your instructions",
  "pretend you", "act as if", "roleplay as",
  // Personal / sensitive
  "what's your name", "who created you", "who made you", "are you human",
  "are you a bot", "are you ai", "are you an ai",
];

function isOffTopic(message: string): boolean {
  const lower = message.toLowerCase();
  // Short messages default to on-topic — "hi", "hello", "?" are all
  // treated as Sazzad-related. The prompt's "Vague question" rule handles
  // these gracefully.
  if (lower.trim().length < 8) return false;
  // If any on-topic term is present, treat as on-topic.
  for (const term of ON_TOPIC_TERMS) {
    if (lower.includes(term)) return false;
  }
  // No on-topic terms — check for clear off-topic signals.
  for (const phrase of OFF_TOPIC_PHRASES) {
    if (lower.includes(phrase)) return true;
  }
  // No strong off-topic signal either — let the strengthened system
  // prompt decide. We only short-circuit on the obvious junk.
  return false;
}

const OFF_TOPIC_REFUSALS = [
  "I'm Sazzad's portfolio assistant — I only answer questions about his background, projects, and skills. Want to hear about his AI-native work, WebRTC systems, or how he modernized a legacy .NET ERP?",
  "That's outside my scope — I focus on Sazzad's career, skills, and projects. Curious about his work with LLMs, real-time video, or computer vision?",
  "I'm here to talk about Sazzad — his experience, tech stack, and what he's building. Anything else on your mind about him?",
  "Off-topic for me! I'm the assistant for Sazzad Hossain's portfolio. Ask me about his OpenRouter integrations, MediaPipe work, or what's next in his stack.",
];

/** Pick a refusal variant. Rotates by time so the same user sees variety. */
function offTopicRefusal(): string {
  const idx = Math.floor(Date.now() / 1000) % OFF_TOPIC_REFUSALS.length;
  return OFF_TOPIC_REFUSALS[idx];
}

/** Synthesize an SSE stream from a cached reply (single chunk). */
function cachedStreamResponse(reply: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`0:${JSON.stringify(reply)}\n`));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "x-vercel-ai-data-stream": "v1",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

// Suppress unused-import warning when Provider is only referenced in JSDoc above.
// (Kept as a type-only re-export so consumers can import from this module too.)
export type { Provider };
