import Link from "next/link";
import { notFound } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { getSubjectCompletionCount, isLessonCompleted } from "@/features/learning/services/lesson-progress.service";
import { isLessonUnlocked } from "@/features/learning/services/lesson-unlock.service";
import { ageBandProximity } from "@/data/age-bands";
import { buildLearnAccommodation, toAccommodationUiProps } from "@/features/inclusive/lib/accommodation-client";
import { parseLessonContent } from "@/features/learning/services/lesson-content.service";
import { LessonPlayer } from "@/features/learning/ui/LessonPlayer";
import { Button, Badge } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function LearnLessonPage({
  params,
}: {
  params: Promise<{ subjectSlug: string; lessonSlug: string }>;
}) {
  const user = await requireChild();
  const { subjectSlug, lessonSlug } = await params;
  const child = await getLearnChildByUserId(user.id);
  if (!child) notFound();

  if (!child?.learningProfile) notFound();
  const ui = toAccommodationUiProps(buildLearnAccommodation(child.learningProfile));

  const [lesson, completedCount, subjectLessons, alreadyCompleted] = await Promise.all([
    prisma.lesson.findFirst({
      where: { slug: lessonSlug, subject: { slug: subjectSlug }, published: true },
      include: { subject: true },
    }),
    getSubjectCompletionCount(child.id, subjectSlug),
    prisma.lesson.findMany({
      where: { subject: { slug: subjectSlug }, published: true },
      orderBy: { difficulty: "asc" },
      select: { slug: true },
    }),
    isLessonCompleted(child.id, subjectSlug, lessonSlug),
  ]);
  if (!lesson) notFound();

  const lessonIndex = subjectLessons.findIndex((l) => l.slug === lessonSlug);
  if (!isLessonUnlocked(lessonSlug, subjectSlug, lessonIndex, completedCount)) {
    notFound();
  }

  if (ageBandProximity(child.ageBand, lesson.ageBand) > 2) {
    notFound();
  }

  const { steps } = parseLessonContent(lesson.content);

  return (
    <>
      <Link href={`/learn/subjects/${subjectSlug}`}>
        <Button variant="ghost" size="sm">
          ← {lesson.subject.title}
        </Button>
      </Link>
      {alreadyCompleted ? (
        <p className={styles.meta}>
          <Badge variant="success">Completed</Badge> You finished this lesson before, replay anytime to
          practise again.
        </p>
      ) : (
        <p className={styles.meta}>
          <Badge variant="warning">Incomplete</Badge> Work through every step to mark this lesson complete.
        </p>
      )}
      <LessonPlayer
        subjectSlug={subjectSlug}
        lessonSlug={lessonSlug}
        title={lesson.title}
        durationMinutes={lesson.durationMinutes}
        steps={steps}
        calm={ui.calm}
        alreadyCompleted={alreadyCompleted}
        chunkSize={ui.chunkSize}
        showTimer={ui.showTimer}
        celebrationIntensity={ui.celebrationIntensity}
      />
    </>
  );
}
