import { requireTutorProfile } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { formatPence } from "@/features/tutors/lib/tutor-fee";
import { Card } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorBookingsPage() {
  const { tutor } = await requireTutorProfile();

  const bookings = await prisma.tutorBooking.findMany({
    where: { tutorId: tutor.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Bookings</h1>
      </header>
      <Card>
        {bookings.length === 0 ? (
          <p className={styles.meta}>No bookings yet.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Platform fee</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.createdAt.toLocaleDateString("en-GB")}</td>
                  <td>{formatPence(b.amountPence)}</td>
                  <td>{formatPence(b.platformFeePence)}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
