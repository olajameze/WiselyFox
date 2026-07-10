"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { signOut } from "@/features/auth/auth";
import { prisma } from "@/shared/lib/prisma";
import { requireParentOwner } from "@/shared/lib/permissions";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { logAudit } from "@/server/services/audit.service";
import { cancelStripeSubscription } from "@/server/services/stripe.service";
import { UserRole } from "@prisma/client";

const deleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required"),
  confirmText: z.string(),
});

export async function deleteParentAccount(
  input: z.infer<typeof deleteAccountSchema>,
): Promise<ActionResult<null>> {
  const sessionUser = await requireParentOwner();
  const parsed = deleteAccountSchema.safeParse(input);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid confirmation");
  }
  if (parsed.data.confirmText !== "DELETE") {
    return fail('Type DELETE to confirm');
  }

  if (sessionUser.role === UserRole.SUPERADMIN) {
    return fail("Super admin accounts cannot be deleted from this page.");
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    include: {
      parentProfile: {
        include: {
          children: { select: { id: true, userId: true, displayName: true } },
          subscription: true,
        },
      },
    },
  });

  if (!user?.passwordHash || !user.parentProfile) {
    return fail("Account not found");
  }

  const passwordValid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!passwordValid) return fail("Incorrect password");

  const childUserIds = user.parentProfile.children
    .map((c) => c.userId)
    .filter((id): id is string => Boolean(id));

  const subscription = user.parentProfile.subscription;
  if (subscription?.stripeSubscriptionId) {
    await cancelStripeSubscription(subscription.stripeSubscriptionId);
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "CANCELED" },
    });
  } else if (subscription) {
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "CANCELED" },
    });
  }

  await logAudit({
    actorId: user.id,
    action: "parent.account.delete",
    resource: "User",
    resourceId: user.id,
    metadata: {
      childrenRemoved: user.parentProfile.children.length,
      childUserIds,
    },
  });

  await prisma.notification.deleteMany({ where: { userId: user.id } });

  await prisma.user.delete({ where: { id: user.id } });

  for (const childUserId of childUserIds) {
    await prisma.notification.deleteMany({ where: { userId: childUserId } });
    await prisma.user.delete({ where: { id: childUserId } }).catch(() => undefined);
  }

  await signOut({ redirectTo: "/" });
  return ok(null);
}
