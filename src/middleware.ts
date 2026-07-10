import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/features/auth/auth";

const parentRoutes = ["/parent", "/app"];
const childRoutes = ["/child", "/learn"];
const adminRoutes = ["/admin"];
const tutorRoutes = ["/tutor"];
const publicTutorPaths = ["/tutor/sign-up", "/tutor/sign-in"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicTutorPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const session = await auth();
  const role = session?.user?.role;
  const hasParentProfile = session?.user?.hasParentProfile;
  const hasTutorProfile = session?.user?.hasTutorProfile;

  const isProtected =
    parentRoutes.some((r) => pathname.startsWith(r)) ||
    childRoutes.some((r) => pathname.startsWith(r)) ||
    adminRoutes.some((r) => pathname.startsWith(r)) ||
    tutorRoutes.some((r) => pathname.startsWith(r));

  if (!isProtected) return NextResponse.next();

  if (!session?.user) {
    const isTutorRoute = tutorRoutes.some((r) => pathname.startsWith(r));
    const signIn = new URL(isTutorRoute ? "/tutor/sign-in" : "/sign-in", request.url);
    signIn.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signIn);
  }

  if (adminRoutes.some((r) => pathname.startsWith(r)) && role !== "SUPERADMIN" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (childRoutes.some((r) => pathname.startsWith(r)) && role !== "CHILD") {
    return NextResponse.redirect(new URL("/parent", request.url));
  }

  if (parentRoutes.some((r) => pathname.startsWith(r))) {
    if (role === "CHILD") {
      return NextResponse.redirect(new URL("/learn", request.url));
    }
    if (hasTutorProfile && !hasParentProfile) {
      return NextResponse.redirect(new URL("/tutor", request.url));
    }
  }

  if (tutorRoutes.some((r) => pathname.startsWith(r))) {
    if (role === "CHILD") {
      return NextResponse.redirect(new URL("/learn", request.url));
    }
    if (!hasTutorProfile) {
      return NextResponse.redirect(new URL(hasParentProfile ? "/parent/settings" : "/tutor/sign-up", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/parent/:path*",
    "/child/:path*",
    "/learn/:path*",
    "/app/:path*",
    "/admin/:path*",
    "/tutor/:path*",
  ],
};
