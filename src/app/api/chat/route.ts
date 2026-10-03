import { buildSystemPrompt } from "@/lib/systemPrompt";
import OpenAI from "openai";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MODEL_NAME = process.env.OPENROUTER_MODEL || process.env.AI_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
const BASE_URL = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";
const MAX_HISTORY_TURNS = 20;

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

  // ── 4. Build OpenRouter client ──
  const openRouter = new OpenAI({
    apiKey,
    baseURL: BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://sazzad.dev",
      "X-Title": "Sazzad's Portfolio",
    },
  });

  // ── 5. Build messages array with system prompt ──
  const trimmed = messages.slice(-MAX_HISTORY_TURNS);

  const openRouterMessages = [
    { role: "system" as const, content: buildSystemPrompt() },
    ...trimmed.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  // ── 6. Send to OpenRouter with automatic model fallback and stream back ──
  const candidateModels = Array.from(
    new Set([
      MODEL_NAME,
      "qwen/qwen3.8-27b:free",
      "google/gemma-4-31b-it:free",
      "nvidia/nemotron-3.5-lightning:free"
    ])
  );

  let lastError: unknown = null;

  for (const model of candidateModels) {
    try {
      const result = await openRouter.chat.completions.create({
        model,
        messages: openRouterMessages,
        stream: true,
        max_tokens: 512,
        temperature: 0.4,
      });

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          let accumulated = "";
          let streamStarted = false;

          try {
            for await (const chunk of result) {
              const text = chunk.choices?.[0]?.delta?.content ?? "";
              if (!text) continue;

              accumulated += text;

              // Filter out leading reasoning/analysis steps if emitted by model
              if (!streamStarted) {
                if (
                  accumulated.trim().startsWith("1. Analyze") ||
                  accumulated.includes("Analyze User Input:") ||
                  accumulated.includes("Here's a thinking process:")
                ) {
                  const parts = accumulated.split("\n\n");
                  const contentPart = parts.find(
                    (p) =>
                      !p.includes("Analyze User Input") &&
                      !p.includes("Identify Intent") &&
                      !p.includes("Check Constraints") &&
                      !p.includes("thinking process") &&
                      p.trim().length > 0
                  );
                  if (contentPart) {
                    streamStarted = true;
                    const clean = contentPart.trim();
                    controller.enqueue(encoder.encode(`0:${JSON.stringify(clean)}\n`));
                  }
                  continue;
                }
                streamStarted = true;
              }

              let cleanText = text;
              if (cleanText.includes("<think>")) {
                cleanText = cleanText.replace(/<think>[\s\S]*?<\/think>/g, "");
              }

              if (cleanText) {
                controller.enqueue(encoder.encode(`0:${JSON.stringify(cleanText)}\n`));
              }
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