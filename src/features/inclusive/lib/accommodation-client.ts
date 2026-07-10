import type { LearningProfile } from "@prisma/client";
import {
  getAccommodationRules,
  type AccommodationRules,
} from "@/features/inclusive/services/accommodation.service";

export type LearnAccommodation = {
  rules: AccommodationRules;
  calm: boolean;
  soundEnabled: boolean;
};

export function buildLearnAccommodation(
  profile: Pick<
    LearningProfile,
    | "learningNeeds"
    | "engagementStyle"
    | "sessionLengthMinutes"
    | "reducedMotion"
    | "calmColors"
    | "hideTimers"
    | "soundEnabled"
  >,
): LearnAccommodation {
  const rules = getAccommodationRules(profile);
  return {
    rules,
    calm: profile.calmColors || profile.reducedMotion,
    soundEnabled: profile.soundEnabled,
  };
}

/** Props passed from server pages into interactive learn components. */
export type AccommodationUiProps = {
  chunkSize: AccommodationRules["chunkSize"];
  showTimer: boolean;
  celebrationIntensity: AccommodationRules["celebrationIntensity"];
  breakEveryMinutes: number | null;
  hintDelaySeconds: number;
  calm: boolean;
  soundEnabled: boolean;
};

export function toAccommodationUiProps(accommodation: LearnAccommodation): AccommodationUiProps {
  return {
    chunkSize: accommodation.rules.chunkSize,
    showTimer: accommodation.rules.showTimer,
    celebrationIntensity: accommodation.rules.celebrationIntensity,
    breakEveryMinutes: accommodation.rules.breakEveryMinutes,
    hintDelaySeconds: accommodation.rules.hintDelaySeconds,
    calm: accommodation.calm,
    soundEnabled: accommodation.soundEnabled,
  };
}
