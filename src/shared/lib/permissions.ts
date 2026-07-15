import { cache } from "react";
import { auth } from "@/features/auth/auth";
import { prisma } from "@/shared/lib/prisma";
import { getSuperAdminEmails } from "@/shared/lib/env";
import { UserRole, type TutorProfile, type TutorStudentAccess } from "@prisma/client";
import { AppError } from "@/shared/lib/errors";

export type SessionUser = {
  id: string;
  email: string | null;
  role: UserRole;
  name: string | null;
  hasParentProfile?: boolean;
  hasTutorProfile?: boolean;
};

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const session = await auth();
  if (!session?.user?.id) return null;
  return {
    id: session.user.id,
    email: session.user.email ?? null,
    role: (session.user.role as UserRole) ?? UserRole.PARENT,
    name: session.user.name ?? null,
    hasParentProfile: session.user.hasParentProfile,
    hasTutorProfile: session.user.hasTutorProfile,
  };
});

export async function requireAuth(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new AppError("Unauthorized", "UNAUTHORIZED", 401);
  return user;
}

export async function requireParent(): Promise<SessionUser> {
  const user = await requireAuth();
  if (user.role !== UserRole.PARENT && user.role !== UserRole.SUPERADMIN) {
    throw new AppError("Parent access required", "FORBIDDEN", 403);
  }
  return user;
}

export const requireParentOwner = cache(async (): Promise<SessionUser> => {
  const user = await requireParent();
  if (user.role === UserRole.SUPERADMIN) return user;

  const parent = await prisma.parentProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!parent) {
    throw new AppError("Household owner access required", "FORBIDDEN", 403);
  }
  return user;
});

export async function requireTutorProfile(): Promise<{ user: SessionUser; tutor: TutorProfile }> {
  const user = await requireAuth();
  if (user.role === UserRole.CHILD) {
    throw new AppError("Tutor access required", "FORBIDDEN", 403);
  }

  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId: user.id },
  });
  if (!tutor) {
    throw new AppError("Tutor profile required", "FORBIDDEN", 403);
  }
  return { user, tutor };
}

export async function requireTutorOnly(): Promise<{ user: SessionUser; tutor: TutorProfile }> {
  const result = await requireTutorProfile();
  const parent = await prisma.parentProfile.findUnique({
    where: { userId: result.user.id },
    select: { id: true },
  });
  if (parent) {
    throw new AppError("This action is for tutor-only accounts", "FORBIDDEN", 403);
  }
  return result;
}

export async function requireChild(): Promise<SessionUser> {
  const user = await requireAuth();
  if (user.role !== UserRole.CHILD) {
    throw new AppError("Child access required", "FORBIDDEN", 403);
  }
  return user;
}

export async function requireSuperAdmin(): Promise<SessionUser> {
  const user = await requireAuth();
  const allowed = getSuperAdminEmails();
  if (
    user.role !== UserRole.SUPERADMIN &&
    !(user.email && allowed.includes(user.email.toLowerCase()))
  ) {
    throw new AppError("Super admin access required", "FORBIDDEN", 403);
  }
  return user;
}

export async function assertHouseholdAccess(childId: string, parentUserId: string) {
  const child = await prisma.childProfile.findFirst({
    where: { id: childId, parent: { userId: parentUserId } },
  });
  if (!child) throw new AppError("Child not found in household", "FORBIDDEN", 403);
  return child;
}

export async function assertTutorStudentAccess(
  tutorUserId: string,
  childId: string,
): Promise<TutorStudentAccess> {
  const access = await prisma.tutorStudentAccess.findFirst({
    where: {
      childId,
      status: "ACTIVE",
      tutorProfile: { userId: tutorUserId },
    },
  });
  if (!access) {
    throw new AppError("No active tutor access for this learner", "FORBIDDEN", 403);
  }
  return access;
}

export async function getParentProfileForUser(userId: string) {
  return prisma.parentProfile.findUnique({ where: { userId } });
}

/** Parents can browse and hire tutors without an active learning subscription. */
export async function requireParentForTutors(): Promise<SessionUser> {
  const user = await requireAuth();
  if (user.role === UserRole.CHILD) {
    throw new AppError("Parent access required", "FORBIDDEN", 403);
  }
  if (user.role === UserRole.SUPERADMIN) return user;

  const parent = await prisma.parentProfile.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });
  if (!parent) {
    throw new AppError("A parent account is required to contact or hire tutors", "FORBIDDEN", 403);
  }
  return user;
}
