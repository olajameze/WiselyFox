import { getPrismaClient } from "@/shared/lib/prisma";

export async function getSubjectCompletionCount(childId: string, subjectSlug: string) {
  const prisma = getPrismaClient();
  if (!prisma.lessonCompletion?.count) return 0;
  return prisma.lessonCompletion.count({
    where: { childId, subjectSlug },
  });
}

export async function getCompletedLessonSlugs(childId: string, subjectSlug: string) {
  const prisma = getPrismaClient();
  if (!prisma.lessonCompletion?.findMany) return [];
  const rows = await prisma.lessonCompletion.findMany({
    where: { childId, subjectSlug },
    select: { lessonSlug: true },
  });
  return rows.map((r) => r.lessonSlug);
}

export async function isLessonCompleted(
  childId: string,
  subjectSlug: string,
  lessonSlug: string,
): Promise<boolean> {
  const prisma = getPrismaClient();
  if (!prisma.lessonCompletion?.findUnique) return false;
  const row = await prisma.lessonCompletion.findUnique({
    where: {
      childId_subjectSlug_lessonSlug: { childId, subjectSlug, lessonSlug },
    },
    select: { id: true },
  });
  return Boolean(row);
}

export async function recordLessonCompletion(
  childId: string,
  subjectSlug: string,
  lessonSlug: string,
) {
  const prisma = getPrismaClient();
  if (!prisma.lessonCompletion?.upsert) return;
  await prisma.lessonCompletion.upsert({
    where: {
      childId_subjectSlug_lessonSlug: { childId, subjectSlug, lessonSlug },
    },
    update: { completedAt: new Date() },
    create: { childId, subjectSlug, lessonSlug },
  });
}
