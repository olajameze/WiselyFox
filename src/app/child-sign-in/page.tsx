import { ChildSignInForm } from "@/features/auth/ui/ChildSignInForm";

export default async function ChildSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return <ChildSignInForm consentError={params.error === "consent"} />;
}
