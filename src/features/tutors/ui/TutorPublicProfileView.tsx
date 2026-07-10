import Link from "next/link";
import { parseJsonArray } from "@/features/tutors/services/tutor-profile.service";
import { formatPence } from "@/features/tutors/lib/tutor-fee";
import { Card, Badge } from "@/shared/ui";
import styles from "./tutor.module.css";

export type TutorPublicProfile = {
  id: string;
  headline: string;
  bio: string;
  experienceSummary: string;
  subjects: string;
  ageBands: string;
  qualifications: string;
  hourlyRatePence: number;
  profilePhotoUrl: string | null;
  cvUrl: string | null;
  acceptsDeposits: boolean;
  depositPercent: number | null;
  tutorName: string | null;
};

type Props = {
  tutor: TutorPublicProfile;
  hireSection?: React.ReactNode;
};

export function TutorPublicProfileView({ tutor, hireSection }: Props) {
  const subjects = parseJsonArray(tutor.subjects);
  const ageBands = parseJsonArray(tutor.ageBands);
  const qualifications = parseJsonArray(tutor.qualifications);

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        {tutor.profilePhotoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tutor.profilePhotoUrl}
            alt=""
            className={[styles.tutorPhoto, styles.tutorPhotoProfile].join(" ")}
          />
        )}
        <h1>{tutor.headline}</h1>
        {tutor.tutorName && <p className={styles.pageSubtitle}>{tutor.tutorName}</p>}
        <p className={styles.verifiedBadge}>
          <Badge variant="success">Verified tutor</Badge>
        </p>
        <p className={styles.pageSubtitle}>
          <strong>{formatPence(tutor.hourlyRatePence)}</strong> per hour
          {tutor.acceptsDeposits && (
            <> · Deposits from {tutor.depositPercent ?? 25}% accepted</>
          )}
        </p>
      </header>

      <Card header={<h2>About</h2>}>
        <p>{tutor.bio}</p>
      </Card>

      {tutor.experienceSummary && (
        <Card header={<h2>Experience</h2>} className={styles.mtLg}>
          <p>{tutor.experienceSummary}</p>
        </Card>
      )}

      <Card header={<h2>Subjects & skills</h2>} className={styles.mtLg}>
        <p>
          <strong>Subjects:</strong> {subjects.join(", ")}
        </p>
        <p>
          <strong>Age bands:</strong> {ageBands.join(", ")}
        </p>
        {qualifications.length > 0 && (
          <p>
            <strong>Qualifications & skills:</strong> {qualifications.join(", ")}
          </p>
        )}
      </Card>

      {tutor.cvUrl && (
        <Card header={<h2>CV</h2>} className={styles.mtLg}>
          <p>
            <a href={tutor.cvUrl} target="_blank" rel="noopener noreferrer">
              View tutor CV (PDF)
            </a>
          </p>
        </Card>
      )}

      {hireSection}
    </div>
  );
}

export function TutorDirectoryCard({
  tutor,
}: {
  tutor: TutorPublicProfile;
}) {
  const subjects = parseJsonArray(tutor.subjects);

  return (
    <Card className={styles.tutorCard}>
      {tutor.profilePhotoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={tutor.profilePhotoUrl} alt="" className={styles.tutorPhoto} />
      )}
      <h2>{tutor.headline}</h2>
      {tutor.tutorName && <p className={styles.meta}>{tutor.tutorName}</p>}
      <p className={styles.verifiedBadge}>
        <Badge variant="success">Verified</Badge>
      </p>
      <p>{subjects.slice(0, 3).join(", ")}</p>
      <p>{formatPence(tutor.hourlyRatePence)}/hr</p>
      <Link href={`/tutors/${tutor.id}`}>View profile</Link>
    </Card>
  );
}
