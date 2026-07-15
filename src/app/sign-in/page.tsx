import { SignInForm } from "@/features/auth/ui/SignInForm";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; registered?: string }>;
}) {
  const params = await searchParams;
  return (
    <SignInForm
      callbackUrl={params.callbackUrl}
      registered={params.registered === "1"}
    />
  );
}
