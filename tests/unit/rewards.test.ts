import { describe, it, expect } from "vitest";
import { calculateXp, updateStreak } from "@/features/gamification/services/rewards.service";

describe("rewards", () => {
  it("calculates XP with streak bonus", () => {
    expect(calculateXp(10, 7, false)).toBeGreaterThan(10);
  });

  it("resets streak after gap", () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    expect(updateStreak(twoDaysAgo)).toBe(-1);
  });
});
