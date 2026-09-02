import { describe, expect, it } from "vitest";
import { buildSubjectBoardEntries } from "@/features/learning/lib/subject-board";

describe("subject board entries", () => {
  it("keeps additional subject paths visible and calculates progress from completed lessons", () => {
    const entries = buildSubjectBoardEntries(
      [
        {
          slug: "maths",
          title: "Maths",
          description: "Number fluency and problem solving.",
          ageBands: ["8-10"],
          lessons: [{ slug: "number-sense" }, { slug: "fractions" }, { slug: "geometry" }],
        },
        {
          slug: "psychology",
          title: "Psychology",
          description: "How people think and learn.",
          ageBands: ["11-13"],
          lessons: [{ slug: "memory" }, { slug: "attention" }],
        },
      ],
      "11-13",
      { maths: 1, psychology: 1 },
    );

    expect(entries.map((entry) => entry.slug)).toContain("psychology");
    expect(entries.find((entry) => entry.slug === "psychology")?.progress).toBe(50);
    expect(entries.find((entry) => entry.slug === "maths")?.status).toBe("In progress");
  });
});
