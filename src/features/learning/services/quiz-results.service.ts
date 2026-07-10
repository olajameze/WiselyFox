import { prisma } from "@/shared/lib/prisma";
import { createUserNotification } from "@/server/services/notification-delivery.service";

const PASS_SCORE = 60;

function makeCertificateCode(subjectSlug: string): string {
  const prefix = subjectSlug.replace(/[^a-z]/gi, "").slice(0, 4).toUpperCase() || "WF";
  const suffix = Date.now().toString(36).toUpperCase().slice(-6);
  return `WF-${prefix}-${suffix}`;
}

export async function recordQuizAttempt(input: {
  childId: string;
  subjectSlug: string;
  subjectTitle: string;
  score: number;
  correct: number;
  total: number;
}) {
  const passed = input.score >= PASS_SCORE;
  const attempt = await prisma.quizAttempt.create({
    data: {
      childId: input.childId,
      subjectSlug: input.subjectSlug,
      subjectTitle: input.subjectTitle,
      score: input.score,
      correct: input.correct,
      total: input.total,
      passed,
      certificateCode: passed ? makeCertificateCode(input.subjectSlug) : null,
    },
  });
  return attempt;
}

export async function notifyParentQuizCompleted(
  childId: string,
  input: {
    subjectSlug: string;
    subjectTitle: string;
    score: number;
    passed: boolean;
    certificateCode: string | null;
    attemptId: string;
  },
) {
  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    include: { parent: true },
  });
  if (!child?.parent.userId) return;

  const title = input.passed
    ? `${child.displayName} passed the ${input.subjectTitle} quiz!`
    : `${child.displayName} finished the ${input.subjectTitle} quiz`;

  const body = input.passed
    ? `Score: ${input.score}%, certificate ready to view and print.`
    : `Score: ${input.score}%, review results and try a printable worksheet together.`;

  const url = input.passed
    ? `/parent/children/${childId}/certificates/${input.attemptId}`
    : `/parent/children/${childId}/results`;

  await createUserNotification({
    userId: child.parent.userId,
    type: "LEARNING",
    title,
    body,
    url,
  });
}

export async function maybeRecordSubjectCompletion(childId: string, subjectSlug: string) {
  const [subject, completedCount, existing] = await Promise.all([
    prisma.subject.findUnique({
      where: { slug: subjectSlug },
      include: { lessons: { where: { published: true }, select: { id: true } } },
    }),
    prisma.lessonCompletion.count({ where: { childId, subjectSlug } }),
    prisma.subjectCompletion.findUnique({
      where: { childId_subjectSlug: { childId, subjectSlug } },
    }),
  ]);

  if (!subject || existing) return null;
  if (subject.lessons.length === 0 || completedCount < subject.lessons.length) return null;

  const record = await prisma.subjectCompletion.create({
    data: {
      childId,
      subjectSlug,
      subjectTitle: subject.title,
    },
  });

  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    include: { parent: true },
  });
  if (child?.parent.userId) {
    await createUserNotification({
      userId: child.parent.userId,
      type: "LEARNING",
      title: `${child.displayName} completed ${subject.title}!`,
      body: `All ${subject.lessons.length} lessons finished in this subject, view results and print a summary.`,
      url: `/parent/children/${childId}/results`,
    });
  }

  return record;
}

export async function getChildQuizAttempts(childId: string) {
  return prisma.quizAttempt.findMany({
    where: { childId },
    orderBy: { completedAt: "desc" },
  });
}

export async function getChildSubjectCompletions(childId: string) {
  return prisma.subjectCompletion.findMany({
    where: { childId },
    orderBy: { completedAt: "desc" },
  });
}

export async function getQuizAttemptForParent(attemptId: string, parentUserId: string) {
  return prisma.quizAttempt.findFirst({
    where: {
      id: attemptId,
      child: { parent: { userId: parentUserId } },
    },
    include: { child: true },
  });
}

export { PASS_SCORE };
