import Link from "next/link";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { getChildQuizAttempts, getChildSubjectCompletions } from "@/features/learning/services/quiz-results.service";
import { Button, Badge, Card } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ChildCertificatesPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId } = await params;
  const child = await assertHouseholdAccess(childId, user.id);
  const [attempts, subjects] = await Promise.all([
    getChildQuizAttempts(childId),
    getChildSubjectCompletions(childId),
  ]);

  const all = [
    ...attempts
      .filter((a) => a.passed && a.certificateCode)
      .map((a) => ({
        id: a.id,
        type: "quiz" as const,
        title: a.subjectTitle,
        detail: `${a.score}%`,
        date: a.completedAt,
        code: a.certificateCode!,
      })),
    ...subjects
      .filter((s) => s.certificateCode)
      .map((s) => ({
        id: s.id,
        type: "subject" as const,
        title: s.subjectTitle,
        detail: "Subject complete",
        date: s.completedAt,
        code: s.certificateCode!,
      })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className={styles.dashboard}>
      <Link href={`/parent/children/${childId}/results`}>
        <Button variant="ghost" size="sm">
          ← Results
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>{child.displayName}&apos;s certificates</h1>
        <p className={styles.pageSubtitle}>
          Quiz passes (60%+) and full subject completions. Each certificate has a unique verification code.
        </p>
      </header>

      {all.length === 0 ? (
        <Card>
          <p className={styles.meta}>
            No certificates yet. Pass a quiz or complete every lesson in a subject to earn one.
          </p>
        </Card>
      ) : (
        <div className={styles.questList}>
          {all.map((c) => (
            <Card key={`${c.type}-${c.id}`}>
              <div className={styles.childCardHeader}>
                <strong>{c.title}</strong>
                <Badge variant="success">{c.detail}</Badge>
              </div>
              <p className={styles.meta}>
                {c.type === "quiz" ? "Quiz certificate" : "Subject completion"} ·{" "}
                {c.date.toLocaleDateString("en-GB")} · Code {c.code}
              </p>
              <Link href={`/parent/children/${childId}/certificates/${c.id}`}>
                <Button size="sm">View & print certificate</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
