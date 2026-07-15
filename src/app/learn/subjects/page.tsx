import { prisma } from "@/shared/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { getPublishedSubjects } from "@/features/learning/services/curriculum-cache.service";
import {
  parseSubjectAgeBands,
  subjectMatchesChildAge,
  ageBandLabel,
  filterContentForAge,
} from "@/features/learning/services/age-content.service";
import { Card, Button, Badge, Alert } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function LearnSubjectsPage() {
  const user = await requireChild();
  const child = await getLearnChildByUserId(user.id);
  if (!child) redirect("/child-sign-in");

  const allSubjects = await getPublishedSubjects();
  const subjects = allSubjects.filter((s) =>
    subjectMatchesChildAge(parseSubjectAgeBands(s.ageBands), child.ageBand),
  );

  const lessons =
    subjects.length === 0
      ? []
      : await prisma.lesson.findMany({
          where: {
            published: true,
            subjectId: { in: subjects.map((s) => s.id) },
          },
          select: { subjectId: true, ageBand: true },
        });

  const lessonsBySubject = new Map<string, { ageBand: string }[]>();
  for (const lesson of lessons) {
    const list = lessonsBySubject.get(lesson.subjectId) ?? [];
    list.push(lesson);
    lessonsBySubject.set(lesson.subjectId, list);
  }

  const lessonCounts = subjects.map(
    (subject) => filterContentForAge(lessonsBySubject.get(subject.id) ?? [], child.ageBand).length,
  );

  return (
    <>
      <header className={styles.pageHeader}>
        <h1>Subjects</h1>
        <p className={styles.pageSubtitle}>
          Lessons, study guides, and quizzes for {ageBandLabel(child.ageBand)}, read, watch, practise, and quiz.
        </p>
      </header>

      <Alert variant="info" title="Your age path">
        Subjects and lessons are matched to your age band. Older or younger content unlocks as you grow.
      </Alert>

      <div className={styles.childList}>
        {subjects.map((subject, i) => (
          <Card key={subject.id} className={styles.childCard}>
            <div className={styles.childCardHeader}>
              <div>
                <h2>{subject.title}</h2>
                <p className={styles.meta}>{subject.description}</p>
              </div>
              <Badge>{lessonCounts[i]} lessons for you</Badge>
            </div>
            <div className={styles.childActions}>
              <Link href={`/learn/subjects/${subject.slug}`}>
                <Button size="sm">Open</Button>
              </Link>
              <Link href={`/learn/guide/${subject.slug}`}>
                <Button variant="secondary" size="sm">
                  Study guide
                </Button>
              </Link>
              <Link href={`/learn/videos/${subject.slug}`}>
                <Button variant="secondary" size="sm">
                  Videos
                </Button>
              </Link>
              <Link href={`/learn/quiz/${subject.slug}`}>
                <Button variant="ghost" size="sm">
                  Quiz
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
