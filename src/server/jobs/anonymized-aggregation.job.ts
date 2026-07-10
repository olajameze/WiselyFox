import { prisma } from "@/shared/lib/prisma";
import { env } from "@/shared/lib/env";
import { applyKAnonymity } from "@/server/services/trial-reminder.service";

export async function runAnonymizedAggregation() {
  const ageBands = ["5-7", "8-10", "11-13", "14-16"];
  const periodEnd = new Date();
  const periodStart = new Date();
  periodStart.setDate(periodStart.getDate() - 30);

  const rows = await Promise.all(
    ageBands.map(async (band) => {
      const count = await prisma.childProfile.count({ where: { ageBand: band } });
      return { ageBand: band, value: count };
    }),
  );

  const filtered = applyKAnonymity(rows, env.INSIGHTS_MIN_COHORT);

  if (filtered.length > 0) {
    await prisma.aggregatedInsight.create({
      data: {
        reportType: "learner_distribution",
        data: JSON.stringify(filtered),
        cohortSize: filtered.reduce((s, r) => s + r.value, 0),
        periodStart,
        periodEnd,
      },
    });
  }
}
