import type { LearningProfile, EngagementStyle } from "@prisma/client";

export type AccommodationRules = {
  chunkSize: "small" | "medium" | "large";
  showTimer: boolean;
  hintDelaySeconds: number;
  celebrationIntensity: "none" | "low" | "medium" | "high";
  breakEveryMinutes: number | null;
  showVisualSchedule: boolean;
  /** True when calm colours + reduced motion combine for full calm mode. */
  calmMode: boolean;
};

export function getAccommodationRules(
  profile: Pick<
    LearningProfile,
    | "learningNeeds"
    | "engagementStyle"
    | "sessionLengthMinutes"
    | "reducedMotion"
    | "calmColors"
    | "hideTimers"
  >,
): AccommodationRules {
  const needs: string[] = JSON.parse(profile.learningNeeds || "[]");
  const hasAdhd = needs.includes("ADHD");
  const hasAutism = needs.includes("AUTISM");
  const hasAnxiety = needs.includes("ANXIETY");
  const hasDyslexia = needs.includes("DYSLEXIA");
  const hasProcessing = needs.includes("PROCESSING");
  const calmMode = profile.calmColors && profile.reducedMotion;
  const needsSmallChunks = hasAdhd || hasAutism || hasDyslexia || hasProcessing;

  let celebrationIntensity: AccommodationRules["celebrationIntensity"] = "medium";
  if (profile.engagementStyle === "GENTLE" || hasAnxiety) celebrationIntensity = "low";
  if (profile.engagementStyle === "ENERGETIC") celebrationIntensity = "high";
  if (profile.reducedMotion || profile.calmColors || calmMode) celebrationIntensity = "none";

  const hideTimers =
    profile.hideTimers || profile.calmColors || hasAnxiety || calmMode;

  return {
    chunkSize: needsSmallChunks ? "small" : "medium",
    showTimer: !hideTimers,
    hintDelaySeconds: hasAdhd ? 5 : 15,
    celebrationIntensity,
    breakEveryMinutes: hasAdhd ? Math.min(profile.sessionLengthMinutes, 10) : null,
    showVisualSchedule: hasAutism || hasAdhd,
    calmMode,
  };
}

/** Suggest profile flags from onboarding learning needs. */
export function suggestedAccessibilityFromNeeds(learningNeeds: string[]): {
  calmColors: boolean;
  reducedMotion: boolean;
  hideTimers: boolean;
  dyslexiaFriendly: boolean;
  largeText: boolean;
} {
  const needs = new Set(learningNeeds);
  return {
    calmColors: needs.has("ANXIETY") || needs.has("AUTISM"),
    reducedMotion: needs.has("ANXIETY") || needs.has("AUTISM"),
    hideTimers: needs.has("ANXIETY"),
    dyslexiaFriendly: needs.has("DYSLEXIA"),
    largeText: needs.has("DYSLEXIA"),
  };
}

/** Merge parent onboarding choices with strengths-based suggestions from learning needs. */
export function mergeAccessibilityFromOnboarding(
  learningNeeds: string[],
  choices: { reducedMotion: boolean; calmColors: boolean },
): {
  reducedMotion: boolean;
  calmColors: boolean;
  hideTimers: boolean;
  dyslexiaFriendly: boolean;
  largeText: boolean;
} {
  const suggested = suggestedAccessibilityFromNeeds(learningNeeds);
  return {
    reducedMotion: choices.reducedMotion || suggested.reducedMotion,
    calmColors: choices.calmColors || suggested.calmColors,
    hideTimers: suggested.hideTimers,
    dyslexiaFriendly: suggested.dyslexiaFriendly,
    largeText: suggested.largeText,
  };
}
