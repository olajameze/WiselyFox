import { LoginFlow } from "@/features/auth/ui/LoginFlow";

export default async function TutorSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  return <LoginFlow defaultRole="tutor" callbackUrl={params.callbackUrl} />;
}
