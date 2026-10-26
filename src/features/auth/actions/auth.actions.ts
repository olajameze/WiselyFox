"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { signIn } from "@/features/auth/auth";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { scoreSignupFraud, shouldFlagForReview } from "@/server/services/fraud-detection.service";
import { logAudit } from "@/server/services/audit.service";
import { ConsentType, UserRole } from "@prisma/client";
import { CONSENT_VERSION } from "@/shared/lib/consent";
import { syncSuperAdminRole } from "@/server/services/super-admin.service";
import { resolvePostLoginRedirect } from "@/shared/lib/user-capabilities";
import { checkRateLimit } from "@/server/services/rate-limit.service";
import { getClientIp } from "@/shared/lib/client-ip";
import { strongPasswordSchema } from "@/shared/lib/password-strength";
import { normalizeAccessCodeInput } from "@/shared/lib/access-code";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: strongPasswordSchema,
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

  const { name, password, marketingOptIn } = parsed.data;
  const email = parsed.data.email.trim().toLowerCase();
  const ip = await getClientIp();
  const limited = checkRateLimit("sign-up", `${ip}:${email}`);
  if (!limited.ok) return fail(limited.message);

  try {
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

    await prisma.subscription.create({
      data: {
        parentId: user.parentProfile!.id,
        status: "ACTIVE",
      },
    });

    await logAudit({ actorId: user.id, action: "parent.signup", resource: "User", resourceId: user.id });

    return ok({ email });
  } catch (error) {
    // Handle the duplicate-email race (unique constraint) explicitly.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return fail("An account with this email already exists");
    }

    // Log the real cause so the server logs (e.g. Vercel) show what broke,
    // then surface a friendly message instead of an unhandled 500.
    console.error("[signUpParent] failed:", error);
    return fail(
      "We could not create your account right now. Please try again in a moment — if it keeps failing, contact support.",
    );
  }
}

const learnerSignUpSchema = signUpSchema.extend({
  ageConfirmed: z.boolean().refine((value) => value, {
    message: "You must confirm that you are 18 or older",
  }),
  ageBand: z.enum(["17-19", "20-23", "24+"]),
  learnerDataConsent: z.boolean().refine((value) => value, {
    message: "You must agree to the use of your learning data",
  }),
});

export async function signUpLearner(
  input: z.infer<typeof learnerSignUpSchema>,
): Promise<ActionResult<{ email: string }>> {
  const parsed = learnerSignUpSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid input");

  const { name, password, marketingOptIn, ageBand } = parsed.data;
  const email = parsed.data.email.trim().toLowerCase();
  const ip = await getClientIp();
  const limited = checkRateLimit("sign-up", `${ip}:${email}`);
  if (!limited.ok) return fail(limited.message);

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return fail("An account with this email already exists");

    const passwordHash = await bcrypt.hash(password, 10);
    const fraudScore = scoreSignupFraud(email);

    const user = await prisma.$transaction(async (tx) => {
      const createdUser = await tx.user.create({
        data: {
          email,
          name,
          passwordHash,
          role: UserRole.CHILD,
          parentProfile: {
            create: {
              onboardingDone: true,
              subscription: {
                create: {
                  status: "ACTIVE",
                },
              },
              consents: {
                create: [
                  { type: ConsentType.TERMS, granted: true, version: CONSENT_VERSION },
                  { type: ConsentType.PRIVACY, granted: true, version: CONSENT_VERSION },
                  {
                    type: ConsentType.MARKETING,
                    granted: marketingOptIn,
                    version: CONSENT_VERSION,
                  },
                  {
                    type: ConsentType.CHILD_DATA,
                    granted: true,
                    version: CONSENT_VERSION,
                  },
                ],
              },
              ...(shouldFlagForReview(fraudScore)
                ? {
                    fraudSignals: {
                      create: {
                        signal: "signup_risk",
                        score: fraudScore,
                        status: fraudScore >= 80 ? "BLOCKED" : "REVIEW",
                      },
                    },
                  }
                : {}),
            },
          },
        },
        include: { parentProfile: true },
      });

      if (!createdUser.parentProfile) {
        throw new Error("Self-managed learner account is missing its profile owner");
      }

      await tx.childProfile.create({
        data: {
          parentId: createdUser.parentProfile.id,
          userId: createdUser.id,
          displayName: name,
          ageBand,
          learningProfile: { create: {} },
        },
      });

      return createdUser;
    });

    await syncSuperAdminRole(user.id, email);
    await logAudit({
      actorId: user.id,
      action: "learner.signup",
      resource: "User",
      resourceId: user.id,
    });

    return ok({ email });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return fail("An account with this email already exists");
    }

    console.error("[signUpLearner] failed:", error);
    return fail(
      "We could not create your account right now. Please try again in a moment — if it keeps failing, contact support.",
    );
  }
}

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.enum(["learner", "parent", "tutor"]),
});

export async function signInWithEmail(
  input: z.infer<typeof signInSchema>,
): Promise<ActionResult<{ redirectTo: string }>> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid credentials");

  const email = parsed.data.email.trim().toLowerCase();
  const ip = await getClientIp();
  const limited = checkRateLimit("sign-in", `${ip}:${email}`);
  if (!limited.ok) return fail(limited.message);

  const provider =
    parsed.data.role === "learner"
      ? "learner-credentials"
      : parsed.data.role === "tutor"
        ? "tutor-credentials"
        : "parent-credentials";

  try {
    const result = await signIn(provider, {
      email,
      password: parsed.data.password,
      redirect: false,
    });
    if (result?.error) return fail("Invalid email or password");

    const account = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true },
    });
    const redirectTo = account
      ? await resolvePostLoginRedirect(account.id, account.role)
      : parsed.data.role === "tutor"
        ? "/tutor"
        : parsed.data.role === "learner"
          ? "/learn"
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
): Promise<ActionResult<{ redirectTo: string }>> {
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
    
    // On success, find the user and resolve their post-login destination
    const childProfile = await prisma.childProfile.findUnique({
      where: { accessCode: normalizeAccessCodeInput(parsed.data.accessCode) },
      select: { userId: true },
    });

    if (!childProfile?.userId) return fail("Child profile not found after login");

    const redirectTo = await resolvePostLoginRedirect(childProfile.userId, "CHILD");
    return ok({ redirectTo });

  } catch {
    return fail("Invalid access code or PIN");
  }
}
