import { prisma } from "@/shared/lib/prisma";
import {
  TutorStudentAccessSource,
  TutorStudentAccessStatus,
  type TutorStudentAccess,
} from "@prisma/client";

export async function grantTutorStudentAccess(input: {
  tutorProfileId: string;
  childId: string;
  parentId: string;
  learnerAlias: string;
  source: TutorStudentAccessSource;
  bookingId?: string;
}): Promise<TutorStudentAccess> {
  return prisma.tutorStudentAccess.upsert({
    where: {
      tutorProfileId_childId: {
        tutorProfileId: input.tutorProfileId,
        childId: input.childId,
      },
    },
    create: {
      tutorProfileId: input.tutorProfileId,
      childId: input.childId,
      parentId: input.parentId,
      learnerAlias: input.learnerAlias,
      source: input.source,
      bookingId: input.bookingId,
      status: TutorStudentAccessStatus.ACTIVE,
      grantedAt: new Date(),
      revokedAt: null,
    },
    update: {
      learnerAlias: input.learnerAlias,
      source: input.source,
      bookingId: input.bookingId,
      status: TutorStudentAccessStatus.ACTIVE,
      grantedAt: new Date(),
      revokedAt: null,
    },
  });
}

export async function revokeTutorStudentAccess(accessId: string, parentId: string) {
  const access = await prisma.tutorStudentAccess.findFirst({
    where: { id: accessId, parentId },
  });
  if (!access) throw new Error("Access not found");

  return prisma.tutorStudentAccess.update({
    where: { id: accessId },
    data: {
      status: TutorStudentAccessStatus.REVOKED,
      revokedAt: new Date(),
    },
  });
}

export async function getParentTutorAccessForChild(parentId: string, childId: string) {
  return prisma.tutorStudentAccess.findMany({
    where: { parentId, childId },
    include: {
      tutorProfile: {
        select: {
          id: true,
          headline: true,
          profilePhotoUrl: true,
          user: { select: { name: true } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
}
