import { Suspense } from "react";
import { ChildSignInForm } from "@/features/auth/ui/ChildSignInForm";

export default function ChildSignInPage() {
  return (
    <Suspense fallback={null}>
      <ChildSignInForm />
    </Suspense>
  );
}
