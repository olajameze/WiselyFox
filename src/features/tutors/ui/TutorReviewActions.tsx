"use client";

import {
  adminApproveTutorAge,
  adminApproveTutorProfile,
  adminRejectTutor,
  adminSuspendTutor,
} from "@/features/tutors/actions/tutor-admin.actions";
import { Button } from "@/shared/ui";
import styles from "@/features/tutors/ui/TutorReviewActions.module.css";

type TutorRow = {
  id: string;
  headline: string;
  verificationStatus: string;
  profilePhotoUrl: string | null;
  dateOfBirth: string | null;
  userName: string | null;
  userEmail: string | null;
};

export function TutorReviewActions({ tutor }: { tutor: TutorRow }) {
  async function approveAge() {
    await adminApproveTutorAge({ tutorId: tutor.id });
    window.location.reload();
  }
  async function approveProfile() {
    await adminApproveTutorProfile({ tutorId: tutor.id });
    window.location.reload();
  }
  async function rejectAge() {
    await adminRejectTutor({ tutorId: tutor.id, type: "age" });
    window.location.reload();
  }
  async function rejectProfile() {
    await adminRejectTutor({ tutorId: tutor.id, type: "profile" });
    window.location.reload();
  }
  async function suspend() {
    await adminSuspendTutor({ tutorId: tutor.id });
    window.location.reload();
  }

  return (
    <div className={styles.actions}>
      {tutor.verificationStatus === "PENDING_AGE_REVIEW" && (
        <>
          <Button variant="secondary" onClick={approveAge}>
            Approve age
          </Button>
          <Button variant="ghost" onClick={rejectAge}>
            Reject age
          </Button>
        </>
      )}
      {tutor.verificationStatus === "PENDING_PROFILE_REVIEW" && (
        <>
          <Button variant="secondary" onClick={approveProfile}>
            Approve profile
          </Button>
          <Button variant="ghost" onClick={rejectProfile}>
            Reject profile
          </Button>
        </>
      )}
      {tutor.verificationStatus === "VERIFIED" && (
        <Button variant="ghost" onClick={suspend}>
          Suspend
        </Button>
      )}
    </div>
  );
}
