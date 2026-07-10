import { UserRole } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import { cancelStripeSubscription } from "@/server/services/stripe.service";

export async function deleteUserFully(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      parentProfile: {
        include: {
          children: { select: { userId: true } },
          subscription: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.parentProfile) {
    const childUserIds = user.parentProfile.children
      .map((child) => child.userId)
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

    await prisma.notification.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });

    for (const childUserId of childUserIds) {
      await prisma.notification.deleteMany({ where: { userId: childUserId } });
      await prisma.user.delete({ where: { id: childUserId } }).catch(() => undefined);
    }
    return;
  }

  await prisma.notification.deleteMany({ where: { userId: user.id } });

  if (user.role === UserRole.CHILD) {
    await prisma.childProfile.deleteMany({ where: { userId: user.id } });
  }

  await prisma.user.delete({ where: { id: user.id } });
}

export async function countSuperAdmins(excludeUserId?: string): Promise<number> {
  return prisma.user.count({
    where: {
      role: UserRole.SUPERADMIN,
      ...(excludeUserId ? { id: { not: excludeUserId } } : {}),
    },
  });
}
