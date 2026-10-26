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
  void plan;
  void interval;
  // Parents/learners use WiselyFox for free. The only paid price was the
  // removed learning subscription; tutors pay the 5% platform fee instead.
  return undefined;
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
