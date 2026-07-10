import { Card } from "@/shared/ui";
import { TutorInquiryForm } from "./TutorInquiryForm";
import { TutorBookingForm } from "./TutorBookingForm";
import type { TutorPublicProfile } from "./TutorPublicProfileView";
import styles from "./tutor.module.css";

type Props = {
  tutor: TutorPublicProfile;
  householdChildren: { id: string; displayName: string }[];
};

export function TutorHirePanel({ tutor, householdChildren }: Props) {
  return (
    <>
      <Card header={<h2>Contact tutor</h2>} className={styles.mtLg}>
        <TutorInquiryForm tutorId={tutor.id} householdChildren={householdChildren} />
      </Card>

      <Card header={<h2>Book a session</h2>} className={styles.mtLg}>
        <p className={styles.meta}>
          No WiselyFox learning plan required. A 5% platform fee is deducted from the tutor&apos;s payment (or deposit).
        </p>
        <TutorBookingForm
          tutorId={tutor.id}
          hourlyRatePence={tutor.hourlyRatePence}
          acceptsDeposits={tutor.acceptsDeposits}
          depositPercent={tutor.depositPercent}
          householdChildren={householdChildren}
        />
      </Card>
    </>
  );
}
