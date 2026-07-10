import { prisma } from "@/shared/lib/prisma";
import { pickQuestions } from "@/features/learning/services/learning-engine.service";

export type PrintableQuestion = {
  number: number;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string | null;
};

export async function getWorksheetQuestions(
  subjectSlug: string,
  ageBand: string,
  limit = 12,
): Promise<{ subjectTitle: string; questions: PrintableQuestion[] }> {
  const subject = await prisma.subject.findUnique({
    where: { slug: subjectSlug },
    include: {
      skills: {
        include: {
          questions: { where: { published: true } },
        },
      },
    },
  });
  if (!subject) throw new Error("Subject not found");

  const pool = subject.skills.flatMap((skill) =>
    skill.questions.map((q) => ({
      id: q.id,
      prompt: q.prompt,
      options: JSON.parse(q.options) as string[],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty,
      ageBand: q.ageBand,
    })),
  );

  const picked = pickQuestions(pool, 2, ageBand, Math.min(limit, pool.length));

  return {
    subjectTitle: subject.title,
    questions: picked.map((q, i) => ({
      number: i + 1,
      prompt: q.prompt,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
    })),
  };
}

export async function getChildResultsSummary(childId: string) {
  const [child, quizAttempts, subjectCompletions, lessonCompletions] = await Promise.all([
    prisma.childProfile.findUnique({
      where: { id: childId },
      include: { learningProfile: true },
    }),
    prisma.quizAttempt.findMany({
      where: { childId },
      orderBy: { completedAt: "desc" },
    }),
    prisma.subjectCompletion.findMany({
      where: { childId },
      orderBy: { completedAt: "desc" },
    }),
    prisma.lessonCompletion.findMany({
      where: { childId },
      orderBy: { completedAt: "desc" },
      take: 50,
    }),
  ]);

  return { child, quizAttempts, subjectCompletions, lessonCompletions };
}
