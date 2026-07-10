import { UserRole } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import { getSuperAdminEmails } from "@/shared/lib/env";
import { logAudit } from "@/server/services/audit.service";

export function isSuperAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getSuperAdminEmails().includes(email.toLowerCase());
}

/** Promote configured emails to SUPERADMIN role in the database. */
export async function syncSuperAdminRole(userId: string, email: string | null): Promise<UserRole> {
  if (!isSuperAdminEmail(email)) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
    return user?.role ?? UserRole.PARENT;
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (!user) return UserRole.PARENT;

  if (user.role !== UserRole.SUPERADMIN) {
    await prisma.user.update({
      where: { id: userId },
      data: { role: UserRole.SUPERADMIN },
    });
    await logAudit({
      actorId: userId,
      action: "admin.role_promoted",
      resource: "User",
      resourceId: userId,
      metadata: { source: "SUPERADMIN_EMAILS" },
    });
  }

  return UserRole.SUPERADMIN;
}
