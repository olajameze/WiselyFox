import { requireTutorProfile } from "@/shared/lib/permissions";
import { TutorProfileEditor } from "@/features/tutors/ui/TutorProfileEditor";
import { Card } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorProfilePage() {
  const { tutor } = await requireTutorProfile();

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>My tutor profile</h1>
        <p className={styles.pageSubtitle}>
          A profile photo, age verification, and fee acceptance are required before publishing.
        </p>
      </header>
      <Card>
        <TutorProfileEditor tutor={tutor} />
      </Card>
    </div>
  );
}
