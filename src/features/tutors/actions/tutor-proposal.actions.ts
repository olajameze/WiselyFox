"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/shared/lib/prisma";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import {
  requireAuth,
  requireParentOwner,
  assertHouseholdAccess,
} from "@/shared/lib/permissions";
import { logAudit } from "@/server/services/audit.service";
import { createCheckoutSession } from "@/server/services/billing.service";
import { PlanTier, BillingInterval, ProposalStatus } from "@prisma/client";
import { isProposalEligibleAgeBand } from "@/features/tutors/lib/tutor-proposal";

const createProposalSchema = z.object({
  tutorId: z.string().min(1),
  notes: z.string().max(1000).optional(),
});

export async function createTutorProposalAction(
  input: z.infer<typeof createProposalSchema>,
): Promise<ActionResult<{ proposalId: string }>> {
  const parsed = createProposalSchema.safeParse(input);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid proposal");
  }

  // Only authenticated users may create a proposal.
  const user = await requireAuth();

  // The active profile must be a child (student) in the 14-16, 17-19, or 20-23 age band.
  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
    include: { parent: true },
  });
  if (!child) {
    return fail("A student profile is required to create a proposal");
  }
  if (!isProposalEligibleAgeBand(child.ageBand)) {
    return fail("Proposals are available for learners aged 14 and above");
  }

  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: parsed.data.tutorId },
    include: { user: true },
  });
  if (!tutor || !tutor.published) {
    return fail("Tutor not found");
  }

  const proposal = await prisma.tutorProposal.create({
    data: {
      studentId: user.id,
      tutorId: tutor.userId,
      parentId: child.parentId,
      notes: parsed.data.notes,
      status: ProposalStatus.PENDING_PARENT_APPROVAL,
    },
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.proposal.create",
    resource: "TutorProposal",
    resourceId: proposal.id,
  });

  revalidatePath("/parent");
  return ok({ proposalId: proposal.id });
}

const approveProposalSchema = z.object({
  proposalId: z.string().min(1),
});

export async function approveProposalAndCheckoutAction(
  input: z.infer<typeof approveProposalSchema>,
): Promise<ActionResult<{ url: string }>> {
  const parsed = approveProposalSchema.safeParse(input);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid proposal");
  }

  // Parent-only RBAC: only the managing parent may approve a proposal.
  const user = await requireParentOwner();

  const proposal = await prisma.tutorProposal.findUnique({
    where: { id: parsed.data.proposalId },
    include: { student: true },
  });
  if (!proposal) return fail("Proposal not found");
  if (proposal.status !== ProposalStatus.PENDING_PARENT_APPROVAL) {
    return fail("This proposal is no longer pending approval");
  }

  // Verify the parent manages the student's household.
  const child = await prisma.childProfile.findFirst({
    where: { userId: proposal.studentId },
    select: { id: true, parentId: true },
  });
  if (!child || child.parentId !== proposal.parentId) {
    return fail("You do not manage this student's account");
  }
  await assertHouseholdAccess(child.id, user.id);

  // Mark the proposal as approved and trigger the Stripe purchase redirect.
  await prisma.tutorProposal.update({
    where: { id: proposal.id },
    data: { status: ProposalStatus.APPROVED_AND_PAID },
  });

  const { url } = await createCheckoutSession({
    parentUserId: user.id,
    plan: PlanTier.ESSENTIAL,
    interval: BillingInterval.MONTHLY,
  });

  await logAudit({
    actorId: user.id,
    action: "tutor.proposal.approve",
    resource: "TutorProposal",
    resourceId: proposal.id,
  });

  revalidatePath("/parent");
  return ok({ url });
}
