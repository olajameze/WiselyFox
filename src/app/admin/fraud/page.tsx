import { requireSuperAdmin } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card, Badge } from "@/shared/ui";
import { FraudReviewActions } from "@/features/admin/ui/FraudReviewActions";
import styles from "@/features/admin/ui/admin.module.css";

export default async function AdminFraudPage() {
  await requireSuperAdmin();

  const signals = await prisma.fraudSignal.findMany({
    include: { parent: { include: { user: true, children: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Fraud queue</h1>
        <p className={styles.pageSubtitle}>
          Review flagged signups and take action on suspicious accounts.
        </p>
      </header>

      <Card>
        {signals.length === 0 ? (
          <p className={styles.empty}>No fraud signals recorded.</p>
        ) : (
          <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Signal</th>
                <th>Score</th>
                <th>Status</th>
                <th>Children</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((s) => (
                <tr key={s.id}>
                  <td>{s.parent.user.email}</td>
                  <td>{s.signal}</td>
                  <td>{s.score}</td>
                  <td>
                    <Badge
                      variant={
                        s.status === "BLOCKED"
                          ? "danger"
                          : s.status === "REVIEW"
                            ? "warning"
                            : "success"
                      }
                    >
                      {s.status}
                    </Badge>
                  </td>
                  <td>{s.parent.children.length}</td>
                  <td>
                    {s.status === "REVIEW" && <FraudReviewActions signalId={s.id} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </Card>
    </div>
  );
}
