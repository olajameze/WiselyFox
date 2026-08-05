import { LoginFlow } from "@/features/auth/ui/LoginFlow";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; role?: string }>;
}) {
  const params = await searchParams;
  const role =
    params.role === "student" || params.role === "parent" || params.role === "tutor"
      ? params.role
      : undefined;
  return <LoginFlow defaultRole={role} callbackUrl={params.callbackUrl} />;
}
