import { describe, expect, it } from "vitest";
import { ALL_CURRICULUM_SUBJECTS } from "@/data/curriculum";
import {
  getAllLessonsForSubject,
  getResolvedAgeBands,
} from "@/data/curriculum-merge";
import { GUIDE_ENRICHMENTS } from "@/data/study-guide-enrichment";

describe("curriculum age bands and depth", () => {
  it("every declared subject age band has at least one lesson", () => {
    for (const subject of ALL_CURRICULUM_SUBJECTS) {
      const lessons = getAllLessonsForSubject(subject);
      const lessonBands = new Set(lessons.map((l) => l.ageBand));
      const resolved = getResolvedAgeBands(subject);
      expect(resolved.length, `${subject.slug} should have lesson age bands`).toBeGreaterThan(0);

      for (const band of subject.ageBands) {
        expect(
          lessonBands.has(band),
          `${subject.slug} declares ${band} but has no lesson in that band`,
        ).toBe(true);
      }
    }
  });

  it("core young subjects include ages 5-7 lessons", () => {
    for (const slug of ["maths", "reading", "science", "health-wellbeing"]) {
      const subject = ALL_CURRICULUM_SUBJECTS.find((s) => s.slug === slug);
      expect(subject).toBeTruthy();
      const bands = getResolvedAgeBands(subject!);
      expect(bands, slug).toContain("5-7");
    }
  });

  it("STEM and extended subjects have guide enrichments", () => {
    const required = [
      "psychology",
      "philosophy",
      "sociology",
      "economics",
      "astronomy",
      "artificial-intelligence",
      "robotics",
      "english",
      "geometry",
      "statistics",
      "biology",
      "chemistry",
      "physics",
      "computing",
      "cybersecurity",
    ];
    for (const slug of required) {
      expect(GUIDE_ENRICHMENTS[slug]?.length, slug).toBeGreaterThanOrEqual(4);
    }
  });

  it("STEM subjects include younger and older band lessons", () => {
    for (const slug of ["artificial-intelligence", "biology", "cybersecurity"]) {
      const subject = ALL_CURRICULUM_SUBJECTS.find((s) => s.slug === slug)!;
      const bands = getResolvedAgeBands(subject);
      expect(bands).toContain("8-10");
      expect(bands).toContain("20-23");
    }
  });
});
