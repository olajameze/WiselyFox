import Link from "next/link";
import { redirect } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import {
  getParentProfile,
  getWeeklyStudyMinutes,
  getSubjectMastery,
  getRecentActivity,
  getParentNotifications,
} from "@/features/parent/services/parent-dashboard.service";
import { ProgressChart } from "@/features/parent/ui/ProgressChart";
import { MasteryChart } from "@/features/parent/ui/MasteryChart";
import { Card, Button, Badge, Alert, ProgressBar } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ParentDashboardPage() {
  const user = await requireParentOwner();
  const parent = await getParentProfile(user.id);

  if (!parent) redirect("/sign-up");
  if (!parent.onboardingDone) redirect("/parent/onboarding");

  const childIds = parent.children.map((c) => c.id);
  const [weeklyData, masteryData, activity, notifications] = await Promise.all([
    getWeeklyStudyMinutes(childIds),
    getSubjectMastery(childIds),
    getRecentActivity(childIds),
    getParentNotifications(user.id),
  ]);

  const sub = parent.subscription;
  let trialDaysLeft: number | null = null;
  if (sub?.status === "TRIALING" && sub.trialEndsAt) {
    trialDaysLeft = Math.max(
      0,
      Math.ceil((sub.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalXp = parent.children.reduce((sum, c) => sum + (c.learningProfile?.xp ?? 0), 0);
  const totalMinutes = parent.children.reduce(
    (sum, c) => sum + c.studySessions.reduce((s, sess) => s + sess.durationMinutes, 0),
    0,
  );

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Hello, {user.name ?? "Parent"}</h1>
        <p className={styles.pageSubtitle}>
          Track learning progress, manage children, and stay on top of the family pilot.
        </p>
      </header>

      <Alert variant="info" title="Family pilot mode">
        Full access with no billing. Plan changes in Settings apply instantly, no card required.
        {trialDaysLeft !== null && (
          <>
            {" "}
            Trial period: {trialDaysLeft} day{trialDaysLeft === 1 ? "" : "s"} remaining.
          </>
        )}
      </Alert>

      <div className={`${styles.grid} ${styles.grid3} ${styles.mtLg}`}>
        <Card>
          <div className={styles.stat}>
            <div className={styles.statValue}>{parent.children.length}</div>
            <div className={styles.statLabel}>Children</div>
          </div>
        </Card>
        <Card>
          <div className={styles.stat}>
            <div className={styles.statValue}>{totalMinutes}</div>
            <div className={styles.statLabel}>Study minutes</div>
          </div>
        </Card>
        <Card>
          <div className={styles.stat}>
            <div className={styles.statValue}>{unreadCount}</div>
            <div className={styles.statLabel}>Unread alerts</div>
          </div>
        </Card>
      </div>

      <div className={`${styles.grid} ${styles.mtXl}`}>
        <Card header={<h2>This week&apos;s study time</h2>}>
          <ProgressChart data={weeklyData} />
        </Card>
        <Card header={<h2>Subject mastery</h2>}>
          <MasteryChart data={masteryData} />
        </Card>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your children</h2>
          <Link href="/parent/onboarding">
            <Button size="sm">Add child</Button>
          </Link>
        </div>
        <div className={styles.childList}>
          {parent.children.length === 0 ? (
            <Card>
              <p>No children yet. Add your first learner to get started.</p>
              <Link href="/parent/onboarding">
                <Button>Add child</Button>
              </Link>
            </Card>
          ) : (
            parent.children.map((child) => (
              <div key={child.id} className={styles.childItem}>
                <div>
                  <strong>{child.displayName}</strong>
                  <div className={styles.meta}>
                    Ages {child.ageBand}, Level{" "}
                    {child.learningProfile?.levelScore.toFixed(0) ?? 0}%, {child.learningProfile?.xp ?? 0} XP
                  </div>
                  <ProgressBar
                    value={child.learningProfile?.levelScore ?? 0}
                    label="Overall progress"
                    calm={child.learningProfile?.calmColors}
                  />
                </div>
                <div className={styles.childActions}>
                  <Link href={`/parent/assessment/${child.id}`}>
                    <Button variant="secondary" size="sm">
                      Assessment
                    </Button>
                  </Link>
                  <Badge>{child.learningProfile?.streakDays ?? 0} day streak</Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div className={`${styles.grid} ${styles.mtXl}`}>
        <Card header={<h2>Recent activity</h2>}>
          {activity.length === 0 ? (
            <p className={styles.meta}>Activity will appear here after your child starts learning.</p>
          ) : (
            <div className={styles.activityList}>
              {activity.map((item) => (
                <div key={item.id} className={styles.activityItem}>
                  <span>
                    <strong>{item.child}</strong>, {item.title}
                    {item.minutes > 0 ? ` (${item.minutes} min)` : ""}
                  </span>
                  <span className={styles.meta}>{item.at.toLocaleDateString("en-GB")}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card header={<h2>Quick stats</h2>}>
          <p>Plan: <strong>{sub?.plan ?? "Essential"}</strong></p>
          <p>Status: <Badge>{sub?.status ?? "TRIALING"}</Badge></p>
          <p className={styles.meta}>Household XP: {totalXp}</p>
          <Link href="/parent/notifications">
            <Button variant="ghost" size="sm">
              View all notifications
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
