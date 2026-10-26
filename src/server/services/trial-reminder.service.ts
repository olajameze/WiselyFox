import { prisma } from "@/shared/lib/prisma";
import { env } from "@/shared/lib/env";
import { createUserNotification } from "@/server/services/notification-delivery.service";
import { NotificationType } from "@prisma/client";

export async function processTrialReminders() {
  // WiselyFox is free for parents and learners: there is no trial to expire and
  // no subscription to renew, so no trial reminders are sent.
  await processDailyStudyReminders();
}

export async function processDailyStudyReminders() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const children = await prisma.childProfile.findMany({
    where: {
      learningProfile: {
        lastStudyDate: { lt: oneDayAgo },
        streakDays: { gt: 0 },
      },
    },
    include: { parent: true, learningProfile: true },
    take: 50,
  });

  for (const child of children) {
    if (!child.parent.userId) continue;
    await createUserNotification({
      userId: child.parent.userId,
      type: NotificationType.LEARNING,
      title: `Keep ${child.displayName}'s streak alive! 🔥`,
      body: `${child.displayName} is on a ${child.learningProfile?.streakDays ?? 1}-day streak. Complete a quick 10-minute session today.`,
      url: `/parent/children/${child.id}/progress`,
    });
  }
}

export function applyKAnonymity(
  rows: { ageBand: string; value: number }[],
  minCohort = env.INSIGHTS_MIN_COHORT,
) {
  return rows.filter((r) => r.value >= minCohort);
}
