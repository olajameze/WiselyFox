import type { NextAuthConfig } from "next-auth";

/**
 * Edge-compatible authentication configuration.
 * This object is imported by the middleware and should not contain
 * any Node.js-specific modules like database adapters.
 */
export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      const { hasTutorProfile } = auth?.user || {};
      const { pathname } = nextUrl;

      // Public routes that don't require login
      const publicRoutes = [
        "/",
        "/sign-in",
        "/sign-up",
        "/child-sign-in",
        "/tutors",
        "/privacy",
        "/terms",
        "/support",
      ];

      if (publicRoutes.some((route) => pathname === route)) {
        return true;
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

      if (pathname.startsWith("/tutor")) {
        // This protects the tutor's own dashboard/settings area.
        return userRole === "ADMIN" || !!hasTutorProfile;
      }

      // If a logged-in user tries to access a public-only route like sign-in,
      // redirect them to their dashboard.
      const isAuthRoute =
        pathname === "/sign-in" ||
        pathname === "/sign-up" ||
        pathname === "/child-sign-in";

      if (isAuthRoute) {
        let redirectUrl = "/";
        if (userRole === "PARENT") redirectUrl = "/parent";
        if (userRole === "CHILD") redirectUrl = "/learn";
        if (hasTutorProfile) redirectUrl = "/tutor";

        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      // Allow access by default if none of the above rules match.
      return true;
    },
  },
  providers: [], // Providers are defined in the main auth.ts
} satisfies NextAuthConfig;