import Link from "next/link";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { getChildQuizAttempts } from "@/features/learning/services/quiz-results.service";
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
  const attempts = await getChildQuizAttempts(childId);
  const passed = attempts.filter((a) => a.passed && a.certificateCode);

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
          Earned when your child passes a subject quiz (60% or higher).
        </p>
      </header>

      {passed.length === 0 ? (
        <Card>
          <p className={styles.meta}>No certificates yet, complete and pass a subject quiz to earn one.</p>
        </Card>
      ) : (
        <div className={styles.questList}>
          {passed.map((a) => (
            <Card key={a.id}>
              <div className={styles.childCardHeader}>
                <strong>{a.subjectTitle}</strong>
                <Badge variant="success">{a.score}%</Badge>
              </div>
              <p className={styles.meta}>
                {a.completedAt.toLocaleDateString("en-GB")}, Code {a.certificateCode}
              </p>
              <Link href={`/parent/children/${childId}/certificates/${a.id}`}>
                <Button size="sm">View & print certificate</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
