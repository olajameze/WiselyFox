import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import {
  getChildAssessmentHistory,
  getLatestChildAssessment,
  formatAssessmentDomain,
} from "@/features/assessment/services/assessment-history.service";
import { Card, Button, Badge, Alert } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function AssessmentHubPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId } = await params;
  await assertHouseholdAccess(childId, user.id);

  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    select: { displayName: true },
  });
  if (!child) notFound();

  const [latest, history] = await Promise.all([
    getLatestChildAssessment(childId),
    getChildAssessmentHistory(childId),
  ]);

  return (
    <div className={styles.dashboard}>
      <Link href="/parent">
        <Button variant="ghost" size="sm">
          ← Dashboard
        </Button>
      </Link>

      <header className={styles.pageHeader}>
        <h1>Entrance assessment — {child.displayName}</h1>
        <p className={styles.pageSubtitle}>
          A short 5-question baseline across reading, maths, logic, memory, and attention. Results set
          your child&apos;s starting level for adaptive picks.
        </p>
      </header>

      {!latest ? (
        <Alert variant="info" title="No assessment yet">
          Run the entrance assessment to unlock personalised lesson recommendations on the learn home.
        </Alert>
      ) : (
        <Card header={<h2>Latest result</h2>}>
          <div className={styles.assessmentSummary}>
            <div>
              <Badge variant="success">{latest.levelResult}</Badge>
              <p className={styles.meta}>
                Score {latest.score.toFixed(0)}% · Completed{" "}
                {latest.completedAt.toLocaleString("en-GB")}
              </p>
            </div>
            <Link href={`/parent/children/${childId}/results`}>
              <Button variant="secondary" size="sm">
                Full results
              </Button>
            </Link>
          </div>
          <div className={styles.domainGrid}>
            {latest.domainScores.map((d) => (
              <div key={d.domain} className={styles.domainCard}>
                <strong>{formatAssessmentDomain(d.domain)}</strong>
                <span>
                  {d.correct}/{d.total} correct
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className={styles.actionRow}>
        <Link href={`/parent/assessment/${childId}/run`}>
          <Button>{latest ? "Retake assessment" : "Run assessment"}</Button>
        </Link>
      </div>

      {history.length > 0 && (
        <Card header={<h2>Assessment history</h2>} className={styles.mtLg}>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Level</th>
                  <th>Score</th>
                  <th>Domains</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr key={row.id}>
                    <td>{row.completedAt.toLocaleDateString("en-GB")}</td>
                    <td>{row.levelResult}</td>
                    <td>{row.score.toFixed(0)}%</td>
                    <td>
                      {row.domainScores
                        .map((d) => `${formatAssessmentDomain(d.domain)} ${d.correct}/${d.total}`)
                        .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
