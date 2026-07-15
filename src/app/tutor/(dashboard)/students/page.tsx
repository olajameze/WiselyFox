import Link from "next/link";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { getTutorStudentAccessList } from "@/features/tutors/services/tutor-progress.service";
import { Card } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorStudentsPage() {
  const { user } = await requireTutorProfile();
  const students = await getTutorStudentAccessList(user.id);

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Students</h1>
        <p className={styles.pageSubtitle}>
          Progress is shared by parents only. You never see child profiles or household settings.
        </p>
      </header>
      <Card>
        {students.length === 0 ? (
          <p className={styles.meta}>No active student access. Parents grant access manually or when booking.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Alias</th>
                <th>Age band</th>
                <th>Granted</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.learnerAlias}</td>
                  <td>{s.ageBand}</td>
                  <td>{s.grantedAt?.toLocaleDateString("en-GB") ?? "Not set"}</td>
                  <td>
                    <Link href={`/tutor/students/${s.id}/progress`}>View progress</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
