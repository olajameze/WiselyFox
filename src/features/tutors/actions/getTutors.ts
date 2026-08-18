"use server";

import { prisma } from "@/shared/lib/prisma";
import { TutorVerificationStatus } from "@prisma/client";

// This is the shape the TutorCardGrid component expects.
// We will map the database result to this type.
export type TutorCardData = {
  id: string;
  name: string;
  subjectTags: string[];
  ageBands: string[];
  bio: string;
  hourlyRate: number;
  imageUrl: string | null;
  isVerified: boolean;
};

/**
 * Server Action to fetch verified and published tutor profiles.
 *
 * @returns A promise that resolves to an array of tutor profiles formatted for display.
 */
export async function getTutors(): Promise<TutorCardData[]> {
  const profiles = await prisma.tutorProfile.findMany({
    where: {
      published: true,
      verificationStatus: TutorVerificationStatus.VERIFIED,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      user: {
        name: "asc",
      },
    },
  });

  // Map the database profiles to the shape expected by the frontend component
  const tutors = profiles.map((profile) => {
    let subjects: string[] = [];
    try {
      // The subjects field is a JSON string in the database, e.g., '["Math", "Science"]'
      const parsedSubjects = JSON.parse(profile.subjects);
      if (Array.isArray(parsedSubjects)) {
        subjects = parsedSubjects;
      }
    } catch (error) {
      // If parsing fails, leave subjects as an empty array
      console.error(`Failed to parse subjects for tutor ${profile.id}:`, error);
    }

    let ageBands: string[] = [];
    try {
      // The ageBands field is a JSON string in the database, e.g., '["5-7", "8-10"]'
      const parsedAgeBands = JSON.parse(profile.ageBands);
      if (Array.isArray(parsedAgeBands)) {
        ageBands = parsedAgeBands;
      }
    } catch (error) {
      // If parsing fails, leave ageBands as an empty array
      console.error(`Failed to parse ageBands for tutor ${profile.id}:`, error);
    }

    return {
      id: profile.id,
      name: profile.user?.name ?? "Tutor",
      subjectTags: subjects,
      ageBands: ageBands,
      bio: profile.bio,
      hourlyRate: profile.hourlyRatePence,
      imageUrl: profile.profilePhotoUrl,
      isVerified: profile.verificationStatus === TutorVerificationStatus.VERIFIED,
    };
  });

  return tutors;
}
