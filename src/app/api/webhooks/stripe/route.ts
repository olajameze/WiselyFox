import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/shared/lib/prisma";
import { env } from "@/shared/lib/env";
import { getStripe } from "@/server/services/stripe.service";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription & { current_period_end?: number };
    const dbSub = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: sub.id },
    });
    if (dbSub) {
      const statusMap: Record<string, "ACTIVE" | "CANCELED" | "PAST_DUE" | "TRIALING"> = {
        active: "ACTIVE",
        trialing: "TRIALING",
        past_due: "PAST_DUE",
        canceled: "CANCELED",
      };
      await prisma.subscription.update({
        where: { id: dbSub.id },
        data: {
          status: statusMap[sub.status] ?? "ACTIVE",
          currentPeriodEnd: sub.current_period_end
            ? new Date(sub.current_period_end * 1000)
            : undefined,
        },
      });
    }
  }

  if (event.type === "invoice.payment_failed") {
    const invoice = event.data.object as Stripe.Invoice & {
      subscription?: string | Stripe.Subscription | null;
    };
    if (invoice.subscription) {
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: String(invoice.subscription) },
        data: { status: "PAST_DUE" },
      });
    }
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const bookingId = paymentIntent.metadata?.bookingId;
    if (bookingId) {
      const { handleTutorPaymentSucceeded } = await import(
        "@/features/tutors/services/tutor-payment.service"
      );
      await handleTutorPaymentSucceeded(paymentIntent);
    }
  }

  if (event.type === "account.updated") {
    const account = event.data.object as Stripe.Account;
    if (account.metadata?.tutorId && account.charges_enabled) {
      await prisma.tutorProfile.updateMany({
        where: { id: account.metadata.tutorId },
        data: { stripeAccountId: account.id },
      });
    }
  }

  return NextResponse.json({ received: true });
}
