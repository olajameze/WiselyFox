import { describe, it, expect } from "vitest";
import { calculatePlatformFee, calculateTutorPayout } from "@/features/tutors/lib/tutor-fee";

describe("tutor fee", () => {
  it("calculates 5% platform fee", () => {
    expect(calculatePlatformFee(4000)).toBe(200);
    expect(calculatePlatformFee(1000)).toBe(50);
  });

  it("calculates tutor payout after fee", () => {
    expect(calculateTutorPayout(4000)).toBe(3800);
  });

  it("handles deposit amounts", () => {
    const deposit = 1000;
    expect(calculatePlatformFee(deposit)).toBe(50);
    expect(calculateTutorPayout(deposit)).toBe(950);
  });

  it("returns zero for non-positive amounts", () => {
    expect(calculatePlatformFee(0)).toBe(0);
  });
});
