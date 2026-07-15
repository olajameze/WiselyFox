import { describe, it, expect } from "vitest";
import { ALL_CURRICULUM_SUBJECTS } from "@/data/curriculum";
import { getAllLessonsForSubject } from "@/data/curriculum-merge";
import { enhanceLessonStepsForHandsOn } from "@/data/lesson-hands-on";
import {
  LESSON_VIDEOS,
  VERIFIED_LESSON_VIDEO_IDS,
  resolveLessonVideo,
} from "@/data/lesson-videos";

function allLessons() {
  const rows: { subjectSlug: string; lessonSlug: string; title: string }[] = [];
  for (const subject of ALL_CURRICULUM_SUBJECTS) {
    for (const lesson of getAllLessonsForSubject(subject)) {
      rows.push({
        subjectSlug: subject.slug,
        lessonSlug: lesson.slug,
        title: lesson.title,
      });
    }
  }
  return rows;
}

describe("lesson videos", () => {
  const lessons = allLessons();

  it("covers every curriculum lesson with a resolved video", () => {
    expect(lessons.length).toBeGreaterThan(80);
    const missing = lessons.filter(
      (l) => !resolveLessonVideo(l.subjectSlug, l.lessonSlug)?.videoId,
    );
    expect(missing).toEqual([]);
  });

  it("has an explicit map entry for each seeded lesson", () => {
    const missing = lessons.filter(
      (l) => !LESSON_VIDEOS[`${l.subjectSlug}::${l.lessonSlug}`],
    );
    expect(missing).toEqual([]);
  });

  it("enhances Learn steps with method watch and a videoId", () => {
    for (const row of lessons) {
      const subject = ALL_CURRICULUM_SUBJECTS.find((s) => s.slug === row.subjectSlug);
      const lesson = subject
        ? getAllLessonsForSubject(subject).find((l) => l.slug === row.lessonSlug)
        : undefined;
      expect(lesson, row.lessonSlug).toBeTruthy();
      if (!lesson) continue;

      const steps = enhanceLessonStepsForHandsOn(row.subjectSlug, lesson, lesson.steps);
      const learn = steps.find((s) => s.title === "Learn");
      expect(learn?.method).toBe("watch");
      expect(learn?.videoId?.length).toBeGreaterThan(5);
      expect(learn?.videoTitle?.length).toBeGreaterThan(3);
    }
  });

  it("assigns track videos by category (python ≠ generic coding overview)", () => {
    const python = resolveLessonVideo("coding", "track-python-intro");
    const html = resolveLessonVideo("coding", "track-html-css-intro");
    expect(python.videoTitle.toLowerCase()).toMatch(/python/);
    expect(html.videoTitle.toLowerCase()).toMatch(/html/);
    expect(python.videoId).not.toBe(html.videoId);
  });

  it("includes psychology, philosophy, AI, robotics, and STEM subjects", () => {
    const slugs = ALL_CURRICULUM_SUBJECTS.map((s) => s.slug);
    const intros: Record<string, string> = {
      psychology: "intro-psychology",
      philosophy: "intro-philosophy",
      sociology: "intro-sociology",
      economics: "intro-economics",
      astronomy: "intro-astronomy",
      "artificial-intelligence": "what-is-ai",
      robotics: "what-is-a-robot",
      english: "reading-main-idea",
      geometry: "shapes-basics",
      statistics: "data-basics",
      biology: "cells-intro",
      chemistry: "atoms-elements",
      physics: "motion-basics",
      computing: "hardware-software",
      cybersecurity: "cyber-threats",
    };
    for (const [subject, lesson] of Object.entries(intros)) {
      expect(slugs).toContain(subject);
      expect(LESSON_VIDEOS[`${subject}::${lesson}`]?.videoId.length).toBeGreaterThan(5);
    }
  });

  it("only uses catalog video IDs that are in the verified set", () => {
    const verified = new Set(VERIFIED_LESSON_VIDEO_IDS);
    const used = Object.values(LESSON_VIDEOS).map((v) => v.videoId);
    const unknown = used.filter((id) => !verified.has(id));
    expect(unknown).toEqual([]);
  });
});
