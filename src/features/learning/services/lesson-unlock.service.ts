/** Complete 4 foundation lessons → unlock specialty tracks. 6 → advanced. 9 → career pack. */
export const UNLOCK_TRACKS_AT = 4;
export const UNLOCK_ADVANCED_AT = 6;
export const UNLOCK_CAREER_AT = 9;

export function isTrackLesson(slug: string): boolean {
  return slug.startsWith("track-");
}

/** Career pack lessons appended to core subjects (not the standalone Career & Business subject). */
export function isCareerPackLesson(slug: string, subjectSlug: string): boolean {
  return slug.startsWith("career-") && subjectSlug !== "career-skills";
}

export function isAdvancedLesson(slug: string, subjectSlug: string, sortIndex: number): boolean {
  if (isTrackLesson(slug) || isCareerPackLesson(slug, subjectSlug)) return false;
  return sortIndex >= UNLOCK_ADVANCED_AT;
}

export function lessonUnlockLabel(
  slug: string,
  subjectSlug: string,
  sortIndex: number,
  completedInSubject: number,
): string | null {
  if (isTrackLesson(slug) && completedInSubject < UNLOCK_TRACKS_AT) {
    const remaining = UNLOCK_TRACKS_AT - completedInSubject;
    return `Complete ${remaining} more foundation lesson${remaining === 1 ? "" : "s"} to unlock specialty tracks`;
  }
  if (isCareerPackLesson(slug, subjectSlug) && completedInSubject < UNLOCK_CAREER_AT) {
    const remaining = UNLOCK_CAREER_AT - completedInSubject;
    return `Complete ${remaining} more lesson${remaining === 1 ? "" : "s"} to unlock career skills`;
  }
  if (
    !isCareerPackLesson(slug, subjectSlug) &&
    !isTrackLesson(slug) &&
    sortIndex >= UNLOCK_ADVANCED_AT &&
    completedInSubject < UNLOCK_ADVANCED_AT
  ) {
    const remaining = UNLOCK_ADVANCED_AT - completedInSubject;
    return `Complete ${remaining} more to unlock advanced lessons`;
  }
  return null;
}

export function isLessonUnlocked(
  slug: string,
  subjectSlug: string,
  sortIndex: number,
  completedInSubject: number,
): boolean {
  if (isTrackLesson(slug)) return completedInSubject >= UNLOCK_TRACKS_AT;
  if (isCareerPackLesson(slug, subjectSlug)) return completedInSubject >= UNLOCK_CAREER_AT;
  if (sortIndex >= UNLOCK_ADVANCED_AT) return completedInSubject >= UNLOCK_ADVANCED_AT;
  return true;
}
