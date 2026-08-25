import { requireTutorProfile } from "@/shared/lib/permissions";
import { TutorProfileEditor } from "@/features/tutors/ui/TutorProfileEditor";
import { OnboardingUploads } from "@/components/tutor/OnboardingUploads";
import { Card } from "@/shared/ui";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function TutorProfilePage() {
  const { tutor } = await requireTutorProfile();

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <h1>My tutor profile &amp; safety checks</h1>
        <p className={styles.pageSubtitle}>
          Mandatory safety background documents, photo verification, and fee acceptance are required before publishing.
        </p>
      </header>

      {/* Mandatory Safety Verification Documents Upload */}
      <section style={{ marginBottom: "2rem" }}>
        <OnboardingUploads
          initialDbsUrl={tutor.dbsLetterUrl}
          initialPhotoIdUrl={tutor.photoIdUrl}
          initialProofOfAddressUrl={tutor.proofOfAddressUrl}
        />
      </section>

      <Card>
        <TutorProfileEditor tutor={tutor} />
      </Card>
    </div>
  );
}
