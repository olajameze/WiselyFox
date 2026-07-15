import { describe, it, expect } from "vitest";
import {
  sanitizeAiOutput,
  normalizeAiStyle,
  generateQuestion,
} from "@/server/services/ai.service";

describe("ai.service style and safety", () => {
  it("sanitizeAiOutput rejects blocked terms", () => {
    expect(sanitizeAiOutput('{"prompt":"ok"}')).toBe(true);
    expect(sanitizeAiOutput('{"prompt":"about violence"}')).toBe(false);
    expect(sanitizeAiOutput('{"prompt":"personal data leak"}')).toBe(false);
  });

  it("normalizeAiStyle removes em dashes and curly quotes", () => {
    expect(normalizeAiStyle("Calm mode—parents can adjust")).toBe(
      "Calm mode, parents can adjust",
    );
    expect(normalizeAiStyle("Focus first–then review")).toBe("Focus first, then review");
    expect(normalizeAiStyle("She said \u201Chello\u201D")).toBe('She said "hello"');
    expect(normalizeAiStyle("It\u2019s fine")).toBe("It's fine");
  });

  it("returns a safe fallback when OpenAI is not configured", async () => {
    const result = await generateQuestion("fractions", "8-10");
    expect(result.prompt).toMatch(/fractions/i);
    expect(result.options.length).toBeGreaterThanOrEqual(2);
    expect(result.correctAnswer).toBeTruthy();
    expect(result.explanation).toMatch(/fallback/i);
    expect(JSON.stringify(result)).not.toContain("—");
  });
});
