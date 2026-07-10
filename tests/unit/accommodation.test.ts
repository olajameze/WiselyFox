import { describe, it, expect } from "vitest";
import {
  getAccommodationRules,
  mergeAccessibilityFromOnboarding,
  suggestedAccessibilityFromNeeds,
} from "@/features/inclusive/services/accommodation.service";

describe("getAccommodationRules", () => {
  it("returns small chunks for ADHD profile", () => {
    const rules = getAccommodationRules({
      learningNeeds: JSON.stringify(["ADHD"]),
      engagementStyle: "BALANCED",
      sessionLengthMinutes: 15,
      reducedMotion: false,
      calmColors: false,
      hideTimers: false,
    });
    expect(rules.chunkSize).toBe("small");
    expect(rules.breakEveryMinutes).toBe(10);
  });

  it("disables celebrations in calm mode", () => {
    const rules = getAccommodationRules({
      learningNeeds: "[]",
      engagementStyle: "BALANCED",
      sessionLengthMinutes: 15,
      reducedMotion: true,
      calmColors: true,
      hideTimers: false,
    });
    expect(rules.celebrationIntensity).toBe("none");
    expect(rules.calmMode).toBe(true);
  });

  it("hides timers when hideTimers or calm colours enabled", () => {
    const hidden = getAccommodationRules({
      learningNeeds: "[]",
      engagementStyle: "BALANCED",
      sessionLengthMinutes: 15,
      reducedMotion: false,
      calmColors: true,
      hideTimers: false,
    });
    expect(hidden.showTimer).toBe(false);

    const explicit = getAccommodationRules({
      learningNeeds: "[]",
      engagementStyle: "BALANCED",
      sessionLengthMinutes: 15,
      reducedMotion: false,
      calmColors: false,
      hideTimers: true,
    });
    expect(explicit.showTimer).toBe(false);
  });

  it("shows visual schedule for autism and ADHD", () => {
    const autism = getAccommodationRules({
      learningNeeds: JSON.stringify(["AUTISM"]),
      engagementStyle: "BALANCED",
      sessionLengthMinutes: 15,
      reducedMotion: false,
      calmColors: false,
      hideTimers: false,
    });
    expect(autism.showVisualSchedule).toBe(true);

    const adhd = getAccommodationRules({
      learningNeeds: JSON.stringify(["ADHD"]),
      engagementStyle: "BALANCED",
      sessionLengthMinutes: 15,
      reducedMotion: false,
      calmColors: false,
      hideTimers: false,
    });
    expect(adhd.showVisualSchedule).toBe(true);
  });

  it("uses small chunks for dyslexia", () => {
    const rules = getAccommodationRules({
      learningNeeds: JSON.stringify(["DYSLEXIA"]),
      engagementStyle: "BALANCED",
      sessionLengthMinutes: 15,
      reducedMotion: false,
      calmColors: false,
      hideTimers: false,
    });
    expect(rules.chunkSize).toBe("small");
  });
});

describe("suggestedAccessibilityFromNeeds", () => {
  it("maps dyslexia to readable content settings", () => {
    const suggested = suggestedAccessibilityFromNeeds(["DYSLEXIA"]);
    expect(suggested.dyslexiaFriendly).toBe(true);
    expect(suggested.largeText).toBe(true);
  });
});

describe("mergeAccessibilityFromOnboarding", () => {
  it("merges parent choices with learning-need suggestions", () => {
    const merged = mergeAccessibilityFromOnboarding(["ANXIETY", "DYSLEXIA"], {
      reducedMotion: false,
      calmColors: false,
    });
    expect(merged.calmColors).toBe(true);
    expect(merged.hideTimers).toBe(true);
    expect(merged.dyslexiaFriendly).toBe(true);
  });
});
