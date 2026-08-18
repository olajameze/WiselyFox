import { AdaptiveGamificationHub } from "@/shared/lib/AdaptiveGamificationHub";

export default async function StudentDashboardPage() {
  return (
    // The AdaptiveGamificationHub will render the appropriate age-band specific UI
    // This replaces the previous hardcoded student dashboard content.
    <AdaptiveGamificationHub />
  );
}
