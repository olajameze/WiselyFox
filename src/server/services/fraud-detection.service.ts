const DISPOSABLE_DOMAINS = ["mailinator.com", "tempmail.com", "guerrillamail.com"];

export function scoreSignupFraud(email: string, ipHash?: string): number {
  let score = 0;
  const domain = email.split("@")[1]?.toLowerCase();
  if (domain && DISPOSABLE_DOMAINS.includes(domain)) score += 50;
  if (!email.includes(".")) score += 20;
  if (ipHash) score += 0;
  return score;
}

export function shouldFlagForReview(score: number): boolean {
  return score >= 50;
}

export function shouldBlock(score: number): boolean {
  return score >= 80;
}
