/**
 * Age bands eligible to create a tutor proposal.
 * Proposals are restricted to learners aged 14 and above.
 */
export const PROPOSAL_AGE_BANDS = ["14-16", "17-19", "20-23"] as const;

export type ProposalAgeBand = (typeof PROPOSAL_AGE_BANDS)[number];

export function isProposalEligibleAgeBand(ageBand: string): boolean {
  return (PROPOSAL_AGE_BANDS as readonly string[]).includes(ageBand);
}
