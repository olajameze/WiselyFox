"use server";

import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { sendWaitlistConfirmationEmail } from "@/server/services/email.service";

const joinWaitlistSchema = z.object({
  email: z.string().email(),
  name: z.string().trim().max(80).optional(),
  marketingOptIn: z.boolean().default(false),
});

export async function joinWaitlist(
  input: z.infer<typeof joinWaitlistSchema>,
): Promise<ActionResult<{ alreadyRegistered: boolean }>> {
  const parsed = joinWaitlistSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const email = parsed.data.email.trim().toLowerCase();
  const name = parsed.data.name?.trim() || undefined;

  const existing = await prisma.waitlistSignup.findUnique({ where: { email } });
  if (existing) {
    return ok({ alreadyRegistered: true });
  }

  await prisma.waitlistSignup.create({
    data: {
      email,
      name,
      marketingOptIn: parsed.data.marketingOptIn,
      source: "landing",
    },
  });

  await sendWaitlistConfirmationEmail(email, name);

  return ok({ alreadyRegistered: false });
}
