import { prisma } from "@/shared/lib/prisma";
import { REWARD_MILESTONES } from "@/features/gamification/services/reward-offers.service";
import { getNextXpMilestone } from "@/features/gamification/services/rewards.service";
import { getActiveQuests } from "@/features/gamification/services/quest-progress.service";
import { getChildStickerCollection, getStickerForQuest } from "@/features/gamification/services/quest-reward.service";

function getWeekPeriodStart(now = new Date()) {
  const day = now.getDay();
  const periodStart = new Date(now);
  periodStart.setDate(now.getDate() - day);
  periodStart.setHours(0, 0, 0, 0);
  return periodStart;
}

export async function getChildRewardsDashboard(childId: string) {
  const periodStart = getWeekPeriodStart();
  const [profile, rewards, quests, stickers] = await Promise.all([
    prisma.learningProfile.findUnique({ where: { childId } }),
    prisma.reward.findMany({ where: { childId }, orderBy: { createdAt: "desc" } }),
    getActiveQuests(childId),
    getChildStickerCollection(childId),
  ]);

  const questsWithStickers = await Promise.all(
    quests.map(async (q) => {
      const sticker = q.completed
        ? await getStickerForQuest(childId, q.questSlug, periodStart)
        : null;
      return { ...q, sticker };
    }),
  );

  const xp = profile?.xp ?? 0;
  const nextMilestoneXp = getNextXpMilestone(xp, REWARD_MILESTONES);
  const nextMilestone = nextMilestoneXp
    ? REWARD_MILESTONES.find((m) => m.xp === nextMilestoneXp) ?? null
    : null;

  const questsCompleted = quests.filter((q) => q.completed).length;

  return {
    profile,
    quests: questsWithStickers,
    questsCompleted,
    questsTotal: quests.length,
    stickers,
    nextMilestone,
    nextMilestoneXp,
    milestones: REWARD_MILESTONES,
    pendingApproval: rewards.filter((r) => !r.approved),
    readyToClaim: rewards.filter((r) => r.approved && !r.claimed),
    claimed: rewards.filter((r) => r.claimed),
  };
}
