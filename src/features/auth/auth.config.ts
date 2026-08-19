import type { NextAuthConfig } from "next-auth";
import type { UserRole } from "@prisma/client";

/**
 * Edge-compatible authentication configuration.
 * This object is imported by the middleware and merged into the main auth config.
 */
export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.hasParentProfile = user.hasParentProfile;
        token.hasTutorProfile = user.hasTutorProfile;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.hasParentProfile = token.hasParentProfile as boolean | undefined;
        session.user.hasTutorProfile = token.hasTutorProfile as boolean | undefined;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const { hasTutorProfile } = auth?.user || {};
      const { pathname } = nextUrl;

      // Public routes that don't require login
      const isPublicRoute =
        pathname === "/" ||
        pathname === "/privacy" ||
        pathname === "/terms" ||
        pathname === "/support" ||
        pathname === "/tutors" ||
        pathname.startsWith("/tutors/") ||
        pathname === "/api/health";

      if (isPublicRoute) {
        return true;
      }

      // Public auth routes
      const isAuthRoute =
        pathname === "/sign-in" ||
        pathname === "/sign-up" ||
        pathname === "/child-sign-in" ||
        pathname === "/tutor/sign-in" ||
        pathname === "/tutor/sign-up";

      // If already logged in and visiting auth pages, redirect to dashboard
      if (isAuthRoute) {
        if (!isLoggedIn) {
          return true;
        }
        let redirectUrl = "/";
        if (userRole === "PARENT") redirectUrl = "/parent";
        else if (userRole === "CHILD") redirectUrl = "/learn";
        else if (userRole === "ADMIN" || userRole === "SUPERADMIN") redirectUrl = "/admin";
        else if (hasTutorProfile) redirectUrl = "/tutor";

        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      // If not logged in and trying to access a protected route, redirect to sign-in.
      if (!isLoggedIn) {
        return false;
      }

      // RBAC for logged-in users
      if (pathname.startsWith("/admin")) {
        return userRole === "ADMIN" || userRole === "SUPERADMIN";
      }

      if (pathname.startsWith("/parent")) {
        return userRole === "PARENT";
      }

      if (pathname.startsWith("/learn")) {
        return userRole === "CHILD";
      }

      if (pathname === "/tutor" || pathname.startsWith("/tutor/")) {
        return userRole === "ADMIN" || userRole === "SUPERADMIN" || !!hasTutorProfile;
      }

      // Allow access by default if none of the above rules match.
      return true;
    },
  },
  providers: [], // Providers are defined in the main auth.ts
} satisfies NextAuthConfig;