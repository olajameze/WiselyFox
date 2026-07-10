import { prisma } from "@/shared/lib/prisma";

export async function generateDailyObjectives(childId: string, ageBand: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.dailyObjective.findMany({
    where: { childId, date: today },
  });
  if (existing.length > 0) return existing;

  const templates = [
    { title: "Complete one reading activity", subject: "reading" },
    { title: "Practice maths for 10 minutes", subject: "maths" },
    { title: "Finish a study skills mini-lesson", subject: "study-skills" },
  ];

  const objectives = await Promise.all(
    templates.slice(0, 2).map((t) =>
      prisma.dailyObjective.create({
        data: { childId, title: t.title, subject: t.subject, date: today },
      }),
    ),
  );

  return objectives;
}
