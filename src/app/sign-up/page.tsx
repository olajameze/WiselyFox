import { SignUpForm } from "@/features/auth/ui/SignUpForm";

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const params = await searchParams;
  return <SignUpForm plan={params.plan ?? "essential"} />;
}
