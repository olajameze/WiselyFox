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
    // The `authorized` callback is used by the middleware to protect routes.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute =
        nextUrl.pathname.startsWith("/parent") ||
        nextUrl.pathname.startsWith("/child");
      return !isProtectedRoute || isLoggedIn;
    },
  },
  providers: [], // Providers are defined in the main auth.ts
} satisfies NextAuthConfig;