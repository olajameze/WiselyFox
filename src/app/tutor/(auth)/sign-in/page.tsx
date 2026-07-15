import { SignInForm } from "@/features/auth/ui/SignInForm";

export default async function TutorSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  return <SignInForm variant="tutor" callbackUrl={params.callbackUrl} />;
}
