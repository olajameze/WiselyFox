import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";
import { getPublishedTutors } from "@/features/tutors/services/tutor-profile.service";
import { TutorDirectoryCard } from "@/features/tutors/ui/TutorPublicProfileView";
import styles from "@/features/tutors/ui/tutor.module.css";

export default async function PublicTutorsPage() {
  const tutors = await getPublishedTutors();

  return (
    <>
      <Header />
      <main className={[styles.shellMain, styles.publicMain].join(" ")}>
        <header className={styles.pageHeader}>
          <h1>Find a verified tutor</h1>
          <p className={styles.pageSubtitle}>
            Browse tutor profiles for free — no WiselyFox learning plan required. Sign in as a parent to contact or hire.
          </p>
        </header>

        {tutors.length === 0 ? (
          <p className={styles.meta}>No verified tutors listed yet. Check back soon or apply to become a tutor.</p>
        ) : (
          <div className={styles.grid}>
            {tutors.map((tutor) => (
              <TutorDirectoryCard
                key={tutor.id}
                tutor={{
                  id: tutor.id,
                  headline: tutor.headline,
                  bio: tutor.bio,
                  experienceSummary: tutor.experienceSummary,
                  subjects: tutor.subjects,
                  ageBands: tutor.ageBands,
                  qualifications: tutor.qualifications,
                  hourlyRatePence: tutor.hourlyRatePence,
                  profilePhotoUrl: tutor.profilePhotoUrl,
                  cvUrl: tutor.cvUrl,
                  acceptsDeposits: tutor.acceptsDeposits,
                  depositPercent: tutor.depositPercent,
                  tutorName: tutor.user.name,
                }}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
