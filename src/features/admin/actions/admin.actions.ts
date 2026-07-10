"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { UserRole } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import { requireSuperAdmin } from "@/shared/lib/permissions";
import { logAudit } from "@/server/services/audit.service";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { FraudStatus } from "@prisma/client";
import {
  countSuperAdmins,
  deleteUserFully,
} from "@/server/services/admin-user.service";
import { getSuperAdminEmails } from "@/shared/lib/env";

const deleteUserSchema = z.object({
  userId: z.string().min(1),
  confirmText: z.string().min(1),
});

const updateRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["PARENT", "ADMIN", "SUPERADMIN"]),
});

export async function adminDeleteUser(
  input: z.infer<typeof deleteUserSchema>,
): Promise<ActionResult<null>> {
  const admin = await requireSuperAdmin();
  const parsed = deleteUserSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const target = await prisma.user.findUnique({
    where: { id: parsed.data.userId },
    include: { childProfile: { select: { displayName: true } } },
  });
  if (!target) return fail("User not found");

  const confirmText = parsed.data.confirmText.trim().toLowerCase();
  const expected =
    target.email?.toLowerCase() ??
    target.name?.toLowerCase() ??
    target.childProfile?.displayName.toLowerCase();
  if (!expected || confirmText !== expected) {
    return fail("Confirmation text does not match this account");
  }

  if (target.id === admin.id) {
    return fail("You cannot delete your own admin account");
  }

  if (target.role === UserRole.SUPERADMIN) {
    const others = await countSuperAdmins(target.id);
    const envAdmins = getSuperAdminEmails().filter((email) => email !== target.email?.toLowerCase());
    if (others === 0 && envAdmins.length === 0) {
      return fail("Cannot delete the last super admin account");
    }
  }

  await deleteUserFully(target.id);

  await logAudit({
    actorId: admin.id,
    action: "admin.user.delete",
    resource: "User",
    resourceId: target.id,
    metadata: { email: target.email, role: target.role },
  });

  revalidatePath("/admin/users");
  return ok(null);
}

export async function adminUpdateUserRole(
  input: z.infer<typeof updateRoleSchema>,
): Promise<ActionResult<{ role: UserRole }>> {
  const admin = await requireSuperAdmin();
  const parsed = updateRoleSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const target = await prisma.user.findUnique({ where: { id: parsed.data.userId } });
  if (!target) return fail("User not found");

  if (target.role === UserRole.CHILD) {
    return fail("Child learner accounts cannot change role. Delete and recreate via the parent.");
  }

  if (target.id === admin.id && parsed.data.role !== UserRole.SUPERADMIN) {
    return fail("You cannot demote your own admin account");
  }

  if (target.role === UserRole.SUPERADMIN && parsed.data.role !== UserRole.SUPERADMIN) {
    const others = await countSuperAdmins(target.id);
    if (others === 0) {
      return fail("Cannot demote the last super admin account");
    }
  }

  let role = parsed.data.role as UserRole;
  await prisma.user.update({
    where: { id: target.id },
    data: { role },
  });

  await logAudit({
    actorId: admin.id,
    action: "admin.user.role_update",
    resource: "User",
    resourceId: target.id,
    metadata: { from: target.role, to: role, email: target.email },
  });

  revalidatePath("/admin/users");
  return ok({ role });
}

export async function reviewFraudSignal(
  signalId: string,
  decision: "clear" | "block",
): Promise<ActionResult<null>> {
  const user = await requireSuperAdmin();

  const signal = await prisma.fraudSignal.findUnique({ where: { id: signalId } });
  if (!signal) return fail("Signal not found");

  const status: FraudStatus = decision === "block" ? "BLOCKED" : "CLEAR";
  await prisma.fraudSignal.update({
    where: { id: signalId },
    data: { status },
  });

  await logAudit({
    actorId: user.id,
    action: `admin.fraud.${decision}`,
    resource: "FraudSignal",
    resourceId: signalId,
  });

  revalidatePath("/admin");
  revalidatePath("/admin/fraud");
  return ok(null);
}

export async function triggerInsightsExport(): Promise<ActionResult<{ jobId: string }>> {
  const user = await requireSuperAdmin();

  const job = await prisma.dataExportJob.create({
    data: {
      reportType: "aggregated_insights",
      status: "completed",
      filePath: `/exports/insights-${Date.now()}.json`,
      createdBy: user.id,
    },
  });

  await logAudit({
    actorId: user.id,
    action: "admin.insights.export",
    resource: "DataExportJob",
    resourceId: job.id,
  });

  revalidatePath("/admin/insights");
  return ok({ jobId: job.id });
}
