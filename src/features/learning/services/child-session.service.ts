import { cache } from "react";
import { prisma } from "@/shared/lib/prisma";

/** One cached child fetch per request, avoids duplicate DB hits across layout + pages */
export const getLearnChildByUserId = cache(async (userId: string) => {
  return prisma.childProfile.findFirst({
    where: { userId },
    include: { learningProfile: true },
  });
});

export const getLearnChildWithRewards = cache(async (userId: string) => {
  return prisma.childProfile.findFirst({
    where: { userId },
    include: {
      learningProfile: true,
      rewards: { where: { approved: true, claimed: false }, orderBy: { createdAt: "desc" } },
    },
  });
});
