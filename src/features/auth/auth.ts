import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/prisma";
import { env } from "@/shared/lib/env";
import { syncSuperAdminRole } from "@/server/services/super-admin.service";
import { getUserCapabilities } from "@/shared/lib/user-capabilities";
import { logAudit } from "@/server/services/audit.service";
import { CONSENT_VERSION } from "@/shared/lib/consent";
import {
  accessCodeCompactKey,
  normalizeAccessCodeInput,
} from "@/shared/lib/access-code";
import { UserRole, ConsentType } from "@prisma/client";
import type {} from "next-auth/jwt";
import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role: UserRole;
      hasParentProfile?: boolean;
      hasTutorProfile?: boolean;
    };
  }
  interface User {
    role: UserRole;
    hasParentProfile?: boolean;
    hasTutorProfile?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    hasParentProfile?: boolean;
    hasTutorProfile?: boolean;
  }
}

async function loadProfileFlags(userId: string) {
  const caps = await getUserCapabilities(userId);
  return {
    hasParentProfile: caps.hasParentProfile,
    hasTutorProfile: caps.hasTutorProfile,
  };
}

async function findChildByAccessCode(raw: string) {
  const normalized = normalizeAccessCodeInput(raw);
  const include = { user: true } as const;

  const exact = await prisma.childProfile.findUnique({
    where: { accessCode: normalized },
    include,
  });
  if (exact) return exact;

  const compact = accessCodeCompactKey(raw);
  if (!compact) return null;

  const rows = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "ChildProfile"
    WHERE regexp_replace(lower("accessCode"), '[^a-z0-9]', '', 'g') = ${compact}
    LIMIT 1
  `;
  const id = rows[0]?.id;
  if (!id) return null;

  return prisma.childProfile.findUnique({ where: { id }, include });
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID ?? "google-client-id",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET ?? "google-client-secret",
      allowDangerousEmailAccountLinking: true,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID ?? process.env.FACEBOOK_CLIENT_ID ?? "facebook-client-id",
      clientSecret: process.env.AUTH_FACEBOOK_SECRET ?? process.env.FACEBOOK_CLIENT_SECRET ?? "facebook-client-secret",
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      id: "parent-credentials",
      name: "Parent",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        const [role, flags] = await Promise.all([
          syncSuperAdminRole(user.id, user.email),
          loadProfileFlags(user.id),
        ]);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role,
          hasParentProfile: flags.hasParentProfile,
          hasTutorProfile: flags.hasTutorProfile,
        };
      },
    }),
    Credentials({
      id: "tutor-credentials",
      name: "Tutor",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        const [role, flags] = await Promise.all([
          syncSuperAdminRole(user.id, user.email),
          loadProfileFlags(user.id),
        ]);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role,
          hasParentProfile: flags.hasParentProfile,
          hasTutorProfile: flags.hasTutorProfile,
        };
      },
    }),
    Credentials({
      id: "child-pin",
      name: "Child PIN",
      credentials: {
        accessCode: { label: "Access Code", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials: Partial<Record<"accessCode" | "pin", unknown>>) {
        const accessCode = credentials?.accessCode as string | undefined;
        const pin = credentials?.pin as string | undefined;
        if (!accessCode || !pin) return null;

        const child = await findChildByAccessCode(accessCode);
        if (!child?.pinHash || !child.user) return null;

        const valid = await bcrypt.compare(pin, child.pinHash);
        if (!valid) return null;

        return {
          id: child.user.id,
          email: child.user.email,
          name: child.displayName,
          role: child.user.role,
          hasParentProfile: false,
          hasTutorProfile: false,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        if (!user.email) return false;

        const email = user.email.toLowerCase();
        let dbUser = await prisma.user.findUnique({
          where: { email },
          include: { parentProfile: true },
        });

        if (!dbUser) {
          const trialDays = env.TRIAL_PERIOD_DAYS || 14;
          const trialEnds = new Date();
          trialEnds.setDate(trialEnds.getDate() + trialDays);

          dbUser = await prisma.user.create({
            data: {
              email,
              name: user.name ?? (profile?.name as string) ?? "Parent",
              image: user.image ?? (profile?.picture as string) ?? null,
              role: UserRole.PARENT,
              parentProfile: {
                create: {
                  onboardingDone: false,
                  subscription: {
                    create: {
                      plan: "ESSENTIAL",
                      status: "TRIALING",
                      trialStartsAt: new Date(),
                      trialEndsAt: trialEnds,
                    },
                  },
                  consents: {
                    create: [
                      { type: ConsentType.TERMS, granted: true, version: CONSENT_VERSION },
                      { type: ConsentType.PRIVACY, granted: true, version: CONSENT_VERSION },
                      { type: ConsentType.MARKETING, granted: false, version: CONSENT_VERSION },
                    ],
                  },
                },
              },
            },
            include: { parentProfile: true },
          });

          await logAudit({
            actorId: dbUser.id,
            action: `parent.signup.${account.provider}`,
            resource: "User",
            resourceId: dbUser.id,
          });
        }

        await syncSuperAdminRole(dbUser.id, dbUser.email);
        user.id = dbUser.id;
        user.role = dbUser.role;
        user.hasParentProfile = true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.hasParentProfile = user.hasParentProfile;
        token.hasTutorProfile = user.hasTutorProfile;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.hasParentProfile = token.hasParentProfile;
        session.user.hasTutorProfile = token.hasTutorProfile;
      }
      return session;
    },
  },
  secret: env.AUTH_SECRET,
});
