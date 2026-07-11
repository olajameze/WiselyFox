import { prisma } from "@/shared/lib/prisma";
import { pickQuestions } from "@/features/learning/services/learning-engine.service";
import { getChildAssessmentHistory } from "@/features/assessment/services/assessment-history.service";
import { getActiveQuests } from "@/features/gamification/services/quest-progress.service";
import { getChildStickerCollection, getStickerForQuest } from "@/features/gamification/services/quest-reward.service";

function getWeekPeriodStart(now = new Date()) {
  const day = now.getDay();
  const periodStart = new Date(now);
  periodStart.setDate(now.getDate() - day);
  periodStart.setHours(0, 0, 0, 0);
  return periodStart;
}

export type PrintableQuestion = {
  number: number;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string | null;
};

export async function getWorksheetQuestions(
  subjectSlug: string,
  ageBand: string,
  limit = 12,
): Promise<{ subjectTitle: string; questions: PrintableQuestion[] }> {
  const subject = await prisma.subject.findUnique({
    where: { slug: subjectSlug },
    include: {
      skills: {
        include: {
          questions: { where: { published: true } },
        },
      },
    },
  });
  if (!subject) throw new Error("Subject not found");

  const pool = subject.skills.flatMap((skill) =>
    skill.questions.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      options: JSON.parse(q.options) as string[],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty,
      ageBand: q.ageBand,
    })),
  );

  const picked = pickQuestions(pool, 2, ageBand, Math.min(limit, pool.length));

  return {
    subjectTitle: subject.title,
    questions: picked.map((q, i) => ({
      number: i + 1,
      prompt: q.prompt,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    })),
  };
}

export async function getChildResultsSummary(childId: string) {
  const [
    child,
    quizAttempts,
    subjectCompletions,
    lessonCompletions,
    assessments,
    rewards,
    studySessions,
    quests,
    stickers,
  ] = await Promise.all([
    prisma.childProfile.findUnique({
      where: { id: childId },
      include: { learningProfile: true },
    }),
    prisma.quizAttempt.findMany({
      where: { childId },
      orderBy: { completedAt: "desc" },
    }),
    prisma.subjectCompletion.findMany({
      where: { childId },
      orderBy: { completedAt: "desc" },
    }),
    prisma.lessonCompletion.findMany({
      where: { childId },
      orderBy: { completedAt: "desc" },
      take: 50,
    }),
    getChildAssessmentHistory(childId),
    prisma.reward.findMany({
      where: { childId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.studySession.findMany({
      where: { childId, completed: true },
      orderBy: { startedAt: "desc" },
      take: 20,
    }),
    getActiveQuests(childId),
    getChildStickerCollection(childId, 12),
  ]);

  const totalStudyMinutes = studySessions.reduce((sum, s) => sum + s.durationMinutes, 0);
  const periodStart = getWeekPeriodStart();
  const questsWithStickers = await Promise.all(
    quests.map(async (q) => ({
      ...q,
      sticker: q.completed ? await getStickerForQuest(childId, q.questSlug, periodStart) : null,
    })),
  );

  return {
    child,
    quizAttempts,
    subjectCompletions,
    lessonCompletions,
    assessments,
    rewards,
    studySessions,
    quests: questsWithStickers,
    stickers,
    totalStudyMinutes,
  };
}
