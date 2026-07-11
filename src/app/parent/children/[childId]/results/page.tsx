import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { getChildResultsSummary } from "@/features/parent/services/printable-content.service";
import { StickerCollection } from "@/features/gamification/ui/StickerCollection";
import { WeeklyQuestPanel } from "@/features/gamification/ui/WeeklyQuestPanel";
import { formatAssessmentDomain } from "@/features/assessment/services/assessment-history.service";
import { PrintButton } from "@/features/parent/ui/PrintButton";
import { Card, Button, Badge, ProgressBar } from "@/shared/ui";
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

  const {
    child,
    quizAttempts,
    subjectCompletions,
    lessonCompletions,
    assessments,
    rewards,
    studySessions,
    quests,
    stickers,
    totalStudyMinutes,
  } = await getChildResultsSummary(childId);
  if (!child) notFound();

  const profile = child.learningProfile;
  const pendingRewards = rewards.filter((r) => !r.approved);
  const approvedRewards = rewards.filter((r) => r.approved && !r.claimed);
  const claimedRewards = rewards.filter((r) => r.claimed);

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
          Generated {new Date().toLocaleString("en-GB")}
        </p>
        <div className={`${styles.childActions} ${printStyles.screenOnly}`}>
          <PrintButton label="Print results" />
          <Link href={`/parent/assessment/${childId}`}>
            <Button variant="secondary" size="sm">
              Assessment
            </Button>
          </Link>
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
          <Link href="/parent/rewards">
            <Button variant="secondary" size="sm">
              Manage rewards
            </Button>
          </Link>
        </div>
      </header>

      <section className={printStyles.printSection}>
        <h2>Progress overview</h2>
        <div className={styles.statsGrid}>
          <Card>
            <strong>{profile?.xp ?? 0} XP</strong>
            <p className={styles.meta}>Total experience</p>
          </Card>
          <Card>
            <strong>{profile?.coins ?? 0}</strong>
            <p className={styles.meta}>Coins earned</p>
          </Card>
          <Card>
            <strong>{profile?.streakDays ?? 0} days</strong>
            <p className={styles.meta}>Current streak</p>
          </Card>
          <Card>
            <strong>{totalStudyMinutes} min</strong>
            <p className={styles.meta}>Recent study time</p>
          </Card>
        </div>
        {profile && (
          <div className={styles.mtLg}>
            <ProgressBar value={profile.xp % 100} label="Level progress" />
          </div>
        )}
      </section>

      <section className={printStyles.printSection}>
        <h2>Entrance assessments</h2>
        {assessments.length === 0 ? (
          <p className={styles.meta}>
            No assessments yet.{" "}
            <Link href={`/parent/assessment/${childId}`}>Run the entrance assessment</Link>.
          </p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={printStyles.printTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Level</th>
                  <th>Score</th>
                  <th>Domains</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.completedAt.toLocaleDateString("en-GB")}</td>
                    <td>{a.levelResult}</td>
                    <td>{a.score.toFixed(0)}%</td>
                    <td>
                      {a.domainScores
                        .map((d) => `${formatAssessmentDomain(d.domain)} ${d.correct}/${d.total}`)
                        .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className={printStyles.printSection}>
        <h2>Rewards</h2>
        {rewards.length === 0 ? (
          <p className={styles.meta}>No rewards earned yet. Milestones unlock as your child gains XP.</p>
        ) : (
          <>
            {pendingRewards.length > 0 && (
              <p className={styles.meta}>
                {pendingRewards.length} waiting for your approval on{" "}
                <Link href="/parent/rewards">Rewards</Link>.
              </p>
            )}
            {approvedRewards.length > 0 && (
              <p className={styles.meta}>
                {approvedRewards.length} approved and ready for your child to claim.
              </p>
            )}
            <div className={styles.tableWrap}>
              <table className={printStyles.printTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Reward</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.map((r) => (
                    <tr key={r.id}>
                      <td>{r.createdAt.toLocaleDateString("en-GB")}</td>
                      <td>
                        {r.title}
                        {r.description && (
                          <span className={styles.meta}> — {r.description}</span>
                        )}
                      </td>
                      <td>
                        {!r.approved ? (
                          <Badge>Pending approval</Badge>
                        ) : r.claimed ? (
                          <Badge variant="success">Claimed</Badge>
                        ) : (
                          <Badge variant="warning">Ready to claim</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {claimedRewards.length > 0 && (
              <p className={styles.meta}>{claimedRewards.length} rewards claimed so far.</p>
            )}
          </>
        )}
      </section>

      <section className={printStyles.printSection}>
        <h2>Weekly quests & stickers</h2>
        {quests.length === 0 ? (
          <p className={styles.meta}>Quests appear as your child learns this week.</p>
        ) : (
          <>
            <WeeklyQuestPanel
              quests={quests}
              questsCompleted={quests.filter((q) => q.completed).length}
              questsTotal={quests.length}
            />
            {stickers.length > 0 && (
              <div className={styles.mtLg}>
                <h3>Sticker collection</h3>
                <StickerCollection stickers={stickers} />
              </div>
            )}
          </>
        )}
      </section>

      <section className={printStyles.printSection}>
        <h2>Quiz & test scores</h2>
        {quizAttempts.length === 0 ? (
          <p className={styles.meta}>No quizzes completed yet.</p>
        ) : (
          <div className={styles.tableWrap}>
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
          </div>
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
          <div className={styles.tableWrap}>
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
          </div>
        )}
      </section>

      <section className={printStyles.printSection}>
        <h2>Recent study sessions</h2>
        {studySessions.length === 0 ? (
          <p className={styles.meta}>No study sessions recorded yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={printStyles.printTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {studySessions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.startedAt.toLocaleDateString("en-GB")}</td>
                    <td>{s.durationMinutes} min</td>
                    <td>{s.focusMode ? "Focus" : "Lesson/quiz"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
