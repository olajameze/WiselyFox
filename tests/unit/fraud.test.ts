import { describe, it, expect } from "vitest";
import { scoreSignupFraud, shouldFlagForReview } from "@/server/services/fraud-detection.service";

describe("fraud detection", () => {
  it("flags disposable emails", () => {
    const score = scoreSignupFraud("test@mailinator.com");
    expect(shouldFlagForReview(score)).toBe(true);
  });

  it("clears normal emails", () => {
    const score = scoreSignupFraud("parent@example.com");
    expect(shouldFlagForReview(score)).toBe(false);
  });
});
