import { redirect } from "next/navigation";
import Link from "next/link";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { getAccommodationRules } from "@/features/inclusive/services/accommodation.service";
import { buildLearnAccommodation, toAccommodationUiProps } from "@/features/inclusive/lib/accommodation-client";
import { FocusTimer } from "@/features/learning/ui/FocusTimer";
import { Alert, Button } from "@/shared/ui";

export default async function FocusTimerPage() {
  const user = await requireChild();
  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
    include: { learningProfile: true },
  });
  if (!child?.learningProfile) redirect("/child-sign-in");

  const profile = child.learningProfile;
  const accommodation = buildLearnAccommodation(profile);
  const ui = toAccommodationUiProps(accommodation);
  const rules = getAccommodationRules(profile);

  if (!rules.showTimer) {
    return (
      <>
        <Alert variant="info" title="Calm mode, timers hidden">
          Focus countdowns are turned off to reduce pressure. Browse lessons at your own pace instead.
        </Alert>
        <Link href="/learn/subjects">
          <Button size="sm">Open lessons</Button>
        </Link>
      </>
    );
  }

  return (
    <FocusTimer
      sessionMinutes={profile.sessionLengthMinutes}
      reducedMotion={profile.reducedMotion}
      soundEnabled={ui.soundEnabled}
      calm={ui.calm}
      showTimer={ui.showTimer}
      breakEveryMinutes={ui.breakEveryMinutes}
      celebrationIntensity={ui.celebrationIntensity}
    />
  );
}
