import { describe, it, expect, beforeEach } from "vitest";
import {
  checkRateLimit,
  resetRateLimitStoreForTests,
  getRateLimitConfigForTests,
} from "@/server/services/rate-limit.service";

describe("rate-limit.service", () => {
  beforeEach(() => {
    resetRateLimitStoreForTests();
  });

  it("allows attempts under the limit", () => {
    const result = checkRateLimit("sign-in", "parent@example.com");
    expect(result.ok).toBe(true);
  });

  it("blocks after MAX_ATTEMPTS in the window", () => {
    const { MAX_ATTEMPTS } = getRateLimitConfigForTests();
    const key = "parent@example.com";
    for (let i = 0; i < MAX_ATTEMPTS; i += 1) {
      expect(checkRateLimit("sign-in", key).ok).toBe(true);
    }
    const blocked = checkRateLimit("sign-in", key);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.message).toMatch(/Too many attempts/i);
    }
  });

  it("isolates keys and actions", () => {
    const { MAX_ATTEMPTS } = getRateLimitConfigForTests();
    for (let i = 0; i < MAX_ATTEMPTS; i += 1) {
      checkRateLimit("sign-in", "a@example.com");
    }
    expect(checkRateLimit("sign-in", "b@example.com").ok).toBe(true);
    expect(checkRateLimit("sign-up", "a@example.com").ok).toBe(true);
    expect(checkRateLimit("child-pin", "wfox-demo").ok).toBe(true);
  });

  it("expires attempts outside the window", () => {
    const { WINDOW_MS, MAX_ATTEMPTS } = getRateLimitConfigForTests();
    const key = "parent@example.com";
    const t0 = 1_000_000;
    for (let i = 0; i < MAX_ATTEMPTS; i += 1) {
      checkRateLimit("sign-in", key, t0);
    }
    expect(checkRateLimit("sign-in", key, t0).ok).toBe(false);
    expect(checkRateLimit("sign-in", key, t0 + WINDOW_MS + 1).ok).toBe(true);
  });
});
