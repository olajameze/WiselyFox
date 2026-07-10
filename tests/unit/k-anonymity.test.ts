import { describe, it, expect } from "vitest";
import { applyKAnonymity } from "@/server/services/trial-reminder.service";

describe("applyKAnonymity", () => {
  it("filters cells below threshold", () => {
    const rows = [
      { ageBand: "8-10", value: 50 },
      { ageBand: "5-7", value: 10 },
    ];
    const result = applyKAnonymity(rows, 30);
    expect(result).toHaveLength(1);
    expect(result[0].ageBand).toBe("8-10");
  });
});
