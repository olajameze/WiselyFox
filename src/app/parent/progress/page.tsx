import { redirect } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import {
  getParentProfile,
  getWeeklyStudyMinutes,
  getSubjectMastery,
} from "@/features/parent/services/parent-dashboard.service";
import { getAdaptiveRecommendations } from "@/features/learning/services/learning-path.service";
import { ProgressChart } from "@/features/parent/ui/ProgressChart";
import { MasteryChart } from "@/features/parent/ui/MasteryChart";
import { Card, ProgressBar, Badge } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ParentProgressPage() {
  const user = await requireParentOwner();
  const parent = await getParentProfile(user.id);
  if (!parent) redirect("/sign-up");
  if (!parent.onboardingDone) redirect("/parent/onboarding");

  const childIds = parent.children.map((c) => c.id);
  const [weeklyData, masteryData, ...recommendationsByChild] = await Promise.all([
    getWeeklyStudyMinutes(childIds),
    getSubjectMastery(childIds),
    ...parent.children.map((c) => getAdaptiveRecommendations(c.id, 2)),
  ]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Progress</h1>
        <p className={styles.pageSubtitle}>
          Weekly study time and subject mastery across your household.
        </p>
      </header>

      <div className={styles.grid}>
        <Card header={<h2>Weekly study minutes</h2>}>
          <ProgressChart data={weeklyData} />
        </Card>
        <Card header={<h2>Subject mastery</h2>}>
          <MasteryChart data={masteryData} />
        </Card>
      </div>

      <section className={styles.section}>
        <h2>Per child breakdown</h2>
        <div className={styles.childList}>
          {parent.children.map((child, index) => (
            <Card key={child.id}>
              <div className={styles.childCardHeader}>
                <h3>{child.displayName}</h3>
                <Badge>{child.learningProfile?.streakDays ?? 0} day streak</Badge>
              </div>
              <ProgressBar
                value={child.learningProfile?.levelScore ?? 0}
                label="Overall level"
                calm={child.learningProfile?.calmColors}
              />
              {recommendationsByChild[index]?.length > 0 && (
                <div className={styles.mtLg}>
                  <p className={styles.meta}>Adaptive picks (from assessment + mastery)</p>
                  <ul>
                    {recommendationsByChild[index].map((rec) => (
                      <li key={rec.href} className={styles.meta}>
                        {rec.lessonTitle}, {rec.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {child.masteryRecords.length > 0 ? (
                <ul className={styles.mtLg}>
                  {child.masteryRecords.map((record) => (
                    <li key={record.id} className={styles.meta}>
                      {record.skillSlug}: {Math.round(record.masteryScore)}% mastery , {" "}
                      {record.attempts} attempts
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={`${styles.meta} ${styles.mtLg}`}>
                  No mastery records yet, complete a lesson or quiz to start tracking.
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
