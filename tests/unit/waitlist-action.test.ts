import { describe, it, expect } from "vitest";
import { joinWaitlistSchema } from "@/features/marketing/actions/waitlist.schema";

describe("joinWaitlistSchema", () => {
  it("accepts a valid email with optional age bands", () => {
    const result = joinWaitlistSchema.safeParse({
      email: "Parent@Example.com ",
      ageBands: ["5-7", "11-13"],
      marketingOptIn: true,
      turnstileToken: "abc",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("parent@example.com");
      expect(result.data.ageBands).toEqual(["5-7", "11-13"]);
      expect(result.data.marketingOptIn).toBe(true);
    }
  });

  it("defaults ageBands to an empty array", () => {
    const result = joinWaitlistSchema.safeParse({ email: "a@b.com" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.ageBands).toEqual([]);
  });

  it("rejects an invalid email", () => {
    const result = joinWaitlistSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an overlong email", () => {
    const result = joinWaitlistSchema.safeParse({
      email: `${"a".repeat(250)}@example.com`,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown age band", () => {
    const result = joinWaitlistSchema.safeParse({
      email: "a@b.com",
      ageBands: ["99-100"],
    });
    expect(result.success).toBe(false);
  });
});
