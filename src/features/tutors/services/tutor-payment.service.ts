import Stripe from "stripe";
import { prisma } from "@/shared/lib/prisma";
import { getStripe } from "@/server/services/stripe.service";
import { calculatePlatformFee } from "@/features/tutors/lib/tutor-fee";
import { TUTOR_CONSENT_VERSION } from "@/features/tutors/lib/tutor-consent";
import { env } from "@/shared/lib/env";

export async function createTutorConnectAccount(tutorId: string, email: string) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe is not configured");

  const account = await stripe.accounts.create({
    type: "express",
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    metadata: { tutorId },
  });

  await prisma.tutorProfile.update({
    where: { id: tutorId },
    data: { stripeAccountId: account.id },
  });

  return account.id;
}

export async function createTutorConnectOnboardingLink(
  tutorId: string,
  returnUrl: string,
  refreshUrl: string,
) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe is not configured");

  const tutor = await prisma.tutorProfile.findUnique({ where: { id: tutorId } });
  if (!tutor?.stripeAccountId) throw new Error("Tutor Stripe account not found");

  const link = await stripe.accountLinks.create({
    account: tutor.stripeAccountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: "account_onboarding",
  });

  return link.url;
}

export async function createTutorPaymentIntent(input: {
  bookingId: string;
  amountPence: number;
  tutorStripeAccountId: string;
  parentStripeCustomerId?: string;
}) {
  const stripe = getStripe();
  if (!stripe) throw new Error("Stripe is not configured");

  const platformFee = calculatePlatformFee(input.amountPence, env.TUTOR_PLATFORM_FEE_BPS);

  const intent = await stripe.paymentIntents.create({
    amount: input.amountPence,
    currency: "gbp",
    application_fee_amount: platformFee,
    transfer_data: { destination: input.tutorStripeAccountId },
    customer: input.parentStripeCustomerId,
    metadata: { bookingId: input.bookingId },
  });

  await prisma.tutorBooking.update({
    where: { id: input.bookingId },
    data: {
      platformFeePence: platformFee,
      stripePaymentIntentId: intent.id,
      feeTermsVersion: TUTOR_CONSENT_VERSION,
    },
  });

  return intent;
}

export async function handleTutorPaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata?.bookingId;
  if (!bookingId) return;

  const booking = await prisma.tutorBooking.findUnique({
    where: { id: bookingId },
    include: { tutor: true },
  });
  if (!booking) return;

  const isDeposit = Boolean(booking.depositPence && paymentIntent.amount === booking.depositPence);

  await prisma.tutorBooking.update({
    where: { id: bookingId },
    data: {
      status: isDeposit ? "DEPOSIT_PAID" : "COMPLETED",
    },
  });
}
