import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { getPublishedTutors } from "@/features/tutors/services/tutor-profile.service";
import { getParentTutorAccessForChild } from "@/features/tutors/services/tutor-student-access.service";
import { TutorAccessManager } from "@/features/tutors/ui/TutorAccessManager";
import { Card } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

type Props = {
  params: Promise<{ childId: string }>;
};

export default async function ChildTutorsPage({ params }: Props) {
  const { childId } = await params;
  const user = await requireParentOwner();
  const child = await assertHouseholdAccess(childId, user.id);

  const [tutors, accessRows] = await Promise.all([
    getPublishedTutors(),
    getParentTutorAccessForChild(child.parentId, childId),
  ]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>Tutors for {child.displayName}</h1>
        <p className={styles.pageSubtitle}>
          Grant or revoke tutor access to learning progress. Tutors never see child profiles or PINs.
        </p>
      </header>
      <Card>
        <TutorAccessManager
          childId={childId}
          tutors={tutors.map((t) => ({ id: t.id, headline: t.headline }))}
          existingAccess={accessRows.map((row) => ({
            id: row.id,
            learnerAlias: row.learnerAlias,
            status: row.status,
            tutorHeadline: row.tutorProfile.headline,
          }))}
        />
      </Card>
    </div>
  );
}
