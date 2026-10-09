import { buildSystemPrompt } from "@/lib/systemPrompt";
import OpenAI from "openai";

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
}

// ─── Constants ────────────────────────────────────────────────────────────────

// Prefer a small, fast instruct model for the first reply; fall back to larger only on failure.
// 8B-class free models usually reply in <1.5s, while 70B free is often rate-limited (>5s).
const MODEL_NAME = process.env.OPENROUTER_MODEL || process.env.AI_MODEL || "meta-llama/llama-3.1-8b-instruct:free";
const BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const MAX_HISTORY_TURNS = 6; // was 20 — most Q's only need the last ~3 turns
const MAX_TOKENS = 320; // was 512 — concise answers, faster first-token
const TEMPERATURE = 0.3; // slightly lower = more deterministic, often faster
// Reusable system prompt string — built once per cold start, not per request.

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

  const { messages } = body;

  // ── 2. Validate ──
  const validationError = validateMessages(messages);
  if (validationError) {
    return errorResponse(validationError, 400);
  }

  // ── 3. Check API key ──
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[chat/route] OPENROUTER_API_KEY is not set.");
    return errorResponse("Server configuration error.", 500);
  }

  // ── 4. Build OpenRouter client (rebuilt per request is cheap; Edge isolates it) ──
  const openRouter = new OpenAI({
    apiKey,
    baseURL: BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://sazzad.dev",
      "X-Title": "Sazzad's Portfolio",
    },
  });

  // ── 5. Build messages array with cached system prompt ──
  const trimmed = messages.slice(-MAX_HISTORY_TURNS);

  const openRouterMessages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: buildSystemPrompt() },
    ...trimmed.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  // No per-message CRITICAL REMINDER — it's now baked into the system prompt,
  // which saves tokens and reduces input-processing latency.

  // ── 6. Send to OpenRouter with automatic model fallback and stream back ──
  const candidateModels = Array.from(
    new Set([
      MODEL_NAME,
      "google/gemma-2-9b-it:free",
      "meta-llama/llama-3.3-70b-instruct:free",
    ])
  );

  let lastError: unknown = null;

  for (const model of candidateModels) {
    try {
      const result = await openRouter.chat.completions.create({
        model,
        messages: openRouterMessages,
        stream: true,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
      });

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          let buffer = "";
          let inThinkBlock = false;

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
                    buffer = buffer.slice(-6);
                  }
                  break;
                }
              }
            }
            
            if (!inThinkBlock && buffer.length > 0) {
              controller.enqueue(encoder.encode(`0:${JSON.stringify(buffer)}\n`));
            }
          } catch (streamErr) {
            console.error("[chat/route] Stream error:", streamErr);
            controller.error(streamErr);
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
      lastError = error;
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[chat/route] Model ${model} failed: ${message}. Trying fallback if available...`);
    }
  }

  console.error("[chat/route] All candidate OpenRouter models failed:", lastError);
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