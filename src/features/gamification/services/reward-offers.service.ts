import { prisma } from "@/shared/lib/prisma";
import { createUserNotification } from "@/server/services/notification-delivery.service";

const REWARD_MILESTONES: { xp: number; title: string; description: string }[] = [
  { xp: 50, title: "Choose tonight's story", description: "Pick a bedtime book together" },
  { xp: 100, title: "15 minutes extra screen time", description: "Approved leisure time" },
  { xp: 200, title: "Special snack reward", description: "A treat after learning" },
  { xp: 350, title: "Pick a family activity", description: "Board game or walk" },
];

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

      const child = await prisma.childProfile.findUnique({
        where: { id: childId },
        include: { parent: true },
      });
      if (child?.parent.userId) {
        await createUserNotification({
          userId: child.parent.userId,
          type: "ACHIEVEMENT",
          title: "Reward waiting for approval",
          body: `${child.displayName} earned: ${milestone.title}`,
          url: "/parent/rewards",
        });
      }
      break;
    }
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

  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    include: { parent: true },
  });
  if (child?.parent.userId) {
    await createUserNotification({
      userId: child.parent.userId,
      type: "ACHIEVEMENT",
      title: "Reward waiting for approval",
      body: `${child.displayName} earned: Perfect quiz star`,
      url: "/parent/rewards",
    });
  }
}
