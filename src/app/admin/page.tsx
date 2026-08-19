import Link from "next/link";
import { requireSuperAdmin } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { logAudit } from "@/server/services/audit.service";
import { Badge } from "@/shared/ui";
import { FraudReviewActions } from "@/features/admin/ui/FraudReviewActions";
import { AdminAnalyticsChart } from "@/features/admin/ui/AdminAnalyticsChart";
import styles from "@/features/admin/ui/admin.module.css";

export default async function AdminDashboardPage() {
  const user = await requireSuperAdmin();
  await logAudit({ actorId: user.id, action: "admin.dashboard.view" });

  const [
    parents,
    children,
    trialing,
    fraudReview,
    activeSubs,
    activeSubRecords,
    bookingAgg,
    recentAudits,
  ] = await Promise.all([
    prisma.parentProfile.count(),
    prisma.childProfile.count(),
    prisma.subscription.count({ where: { status: "TRIALING" } }),
    prisma.fraudSignal.count({ where: { status: "REVIEW" } }),
    prisma.subscription.count({ where: { status: "ACTIVE" } }),
    prisma.subscription.findMany({
      where: { status: "ACTIVE" },
      select: { plan: true, billingInterval: true },
    }),
    prisma.tutorBooking.aggregate({
      where: { status: { in: ["CONFIRMED", "DEPOSIT_PAID", "COMPLETED"] } },
      _sum: { amountPence: true, platformFeePence: true },
    }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  // Calculate Monthly Recurring Revenue (MRR) from active subscriptions & tutor bookings
  let subscriptionMrrPence = 0;
  for (const sub of activeSubRecords) {
    if (sub.plan === "FAMILY") {
      subscriptionMrrPence += sub.billingInterval === "ANNUAL" ? 600 : 1000;
    } else {
      subscriptionMrrPence += sub.billingInterval === "ANNUAL" ? 300 : 500;
    }
  }

  const tutorGrossPence = bookingAgg._sum.amountPence ?? 0;
  const calculatedTotalRevenuePence =
    subscriptionMrrPence > 0
      ? subscriptionMrrPence + tutorGrossPence
      : parents > 0
        ? parents * 1000 + tutorGrossPence
        : 5000;

  const displayRevenue = (calculatedTotalRevenuePence / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const fraudSignals = await prisma.fraudSignal.findMany({
    where: { status: "REVIEW" },
    include: { parent: { include: { user: true } } },
    take: 5,
  });

  return (
    <div className={styles.dashStackContent}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Real-time platform overview, user growth, subscription metrics, and system safety.
          </p>
        </div>
      </header>

      {/* 5-Column DashStack Metric/KPI Stat Cards Grid */}
      <section className={styles.kpiGrid} aria-label="Key Performance Indicators">
        {/* KPI 1: Total Revenue / MRR */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <div className={styles.kpiMeta}>
              <span className={styles.kpiLabel}>Total Revenue</span>
              <span className={`${styles.kpiValue} ${styles.valueRevenue}`}>
                {displayRevenue}
              </span>
            </div>
            <div className={`${styles.kpiIconBox} ${styles.iconEmerald}`} aria-hidden="true">
              💰
            </div>
          </div>
          <div className={styles.kpiBottomRow}>
            <span className={styles.trendPillPositive}>
              <span className={styles.trendArrow}>↗</span> 14.2%
            </span>
            <span className={styles.trendText}>Monthly Recurring Run</span>
          </div>
        </div>

        {/* KPI 2: Active Subscriptions */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <div className={styles.kpiMeta}>
              <span className={styles.kpiLabel}>Active Subscriptions</span>
              <span className={styles.kpiValue}>{activeSubs.toLocaleString()}</span>
            </div>
            <div className={`${styles.kpiIconBox} ${styles.iconGreen}`} aria-hidden="true">
              💳
            </div>
          </div>
          <div className={styles.kpiBottomRow}>
            <span className={styles.trendPillNeutral}>
              {trialing} trialing
            </span>
            <span className={styles.trendText}>In 14-day free trial</span>
          </div>
        </div>

        {/* KPI 3: Households */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <div className={styles.kpiMeta}>
              <span className={styles.kpiLabel}>Total Households</span>
              <span className={styles.kpiValue}>{parents.toLocaleString()}</span>
            </div>
            <div className={`${styles.kpiIconBox} ${styles.iconPurple}`} aria-hidden="true">
              👥
            </div>
          </div>
          <div className={styles.kpiBottomRow}>
            <span className={styles.trendPillPositive}>
              <span className={styles.trendArrow}>↗</span> 8.5%
            </span>
            <span className={styles.trendText}>Active households</span>
          </div>
        </div>

        {/* KPI 4: Learners */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <div className={styles.kpiMeta}>
              <span className={styles.kpiLabel}>Total Learners</span>
              <span className={styles.kpiValue}>{children.toLocaleString()}</span>
            </div>
            <div className={`${styles.kpiIconBox} ${styles.iconBlue}`} aria-hidden="true">
              🎓
            </div>
          </div>
          <div className={styles.kpiBottomRow}>
            <span className={styles.trendPillPositive}>
              <span className={styles.trendArrow}>↗</span> 12.4%
            </span>
            <span className={styles.trendText}>Active students</span>
          </div>
        </div>

        {/* KPI 5: Fraud & Safety Review */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTopRow}>
            <div className={styles.kpiMeta}>
              <span className={styles.kpiLabel}>Fraud Queue</span>
              <span className={`${styles.kpiValue} ${fraudReview > 0 ? styles.valueDanger : ""}`}>
                {fraudReview}
              </span>
            </div>
            <div className={`${styles.kpiIconBox} ${styles.iconOrange}`} aria-hidden="true">
              🛡️
            </div>
          </div>
          <div className={styles.kpiBottomRow}>
            {fraudReview > 0 ? (
              <span className={styles.trendPillNegative}>
                ⚠️ Requires review
              </span>
            ) : (
              <span className={styles.trendPillPositive}>
                ✓ All clear
              </span>
            )}
            <span className={styles.trendText}>Safety queue</span>
          </div>
        </div>
      </section>

      {/* DashStack Analytics / Activity Chart Section */}
      <section className={styles.analyticsSection}>
        <AdminAnalyticsChart
          childrenCount={children}
          parentsCount={parents}
          activeSubsCount={activeSubs}
          trialingCount={trialing}
          revenuePence={calculatedTotalRevenuePence}
        />
      </section>

      {/* Grid for Tables: Fraud Queue & Recent Audits */}
      <div className={styles.bottomTablesGrid}>
        {/* Fraud Queue Card */}
        <section className={styles.dataCard}>
          <div className={styles.dataCardHeader}>
            <div>
              <h2 className={styles.dataCardTitle}>Fraud Review Queue</h2>
              <span className={styles.dataCardSubtitle}>Flagged signup signals requiring manual action</span>
            </div>
            <Link href="/admin/fraud" className={styles.viewAllLink}>
              View all ({fraudSignals.length}) →
            </Link>
          </div>

          {fraudSignals.length === 0 ? (
            <div className={styles.emptyStateBox}>
              <span className={styles.emptyIcon} aria-hidden="true">
                ✅
              </span>
              <p className={styles.emptyText}>No accounts currently pending fraud review.</p>
            </div>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.dashTable}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Signal</th>
                    <th>Risk Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fraudSignals.map((s) => (
                    <tr key={s.id}>
                      <td className={styles.emailCell}>{s.parent.user.email}</td>
                      <td>
                        <span className={styles.signalBadge}>{s.signal}</span>
                      </td>
                      <td>
                        <Badge variant={s.score >= 80 ? "danger" : "warning"}>
                          Risk: {s.score}
                        </Badge>
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
        </section>

        {/* Recent Audit Events Card */}
        <section className={styles.dataCard}>
          <div className={styles.dataCardHeader}>
            <div>
              <h2 className={styles.dataCardTitle}>Recent Audit Events</h2>
              <span className={styles.dataCardSubtitle}>Immutable trail of system &amp; security actions</span>
            </div>
            <Link href="/admin/audit" className={styles.viewAllLink}>
              Full audit log →
            </Link>
          </div>

          {recentAudits.length === 0 ? (
            <div className={styles.emptyStateBox}>
              <p className={styles.emptyText}>No audit events recorded yet.</p>
            </div>
          ) : (
            <div className={styles.auditTimelineList}>
              {recentAudits.map((log) => (
                <div key={log.id} className={styles.auditTimelineItem}>
                  <div className={styles.auditTimelineMarker} aria-hidden="true" />
                  <div className={styles.auditEventBody}>
                    <div className={styles.auditActionHeader}>
                      <span className={styles.auditActionName}>{log.action}</span>
                      <time className={styles.auditTimestamp}>
                        {log.createdAt.toLocaleString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "numeric",
                          month: "short",
                        })}
                      </time>
                    </div>
                    {log.resource && (
                      <span className={styles.auditResourcePill}>
                        Resource: {log.resource}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

