/**
 * Abuse protection and reply caching for /api/chat, backed by Upstash Redis.
 *
 * Reads the Vercel Marketplace (KV_REST_API_*) or native Upstash
 * (UPSTASH_REDIS_REST_*) env vars. When neither is set — local dev, preview
 * without the integration — everything fails open: rate limits are skipped
 * and the reply cache falls back to a small per-isolate Map.
 */
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const REDIS_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = REDIS_URL && REDIS_TOKEN ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN }) : null;

// ─── Rate limits ──────────────────────────────────────────────────────────────

/** Per-visitor burst + daily caps, and a site-wide daily ceiling on model calls. */
const PER_MINUTE = 10;
const PER_DAY = 60;
const GLOBAL_MODEL_CALLS_PER_DAY = 2_000;

// Shared across limiters: once an IP is blocked, later requests in the same
// isolate are rejected without a Redis round-trip.
const ephemeralCache = new Map<string, number>();

const limiters = redis
  ? {
      minute: new Ratelimit({
        redis,
        prefix: "chat:rl:min",
        limiter: Ratelimit.slidingWindow(PER_MINUTE, "1 m"),
        ephemeralCache,
      }),
      day: new Ratelimit({
        redis,
        prefix: "chat:rl:day",
        limiter: Ratelimit.fixedWindow(PER_DAY, "1 d"),
        ephemeralCache,
      }),
      global: new Ratelimit({
        redis,
        prefix: "chat:rl:global",
        limiter: Ratelimit.fixedWindow(GLOBAL_MODEL_CALLS_PER_DAY, "1 d"),
      }),
    }
  : null;

export type LimitResult = { ok: true } | { ok: false; message: string; retryAfterSeconds: number };

function retryAfter(reset: number): number {
  return Math.max(1, Math.ceil((reset - Date.now()) / 1000));
}

/** Vercel always sets x-forwarded-for; the first entry is the client. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anonymous";
}

/** Per-visitor limits. Applied to every request, including cache hits. */
export async function checkVisitorLimit(ip: string): Promise<LimitResult> {
  if (!limiters) return { ok: true };
  try {
    const minute = await limiters.minute.limit(ip);
    if (!minute.success) {
      return {
        ok: false,
        message: "You're sending messages a little fast — give it a few seconds and try again.",
        retryAfterSeconds: retryAfter(minute.reset),
      };
    }
    const day = await limiters.day.limit(ip);
    if (!day.success) {
      return {
        ok: false,
        message:
          "You've reached today's chat limit. For anything else, reach Sazzad directly at sazzad4677@gmail.com.",
        retryAfterSeconds: retryAfter(day.reset),
      };
    }
    return { ok: true };
  } catch (err) {
    console.warn("[chatLimits] visitor limit check failed, allowing request:", err);
    return { ok: true };
  }
}

/** Site-wide circuit breaker on paid model calls. Applied only on cache misses. */
export async function checkGlobalBudget(): Promise<LimitResult> {
  if (!limiters) return { ok: true };
  try {
    const res = await limiters.global.limit("all");
    if (res.success) return { ok: true };
    return {
      ok: false,
      message:
        "The assistant has hit its daily budget. Please email Sazzad at sazzad4677@gmail.com — he usually replies within 24 hours.",
      retryAfterSeconds: retryAfter(res.reset),
    };
  } catch (err) {
    console.warn("[chatLimits] global budget check failed, allowing request:", err);
    return { ok: true };
  }
}

// ─── Reply cache ──────────────────────────────────────────────────────────────

const CACHE_TTL_SECONDS = 60 * 60;
const MEMORY_CACHE_MAX = 50;
const memoryCache = new Map<string, { reply: string; expires: number }>();

async function cacheKey(lastUserContent: string, projectSlug: string | undefined): Promise<string> {
  const normalized = `${lastUserContent.toLowerCase().trim().replace(/\s+/g, " ")}::${projectSlug ?? ""}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  return `chat:reply:${hex}`;
}

export async function getCachedReply(
  lastUserContent: string,
  projectSlug: string | undefined
): Promise<string | null> {
  const key = await cacheKey(lastUserContent, projectSlug);
  if (redis) {
    try {
      return await redis.get<string>(key);
    } catch (err) {
      console.warn("[chatLimits] cache read failed:", err);
      return null;
    }
  }
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    memoryCache.delete(key);
    return null;
  }
  // Re-insert so Map order tracks recency (true LRU eviction below).
  memoryCache.delete(key);
  memoryCache.set(key, entry);
  return entry.reply;
}

export async function setCachedReply(
  lastUserContent: string,
  projectSlug: string | undefined,
  reply: string
): Promise<void> {
  const key = await cacheKey(lastUserContent, projectSlug);
  if (redis) {
    try {
      await redis.set(key, reply, { ex: CACHE_TTL_SECONDS });
    } catch (err) {
      console.warn("[chatLimits] cache write failed:", err);
    }
    return;
  }
  if (memoryCache.size >= MEMORY_CACHE_MAX) {
    const oldest = memoryCache.keys().next().value;
    if (oldest !== undefined) memoryCache.delete(oldest);
  }
  memoryCache.set(key, { reply, expires: Date.now() + CACHE_TTL_SECONDS * 1000 });
}
