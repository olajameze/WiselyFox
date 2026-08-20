import { prisma } from "@/shared/lib/prisma";
import { getStripe } from "@/server/services/stripe.service";
import { env } from "@/shared/lib/env";
import { PlanTier, BillingInterval } from "@prisma/client";

export const BILLING_PLANS = {
  [PlanTier.ESSENTIAL]: {
    label: "Individual",
    [BillingInterval.MONTHLY]: { price: 500, display: "£5 / month" },
    [BillingInterval.ANNUAL]: { price: 3600, display: "£36 / year" },
  },
  [PlanTier.FAMILY]: {
    label: "Family",
    [BillingInterval.MONTHLY]: { price: 1000, display: "£10 / month" },
    [BillingInterval.ANNUAL]: { price: 7200, display: "£72 / year" },
  },
} as const;

export function getCheckoutPriceId(
  plan: PlanTier,
  interval: BillingInterval,
): string | undefined {
  const prices: Record<string, string | undefined> = {
    [`${PlanTier.ESSENTIAL}_${BillingInterval.MONTHLY}`]: env.STRIPE_PRICE_ESSENTIAL_MONTHLY,
    [`${PlanTier.ESSENTIAL}_${BillingInterval.ANNUAL}`]: env.STRIPE_PRICE_ESSENTIAL_ANNUAL,
    [`${PlanTier.FAMILY}_${BillingInterval.MONTHLY}`]: env.STRIPE_PRICE_FAMILY_MONTHLY,
    [`${PlanTier.FAMILY}_${BillingInterval.ANNUAL}`]: env.STRIPE_PRICE_FAMILY_ANNUAL,
  };
  return prices[`${plan}_${interval}`];
}

export async function createCheckoutSession(input: {
  parentUserId: string;
  plan: PlanTier;
  interval: BillingInterval;
}): Promise<{ url: string }> {
  const stripe = getStripe();
  if (!stripe) {
    throw new Error("Billing is not configured");
  }

  const priceId = getCheckoutPriceId(input.plan, input.interval);
  if (!priceId) {
    throw new Error("No price configured for this plan");
  }

  const parent = await prisma.parentProfile.findUnique({
    where: { userId: input.parentUserId },
    include: { subscription: true },
  });
  if (!parent) {
    throw new Error("Parent profile not found");
  }

  const baseUrl = env.AUTH_URL ?? `http://localhost:${process.env.PORT ?? 3000}`;
  const dbSubscription = parent.subscription;

  // Ensure the parent has a Stripe customer id so recurring invoices link to the household.
  let customerId = dbSubscription?.stripeCustomerId;
  if (!customerId) {
    const user = await prisma.user.findUnique({
      where: { id: input.parentUserId },
      select: { email: true, name: true },
    });
    const customer = await stripe.customers.create({
      email: user?.email ?? undefined,
      name: user?.name ?? undefined,
      metadata: { parentId: parent.id },
    });
    customerId = customer.id;
    if (dbSubscription) {
      await prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: { stripeCustomerId: customer.id },
      });
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/parent/settings?billing=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/parent/settings?billing=cancelled`,
    client_reference_id: parent.id,
    metadata: {
      parentId: parent.id,
      plan: input.plan,
      interval: input.interval,
    },
    subscription_data: {
      metadata: {
        parentId: parent.id,
        plan: input.plan,
        interval: input.interval,
      },
    },
  });

  return { url: session.url ?? "" };
}
