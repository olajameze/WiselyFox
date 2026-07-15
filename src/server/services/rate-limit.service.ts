/** In-memory sliding-window rate limiter for auth actions (per process). */

export type RateLimitAction = "sign-up" | "sign-in" | "child-pin";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

const buckets = new Map<string, number[]>();

export function resetRateLimitStoreForTests(): void {
  buckets.clear();
}

function prune(timestamps: number[], now: number): number[] {
  return timestamps.filter((t) => now - t < WINDOW_MS);
}

export function checkRateLimit(
  action: RateLimitAction,
  key: string,
  now = Date.now(),
): { ok: true } | { ok: false; message: string } {
  const bucketKey = `${action}:${key.toLowerCase().trim()}`;
  const recent = prune(buckets.get(bucketKey) ?? [], now);

  if (recent.length >= MAX_ATTEMPTS) {
    return {
      ok: false,
      message: "Too many attempts. Please wait a few minutes and try again.",
    };
  }

  recent.push(now);
  buckets.set(bucketKey, recent);
  return { ok: true };
}

export function getRateLimitConfigForTests() {
  return { WINDOW_MS, MAX_ATTEMPTS };
}
