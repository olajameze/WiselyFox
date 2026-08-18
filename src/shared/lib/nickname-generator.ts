/**
 * Generates a randomized, anonymous nickname for a child profile.
 * This ensures privacy by not exposing real names in public-facing components like leaderboards.
 */
export function generateAnonymousNickname(seed: string): string {
  const adjectives = ["Smart", "Clever", "Quick", "Bright", "Witty", "Keen", "Wise"];
  const animals = ["Fox", "Owl", "Eagle", "Panda", "Lion", "Tiger", "Bear"];

  // Use a simple hash-like function for deterministic but varied results based on the seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const adjective = adjectives[Math.abs(hash % adjectives.length)];
  const animal = animals[Math.abs((hash >> 3) % animals.length)];
  const number = Math.abs((hash >> 7) % 1000); // A 3-digit number
  return `${adjective}${animal}${number}`;
}