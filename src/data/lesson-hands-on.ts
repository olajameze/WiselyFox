import type { CurriculumLesson, LessonStep, StudyGuideSection } from "./curriculum";
import {
  LESSON_PRACTICE_STEPS,
  SECTION_PRACTICE,
  SECTION_VIDEOS,
  practiceVideoForLesson,
  videoForLesson,
} from "./subject-media";

/** Add videos, hands on instructions, and learning methods to lesson steps. */
export function enhanceLessonStepsForHandsOn(
  subjectSlug: string,
  lesson: CurriculumLesson,
  steps: LessonStep[],
): LessonStep[] {
  const learnVideo = videoForLesson(subjectSlug, lesson.slug);
  const practiceVideo = practiceVideoForLesson(subjectSlug, lesson.slug);
  const practiceSteps = LESSON_PRACTICE_STEPS[subjectSlug];

  return steps.map((step) => {
    const next = { ...step };

    if (step.title === "Learn" && learnVideo) {
      next.method = "watch";
      next.videoId = next.videoId ?? learnVideo.videoId;
      next.videoTitle = next.videoTitle ?? `${lesson.title}, ${learnVideo.videoTitle}`;
    } else if (step.title === "Learn") {
      next.method = next.method ?? "read";
    }

    if (step.title === "Practice") {
      next.method = next.method ?? "practice";
      if (!next.instructions?.length && practiceSteps) {
        next.instructions = practiceSteps;
      }
      if (!next.videoId && practiceVideo) {
        next.videoId = practiceVideo.videoId;
        next.videoTitle = `How to practise, ${practiceVideo.videoTitle}`;
      }
    }

    if (step.title === "Warm up") {
      next.method = next.method ?? "discuss";
    }

    if (step.title === "Review") {
      next.method = next.method ?? "quiz";
    }

    return next;
  });
}

export function enhanceStudyGuideWithMedia(
  subjectSlug: string,
  sections: StudyGuideSection[],
): StudyGuideSection[] {
  const videos = SECTION_VIDEOS[subjectSlug] ?? [];
  const practices = SECTION_PRACTICE[subjectSlug] ?? [];

  return sections.map((section, i) => ({
    ...section,
    videoId: section.videoId ?? videos[i]?.videoId,
    videoTitle: section.videoTitle ?? videos[i]?.videoTitle,
    practice: section.practice ?? practices[i],
  }));
}
