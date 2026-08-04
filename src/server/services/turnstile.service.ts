import { env } from "@/shared/lib/env";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string | null;
  cdata?: string | null;
};

/**
 * Server-side Cloudflare Turnstile validation.
 *
 * When `TURNSTILE_SECRET_KEY` is not configured (local dev / preview), tokens are
 * accepted without verification so development stays fast. In any environment with
 * a secret key set, a missing or invalid token is rejected confidently.
 */
export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: true };
  }

  if (!token || typeof token !== "string" || token.length === 0) {
    return { ok: false, message: "Security check missing. Please try again." };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  let payload: TurnstileVerifyResponse;
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: AbortSignal.timeout(5000),
    });
    payload = (await response.json()) as TurnstileVerifyResponse;
  } catch (error) {
    console.error("[turnstile] verification request failed", error);
    return { ok: false, message: "Security check unavailable right now. Please try again." };
  }

  if (!payload.success) {
    const codes = payload["error-codes"]?.join(", ") ?? "unknown";
    console.warn("[turnstile] verification failed", codes);
    return { ok: false, message: "Security check failed. Please try again." };
  }

  return { ok: true };
}

