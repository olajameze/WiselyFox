"use server";

import { ConsentType } from "@prisma/client";
import { prisma } from "@/shared/lib/prisma";
import { requireParentOwner } from "@/shared/lib/permissions";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { CONSENT_VERSION } from "@/shared/lib/consent";
import { logAudit } from "@/server/services/audit.service";
import { z } from "zod";

export async function updateMarketingConsent(
  granted: boolean,
): Promise<ActionResult<{ granted: boolean }>> {
  const user = await requireParentOwner();
  const parent = await prisma.parentProfile.findUnique({ where: { userId: user.id } });
  if (!parent) return fail("Parent profile not found");

  await prisma.consentRecord.create({
    data: {
      parentId: parent.id,
      type: ConsentType.MARKETING,
      granted,
      version: CONSENT_VERSION,
    },
  });

  await logAudit({
    actorId: user.id,
    action: granted ? "consent.marketing.grant" : "consent.marketing.withdraw",
    resource: "ConsentRecord",
    resourceId: parent.id,
  });

  return ok({ granted });
}

const withdrawChildDataSchema = z.object({
  confirm: z.literal(true),
});

/** Withdraw child-data processing consent — disables child accounts until renewed. */
export async function withdrawChildDataConsent(): Promise<ActionResult<null>> {
  const parsed = withdrawChildDataSchema.safeParse({ confirm: true });
  if (!parsed.success) return fail("Confirmation required");

  const user = await requireParentOwner();
  const parent = await prisma.parentProfile.findUnique({
    where: { userId: user.id },
    include: { children: true },
  });
  if (!parent) return fail("Parent profile not found");

  await prisma.consentRecord.create({
    data: {
      parentId: parent.id,
      type: ConsentType.CHILD_DATA,
      granted: false,
      version: CONSENT_VERSION,
    },
  });

  await logAudit({
    actorId: user.id,
    action: "consent.child_data.withdraw",
    resource: "ParentProfile",
    resourceId: parent.id,
    metadata: { childCount: parent.children.length },
  });

  return ok(null);
}

export async function recordChildDataConsent(
  parentId: string,
  actorId: string,
): Promise<void> {
  await prisma.consentRecord.create({
    data: {
      parentId,
      type: ConsentType.CHILD_DATA,
      granted: true,
      version: CONSENT_VERSION,
    },
  });

  await logAudit({
    actorId,
    action: "consent.child_data.grant",
    resource: "ParentProfile",
    resourceId: parentId,
  });
}
