import { describe, it, expect } from "vitest";
import { isAdultTutorAge, calculateAge } from "@/features/tutors/lib/tutor-age";

describe("tutor age verification", () => {
  it("requires 18+ for tutors", () => {
    const dob = new Date("2010-01-01");
    expect(isAdultTutorAge(dob, new Date("2026-07-10"))).toBe(false);
  });

  it("allows adults", () => {
    const dob = new Date("1990-06-15");
    expect(isAdultTutorAge(dob, new Date("2026-07-10"))).toBe(true);
  });

  it("calculates age correctly before birthday", () => {
    expect(calculateAge(new Date("2000-12-31"), new Date("2026-07-10"))).toBe(25);
  });
});
