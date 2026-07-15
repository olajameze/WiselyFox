"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { signIn } from "@/features/auth/auth";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { scoreSignupFraud, shouldFlagForReview } from "@/server/services/fraud-detection.service";
import { logAudit } from "@/server/services/audit.service";
import { ConsentType, UserRole } from "@prisma/client";
import { env } from "@/shared/lib/env";
import { CONSENT_VERSION } from "@/shared/lib/consent";
import { syncSuperAdminRole } from "@/server/services/super-admin.service";
import { resolvePostLoginRedirect } from "@/shared/lib/user-capabilities";
import { checkRateLimit } from "@/server/services/rate-limit.service";
import { getClientIp } from "@/shared/lib/client-ip";
import { normalizeAccessCodeInput } from "@/shared/lib/access-code";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  marketingOptIn: z.boolean().default(false),
  termsAccepted: z.boolean().refine((value) => value, {
    message: "You must accept the Terms of Service",
  }),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: "You must accept the Privacy Policy",
  }),
});

export async function signUpParent(
  input: z.infer<typeof signUpSchema>,
): Promise<ActionResult<{ email: string }>> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const { name, email, password, marketingOptIn } = parsed.data;
  const ip = await getClientIp();
  const limited = checkRateLimit("sign-up", `${ip}:${email}`);
  if (!limited.ok) return fail(limited.message);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return fail("An account with this email already exists");

  // Cost 10 is OWASP-acceptable and materially faster than 12 on signup.
  const passwordHash = await bcrypt.hash(password, 10);
  const fraudScore = scoreSignupFraud(email);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role: UserRole.PARENT,
      parentProfile: { create: {} },
    },
    include: { parentProfile: true },
  });

  await syncSuperAdminRole(user.id, email);

  await prisma.consentRecord.createMany({
    data: [
      {
        parentId: user.parentProfile!.id,
        type: ConsentType.TERMS,
        granted: true,
        version: CONSENT_VERSION,
      },
      {
        parentId: user.parentProfile!.id,
        type: ConsentType.PRIVACY,
        granted: true,
        version: CONSENT_VERSION,
      },
      {
        parentId: user.parentProfile!.id,
        type: ConsentType.MARKETING,
        granted: marketingOptIn,
        version: CONSENT_VERSION,
      },
    ],
  });

  if (shouldFlagForReview(fraudScore)) {
    await prisma.fraudSignal.create({
      data: {
        parentId: user.parentProfile!.id,
        signal: "signup_risk",
        score: fraudScore,
        status: fraudScore >= 80 ? "BLOCKED" : "REVIEW",
      },
    });
  }

  const trialDays = env.TRIAL_PERIOD_DAYS;
  const trialEnds = new Date();
  trialEnds.setDate(trialEnds.getDate() + trialDays);

  await prisma.subscription.create({
    data: {
      parentId: user.parentProfile!.id,
      trialStartsAt: new Date(),
      trialEndsAt: trialEnds,
      status: "TRIALING",
    },
  });

  await logAudit({ actorId: user.id, action: "parent.signup", resource: "User", resourceId: user.id });

  return ok({ email });
}

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function signInParent(
  input: z.infer<typeof signInSchema>,
): Promise<ActionResult<{ redirectTo: string }>> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid credentials");

  const ip = await getClientIp();
  const limited = checkRateLimit("sign-in", `${ip}:${parsed.data.email}`);
  if (!limited.ok) return fail(limited.message);

  try {
    const result = await signIn("parent-credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
    if (result?.error) return fail("Invalid email or password");

    const account = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      select: { id: true, role: true },
    });
    const redirectTo = account
      ? await resolvePostLoginRedirect(account.id, account.role)
      : "/parent";
    return ok({ redirectTo });
  } catch {
    return fail("Invalid email or password");
  }
}

const childPinSchema = z.object({
  accessCode: z.string().min(1),
  pin: z.string().min(4).max(6),
});

export async function signInChild(
  input: z.infer<typeof childPinSchema>,
): Promise<ActionResult<null>> {
  const parsed = childPinSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid access code or PIN");

  const accessCode = normalizeAccessCodeInput(parsed.data.accessCode);
  const ip = await getClientIp();
  const limited = checkRateLimit("child-pin", `${ip}:${accessCode}`);
  if (!limited.ok) return fail(limited.message);

  try {
    const result = await signIn("child-pin", {
      accessCode: parsed.data.accessCode,
      pin: parsed.data.pin,
      redirect: false,
    });
    if (result?.error) return fail("Invalid access code or PIN");
    return ok(null);
  } catch {
    return fail("Invalid access code or PIN");
  }
}
