import { prisma } from "@/shared/lib/prisma";

export async function getParentProfile(userId: string) {
  return prisma.parentProfile.findUnique({
    where: { userId },
    include: {
      children: {
        include: {
          learningProfile: true,
          masteryRecords: true,
          studySessions: { orderBy: { startedAt: "desc" }, take: 14 },
        },
      },
      subscription: true,
    },
  });
}

export async function getWeeklyStudyMinutes(childIds: string[]) {
  const since = new Date();
  since.setDate(since.getDate() - 7);

  const sessions = await prisma.studySession.findMany({
    where: { childId: { in: childIds }, startedAt: { gte: since }, completed: true },
    select: { durationMinutes: true, startedAt: true, childId: true },
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totals = days.map((day) => ({ day, minutes: 0 }));

  for (const session of sessions) {
    const dayIndex = session.startedAt.getDay();
    totals[dayIndex]!.minutes += session.durationMinutes;
  }

  return totals;
}

export async function getSubjectMastery(childIds: string[]) {
  const records = await prisma.masteryRecord.findMany({
    where: { childId: { in: childIds } },
  });

  const bySubject = new Map<string, { total: number; count: number }>();
  for (const record of records) {
    const subject = record.skillSlug.split(":")[0] ?? record.skillSlug;
    const current = bySubject.get(subject) ?? { total: 0, count: 0 };
    current.total += record.masteryScore;
    current.count += 1;
    bySubject.set(subject, current);
  }

  return Array.from(bySubject.entries()).map(([subject, { total, count }]) => ({
    subject: subject.charAt(0).toUpperCase() + subject.slice(1),
    mastery: Math.round(total / count),
  }));
}

export async function getParentNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function getRecentActivity(childIds: string[]) {
  const [sessions, rewards] = await Promise.all([
    prisma.studySession.findMany({
      where: { childId: { in: childIds } },
      include: { child: { select: { displayName: true } } },
      orderBy: { startedAt: "desc" },
      take: 8,
    }),
    prisma.reward.findMany({
      where: { childId: { in: childIds } },
      include: { child: { select: { displayName: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const activity = [
    ...sessions.map((s) => ({
      id: s.id,
      type: "session" as const,
      title: s.focusMode ? "Focus session" : "Study session",
      child: s.child.displayName,
      minutes: s.durationMinutes,
      at: s.startedAt,
    })),
    ...rewards.map((r) => ({
      id: r.id,
      type: "reward" as const,
      title: r.title,
      child: r.child.displayName,
      minutes: 0,
      at: r.createdAt,
    })),
  ];

  return activity.sort((a, b) => b.at.getTime() - a.at.getTime()).slice(0, 10);
}
