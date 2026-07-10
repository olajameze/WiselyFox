import Link from "next/link";
import { redirect } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import { getParentProfile } from "@/features/parent/services/parent-dashboard.service";
import { Card, Button, Badge, ProgressBar } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ParentChildrenPage() {
  const user = await requireParentOwner();
  const parent = await getParentProfile(user.id);
  if (!parent) redirect("/sign-up");
  if (!parent.onboardingDone) redirect("/parent/onboarding");

  const plan = parent.subscription?.plan ?? "ESSENTIAL";
  const limit = plan === "FAMILY" ? 5 : 1;

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Children</h1>
        <p className={styles.pageSubtitle}>
          Manage learner profiles, access codes, and assessments. {parent.children.length}/{limit} slots used.
        </p>
      </header>

      <div className={styles.childList}>
        {parent.children.map((child) => (
          <Card key={child.id} className={styles.childCard}>
            <div className={styles.childCardHeader}>
              <div>
                <h2>{child.displayName}</h2>
                <p className={styles.meta}>
                  Ages {child.ageBand}
                  {child.yearGroup ? `, Year ${child.yearGroup}` : ""}
                </p>
              </div>
              <Badge variant="success">{child.learningProfile?.streakDays ?? 0} day streak</Badge>
            </div>

            <div>
              <p className={styles.meta}>Child access code (share with your learner)</p>
              <code className={styles.accessCode}>{child.accessCode}</code>
            </div>

            <ProgressBar
              value={child.learningProfile?.levelScore ?? 0}
              label="Level progress"
              calm={child.learningProfile?.calmColors}
            />

            <p className={styles.meta}>
              {child.learningProfile?.xp ?? 0} XP, {child.learningProfile?.coins ?? 0} coins , {" "}
              Session length: {child.learningProfile?.sessionLengthMinutes ?? 15} min
            </p>

            <div className={styles.childActions}>
              <Link href={`/parent/children/${child.id}/results`}>
                <Button variant="secondary" size="sm">
                  Results & print
                </Button>
              </Link>
              <Link href={`/parent/children/${child.id}/worksheets`}>
                <Button variant="secondary" size="sm">
                  Worksheets
                </Button>
              </Link>
              <Link href={`/parent/assessment/${child.id}`}>
                <Button variant="secondary" size="sm">
                  Assessment
                </Button>
              </Link>
              <Link href={`/parent/schedule/${child.id}`}>
                <Button variant="secondary" size="sm">
                  Schedule
                </Button>
              </Link>
              <Link href={`/parent/children/${child.id}/tutors`}>
                <Button variant="secondary" size="sm">
                  Tutors
                </Button>
              </Link>
              <Link href={`/parent/children/${child.id}/accessibility`}>
                <Button variant="ghost" size="sm">
                  Accessibility
                </Button>
              </Link>
              <Link href="/parent/progress">
                <Button variant="ghost" size="sm">
                  Progress
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {parent.children.length < limit && (
        <div className={styles.actionRow}>
          <Link href="/parent/onboarding">
            <Button>Add another child</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
