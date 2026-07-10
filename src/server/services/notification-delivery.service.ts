import webpush from "web-push";
import type { NotificationType } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";

let vapidConfigured = false;

function ensureVapid() {
  if (vapidConfigured) return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return false;
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT ?? "mailto:support@wiselyfox.app",
    publicKey,
    privateKey,
  );
  vapidConfigured = true;
  return true;
}

export async function sendPushToUser(
  userId: string,
  payload: { title: string; body: string; url?: string },
) {
  if (!ensureVapid()) return;

  const subscriptions = await prisma.pushSubscription.findMany({ where: { userId } });
  if (!subscriptions.length) return;

  const message = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url ?? "/parent/notifications",
  });

  await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          message,
        );
      } catch (err: unknown) {
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
        }
      }
    }),
  );
}

export async function createUserNotification(input: {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  url?: string;
}) {
  await prisma.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      body: input.body,
      linkUrl: input.url,
    },
  });

  await sendPushToUser(input.userId, {
    title: input.title,
    body: input.body,
    url: input.url,
  });
}
