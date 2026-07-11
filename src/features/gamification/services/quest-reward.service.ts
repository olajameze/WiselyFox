import { prisma } from "@/shared/lib/prisma";
import { createUserNotification } from "@/server/services/notification-delivery.service";
import { generateQuestSticker, questXpBonus } from "./sticker-generator.service";
import { WEEKLY_QUESTS } from "./quest-progress.service";

export async function awardQuestSticker(
  childId: string,
  questSlug: string,
  periodStart: Date,
): Promise<{ stickerId: string; emoji: string; label: string; xpBonus: number } | null> {
  const existing = await prisma.questSticker.findUnique({
    where: { childId_questSlug_periodStart: { childId, questSlug, periodStart } },
  });
  if (existing) {
    return {
      stickerId: existing.id,
      emoji: existing.emoji,
      label: existing.label,
      xpBonus: existing.xpBonus,
    };
  }

  const quest = WEEKLY_QUESTS.find((q) => q.slug === questSlug);
  const sticker = generateQuestSticker({ childId, questSlug, periodStart });
  const xpBonus = questXpBonus(questSlug);

  const record = await prisma.questSticker.create({
    data: {
      childId,
      questSlug,
      questTitle: quest?.title ?? questSlug,
      stickerSeed: sticker.seed,
      emoji: sticker.emoji,
      label: sticker.label,
      bgColor: sticker.bgColor,
      xpBonus,
      periodStart,
    },
  });

  const profile = await prisma.learningProfile.findUnique({ where: { childId } });
  if (profile) {
    await prisma.learningProfile.update({
      where: { childId },
      data: {
        xp: { increment: xpBonus },
        coins: { increment: Math.floor(xpBonus / 5) },
      },
    });
  }

  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    include: { parent: true },
  });

  if (child?.userId) {
    await createUserNotification({
      userId: child.userId,
      type: "ACHIEVEMENT",
      title: `Quest complete: ${sticker.emoji} ${sticker.label}`,
      body: `You earned a sticker and ${xpBonus} XP for finishing "${quest?.title ?? "a weekly quest"}".`,
      url: "/learn/rewards",
    });
  }

  if (child?.parent.userId) {
    await createUserNotification({
      userId: child.parent.userId,
      type: "ACHIEVEMENT",
      title: `${child.displayName} completed a weekly quest`,
      body: `Earned sticker "${sticker.label}" (${sticker.emoji}) + ${xpBonus} XP.`,
      url: `/parent/children/${childId}/results`,
    });
  }

  return {
    stickerId: record.id,
    emoji: sticker.emoji,
    label: sticker.label,
    xpBonus,
  };
}

export async function getChildStickerCollection(childId: string, limit = 24) {
  return prisma.questSticker.findMany({
    where: { childId },
    orderBy: { earnedAt: "desc" },
    take: limit,
  });
}

export async function getStickerForQuest(
  childId: string,
  questSlug: string,
  periodStart: Date,
) {
  return prisma.questSticker.findUnique({
    where: { childId_questSlug_periodStart: { childId, questSlug, periodStart } },
  });
}
