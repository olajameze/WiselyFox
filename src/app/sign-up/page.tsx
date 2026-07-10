import { Suspense } from "react";
import { SignUpForm } from "@/features/auth/ui/SignUpForm";

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
}
