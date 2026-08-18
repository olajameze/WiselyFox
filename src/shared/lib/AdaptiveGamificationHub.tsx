import { auth } from "@/features/auth/auth";
import { prisma as db } from "@/shared/lib/prisma";
import { IntroCard } from "./IntroCard";
import { ActivityHub } from "./ActivityHub";
import { CohortScorecard } from "./CohortScorecard";
import { AdultLabLog } from "./AdultLabLog";
import { VelocityLedger } from "./VelocityLedger";

/**
 * Server Component that dynamically loads gamification UI based on the student's age band.
 * Ensures age-appropriate content and aesthetic.
 */
export async function AdaptiveGamificationHub() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    // This should ideally be caught by the dashboard layout's RBAC, but as a safeguard.
    return <p>Authentication required.</p>;
  }

  const childProfile = await db.childProfile.findUnique({
    where: { userId: userId },
    select: { ageBand: true },
  });

  const ageBand = childProfile?.ageBand;

  if (ageBand === "5-7" || ageBand === "8-10") {
    return (
      <>
        <IntroCard />
        <ActivityHub />
        <CohortScorecard />
      </>
    );
  } else if (
    ageBand === "11-13" ||
    ageBand === "14-16" ||
    ageBand === "17-19" ||
    ageBand === "20-23"
  ) {
    return (
      <>
        <AdultLabLog />
        <VelocityLedger />
      </>
    );
  }

  // Default or fallback for unknown age bands
  return (
    <div>
      <p>Welcome to your learning hub!</p>
      <p>Your age band ({ageBand ?? "unknown"}) is not configured for a specific gamification view.</p>
    </div>
  );
}