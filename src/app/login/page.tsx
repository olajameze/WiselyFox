import { redirect } from "next/navigation";
import { auth } from "@/features/auth/auth";
import { resolvePostLoginRedirect } from "@/shared/lib/user-capabilities";
import { LoginFlow } from "@/features/auth/ui/LoginFlow";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; role?: string; source?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();

  // If already signed in, send user straight into their dashboard or learning trail
  if (session?.user) {
    const destination = await resolvePostLoginRedirect(session.user.id, session.user.role);
    redirect(destination);
  }

  const role =
    params.role === "student" || params.role === "parent" || params.role === "tutor"
      ? params.role
      : undefined;

  return <LoginFlow defaultRole={role} callbackUrl={params.callbackUrl} />;
}

