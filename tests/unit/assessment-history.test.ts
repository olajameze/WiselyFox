import { describe, it, expect } from "vitest";
import { formatAssessmentDomain } from "@/features/assessment/services/assessment-history.service";

describe("formatAssessmentDomain", () => {
  it("formats known domains", () => {
    expect(formatAssessmentDomain("reading")).toBe("Reading");
    expect(formatAssessmentDomain("maths")).toBe("Maths");
  });

  it("returns raw slug for unknown domains", () => {
    expect(formatAssessmentDomain("custom")).toBe("custom");
  });
});
