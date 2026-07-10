import { prisma } from "@/shared/lib/prisma";

export type UserCapabilities = {
  hasParentProfile: boolean;
  hasTutorProfile: boolean;
  isTutorOnly: boolean;
};

export async function getUserCapabilities(userId: string): Promise<UserCapabilities> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      parentProfile: { select: { id: true } },
      tutorProfile: { select: { id: true } },
    },
  });

  const hasParentProfile = Boolean(user?.parentProfile);
  const hasTutorProfile = Boolean(user?.tutorProfile);

  return {
    hasParentProfile,
    hasTutorProfile,
    isTutorOnly: hasTutorProfile && !hasParentProfile,
  };
}

export async function resolvePostLoginRedirect(userId: string, role: string): Promise<string> {
  if (role === "SUPERADMIN") return "/admin";
  if (role === "CHILD") return "/learn";

  const caps = await getUserCapabilities(userId);
  if (caps.hasParentProfile) return "/parent";
  if (caps.hasTutorProfile) return "/tutor";
  return "/sign-in";
}
