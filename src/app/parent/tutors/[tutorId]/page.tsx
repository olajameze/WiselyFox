import { notFound } from "next/navigation";
import Link from "next/link";
import { requireParentOwner, getParentProfileForUser } from "@/shared/lib/permissions";
import { getPublishedTutorById } from "@/features/tutors/services/tutor-profile.service";
import { TutorPublicProfileView } from "@/features/tutors/ui/TutorPublicProfileView";
import { TutorHirePanel } from "@/features/tutors/ui/TutorHirePanel";
import { prisma } from "@/shared/lib/prisma";
import styles from "@/features/tutors/ui/tutor.module.css";

type Props = {
  params: Promise<{ tutorId: string }>;
};

export default async function ParentTutorDetailPage({ params }: Props) {
  const user = await requireParentOwner();
  const { tutorId } = await params;
  const tutor = await getPublishedTutorById(tutorId);
  if (!tutor) notFound();

  const parent = await getParentProfileForUser(user.id);
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

  return (
    <div>
      <p className={styles.meta} style={{ marginBottom: "1rem" }}>
        <Link href="/parent/tutors">← Back to tutors</Link>
      </p>
      <TutorPublicProfileView
        tutor={publicProfile}
        hireSection={<TutorHirePanel tutor={publicProfile} householdChildren={children} />}
      />
    </div>
  );
}
