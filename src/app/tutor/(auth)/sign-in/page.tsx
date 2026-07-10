import { Suspense } from "react";
import { SignInForm } from "@/features/auth/ui/SignInForm";

export default function TutorSignInPage() {
  return (
    <Suspense>
      <SignInForm variant="tutor" />
    </Suspense>
  );
}
