import { describe, it, expect } from "vitest";
import {
  PROPOSAL_AGE_BANDS,
  isProposalEligibleAgeBand,
} from "@/features/tutors/lib/tutor-proposal";

describe("tutor proposal age bands", () => {
  it("restricts proposals to learners aged 14 and above", () => {
    expect(PROPOSAL_AGE_BANDS).toEqual(["14-16", "17-19", "20-23"]);
  });

  it("flags eligible teen and young-adult bands", () => {
    expect(isProposalEligibleAgeBand("14-16")).toBe(true);
    expect(isProposalEligibleAgeBand("17-19")).toBe(true);
    expect(isProposalEligibleAgeBand("20-23")).toBe(true);
  });

  it("blocks younger ten-year age bands", () => {
    expect(isProposalEligibleAgeBand("5-7")).toBe(false);
    expect(isProposalEligibleAgeBand("8-10")).toBe(false);
    expect(isProposalEligibleAgeBand("11-13")).toBe(false);
  });

  it("returns false for unknown bands", () => {
    expect(isProposalEligibleAgeBand("99-100")).toBe(false);
    expect(isProposalEligibleAgeBand("")).toBe(false);
  });
});

