import { redirect } from "next/navigation";
import { ConsentType } from "@prisma/client";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { isConsentGranted } from "@/features/parent/services/consent.service";
import { getAccommodationRules } from "@/features/inclusive/services/accommodation.service";
import { getTodaySchedule } from "@/features/parent/services/schedule.service";
import { LearnNav } from "@/features/learning/ui/LearnNav";
import { ChildAccountMenu } from "@/features/learning/ui/ChildAccountMenu";
import { LearnHeaderPreferences } from "@/features/learning/ui/LearnHeaderPreferences";
import { LearnAccessibilityShell } from "@/features/learning/ui/LearnAccessibilityShell";
import { VisualScheduleBar } from "@/features/learning/ui/VisualScheduleBar";
import { AppSkipLinks } from "@/shared/ui/AppSkipLinks/AppSkipLinks";
import { Badge } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  const user = await requireChild();
  const child = await getLearnChildByUserId(user.id);
  if (!child?.learningProfile) redirect("/child-sign-in");

  const profile = child.learningProfile;
  const rules = getAccommodationRules(profile);
  const calm = profile.calmColors || profile.reducedMotion;

  const [parent, todaySchedule] = await Promise.all([
    prisma.parentProfile.findFirst({
      where: { children: { some: { id: child.id } } },
      include: { consents: true },
    }),
    getTodaySchedule(child.id),
  ]);
  if (!parent || !isConsentGranted(parent.consents, ConsentType.CHILD_DATA)) {
    redirect("/child-sign-in?error=consent");
  }

  const showSchedule = rules.showVisualSchedule || todaySchedule.length > 0;

  return (
    <LearnAccessibilityShell
      calmColors={profile.calmColors}
      reducedMotion={profile.reducedMotion}
      highContrast={profile.highContrast}
      dyslexiaFriendly={profile.dyslexiaFriendly}
      largeText={profile.largeText}
    >
      <AppSkipLinks mainId="learn-main" />
      <div className={styles.learnLayout}>
        <header
          className={[styles.learnHeader, calm ? styles.calm : ""].filter(Boolean).join(" ")}
        >
          <span className={styles.learnGreeting}>Hi, {child.displayName}!</span>
          <div className={styles.learnHeaderActions}>
            {rules.calmMode && <Badge>Calm mode</Badge>}
            {profile.streakDays > 0 && (
              <Badge variant="warning">{profile.streakDays} day streak</Badge>
            )}
            <LearnHeaderPreferences />
            <ChildAccountMenu />
          </div>
        </header>
        {showSchedule && (
          <div className={styles.learnScheduleWrap}>
            <VisualScheduleBar
              items={todaySchedule}
              showDefault={rules.showVisualSchedule}
            />
          </div>
        )}
        <main id="learn-main" className={styles.learnMain}>
          {children}
        </main>
        <LearnNav showFocusLink={rules.showTimer} />
      </div>
    </LearnAccessibilityShell>
  );
}
