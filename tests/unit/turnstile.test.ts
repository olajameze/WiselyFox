import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const env = vi.hoisted(() => {
  const values: Record<string, string | undefined> = {};
  return {
    set(key: string, value?: string) {
      values[key] = value;
    },
    get(key: string) {
      return values[key];
    },
  };
});

vi.mock("@/shared/lib/env", () => ({
  get env() {
    return {
      TURNSTILE_SECRET_KEY: env.get("TURNSTILE_SECRET_KEY"),
    };
  },
}));

import { verifyTurnstileToken } from "@/server/services/turnstile.service";

describe("turnstile.service", () => {
  beforeEach(() => {
    env.set("TURNSTILE_SECRET_KEY", "test-secret");
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("bypasses verification when no secret is configured (dev mode)", async () => {
    env.set("TURNSTILE_SECRET_KEY", undefined);
    const result = await verifyTurnstileToken("any-token");
    expect(result).toEqual({ ok: true });
  });

  it("rejects a missing token when a secret is configured", async () => {
    const result = await verifyTurnstileToken(undefined);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toMatch(/Security check missing/i);
  });

  it("rejects when Cloudflare returns success:false", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, "error-codes": ["invalid-input-response"] }),
    } as Response);

    const result = await verifyTurnstileToken("bad-token");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toMatch(/Security check failed/i);
  });

  it("accepts when Cloudflare returns success:true", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const result = await verifyTurnstileToken("good-token");
    expect(result).toEqual({ ok: true });
  });

  it("fails gracefully when the verification endpoint is unreachable", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("network down"));

    const result = await verifyTurnstileToken("good-token");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.message).toMatch(/unavailable/i);
  });
});
