import { AGE_BANDS } from "@/data/age-bands";
import type { CurriculumLesson, CurriculumQuestion, CurriculumSubject } from "@/data/curriculum";
import { CURRICULUM_EXTRA } from "@/data/curriculum-extra";
import { CURRICULUM_YOUNG_ADULT } from "@/data/curriculum-young-adult";
import { CURRICULUM_CAREER } from "@/data/curriculum-career";
import { CURRICULUM_TRACKS, trackLessonSlug } from "@/data/curriculum-tracks";
import { CURRICULUM_DEPTH } from "@/data/curriculum-depth";

/** All supplemental lesson packs merged at seed / runtime. */
export function getSupplementalPack(subjectSlug: string): {
  lessons: CurriculumLesson[];
  questions: CurriculumQuestion[];
} {
  const extra = CURRICULUM_EXTRA[subjectSlug];
  const youngAdult = CURRICULUM_YOUNG_ADULT[subjectSlug];
  const career = CURRICULUM_CAREER[subjectSlug];
  const depth = CURRICULUM_DEPTH[subjectSlug];
  const tracks = CURRICULUM_TRACKS[subjectSlug];
  const trackLessons =
    tracks?.flatMap((track) =>
      track.lessons.map((lesson) => ({
        ...lesson,
        slug: trackLessonSlug(track.slug, lesson.slug),
        title: `${track.title}: ${lesson.title}`,
      })),
    ) ?? [];
  const trackQuestions = tracks?.flatMap((t) => t.questions) ?? [];

  return {
    lessons: [
      ...(extra?.lessons ?? []),
      ...(youngAdult?.lessons ?? []),
      ...(career?.lessons ?? []),
      ...(depth?.lessons ?? []),
      ...trackLessons,
    ],
    questions: [
      ...(extra?.questions ?? []),
      ...(youngAdult?.questions ?? []),
      ...(career?.questions ?? []),
      ...(depth?.questions ?? []),
      ...trackQuestions,
    ],
  };
}

export function getAllLessonsForSubject(subject: CurriculumSubject): CurriculumLesson[] {
  const { lessons } = getSupplementalPack(subject.slug);
  return [...subject.lessons, ...lessons];
}

export function getAllQuestionsForSubject(subject: CurriculumSubject): CurriculumQuestion[] {
  const { questions } = getSupplementalPack(subject.slug);
  return [...subject.questions, ...questions];
}

/** Age bands that actually have at least one lesson (stable AGE_BANDS order). */
export function ageBandsFromLessons(lessons: CurriculumLesson[]): string[] {
  const present = new Set(lessons.map((l) => l.ageBand));
  return AGE_BANDS.filter((band) => present.has(band));
}

export function getResolvedAgeBands(subject: CurriculumSubject): string[] {
  return ageBandsFromLessons(getAllLessonsForSubject(subject));
}
