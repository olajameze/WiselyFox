import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { getChildResultsSummary } from "@/features/parent/services/printable-content.service";
import { PrintButton } from "@/features/parent/ui/PrintButton";
import { Card, Button, Badge } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";
import printStyles from "@/features/parent/ui/print.module.css";

export default async function ChildResultsPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId } = await params;
  await assertHouseholdAccess(childId, user.id);

  const { child, quizAttempts, subjectCompletions, lessonCompletions } =
    await getChildResultsSummary(childId);
  if (!child) notFound();

  return (
    <div className={printStyles.printRoot}>
      <div className={`${styles.dashboard} ${printStyles.screenOnly}`}>
        <Link href="/parent/children">
          <Button variant="ghost" size="sm">
            ← Children
          </Button>
        </Link>
      </div>

      <header className={printStyles.printHeader}>
        <h1>{child.displayName}&apos;s learning results</h1>
        <p className={printStyles.printMeta}>
          Generated {new Date().toLocaleString("en-GB")}, {child.learningProfile?.xp ?? 0} XP
        </p>
        <div className={`${styles.childActions} ${printStyles.screenOnly}`}>
          <PrintButton label="Print results" />
          <Link href={`/parent/children/${childId}/worksheets`}>
            <Button variant="secondary" size="sm">
              Printable worksheets
            </Button>
          </Link>
          <Link href={`/parent/children/${childId}/certificates`}>
            <Button variant="secondary" size="sm">
              Certificates
            </Button>
          </Link>
        </div>
      </header>

      <section className={printStyles.printSection}>
        <h2>Quiz & test scores</h2>
        {quizAttempts.length === 0 ? (
          <p className={styles.meta}>No quizzes completed yet.</p>
        ) : (
          <table className={printStyles.printTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {quizAttempts.map((a) => (
                <tr key={a.id}>
                  <td>{a.completedAt.toLocaleDateString("en-GB")}</td>
                  <td>{a.subjectTitle}</td>
                  <td>
                    {a.score}% ({a.correct}/{a.total})
                  </td>
                  <td>
                    {a.passed ? (
                      <>
                        <Badge variant="success">Passed</Badge>{" "}
                        {a.certificateCode && (
                          <Link href={`/parent/children/${childId}/certificates/${a.id}`}>
                            Certificate
                          </Link>
                        )}
                      </>
                    ) : (
                      <Badge>Practice</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className={printStyles.printSection}>
        <h2>Subjects completed</h2>
        {subjectCompletions.length === 0 ? (
          <p className={styles.meta}>No full subjects completed yet.</p>
        ) : (
          <ul>
            {subjectCompletions.map((s) => (
              <li key={s.id}>
                {s.subjectTitle}, {s.completedAt.toLocaleDateString("en-GB")}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={printStyles.printSection}>
        <h2>Recent lessons</h2>
        {lessonCompletions.length === 0 ? (
          <p className={styles.meta}>No lessons completed yet.</p>
        ) : (
          <table className={printStyles.printTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Lesson</th>
              </tr>
            </thead>
            <tbody>
              {lessonCompletions.map((l) => (
                <tr key={l.id}>
                  <td>{l.completedAt.toLocaleDateString("en-GB")}</td>
                  <td>{l.subjectSlug}</td>
                  <td>{l.lessonSlug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
