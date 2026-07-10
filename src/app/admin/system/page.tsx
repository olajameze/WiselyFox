import { requireSuperAdmin } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card } from "@/shared/ui";
import styles from "@/features/admin/ui/admin.module.css";

export default async function AdminSystemPage() {
  await requireSuperAdmin();

  const [
    subjectCount,
    lessonCount,
    questionCount,
    sessionCount,
    notificationCount,
  ] = await Promise.all([
    prisma.subject.count(),
    prisma.lesson.count(),
    prisma.question.count(),
    prisma.studySession.count(),
    prisma.notification.count(),
  ]);

  const checks = [
    { label: "Database", status: "Connected", ok: true },
    { label: "Subjects seeded", status: `${subjectCount} subjects`, ok: subjectCount > 0 },
    { label: "Lessons", status: `${lessonCount} lessons`, ok: lessonCount > 0 },
    { label: "Questions", status: `${questionCount} questions`, ok: questionCount > 0 },
    { label: "Study sessions", status: `${sessionCount} total`, ok: true },
    { label: "Notifications", status: `${notificationCount} sent`, ok: true },
  ];

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>System health</h1>
        <p className={styles.pageSubtitle}>Content inventory and service checks.</p>
      </header>

      <div className={styles.healthGrid}>
        {checks.map((check) => (
          <Card key={check.label}>
            <strong>{check.label}</strong>
            <p className={check.ok ? styles.healthOk : styles.meta}>{check.status}</p>
          </Card>
        ))}
      </div>

      <Card header={<h2>Environment</h2>} className={styles.mtLg}>
        <ul className={styles.meta}>
          <li>Node env: {process.env.NODE_ENV}</li>
          <li>Database: SQLite (dev)</li>
          <li>Stripe: {process.env.STRIPE_SECRET_KEY ? "configured" : "not configured (dev mode)"}</li>
          <li>Resend: {process.env.RESEND_API_KEY ? "configured" : "not configured (dev mode)"}</li>
        </ul>
      </Card>
    </div>
  );
}
