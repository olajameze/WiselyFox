export const STICKER_EMOJIS = [
  "🦊", "⭐", "🎯", "📚", "🏆", "🌟", "🎨", "🚀", "💎", "🌈",
  "🦉", "🐝", "🌻", "🔭", "🧩", "🎵", "🌙", "⚡", "🍀", "🎪",
  "🦋", "🌊", "🔥", "🎸", "🧠", "🛡️", "🎁", "🪴", "🎭", "🧭",
] as const;

export const STICKER_COLORS = [
  "#E8F4EA", "#FFF3E0", "#E3F2FD", "#FCE4EC", "#F3E5F5",
  "#E0F7FA", "#FFF8E1", "#E8EAF6", "#F1F8E9", "#FFEBEE",
] as const;

export const STICKER_ADJECTIVES = [
  "Brave", "Clever", "Swift", "Bright", "Curious", "Bold", "Calm", "Keen",
  "Mighty", "Noble", "Quick", "Wise", "Zesty", "Golden", "Silver",
] as const;

export const STICKER_NOUNS = [
  "Fox", "Star", "Explorer", "Scholar", "Champion", "Spark", "Trail",
  "Badge", "Hero", "Scout", "Pilot", "Guide", "Beacon", "Comet",
] as const;

export type GeneratedSticker = {
  seed: string;
  emoji: string;
  label: string;
  bgColor: string;
};

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(items: readonly T[], hash: number, offset: number): T {
  return items[(hash + offset) % items.length];
}

export function generateQuestSticker(input: {
  childId: string;
  questSlug: string;
  periodStart: Date;
}): GeneratedSticker {
  const seed = `${input.childId}:${input.questSlug}:${input.periodStart.toISOString()}`;
  const hash = hashSeed(seed);
  const adjective = pick(STICKER_ADJECTIVES, hash, 1);
  const noun = pick(STICKER_NOUNS, hash, 3);
  return {
    seed,
    emoji: pick(STICKER_EMOJIS, hash, 0),
    label: `${adjective} ${noun}`,
    bgColor: pick(STICKER_COLORS, hash, 5),
  };
}

export function questXpBonus(questSlug: string): number {
  const bonuses: Record<string, number> = {
    "lessons-week": 20,
    "quiz-week": 25,
    "focus-week": 15,
  };
  return bonuses[questSlug] ?? 15;
}
