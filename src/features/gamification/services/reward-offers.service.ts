import { prisma } from "@/shared/lib/prisma";
import { createUserNotification } from "@/server/services/notification-delivery.service";

export const REWARD_MILESTONES: { xp: number; title: string; description: string }[] = [
  { xp: 50, title: "Choose tonight's story", description: "Pick a bedtime book together" },
  { xp: 100, title: "15 minutes extra screen time", description: "Approved leisure time" },
  { xp: 200, title: "Special snack reward", description: "A treat after learning" },
  { xp: 350, title: "Pick a family activity", description: "Board game or walk" },
];

/** Parent-approved rewards for consecutive daily study streaks. */
export const STREAK_REWARDS: { days: number; title: string; description: string }[] = [
  {
    days: 5,
    title: "5 day streak star",
    description: "Studied five days in a row, pick a small celebration with a parent",
  },
  {
    days: 7,
    title: "7 day streak champion",
    description: "A full week of learning, choose a favourite activity together",
  },
  {
    days: 14,
    title: "Two week streak hero",
    description: "Fourteen days of showing up, earn a bigger family treat",
  },
];

async function notifyParentReward(childId: string, title: string) {
  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    include: { parent: true },
  });
  if (child?.parent.userId) {
    await createUserNotification({
      userId: child.parent.userId,
      type: "ACHIEVEMENT",
      title: "Reward waiting for approval",
      body: `${child.displayName} earned: ${title}`,
      url: "/parent/rewards",
    });
  }
}

export async function maybeOfferReward(childId: string, newXp: number, prevXp: number) {
  for (const milestone of REWARD_MILESTONES) {
    if (prevXp < milestone.xp && newXp >= milestone.xp) {
      const existing = await prisma.reward.findFirst({
        where: { childId, title: milestone.title },
      });
      if (existing) continue;

      await prisma.reward.create({
        data: {
          childId,
          type: "milestone",
          title: milestone.title,
          description: milestone.description,
          approved: false,
        },
      });

      await notifyParentReward(childId, milestone.title);
      break;
    }
  }
}

/**
 * Offer streak rewards once each milestone is reached.
 * Also backfills if the child already has a long streak but never received the reward.
 */
export async function maybeOfferStreakReward(childId: string, streakDays: number) {
  for (const milestone of STREAK_REWARDS) {
    if (streakDays < milestone.days) continue;

    const existing = await prisma.reward.findFirst({
      where: { childId, title: milestone.title },
    });
    if (existing) continue;

    await prisma.reward.create({
      data: {
        childId,
        type: "streak",
        title: milestone.title,
        description: milestone.description,
        approved: false,
      },
    });

    await notifyParentReward(childId, milestone.title);
  }
}

export async function maybeOfferQuizReward(childId: string, score: number) {
  if (score < 100) return;
  const existing = await prisma.reward.findFirst({
    where: {
      childId,
      title: "Perfect quiz star",
      createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    },
  });
  if (existing) return;

  await prisma.reward.create({
    data: {
      childId,
      type: "quiz",
      title: "Perfect quiz star",
      description: "Scored 100% on a quiz, nice work!",
      approved: false,
    },
  });

  await notifyParentReward(childId, "Perfect quiz star");
}

export function getNextStreakReward(streakDays: number): (typeof STREAK_REWARDS)[number] | null {
  return STREAK_REWARDS.find((r) => r.days > streakDays) ?? null;
}
