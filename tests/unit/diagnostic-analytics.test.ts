import { describe, expect, it } from "vitest";
import { calculateDiagnosticAnalytics } from "@/features/learning/services/diagnostic-analytics.service";

describe("calculateDiagnosticAnalytics", () => {
  it("calculates overall mastery and surfaces trouble spots", () => {
    const analytics = calculateDiagnosticAnalytics([
      { skillSlug: "math:foundation", masteryScore: 40 },
      { skillSlug: "math:foundation", masteryScore: 20 },
      { skillSlug: "science:foundation", masteryScore: 80 },
    ]);

    expect(analytics.overallMastery).toBe(47);
    expect(analytics.errorBoundary).toBe(27);
    expect(analytics.troubleSpots).toContain("math");
    expect(analytics.bySubject).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ subject: "math", mastery: 30 }),
        expect.objectContaining({ subject: "science", mastery: 80 }),
      ]),
    );
  });
});
