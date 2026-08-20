import Link from "next/link";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { getTutorStudentAccessList } from "@/features/tutors/services/tutor-progress.service";
import { Card, Button, Badge } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorStudentsPage() {
  const { user } = await requireTutorProfile();
  const students = await getTutorStudentAccessList(user.id);

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>My Students ({students.length})</h1>
        <p className={styles.pageSubtitle}>
          Progress and assignments are securely linked via pseudonymous learner aliases. You have access to learning records without exposing personal child data.
        </p>
      </header>

      <Card>
        {students.length === 0 ? (
          <div style={{ padding: "1.5rem 0", textAlign: "center" }}>
            <p className={styles.meta}>
              No active students connected yet. When parents confirm bookings or grant learning access, they will appear here.
            </p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Learner Alias</th>
                  <th>Age Band</th>
                  <th>Access Granted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong style={{ fontSize: "1rem" }}>{s.learnerAlias}</strong>
                    </td>
                    <td>
                      <Badge variant="warning">Ages {s.ageBand}</Badge>
                    </td>
                    <td>{s.grantedAt?.toLocaleDateString("en-GB") ?? "Active"}</td>
                    <td>
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td>
                      <Link href={`/tutor/students/${s.id}/progress`}>
                        <Button size="sm">
                          View Progress &amp; Assign →
                        </Button>
                      </Link>
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
