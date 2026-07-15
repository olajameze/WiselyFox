import type { CurriculumLesson, LessonStep, StudyGuideSection } from "./curriculum";
import {
  LESSON_PRACTICE_STEPS,
  SECTION_PRACTICE,
  SECTION_VIDEOS,
  SUBJECT_OVERVIEW_VIDEO,
  practiceVideoForLesson,
  videoForLesson,
  type VideoRef,
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

    if (step.title === "Learn") {
      // UDL: every Learn step includes a watchable video for visual learners.
      // Always use the verified catalog so stale hardcoded IDs cannot break embeds.
      next.method = "watch";
      next.videoId = learnVideo.videoId;
      next.videoTitle = `${lesson.title}: ${learnVideo.videoTitle}`;
    }

    if (step.title === "Practice") {
      next.method = next.method ?? "practice";
      if (!next.instructions?.length && practiceSteps) {
        next.instructions = practiceSteps;
      }
      next.videoId = practiceVideo.videoId;
      next.videoTitle = `How to practise: ${practiceVideo.videoTitle}`;
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

/** Attach hands-on practice only. Videos live on the dedicated Videos page. */
export function enhanceStudyGuideWithMedia(
  subjectSlug: string,
  sections: StudyGuideSection[],
): StudyGuideSection[] {
  const practices = SECTION_PRACTICE[subjectSlug] ?? [];

  return sections.map((section, i) => ({
    ...section,
    // Strip any embedded section videos so study text stays text-first.
    videoId: undefined,
    videoTitle: undefined,
    practice: section.practice ?? practices[i],
  }));
}

export type SubjectVideoItem = {
  title: string;
  videoId: string;
  videoTitle: string;
  kind: "overview" | "topic" | "lesson";
};

/** Curated watch list for `/learn/videos/[subjectSlug]`. */
export function getSubjectVideoLibrary(
  subjectSlug: string,
  sectionTitles: string[] = [],
  lessonClips: { title: string; video: VideoRef }[] = [],
): SubjectVideoItem[] {
  const overview = SUBJECT_OVERVIEW_VIDEO[subjectSlug];
  const sectionVideos = SECTION_VIDEOS[subjectSlug] ?? [];
  const items: SubjectVideoItem[] = [];
  const seen = new Set<string>();

  function push(item: SubjectVideoItem) {
    if (seen.has(item.videoId)) return;
    seen.add(item.videoId);
    items.push(item);
  }

  if (overview) {
    push({
      title: "Subject overview",
      videoId: overview.videoId,
      videoTitle: overview.videoTitle,
      kind: "overview",
    });
  }

  sectionVideos.forEach((video, i) => {
    push({
      title: sectionTitles[i] ?? `Topic ${i + 1}`,
      videoId: video.videoId,
      videoTitle: video.videoTitle,
      kind: "topic",
    });
  });

  for (const clip of lessonClips) {
    push({
      title: clip.title,
      videoId: clip.video.videoId,
      videoTitle: clip.video.videoTitle,
      kind: "lesson",
    });
  }

  return items;
}
