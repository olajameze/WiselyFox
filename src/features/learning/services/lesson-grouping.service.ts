import {
  getTracksForSubject,
  parseTrackFromLessonSlug,
} from "@/data/curriculum-tracks";
import {
  isCareerPackLesson,
  isTrackLesson,
  UNLOCK_ADVANCED_AT,
} from "@/features/learning/services/lesson-unlock.service";

export type LessonRow = {
  id: string;
  slug: string;
  title: string;
  ageBand: string;
  difficulty: number;
  durationMinutes: number;
};

export type TrackLessonGroup = {
  trackSlug: string;
  title: string;
  category: string;
  lessons: LessonRow[];
};

export type LessonSection =
  | { kind: "foundation"; title: string; lessons: LessonRow[] }
  | { kind: "tracks"; title: string; groups: TrackLessonGroup[] }
  | { kind: "advanced"; title: string; lessons: LessonRow[] }
  | { kind: "career"; title: string; lessons: LessonRow[] };

export function buildLessonSections(
  visibleLessons: LessonRow[],
  subjectSlug: string,
  allSorted: LessonRow[],
): LessonSection[] {
  const foundation: LessonRow[] = [];
  const trackMap = new Map<string, LessonRow[]>();
  const advanced: LessonRow[] = [];
  const career: LessonRow[] = [];

  for (const lesson of visibleLessons) {
    const index = allSorted.findIndex((l) => l.slug === lesson.slug);
    const track = parseTrackFromLessonSlug(lesson.slug, subjectSlug);

    if (track || isTrackLesson(lesson.slug)) {
      const trackSlug = track?.trackSlug ?? lesson.slug.split("-")[1] ?? "other";
      const list = trackMap.get(trackSlug) ?? [];
      list.push(lesson);
      trackMap.set(trackSlug, list);
    } else if (isCareerPackLesson(lesson.slug, subjectSlug)) {
      career.push(lesson);
    } else if (index >= UNLOCK_ADVANCED_AT) {
      advanced.push(lesson);
    } else {
      foundation.push(lesson);
    }
  }

  const sections: LessonSection[] = [];

  if (foundation.length > 0) {
    sections.push({ kind: "foundation", title: "Foundation lessons", lessons: foundation });
  }

  const trackGroups = getTracksForSubject(subjectSlug)
    .filter((t) => trackMap.has(t.slug))
    .map((t) => ({
      trackSlug: t.slug,
      title: t.title,
      category: t.category,
      lessons: trackMap.get(t.slug)!,
    }));

  if (trackGroups.length > 0) {
    sections.push({ kind: "tracks", title: "Specialty tracks", groups: trackGroups });
  }

  if (advanced.length > 0) {
    sections.push({ kind: "advanced", title: "Advanced lessons", lessons: advanced });
  }

  if (career.length > 0) {
    sections.push({ kind: "career", title: "Career & business", lessons: career });
  }

  return sections;
}
