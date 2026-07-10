import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/prisma";
import { env } from "@/shared/lib/env";
import { syncSuperAdminRole } from "@/server/services/super-admin.service";
import { getUserCapabilities } from "@/shared/lib/user-capabilities";
import type { UserRole } from "@prisma/client";
import type {} from "next-auth/jwt";

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
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

        const role = await syncSuperAdminRole(user.id, user.email);
        const flags = await loadProfileFlags(user.id);

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

        const child = await prisma.childProfile.findUnique({
          where: { accessCode },
          include: { user: true },
        });
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
