import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { assertHouseholdAccess } from "@/shared/lib/permissions";
import { AccessibilityForm } from "@/features/parent/ui/AccessibilityForm";
import { Card, Button } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ChildAccessibilityPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId } = await params;
  const child = await assertHouseholdAccess(childId, user.id);
  const profile = await prisma.learningProfile.findUnique({ where: { childId } });
  if (!profile) notFound();

  return (
    <div className={styles.dashboard}>
      <Link href="/parent/children">
        <Button variant="ghost" size="sm">
          ← Children
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>{child.displayName}, accessibility</h1>
        <p className={styles.pageSubtitle}>
          Settings from onboarding are applied automatically. Adjust calm mode, visual schedules,
          readable text, timers, and session length here any time.
        </p>
      </header>
      <Card>
        <AccessibilityForm
          childId={childId}
          initial={{
            calmColors: profile.calmColors,
            reducedMotion: profile.reducedMotion,
            highContrast: profile.highContrast,
            dyslexiaFriendly: profile.dyslexiaFriendly,
            largeText: profile.largeText,
            soundEnabled: profile.soundEnabled,
            hideTimers: profile.hideTimers,
            sessionLengthMinutes: profile.sessionLengthMinutes,
          }}
        />
      </Card>
    </div>
  );
}
