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

const MODEL_NAME = process.env.OPENROUTER_MODEL ?? "openai/gpt-oss-120b:free";
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
  const apiKey = process.env.OPEN_AI_API_KEY;
  if (!apiKey) {
    console.error("[chat/route] OPEN_AI_API_KEY is not set.");
    return errorResponse("Server configuration error.", 500);
  }

  // ── 4. Build OpenRouter client ──
  const openRouter = new OpenAI({
    apiKey,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://sazzad.dev",
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

  // ── 6. Send to OpenRouter and stream back ──
  try {
    const result = await openRouter.chat.completions.create({
      model: MODEL_NAME,
      messages: openRouterMessages,
      stream: true,
      max_tokens: 512,
      temperature: 0.4,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result) {
            const text = chunk.choices?.[0]?.delta?.content ?? "";
            if (text) {
              controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
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
    const message = error instanceof Error ? error.message : String(error);
    console.error("[chat/route] OpenRouter API error:", message);

    return errorResponse(
      "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      502
    );
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function errorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}