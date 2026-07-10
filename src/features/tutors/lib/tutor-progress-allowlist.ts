export type TutorSubjectMastery = {
  subject: string;
  mastery: number;
  trend: "strong" | "needs_work" | "steady";
};

export type TutorQuizHistoryItem = {
  subjectTitle: string;
  score: number;
  passed: boolean;
  completedAt: string;
};

export type TutorSubjectCompleted = {
  subjectTitle: string;
  completedAt: string;
};

export type TutorRecommendation = {
  lessonTitle: string;
  reason: string;
};

export type TutorLearnerProgress = {
  learnerAlias: string;
  ageBand: string;
  levelLabel: string;
  levelScore: number;
  subjectMastery: TutorSubjectMastery[];
  quizHistory: TutorQuizHistoryItem[];
  subjectsCompleted: TutorSubjectCompleted[];
  lessonsCompletedCount: number;
  weeklyStudyMinutes: number;
  strengths: string[];
  needsImprovement: string[];
  recommendations: TutorRecommendation[];
};

/** Fields that must never appear in tutor-facing progress payloads. */
export const TUTOR_FORBIDDEN_PROGRESS_FIELDS = [
  "displayName",
  "accessCode",
  "pinHash",
  "userId",
  "parentId",
  "certificateCode",
  "concerns",
  "goals",
  "interests",
  "learningNeeds",
  "avatarConfig",
] as const;

export function deriveMasteryTrend(mastery: number): TutorSubjectMastery["trend"] {
  if (mastery >= 70) return "strong";
  if (mastery < 50) return "needs_work";
  return "steady";
}
