import { describe, it, expect } from "vitest";
import { parseLessonContent } from "@/features/learning/services/lesson-content.service";

describe("parseLessonContent", () => {
  it("parses valid lesson JSON with learning methods", () => {
    const raw = JSON.stringify({
      steps: [
        {
          title: "Read",
          content: "Hello",
          method: "read",
        },
        {
          title: "Watch",
          content: "Video step",
          method: "watch",
          videoId: "abc123",
        },
      ],
    });

    const parsed = parseLessonContent(raw);
    expect(parsed.steps).toHaveLength(2);
    expect(parsed.steps[0]?.method).toBe("read");
    expect(parsed.steps[1]?.videoId).toBe("abc123");
  });

  it("rejects invalid learning methods", () => {
    const raw = JSON.stringify({
      steps: [{ title: "Bad", content: "Oops", method: "invalid" }],
    });

    expect(() => parseLessonContent(raw)).toThrow();
  });

  it("rejects empty steps", () => {
    expect(() => parseLessonContent(JSON.stringify({ steps: [] }))).toThrow();
  });
});
