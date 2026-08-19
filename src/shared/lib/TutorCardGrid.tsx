import React from "react";
import Image from "next/image";
import styles from "./TutorCardGrid.module.css";
import { bookTutorAction } from "@/shared/lib/tutorBooking";
import type { TutorCardData } from "@/features/tutors/actions/getTutors";

interface TutorCardGridProps {
  tutors: TutorCardData[];
}

export function TutorCardGrid({ tutors }: TutorCardGridProps) {
  if (!tutors || tutors.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No Tutors Found</h2>
        <p>We couldn&apos;t find any tutors matching your criteria. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      {tutors.map((tutor) => (
        <div key={tutor.id} className={styles.card}>
          <div className={styles.profileHeader}>
            <Image
              src={tutor.imageUrl ?? "/avatars/default.png"} // Fallback to a default image
              alt={`Profile of ${tutor.name}`}
              width={120}
              height={120}
              className={styles.profilePicture}
            />
            {tutor.isVerified && (
              <span className={styles.verifiedBadge}>
                <svg className={styles.badgeIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.tutorName}>{tutor.name}</h3>
            <div className={styles.subjectTags}>
              {tutor.subjectTags.map((tag) => (
                <span key={tag} className={styles.subjectTag}>{tag}</span>
              ))}
            </div>
            <p className={styles.tutorBio}>{tutor.bio}</p>
            <p className={styles.hourlyRate}>Hourly Rate: ${tutor.hourlyRate / 100}.00</p>
          </div>
          <form action={bookTutorAction}>
            <input type="hidden" name="tutorId" value={tutor.id} />
            <button type="submit" className={styles.bookButton}>Book Now / Hire</button>
          </form>
        </div>
      ))}
    </div>
  );
}
