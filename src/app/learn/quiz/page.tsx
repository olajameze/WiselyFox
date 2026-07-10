import Link from "next/link";
import { redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import {
  parseSubjectAgeBands,
  subjectMatchesChildAge,
  ageBandLabel,
  filterContentForAge,
} from "@/features/learning/services/age-content.service";
import { Card, Button, Alert } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function QuizPickerPage() {
  const user = await requireChild();
  const child = await getLearnChildByUserId(user.id);
  if (!child) redirect("/child-sign-in");

  const subjects = await prisma.subject.findMany({
    where: { published: true },
    include: {
      skills: {
        include: {
          questions: { where: { published: true }, select: { ageBand: true } },
        },
      },
    },
    orderBy: { title: "asc" },
  });

  const visible = subjects.filter((s) =>
    subjectMatchesChildAge(parseSubjectAgeBands(s.ageBands), child.ageBand),
  );

  return (
    <>
      <header className={styles.pageHeader}>
        <h1>Quizzes</h1>
        <p className={styles.pageSubtitle}>
          Age matched questions for {ageBandLabel(child.ageBand)}, scores update mastery on the parent dashboard.
        </p>
      </header>

      <Alert variant="info" title="Age matched quizzes">
        Each quiz picks questions closest to your age band and level.
      </Alert>

      <div className={styles.childList}>
        {visible.map((subject) => {
          const pool = subject.skills.flatMap((s) => s.questions);
          const ageQuestions = filterContentForAge(pool, child.ageBand);
          return (
            <Card key={subject.id} className={styles.childCard}>
              <h2>{subject.title}</h2>
              <p className={styles.meta}>
                {ageQuestions.length} questions for your age
              </p>
              <Link href={`/learn/quiz/${subject.slug}`}>
                <Button size="sm">Start quiz</Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </>
  );
}
