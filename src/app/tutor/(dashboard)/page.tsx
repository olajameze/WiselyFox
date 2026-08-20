import Link from "next/link";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card, Button, Badge } from "@/shared/ui";
import { formatPence } from "@/features/tutors/lib/tutor-fee";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorHomePage() {
  const { tutor } = await requireTutorProfile();

  const [students, bookings, openInquiriesCount] = await Promise.all([
    prisma.tutorStudentAccess.findMany({
      where: { tutorProfileId: tutor.id, status: "ACTIVE" },
      include: { child: true },
      orderBy: { grantedAt: "desc" },
      take: 10,
    }),
    prisma.tutorBooking.findMany({
      where: { tutorId: tutor.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.tutorInquiry.count({
      where: { tutorId: tutor.id, status: "OPEN" },
    }),
  ]);

  const totalEarningsPence = bookings.reduce(
    (sum, b) => sum + (b.amountPence - b.platformFeePence),
    0,
  );

  const rateFormatted = tutor.hourlyRatePence > 0
    ? `£${(tutor.hourlyRatePence / 100).toFixed(2)}/hr`
    : "Not set";

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Tutor Workspace</h1>
        <p className={styles.pageSubtitle}>
          Manage your students, respond to parent inquiries, track bookings, and update your service profile.
        </p>
      </header>

      {/* 4-Card Tutor KPI Overview */}
      <div className={styles.tutorKpiGrid}>
        <Card className={styles.tutorKpiCard}>
          <div className={styles.tutorKpiMeta}>
            <span className={styles.tutorKpiLabel}>Connected Students</span>
            <span className={styles.tutorKpiValue}>{students.length}</span>
          </div>
          <span className={styles.tutorKpiIcon}>🎓</span>
        </Card>

        <Card className={styles.tutorKpiCard}>
          <div className={styles.tutorKpiMeta}>
            <span className={styles.tutorKpiLabel}>Total Bookings</span>
            <span className={styles.tutorKpiValue}>{bookings.length}</span>
          </div>
          <span className={styles.tutorKpiIcon}>📅</span>
        </Card>

        <Card className={styles.tutorKpiCard}>
          <div className={styles.tutorKpiMeta}>
            <span className={styles.tutorKpiLabel}>Net Earnings</span>
            <span className={`${styles.tutorKpiValue} ${styles.tutorKpiEarnings}`}>
              {formatPence(totalEarningsPence)}
            </span>
          </div>
          <span className={styles.tutorKpiIcon}>💰</span>
        </Card>

        <Card className={styles.tutorKpiCard}>
          <div className={styles.tutorKpiMeta}>
            <span className={styles.tutorKpiLabel}>Open Inquiries</span>
            <span className={`${styles.tutorKpiValue} ${openInquiriesCount > 0 ? styles.tutorKpiAlert : ""}`}>
              {openInquiriesCount}
            </span>
          </div>
          <span className={styles.tutorKpiIcon}>💬</span>
        </Card>
      </div>

      {/* Profile & Service Status */}
      <Card header={<h2>Profile &amp; Service Status</h2>} className={styles.mtLg}>
        <div className={styles.statusRow}>
          <div>
            <p>Verification: <Badge variant={tutor.verificationStatus === "VERIFIED" ? "success" : "warning"}>{tutor.verificationStatus}</Badge></p>
            <p>Public Directory: <strong>{tutor.published ? "Live & Published" : "Draft (Hidden)"}</strong></p>
            <p>Hourly Rate: <strong>{rateFormatted}</strong> {tutor.acceptsDeposits ? `• ${tutor.depositPercent ?? 50}% Deposit Required` : ""}</p>
          </div>
          <div className={styles.buttonRow}>
            <Link href="/tutor/profile">
              <Button size="sm">Edit Profile &amp; Rates</Button>
            </Link>
            <Link href={`/tutors/${tutor.id}`}>
              <Button variant="secondary" size="sm">Preview Public Listing</Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Connected Students Roster */}
      <Card header={<h2>My Students ({students.length})</h2>} className={styles.mtLg}>
        {students.length === 0 ? (
          <p className={styles.meta}>
            No active students yet. When parents book sessions or grant access, their student profiles will appear here.
          </p>
        ) : (
          <div className={styles.studentListGrid}>
            {students.map((s) => (
              <div key={s.id} className={styles.studentCardItem}>
                <div className={styles.studentItemHeader}>
                  <div>
                    <strong className={styles.studentAlias}>{s.learnerAlias}</strong>
                    <p className={styles.meta}>Ages {s.child.ageBand}</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className={styles.studentItemFooter}>
                  <Link href={`/tutor/students/${s.id}/progress`}>
                    <Button variant="secondary" size="sm">
                      View Progress &amp; Assign →
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Quick Actions Bar */}
      <Card header={<h2>Quick Workspace Tools</h2>} className={styles.mtLg}>
        <div className={styles.buttonRow}>
          <Link href="/tutor/students">
            <Button variant="secondary" size="sm">Manage All Students</Button>
          </Link>
          <Link href="/tutor/bookings">
            <Button variant="secondary" size="sm">Session Bookings</Button>
          </Link>
          <Link href="/tutor/inquiries">
            <Button variant="secondary" size="sm">Parent Inquiries</Button>
          </Link>
          <Link href="/tutor/profile">
            <Button variant="secondary" size="sm">Payment &amp; Stripe Setup</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
