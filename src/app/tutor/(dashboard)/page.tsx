import Link from "next/link";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { Card } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorHomePage() {
  const { tutor } = await requireTutorProfile();

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Tutor dashboard</h1>
        <p className={styles.pageSubtitle}>
          Manage your profile, respond to parents, and view learner progress you have been granted access to.
        </p>
      </header>

      <Card header={<h2>Status</h2>}>
        <p>Verification: <strong>{tutor.verificationStatus}</strong></p>
        <p>Published: <strong>{tutor.published ? "Yes" : "No"}</strong></p>
        {!tutor.profilePhotoUrl && (
          <p className={styles.meta}>Add a profile photo to continue verification.</p>
        )}
        <Link href="/tutor/profile">Edit profile →</Link>
      </Card>
    </div>
  );
}
