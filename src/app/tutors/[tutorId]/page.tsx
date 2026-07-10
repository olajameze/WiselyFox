import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";
import { Card, Button } from "@/shared/ui";
import { getPublishedTutorById } from "@/features/tutors/services/tutor-profile.service";
import { TutorPublicProfileView } from "@/features/tutors/ui/TutorPublicProfileView";
import { TutorHirePanel } from "@/features/tutors/ui/TutorHirePanel";
import { getSessionUser, getParentProfileForUser } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import styles from "@/features/tutors/ui/tutor.module.css";

type Props = {
  params: Promise<{ tutorId: string }>;
};

export default async function PublicTutorProfilePage({ params }: Props) {
  const { tutorId } = await params;
  const tutor = await getPublishedTutorById(tutorId);
  if (!tutor) notFound();

  const sessionUser = await getSessionUser();
  const parent = sessionUser ? await getParentProfileForUser(sessionUser.id) : null;
  const children = parent
    ? await prisma.childProfile.findMany({
        where: { parentId: parent.id },
        select: { id: true, displayName: true },
      })
    : [];

  const publicProfile = {
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
  };

  const hireSection = parent ? (
    <TutorHirePanel tutor={publicProfile} householdChildren={children} />
  ) : (
    <Card header={<h2>Contact & hire</h2>} className={styles.mtLg}>
      <p className={styles.meta}>
        Sign in with a free parent account to message or book this tutor. No learning subscription is required.
      </p>
      <div className={styles.buttonRow}>
        <Link href={`/sign-in?callbackUrl=/tutors/${tutor.id}`}>
          <Button>Sign in as parent</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="secondary">Create parent account</Button>
        </Link>
      </div>
    </Card>
  );

  return (
    <>
      <Header signedIn={Boolean(sessionUser)} />
      <main className={[styles.shellMain, styles.publicMainNarrow].join(" ")}>
        <p className={styles.meta}>
          <Link href="/tutors">← All tutors</Link>
        </p>
        <TutorPublicProfileView tutor={publicProfile} hireSection={hireSection} />
      </main>
      <Footer />
    </>
  );
}
