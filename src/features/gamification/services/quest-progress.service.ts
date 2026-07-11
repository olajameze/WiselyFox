import { prisma } from "@/shared/lib/prisma";
import { awardQuestSticker } from "./quest-reward.service";

export type WeeklyQuest = {
  slug: string;
  title: string;
  description: string;
  target: number;
};

export const WEEKLY_QUESTS: WeeklyQuest[] = [
  {
    slug: "lessons-week",
    title: "Lesson explorer",
    description: "Complete 3 lessons this week",
    target: 3,
  },
  {
    slug: "quiz-week",
    title: "Quiz star",
    description: "Pass a quiz this week",
    target: 1,
  },
  {
    slug: "focus-week",
    title: "Focus champion",
    description: "Finish a focus session this week",
    target: 1,
  },
];

function getWeekPeriod(now = new Date()) {
  const day = now.getDay();
  const periodStart = new Date(now);
  periodStart.setDate(now.getDate() - day);
  periodStart.setHours(0, 0, 0, 0);
  const periodEnd = new Date(periodStart);
  periodEnd.setDate(periodStart.getDate() + 7);
  return { periodStart, periodEnd };
}

export async function ensureWeeklyQuests(childId: string) {
  const { periodStart, periodEnd } = getWeekPeriod();
  for (const quest of WEEKLY_QUESTS) {
    await prisma.questProgress.upsert({
      where: {
        childId_questSlug_periodStart: { childId, questSlug: quest.slug, periodStart },
      },
      update: {},
      create: {
        childId,
        questSlug: quest.slug,
        title: quest.title,
        target: quest.target,
        periodStart,
        periodEnd,
      },
    });
  }
}

export async function getActiveQuests(childId: string) {
  await ensureWeeklyQuests(childId);
  const { periodStart } = getWeekPeriod();
  const rows = await prisma.questProgress.findMany({
    where: { childId, periodStart },
    orderBy: { questSlug: "asc" },
  });
  return rows.map((row) => ({
    ...row,
    description: WEEKLY_QUESTS.find((q) => q.slug === row.questSlug)?.description ?? "",
  }));
}

export async function incrementQuest(childId: string, questSlug: string, amount = 1) {
  const { periodStart, periodEnd } = getWeekPeriod();
  const quest = WEEKLY_QUESTS.find((q) => q.slug === questSlug);
  if (!quest) return;

  const existing = await prisma.questProgress.findUnique({
    where: { childId_questSlug_periodStart: { childId, questSlug, periodStart } },
  });

  if (existing?.completed) return;

  const wasComplete = existing?.completed ?? false;
  const progress = Math.min(quest.target, (existing?.progress ?? 0) + amount);
  const completed = progress >= quest.target;
  const justCompleted = completed && !wasComplete;

  await prisma.questProgress.upsert({
    where: { childId_questSlug_periodStart: { childId, questSlug, periodStart } },
    update: {
      progress,
      completed,
      completedAt: justCompleted ? new Date() : existing?.completedAt,
    },
    create: {
      childId,
      questSlug,
      title: quest.title,
      target: quest.target,
      progress,
      completed,
      completedAt: completed ? new Date() : null,
      periodStart,
      periodEnd,
    },
  });

  if (justCompleted) {
    await awardQuestSticker(childId, questSlug, periodStart);
  }

  return { completed: justCompleted, progress, target: quest.target };
}
