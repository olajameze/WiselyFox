import NextAuth from "next-auth";
import { authConfig } from "@/features/auth/auth.config";

// The `auth` middleware is exported from the edge-compatible config.
// This prevents the Prisma adapter from being bundled into the middleware.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // The matcher protects all routes except for static assets and API routes.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
