import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { ALL_CURRICULUM_SUBJECTS } from "@/data/curriculum";
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

  const child = await getLearnChildByUserId(user.id);
  if (!child) redirect("/child-sign-in");

  // Use curriculum data for questions (not limited to DB-seeded subjects)
  const subject = ALL_CURRICULUM_SUBJECTS.find((s) => s.slug === subjectSlug);
  if (!subject) notFound();

  const pool = subject.questions.map((q) => ({
    id: q.prompt,
    prompt: q.prompt,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    difficulty: q.difficulty,
    ageBand: q.ageBand,
  }));

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

