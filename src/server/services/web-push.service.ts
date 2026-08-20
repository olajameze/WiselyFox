import webpush from "web-push";
import { prisma } from "@/shared/lib/prisma";
import { env } from "@/shared/lib/env";

function getWebPushClient() {
  const publicKey = env.VAPID_PUBLIC_KEY || process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = env.VAPID_PRIVATE_KEY;
  const subject = env.VAPID_SUBJECT || "mailto:support@wiselyfox.app";

  if (!publicKey || !privateKey) {
    return null;
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
  return webpush;
}

export async function sendPushNotificationToUser(
  userId: string,
  payload: { title: string; body: string; url?: string; tag?: string },
): Promise<{ success: boolean; sentCount: number }> {
  const client = getWebPushClient();
  if (!client) {
    return { success: false, sentCount: 0 };
  }

  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  });

  if (subscriptions.length === 0) {
    return { success: true, sentCount: 0 };
  }

  const payloadString = JSON.stringify({
    title: payload.title,
    body: payload.body,
    url: payload.url || "/parent",
    tag: payload.tag || "general",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
  });

  let sentCount = 0;
  const expiredEndpoints: string[] = [];

  for (const sub of subscriptions) {
    try {
      await client.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        },
        payloadString,
      );
      sentCount++;
    } catch (err: unknown) {
      const statusCode = (err as { statusCode?: number })?.statusCode;
      // 404 Not Found or 410 Gone means subscription has expired
      if (statusCode === 404 || statusCode === 410) {
        expiredEndpoints.push(sub.endpoint);
      }
    }
  }

  if (expiredEndpoints.length > 0) {
    await prisma.pushSubscription.deleteMany({
      where: { endpoint: { in: expiredEndpoints } },
    });
  }

  return { success: true, sentCount };
}
