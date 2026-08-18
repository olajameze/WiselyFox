import { SignInForm } from "@/features/auth/ui/SignInForm";

export default function TutorSignInPage({
  searchParams,
}: {
  searchParams: { registered?: string };
}) {
  const wasRegistered = searchParams.registered === "true";

  return (
    <SignInForm
      variant="tutor"
      registered={wasRegistered}
    />
  );
}
