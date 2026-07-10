import { prisma } from "@/shared/lib/prisma";
import { env } from "@/shared/lib/env";
import { sendTrialReminderEmail } from "@/server/services/email.service";
import { createUserNotification } from "@/server/services/notification-delivery.service";
import { NotificationType } from "@prisma/client";

const REMINDER_DAYS = [7, 3, 1, 0];

export async function processTrialReminders() {
  const now = new Date();
  const trialing = await prisma.subscription.findMany({
    where: { status: "TRIALING", trialEndsAt: { not: null } },
    include: { parent: { include: { user: true } } },
  });

  for (const sub of trialing) {
    if (!sub.trialEndsAt || !sub.parent.user.email) continue;

    const sent: number[] = JSON.parse(sub.trialRemindersSent || "[]");
    const msLeft = sub.trialEndsAt.getTime() - now.getTime();
    const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

    for (const day of REMINDER_DAYS) {
      if (daysLeft === day && !sent.includes(day)) {
        await sendTrialReminderEmail(
          sub.parent.user.email,
          day,
          sub.trialEndsAt.toLocaleDateString("en-GB"),
        );
        await createUserNotification({
          userId: sub.parent.userId,
          type: NotificationType.TRIAL_REMINDER,
          title: day === 0 ? "Trial ends today" : `Trial ends in ${day} days`,
          body: `Your WiselyFox trial ends on ${sub.trialEndsAt.toLocaleDateString("en-GB")}.`,
          url: "/parent/settings",
        });
        sent.push(day);
      }
    }

    await prisma.subscription.update({
      where: { id: sub.id },
      data: { trialRemindersSent: JSON.stringify(sent) },
    });
  }
}

export function applyKAnonymity(
  rows: { ageBand: string; value: number }[],
  minCohort = env.INSIGHTS_MIN_COHORT,
) {
  return rows.filter((r) => r.value >= minCohort);
}
