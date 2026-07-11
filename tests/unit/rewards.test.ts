import { describe, it, expect } from "vitest";
import {
  calculateXp,
  updateStreak,
  computeStudyRewards,
  getNextXpMilestone,
} from "@/features/gamification/services/rewards.service";
import { REWARD_MILESTONES } from "@/features/gamification/services/reward-offers.service";

describe("rewards", () => {
  it("calculates XP with streak bonus", () => {
    expect(calculateXp(10, 7, false)).toBeGreaterThan(10);
  });

  it("adds perfect quiz bonus", () => {
    expect(calculateXp(10, 0, true)).toBe(15);
  });

  it("resets streak after gap", () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    expect(updateStreak(twoDaysAgo)).toBe(-1);
  });

  it("keeps streak on same day", () => {
    const today = new Date();
    expect(updateStreak(today)).toBe(0);
  });

  it("computes study rewards with streak increment", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const result = computeStudyRewards({
      baseXp: 10,
      currentStreak: 2,
      lastStudyDate: yesterday,
    });
    expect(result.streakDays).toBe(3);
    expect(result.xp).toBeGreaterThan(10);
  });

  it("finds next XP milestone", () => {
    expect(getNextXpMilestone(30, REWARD_MILESTONES)).toBe(50);
    expect(getNextXpMilestone(400, REWARD_MILESTONES)).toBeNull();
  });
});
