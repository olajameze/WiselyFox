"use server";

import { prisma } from "@/shared/lib/prisma";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { verifyTurnstileToken } from "@/server/services/turnstile.service";
import { checkRateLimit } from "@/server/services/rate-limit.service";
import { getClientIp } from "@/shared/lib/client-ip";
import { sendWaitlistConfirmationEmail } from "@/server/services/email.service";
import { AGE_BAND_LABELS } from "@/data/age-bands";
import { joinWaitlistSchema, type JoinWaitlistInput } from "./waitlist.schema";

export async function joinWaitlistAction(
  input: JoinWaitlistInput,
): Promise<ActionResult<{ alreadyRegistered: boolean }>> {
  const parsed = joinWaitlistSchema.safeParse(input);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Please check your details and try again.");
  }

  const { email, name, ageBands, marketingOptIn, turnstileToken } = parsed.data;

  const ip = await getClientIp();
  const limited = checkRateLimit("waitlist", `${ip}:${email}`);
  if (!limited.ok) return fail(limited.message);

  const guard = await verifyTurnstileToken(turnstileToken, ip === "unknown" ? undefined : ip);
  if (!guard.ok) return fail(guard.message);

  const existing = await prisma.waitlistLead.findUnique({ where: { email } });
  if (existing) {
    return ok({ alreadyRegistered: true });
  }

  await prisma.waitlistLead.create({
    data: {
      email,
      name,
      ageBands: JSON.stringify(ageBands),
      marketingOptIn,
      source: "landing",
      notifiedAt: new Date(),
    },
  });

  const bandLabels = ageBands.map((band) => AGE_BAND_LABELS[band]);
  await sendWaitlistConfirmationEmail(email, name, bandLabels);

  return ok({ alreadyRegistered: false });
}

