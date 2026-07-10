import Link from "next/link";
import { requireSuperAdmin } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { logAudit } from "@/server/services/audit.service";
import { Card, Badge } from "@/shared/ui";
import { FraudReviewActions } from "@/features/admin/ui/FraudReviewActions";
import styles from "@/features/admin/ui/admin.module.css";

export default async function AdminDashboardPage() {
  const user = await requireSuperAdmin();
  await logAudit({ actorId: user.id, action: "admin.dashboard.view" });

  const [parents, children, trialing, fraudReview, activeSubs, recentAudits] =
    await Promise.all([
      prisma.parentProfile.count(),
      prisma.childProfile.count(),
      prisma.subscription.count({ where: { status: "TRIALING" } }),
      prisma.fraudSignal.count({ where: { status: "REVIEW" } }),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const fraudSignals = await prisma.fraudSignal.findMany({
    where: { status: "REVIEW" },
    include: { parent: { include: { user: true } } },
    take: 5,
  });

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Super Admin</h1>
        <p className={styles.pageSubtitle}>Platform overview, fraud review, and system health.</p>
      </header>

      <div className={styles.statGrid}>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{parents}</div>
            <div className={styles.statLabel}>Households</div>
          </div>
        </Card>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{children}</div>
            <div className={styles.statLabel}>Learners</div>
          </div>
        </Card>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{trialing}</div>
            <div className={styles.statLabel}>Trialing</div>
          </div>
        </Card>
        <Card>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{activeSubs}</div>
            <div className={styles.statLabel}>Active subs</div>
          </div>
        </Card>
        <Card>
          <div className={styles.statCard}>
            <div className={`${styles.statValue} ${styles.statValueDanger}`}>{fraudReview}</div>
            <div className={styles.statLabel}>Fraud review</div>
          </div>
        </Card>
      </div>

      <Card header={<h2>Fraud queue</h2>} className={styles.mtXl}>
        {fraudSignals.length === 0 ? (
          <p className={styles.empty}>No accounts pending review.</p>
        ) : (
          <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Signal</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fraudSignals.map((s) => (
                <tr key={s.id}>
                  <td>{s.parent.user.email}</td>
                  <td>{s.signal}</td>
                  <td>
                    <Badge variant="warning">score {s.score}</Badge>
                  </td>
                  <td>
                    <FraudReviewActions signalId={s.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
        <Link href="/admin/fraud" className={styles.meta}>
          View full fraud queue →
        </Link>
      </Card>

      <Card header={<h2>Recent audit events</h2>} className={styles.mtLg}>
        {recentAudits.length === 0 ? (
          <p className={styles.empty}>No audit events yet.</p>
        ) : (
          recentAudits.map((log) => (
            <div key={log.id} className={styles.listItem}>
              <strong>{log.action}</strong>
              <div className={styles.meta}>
                {log.createdAt.toLocaleString("en-GB")}
                {log.resource ? `, ${log.resource}` : ""}
              </div>
            </div>
          ))
        )}
        <Link href="/admin/audit" className={styles.meta}>
          Full audit log →
        </Link>
      </Card>
    </div>
  );
}
