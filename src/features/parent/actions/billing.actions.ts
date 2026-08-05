"use server";

import { z } from "zod";
import { requireParentOwner } from "@/shared/lib/permissions";
import { fail, ok, type ActionResult } from "@/shared/lib/errors";
import { logAudit } from "@/server/services/audit.service";
import { createCheckoutSession } from "@/server/services/billing.service";
import { PlanTier, BillingInterval } from "@prisma/client";

const checkoutSchema = z.object({
  plan: z.nativeEnum(PlanTier),
  interval: z.nativeEnum(BillingInterval),
});

export async function createCheckoutSessionAction(
  input: z.infer<typeof checkoutSchema>,
): Promise<ActionResult<{ url: string }>> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid plan");
  }

  // Parent-only RBAC: only authenticated parent accounts may activate billing.
  const user = await requireParentOwner();

  try {
    const { url } = await createCheckoutSession({
      parentUserId: user.id,
      plan: parsed.data.plan,
      interval: parsed.data.interval,
    });

    await logAudit({
      actorId: user.id,
      action: "billing.checkout.session_created",
      resource: "Subscription",
      resourceId: `${parsed.data.plan}_${parsed.data.interval}`,
    });

    return ok({ url });
  } catch (error) {
    return fail(error instanceof Error ? error.message : "Unable to start checkout");
  }
}
