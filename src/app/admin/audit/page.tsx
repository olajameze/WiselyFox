import { requireSuperAdmin } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card } from "@/shared/ui";
import styles from "@/features/admin/ui/admin.module.css";

export default async function AdminAuditPage() {
  await requireSuperAdmin();

  const logs = await prisma.auditLog.findMany({
    include: { actor: { select: { email: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Audit log</h1>
        <p className={styles.pageSubtitle}>Sensitive actions across the platform.</p>
      </header>

      <Card>
        {logs.length === 0 ? (
          <p className={styles.empty}>No audit events recorded.</p>
        ) : (
          <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Action</th>
                <th>Actor</th>
                <th>Resource</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.action}</td>
                  <td>{log.actor?.email ?? log.actor?.name ?? "system"}</td>
                  <td>
                    {log.resource ?? ", "}
                    {log.resourceId ? ` (${log.resourceId.slice(0, 8)}…)` : ""}
                  </td>
                  <td>{log.createdAt.toLocaleString("en-GB")}</td>
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
