import { requireTutorProfile } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { formatPence } from "@/features/tutors/lib/tutor-fee";
import { Card, Badge } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorBookingsPage() {
  const { tutor } = await requireTutorProfile();

  const bookings = await prisma.tutorBooking.findMany({
    where: { tutorId: tutor.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const totalGrossPence = bookings.reduce((sum, b) => sum + b.amountPence, 0);
  const totalFeesPence = bookings.reduce((sum, b) => sum + b.platformFeePence, 0);
  const totalNetPence = totalGrossPence - totalFeesPence;

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Session Bookings &amp; Earnings</h1>
        <p className={styles.pageSubtitle}>
          View parent session requests, confirmed bookings, deposit transactions, and net payouts.
        </p>
      </header>

      {/* Summary KPI Cards */}
      <div className={styles.tutorKpiGrid} style={{ marginBottom: "1.5rem" }}>
        <Card className={styles.tutorKpiCard}>
          <div className={styles.tutorKpiMeta}>
            <span className={styles.tutorKpiLabel}>Net Payout Earnings</span>
            <span className={`${styles.tutorKpiValue} ${styles.tutorKpiEarnings}`}>
              {formatPence(totalNetPence)}
            </span>
          </div>
          <span className={styles.tutorKpiIcon}>💰</span>
        </Card>

        <Card className={styles.tutorKpiCard}>
          <div className={styles.tutorKpiMeta}>
            <span className={styles.tutorKpiLabel}>Completed Sessions</span>
            <span className={styles.tutorKpiValue}>{bookings.length}</span>
          </div>
          <span className={styles.tutorKpiIcon}>✅</span>
        </Card>

        <Card className={styles.tutorKpiCard}>
          <div className={styles.tutorKpiMeta}>
            <span className={styles.tutorKpiLabel}>Platform Fee Rate</span>
            <span className={styles.tutorKpiValue}>5%</span>
          </div>
          <span className={styles.tutorKpiIcon}>🛡️</span>
        </Card>
      </div>

      <Card>
        {bookings.length === 0 ? (
          <div style={{ padding: "1.5rem 0", textAlign: "center" }}>
            <p className={styles.meta}>No bookings recorded yet. Once parents book your lessons, they will appear here.</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Booking Date</th>
                  <th>Session Gross</th>
                  <th>5% Platform Fee</th>
                  <th>Net Payout</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.createdAt.toLocaleDateString("en-GB")}</td>
                    <td>
                      <strong>{formatPence(b.amountPence)}</strong>
                    </td>
                    <td style={{ color: "var(--color-text-muted)" }}>
                      -{formatPence(b.platformFeePence)}
                    </td>
                    <td style={{ color: "#059669", fontWeight: 700 }}>
                      {formatPence(b.amountPence - b.platformFeePence)}
                    </td>
                    <td>
                      <Badge
                        variant={
                          b.status === "COMPLETED" || b.status === "CONFIRMED"
                            ? "success"
                            : b.status === "DEPOSIT_PAID"
                              ? "warning"
                              : "default"
                        }
                      >
                        {b.status}
                      </Badge>
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
