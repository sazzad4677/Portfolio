/**
 * Provider × model descriptors for the AI chat.
 *
 * The chat is hosted on Vercel Edge (runtime = "edge"). Each provider below
 * exposes the same OpenAI-compatible Chat Completions API, so a single
 * `new OpenAI({ baseURL, apiKey, defaultHeaders })` client works for both.
 *
 * Order matters: `getEnabledProviders()` returns the array as-is, and the
 * route iterates providers in order. Vercel AI Gateway is primary because
 * its $5/mo free-credit pool is separate from OpenRouter's `:free` tier;
 * if the gateway 429s, 5xx's, or 402's (credits exhausted), the route
 * short-circuits to OpenRouter and tries each `:free` model in turn.
 *
 * Candidate lists are pruned at module load by `refreshProviderModels()`,
 * which hits each provider's `GET /v1/models` endpoint once per Edge
 * isolate per hour, filters to free models, and merges the result with
 * the static fallback list. This auto-recovers from model-list drift
 * (Vercel rotating free-tier eligibility, OpenRouter deprecating `:free`
 * slugs) without redeploys.
 *
 * The probe is fail-open: any network or parse failure leaves the static
 * list in place and logs a single warning.
 */

export interface Provider {
  /** Stable identifier used in log lines. */
  name: "gateway" | "openrouter";
  /** OpenAI-compatible base URL. */
  baseURL: string;
  /**
   * Provider API key. When undefined the provider is skipped entirely
   * (lets a dev env run with only OpenRouter, or only the gateway).
   */
  apiKey: string | undefined;
  /** Optional per-provider headers (Referer, X-Title, etc.). */
  defaultHeaders?: Record<string, string>;
  /** Ordered, deduped list of model IDs to try on this provider. */
  candidateModels: string[];
}

function dedupe(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

function dedupePreserveOrder(arr: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of arr) {
    if (!seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sazzad.dev";

// ─── Static candidate lists (operator-curated, validated defaults) ────────────

const GATEWAY_STATIC: string[] = dedupe([
  process.env.AI_GATEWAY_MODEL ?? "openai/gpt-4o-mini",
  "openai/gpt-4o-mini",
  "meta-llama/llama-3.1-8b-instruct",
  "google/gemini-2.0-flash",
  "openai/gpt-4o",
]);

const OPENROUTER_STATIC: string[] = dedupe([
  // The live probe at module load will populate this with the current
  // free-tier model list. The only static fallback below is used only if
  // the probe is unreachable AND the user pinned a model via env var.
  process.env.OPENROUTER_MODEL ?? "",
  // "meta-llama/llama-3.1-8b-instruct:free", // CONFIRMED PAID-ONLY 2026 — do not re-enable without probe verification
  // "google/gemma-2-9b-it:free",             // CONFIRMED PAID-ONLY 2026
  // "qwen/qwen-2.5-72b-instruct:free",       // CONFIRMED PAID-ONLY 2026
  // "mistralai/mistral-small-3.1-24b-instruct:free", // CONFIRMED PAID-ONLY 2026
].filter(Boolean));

// ─── Provider descriptors (apiKey resolved at module load) ────────────────────

const GATEWAY: Provider = {
  name: "gateway",
  baseURL: "https://ai-gateway.vercel.sh/v1",
  apiKey: process.env.AI_GATEWAY_API_KEY,
  defaultHeaders: {
    "http-referer": SITE_URL,
  },
  candidateModels: GATEWAY_STATIC,
};

const OPENROUTER: Provider = {
  name: "openrouter",
  baseURL:
    process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": SITE_URL,
    "X-Title": "Sazzad's Portfolio",
  },
  candidateModels: OPENROUTER_STATIC,
};

/**
 * Returns providers in priority order, filtered to those with an apiKey.
 * Gateway is always listed first; OpenRouter is the secondary fallback.
 */
export function getEnabledProviders(): Provider[] {
  return [GATEWAY, OPENROUTER].filter((p) => Boolean(p.apiKey));
}

/**
 * True when an error from a provider indicates the *whole provider* is
 * unusable for this request — e.g. the gateway returned 402 (credits
 * exhausted). The route uses this to break out of the provider's model
 * loop early instead of burning the rest of the candidate list.
 */
export function isCreditExhausted(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  // Only match a *real* credit/billing exhaustion — not "credit card" or
  // "requires credit on file". A 403 from the gateway for "add a credit
  // card" is a *configuration* error, not a credit-exhaustion signal, and
  // short-circuiting on it would skip the rest of the gateway for nothing.
  return /\b(402)\b|\binsufficient[_ ]credits?\b|\bcredit[_ ]balance\b|\bbilling[_ ]limit\b/i.test(
    msg
  );
}

/**
 * True when the provider rejected the request with a 401 (bad/missing key)
 * or a 403 (account-level config issue, e.g. "add a credit card"). This
 * signals a *whole-provider* problem — retrying other models on the same
 * provider will fail identically. Caller should break out of the provider's
 * model loop and move to the next provider.
 */
export function isConfigError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    /\b(401|403)\b/.test(msg) ||
    /\b(api[_ ]?key|authorization|bearer)\b/i.test(msg) ||
    /\b(unauthorized|forbidden)\b/i.test(msg) ||
    /\bcredit[_ ]card\b|\bcard on file\b/i.test(msg)
  );
}

// ─── Live free-tier probe ─────────────────────────────────────────────────────
//
// Cached per-Edge-isolate for 1 hour. Re-runs on a request after expiry.
// The probe result is merged with the static list: any free model the
// provider currently lists is appended (deduped, preserving the static
// order first). This means if the operator's pinned model goes paid-only,
// the next free model in the response takes over automatically.

const PROBE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface CachedProbe {
  /** Promise so concurrent callers share the same in-flight request. */
  promise: Promise<string[]>;
  /** Timestamp of the last successful probe (or 0 if no probe yet). */
  ts: number;
  /** Last successful result, kept for re-use when refresh fails. */
  fallback: string[];
}

const probeCache: Record<Provider["name"], CachedProbe | undefined> = {
  gateway: undefined,
  openrouter: undefined,
};

interface ModelsResponse {
  data?: Array<{
    id?: string;
    pricing?: {
      prompt?: string | number;
      completion?: string | number;
    };
  }>;
}

type ModelEntry = NonNullable<ModelsResponse["data"]>[number];

function isFreePricing(m: ModelEntry): boolean {
  const pricing = m.pricing;
  if (!pricing) return false;
  const prompt = String(pricing.prompt ?? "");
  const completion = String(pricing.completion ?? "");
  // OpenRouter and the Vercel gateway both use the string "0" for free
  // models. A missing or non-zero string means a paid model.
  return prompt === "0" && completion === "0";
}

/**
 * Probe a provider for its current free model list. Fail-open: on any
 * error, returns the static list and logs a single warning.
 */
async function probeFreeModels(provider: Provider): Promise<string[]> {
  if (!provider.apiKey) return provider.candidateModels;
  try {
    const res = await fetch(`${provider.baseURL}/models`, {
      headers: {
        Authorization: `Bearer ${provider.apiKey}`,
        ...(provider.defaultHeaders ?? {}),
      },
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const json = (await res.json()) as ModelsResponse;
    const free = (json.data ?? [])
      .filter((m) => m.id && isFreePricing(m))
      .map((m) => m.id as string);
    if (free.length === 0) {
      console.warn(
        `[chatProviders] ${provider.name} probe returned 0 free models — keeping static list.`
      );
      return provider.candidateModels;
    }
    return free;
  } catch (err) {
    console.warn(
      `[chatProviders] ${provider.name} probe failed: ${err instanceof Error ? err.message : String(err)} — keeping static list.`
    );
    return provider.candidateModels;
  }
}

/**
 * Returns a promise resolving to the merged free-model list for a
 * provider. Caches the promise itself so concurrent requests share one
 * probe; expires after 1 hour.
 *
 * On the very first call, the probe has not run yet — we fire it off in
 * the background and immediately return the static list. The *next* call
 * (typically the second request) gets the freshly-probed list. This
 * keeps the first request from paying the 150ms probe cost.
 */
function getProviderFreeModels(provider: Provider): Promise<string[]> {
  const cached = probeCache[provider.name];
  const now = Date.now();
  // If we have a fresh result already, return it.
  if (cached && cached.ts > 0 && now - cached.ts < PROBE_TTL_MS) {
    return cached.promise;
  }
  // First call (or expired): fire probe in background, return static list now.
  // Mark the slot as "probe in flight" with ts=0 so subsequent calls wait
  // for the in-flight promise.
  const staticList = provider.candidateModels;
  const promise = probeFreeModels(provider)
    .then((free) => {
      // Probe-first merge: live-verified-free models first, then the static
      // list (so any operator-pinned model still wins even if it isn't in
      // the probe response). Dedupe preserves first occurrence.
      const merged = dedupePreserveOrder([...free, ...provider.candidateModels]);
      const slot = probeCache[provider.name];
      if (slot) {
        slot.ts = Date.now();
        slot.fallback = merged;
      } else {
        probeCache[provider.name] = { promise: Promise.resolve(merged), ts: Date.now(), fallback: merged };
      }
      return merged;
    })
    .catch((err) => {
      console.warn(
        `[chatProviders] ${provider.name} probe promise rejected: ${err} — returning last good list.`
      );
      return probeCache[provider.name]?.fallback ?? staticList;
    });
  // Store the in-flight promise with ts=0 (not yet ready). Concurrent
  // callers await the same promise; on next call after resolution,
  // the `ts > 0` branch above will short-circuit.
  probeCache[provider.name] = { promise, ts: 0, fallback: staticList };
  return Promise.resolve(staticList);
}

/**
 * Returns providers with their candidate model lists refreshed from the
 * live free-tier probe. Awaits both probes in parallel. If the probe
 * is in flight (or expired), the route gets a freshly-merged list.
 * On probe failure, the static list is returned unchanged.
 */
export async function getEnabledProvidersWithProbedModels(): Promise<Provider[]> {
  const providers = getEnabledProviders();
  const probed = await Promise.all(
    providers.map(async (p) => {
      const models = await getProviderFreeModels(p);
      return { ...p, candidateModels: models };
    })
  );
  return probed;
}
