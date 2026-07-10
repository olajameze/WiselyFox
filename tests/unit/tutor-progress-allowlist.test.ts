import { describe, it, expect } from "vitest";
import {
  TUTOR_FORBIDDEN_PROGRESS_FIELDS,
  deriveMasteryTrend,
} from "@/features/tutors/lib/tutor-progress-allowlist";

describe("tutor progress allowlist", () => {
  it("lists forbidden PII fields", () => {
    expect(TUTOR_FORBIDDEN_PROGRESS_FIELDS).toContain("displayName");
    expect(TUTOR_FORBIDDEN_PROGRESS_FIELDS).toContain("accessCode");
    expect(TUTOR_FORBIDDEN_PROGRESS_FIELDS).toContain("pinHash");
    expect(TUTOR_FORBIDDEN_PROGRESS_FIELDS).toContain("learningNeeds");
  });

  it("derives mastery trends", () => {
    expect(deriveMasteryTrend(80)).toBe("strong");
    expect(deriveMasteryTrend(40)).toBe("needs_work");
    expect(deriveMasteryTrend(60)).toBe("steady");
  });
});
