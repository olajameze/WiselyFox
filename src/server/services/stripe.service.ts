import Stripe from "stripe";
import { env } from "@/shared/lib/env";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!env.STRIPE_SECRET_KEY) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export function getPriceId(plan: "ESSENTIAL" | "FAMILY", interval: "MONTHLY" | "ANNUAL") {
  const prices: Record<string, string | undefined> = {
    ESSENTIAL_MONTHLY: process.env.STRIPE_PRICE_ESSENTIAL_MONTHLY,
    ESSENTIAL_ANNUAL: process.env.STRIPE_PRICE_ESSENTIAL_ANNUAL,
    FAMILY_MONTHLY: process.env.STRIPE_PRICE_FAMILY_MONTHLY,
    FAMILY_ANNUAL: process.env.STRIPE_PRICE_FAMILY_ANNUAL,
  };
  return prices[`${plan}_${interval}`];
}

export async function cancelStripeSubscription(stripeSubscriptionId: string): Promise<boolean> {
  const stripe = getStripe();
  if (!stripe) return false;
  try {
    await stripe.subscriptions.cancel(stripeSubscriptionId);
    return true;
  } catch {
    return false;
  }
}
