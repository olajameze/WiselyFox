import { describe, it, expect } from "vitest";
import { scoreAssessment } from "@/features/assessment/services/assessment.service";

describe("scoreAssessment", () => {
  it("returns Foundation for low scores", () => {
    const result = scoreAssessment([
      { questionId: "1", correct: false, responseTimeMs: 1000, confidence: 2 },
    ]);
    expect(result.level).toBe("Foundation");
  });

  it("returns Advanced for high scores and confidence", () => {
    const answers = Array.from({ length: 5 }, (_, i) => ({
      questionId: String(i),
      correct: true,
      responseTimeMs: 2000,
      confidence: 5,
    }));
    const result = scoreAssessment(answers);
    expect(result.level).toBe("Advanced");
    expect(result.score).toBe(100);
  });
});
