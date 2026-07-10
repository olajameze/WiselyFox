import Link from "next/link";
import { notFound } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { pickQuestions } from "@/features/learning/services/learning-engine.service";
import { buildLearnAccommodation, toAccommodationUiProps } from "@/features/inclusive/lib/accommodation-client";
import { QuizPlayer } from "@/features/learning/ui/QuizPlayer";
import { Button } from "@/shared/ui";

export default async function SubjectQuizPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const user = await requireChild();
  const { subjectSlug } = await params;

  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
    include: { learningProfile: true },
  });

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
  if (!subject) notFound();

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

  const ageBand = child?.ageBand ?? "8-10";
  const level = child?.learningProfile?.levelScore
    ? Math.max(1, Math.min(3, Math.round(child.learningProfile.levelScore / 35)))
    : 2;

  const questions = pickQuestions(pool, level, ageBand, Math.min(8, pool.length));

  if (questions.length === 0) notFound();

  const ui = child?.learningProfile
    ? toAccommodationUiProps(buildLearnAccommodation(child.learningProfile))
    : {
        chunkSize: "medium" as const,
        showTimer: true,
        celebrationIntensity: "medium" as const,
        breakEveryMinutes: null,
        hintDelaySeconds: 15,
        calm: false,
        soundEnabled: true,
      };

  return (
    <>
      <Link href={`/learn/subjects/${subjectSlug}`}>
        <Button variant="ghost" size="sm">
          ← {subject.title}
        </Button>
      </Link>
      <QuizPlayer
        subjectSlug={subjectSlug}
        subjectTitle={subject.title}
        questions={questions}
        calm={ui.calm}
        chunkSize={ui.chunkSize}
        showTimer={ui.showTimer}
        celebrationIntensity={ui.celebrationIntensity}
        hintDelaySeconds={ui.hintDelaySeconds}
      />
    </>
  );
}
