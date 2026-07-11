import { describe, it, expect } from "vitest";
import {
  generateQuestSticker,
  questXpBonus,
  STICKER_EMOJIS,
} from "@/features/gamification/services/sticker-generator.service";

describe("generateQuestSticker", () => {
  const periodStart = new Date("2026-07-06T00:00:00.000Z");

  it("generates deterministic stickers for the same seed", () => {
    const input = { childId: "child-1", questSlug: "lessons-week", periodStart };
    const a = generateQuestSticker(input);
    const b = generateQuestSticker(input);
    expect(a).toEqual(b);
  });

  it("generates different stickers for different quests", () => {
    const a = generateQuestSticker({ childId: "child-1", questSlug: "lessons-week", periodStart });
    const b = generateQuestSticker({ childId: "child-1", questSlug: "quiz-week", periodStart });
    expect(a.seed).not.toBe(b.seed);
  });

  it("uses valid emoji from the pool", () => {
    const sticker = generateQuestSticker({
      childId: "child-2",
      questSlug: "focus-week",
      periodStart,
    });
    expect(STICKER_EMOJIS).toContain(sticker.emoji);
    expect(sticker.label.length).toBeGreaterThan(0);
    expect(sticker.bgColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it("returns quest XP bonuses", () => {
    expect(questXpBonus("quiz-week")).toBe(25);
    expect(questXpBonus("unknown")).toBe(15);
  });
});
