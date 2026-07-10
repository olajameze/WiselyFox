import { requireSuperAdmin } from "@/shared/lib/permissions";
import { getTutorsPendingReview } from "@/features/tutors/services/tutor-verification.service";
import { TutorReviewActions } from "@/features/tutors/ui/TutorReviewActions";
import { Card } from "@/shared/ui";
import adminStyles from "@/features/admin/ui/admin.module.css";

export default async function AdminTutorsPage() {
  await requireSuperAdmin();
  const tutors = await getTutorsPendingReview();

  return (
    <div className={adminStyles.dashboard}>
      <header className={adminStyles.pageHeader}>
        <h1>Tutor verification</h1>
        <p>Review age and profile before tutors are published.</p>
      </header>

      {tutors.length === 0 ? (
        <p>No tutors pending review.</p>
      ) : (
        tutors.map((tutor) => (
          <Card key={tutor.id} header={<h2>{tutor.user.name ?? tutor.user.email}</h2>}>
            <p>Status: {tutor.verificationStatus}</p>
            <p>Headline: {tutor.headline || "—"}</p>
            <p>DOB: {tutor.dateOfBirth?.toLocaleDateString("en-GB") ?? "—"}</p>
            <p>Photo: {tutor.profilePhotoUrl ? "Uploaded" : "Missing"}</p>
            {tutor.profilePhotoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tutor.profilePhotoUrl} alt="" width={80} height={80} />
            )}
            <TutorReviewActions
              tutor={{
                id: tutor.id,
                headline: tutor.headline,
                verificationStatus: tutor.verificationStatus,
                profilePhotoUrl: tutor.profilePhotoUrl,
                dateOfBirth: tutor.dateOfBirth?.toISOString() ?? null,
                userName: tutor.user.name,
                userEmail: tutor.user.email,
              }}
            />
          </Card>
        ))
      )}
    </div>
  );
}
