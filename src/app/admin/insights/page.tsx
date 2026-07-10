import { requireSuperAdmin } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card } from "@/shared/ui";
import { ExportInsightsButton } from "@/features/admin/ui/ExportInsightsButton";
import styles from "@/features/admin/ui/admin.module.css";

export default async function AdminInsightsPage() {
  await requireSuperAdmin();

  const [insights, exports] = await Promise.all([
    prisma.aggregatedInsight.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.dataExportJob.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Anonymized insights</h1>
        <p className={styles.pageSubtitle}>
          B2B cohort reports, no personally identifiable child data.
        </p>
      </header>

      <Card header={<h2>Export tools</h2>}>
        <p className={styles.meta}>
          Generate a new anonymized insights export for partner research.
        </p>
        <ExportInsightsButton />
      </Card>

      <Card header={<h2>Aggregated reports</h2>} className={styles.mtLg}>
        {insights.length === 0 ? (
          <p className={styles.empty}>No aggregated reports yet.</p>
        ) : (
          insights.map((i) => (
            <div key={i.id} className={styles.listItem}>
              <strong>{i.reportType}</strong>
              <div className={styles.meta}>
                Cohort {i.cohortSize}, {i.ageBand ?? "all ages"} , {" "}
                {i.periodStart.toLocaleDateString("en-GB")}  to {" "}
                {i.periodEnd.toLocaleDateString("en-GB")}
              </div>
            </div>
          ))
        )}
      </Card>

      <Card header={<h2>Export jobs</h2>} className={styles.mtLg}>
        {exports.length === 0 ? (
          <p className={styles.empty}>No export jobs yet.</p>
        ) : (
          <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {exports.map((job) => (
                <tr key={job.id}>
                  <td>{job.reportType}</td>
                  <td>{job.status}</td>
                  <td>{job.createdAt.toLocaleString("en-GB")}</td>
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
