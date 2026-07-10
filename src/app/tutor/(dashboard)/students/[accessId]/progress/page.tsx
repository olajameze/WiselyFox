import { requireTutorProfile } from "@/shared/lib/permissions";
import { getTutorLearnerProgress } from "@/features/tutors/services/tutor-progress.service";
import { Card, Badge } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

type Props = {
  params: Promise<{ accessId: string }>;
};

export default async function TutorStudentProgressPage({ params }: Props) {
  const { accessId } = await params;
  const { user } = await requireTutorProfile();
  const progress = await getTutorLearnerProgress(user.id, accessId);

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>{progress.learnerAlias}</h1>
        <p className={styles.pageSubtitle}>
          Age band {progress.ageBand} · Level {progress.levelLabel} · {progress.lessonsCompletedCount} lessons completed
        </p>
      </header>

      <div className={styles.grid}>
        <Card header={<h2>Strengths</h2>}>
          <div className={styles.strengthList}>
            {progress.strengths.length === 0 ? (
              <span className={styles.meta}>Building foundations</span>
            ) : (
              progress.strengths.map((s) => (
                <span key={s} className={`${styles.chip} ${styles.chipStrong}`}>
                  {s}
                </span>
              ))
            )}
          </div>
        </Card>
        <Card header={<h2>Needs improvement</h2>}>
          <div className={styles.weakList}>
            {progress.needsImprovement.length === 0 ? (
              <span className={styles.meta}>No weak areas flagged</span>
            ) : (
              progress.needsImprovement.map((s) => (
                <span key={s} className={`${styles.chip} ${styles.chipWeak}`}>
                  {s}
                </span>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card header={<h2>Subject mastery</h2>} className={styles.mtLg}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Mastery</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {progress.subjectMastery.map((s) => (
              <tr key={s.subject}>
                <td>{s.subject}</td>
                <td>{s.mastery}%</td>
                <td>
                  <Badge>{s.trend}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card header={<h2>Quiz results</h2>} className={styles.mtLg}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Passed</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {progress.quizHistory.map((q, i) => (
              <tr key={`${q.subjectTitle}-${i}`}>
                <td>{q.subjectTitle}</td>
                <td>{q.score}%</td>
                <td>{q.passed ? "Yes" : "No"}</td>
                <td>{new Date(q.completedAt).toLocaleDateString("en-GB")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card header={<h2>Completed subjects</h2>} className={styles.mtLg}>
        <ul>
          {progress.subjectsCompleted.map((s) => (
            <li key={s.subjectTitle}>
              {s.subjectTitle} — {new Date(s.completedAt).toLocaleDateString("en-GB")}
            </li>
          ))}
        </ul>
      </Card>

      <Card header={<h2>Recommendations</h2>} className={styles.mtLg}>
        <ul>
          {progress.recommendations.map((r) => (
            <li key={r.lessonTitle}>
              <strong>{r.lessonTitle}</strong> — {r.reason}
            </li>
          ))}
        </ul>
      </Card>

      <p className={styles.meta}>
        Weekly study: {progress.weeklyStudyMinutes} minutes · Level score: {progress.levelScore}
      </p>
    </div>
  );
}
