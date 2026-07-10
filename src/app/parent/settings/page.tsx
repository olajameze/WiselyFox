import Link from "next/link";
import { requireParentOwner } from "@/shared/lib/permissions";
import { BecomeTutorForm } from "@/features/tutors/ui/BecomeTutorForm";
import { prisma } from "@/shared/lib/prisma";
import { Card, Button, Alert, Badge } from "@/shared/ui";
import { DeleteAccountSection } from "@/features/parent/ui/DeleteAccountSection";
import { PlanUpgradeSection } from "@/features/parent/ui/PlanUpgradeSection";
import { DataExportButton } from "@/features/parent/ui/DataExportButton";
import { ConsentPreferences } from "@/features/parent/ui/ConsentPreferences";
import { PushNotificationSettings } from "@/features/pwa/ui/PushNotificationSettings";
import { isConsentGranted } from "@/features/parent/services/consent.service";
import { getSupportEmail, getSupportMailto } from "@/shared/lib/site-config";
import { ConsentType, UserRole } from "@prisma/client";
import styles from "@/features/parent/ui/parent.module.css";

export default async function ParentSettingsPage() {
  const user = await requireParentOwner();
  const parent = await prisma.parentProfile.findUnique({
    where: { userId: user.id },
    include: { subscription: true, consents: true, children: true },
  });
  const tutorProfile = await prisma.tutorProfile.findUnique({ where: { userId: user.id } });

  const marketingOptIn = isConsentGranted(parent?.consents ?? [], ConsentType.MARKETING);
  const childDataOptIn = isConsentGranted(parent?.consents ?? [], ConsentType.CHILD_DATA);
  const canDelete = user.role === UserRole.PARENT;
  const supportEmail = getSupportEmail();

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Settings & privacy</h1>
        <p className={styles.pageSubtitle}>Subscription, billing, account, and data preferences.</p>
      </header>

      <Alert variant="info" title="Family pilot mode">
        No real billing during this pilot. Plan upgrades apply instantly for testing. Card collection
        is not required.
      </Alert>

      <Card header={<h2>Account</h2>} className={styles.mtLg}>
        <p className={styles.meta}>Signed in as {user.email}</p>
        <p className={styles.meta}>Use the Account menu in the sidebar to sign out or switch accounts.</p>
      </Card>

      <Card header={<h2>Tutor marketplace</h2>} className={styles.mtLg}>
        {tutorProfile ? (
          <>
            <p className={styles.meta}>You have a tutor profile.</p>
            <Link href="/tutor/profile">
              <Button variant="secondary">Manage tutor profile</Button>
            </Link>
          </>
        ) : (
          <>
            <p className={styles.meta}>
              Offer tutoring on WiselyFox. You will never access other families&apos; dashboards.
            </p>
            <BecomeTutorForm />
          </>
        )}
      </Card>

      <Card header={<h2>Subscription & plan</h2>} className={styles.mtLg}>
        <p>
          Plan: <strong>{parent?.subscription?.plan ?? "Essential"}</strong>
        </p>
        <p>
          Status: <Badge>{parent?.subscription?.status ?? "TRIALING"}</Badge>
        </p>
        {parent?.subscription?.trialEndsAt && (
          <p className={styles.meta}>
            Trial ends: {parent.subscription.trialEndsAt.toLocaleDateString("en-GB")}
          </p>
        )}
        <PlanUpgradeSection
          plan={parent?.subscription?.plan ?? "ESSENTIAL"}
          childCount={parent?.children.length ?? 0}
        />
      </Card>

      <Card header={<h2>Privacy & consent</h2>} className={styles.mtLg}>
        <ConsentPreferences marketingOptIn={marketingOptIn} childDataOptIn={childDataOptIn} />
        <DataExportButton />
        <div className={styles.fieldRow}>
          <Link href="/privacy">
            <Button variant="ghost">Privacy policy</Button>
          </Link>
          <Link href="/terms">
            <Button variant="ghost">Terms of service</Button>
          </Link>
        </div>
      </Card>

      <Card header={<h2>Help & support</h2>} className={styles.mtLg}>
        <p className={styles.meta}>
          Questions during the family pilot? Email{" "}
          <a href={getSupportMailto("WiselyFox parent support")}>{supportEmail}</a> or visit the{" "}
          <Link href="/support">support page</Link>.
        </p>
      </Card>

      <Card header={<h2>App & notifications</h2>} className={styles.mtLg}>
        <p className={styles.meta}>
          Install WiselyFox on your phone or tablet for a full-screen app experience. Enable push
          notifications for rewards, trial reminders, and learning updates.
        </p>
        <PushNotificationSettings />
      </Card>

      {canDelete && parent && (
        <DeleteAccountSection childCount={parent.children.length} />
      )}
    </div>
  );
}
