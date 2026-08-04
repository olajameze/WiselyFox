"use client";

import { useEffect, useMemo, useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import styles from "./tutor.module.css";

function getStripeAppearance() {
  if (typeof window === "undefined") {
    return { theme: "stripe" as const };
  }

  const root = window.getComputedStyle(document.documentElement);
  const colorPrimary = root.getPropertyValue("--color-primary").trim() || "#1746a0";
  const colorText = root.getPropertyValue("--color-text").trim() || "#2c2416";
  const colorBackground = root.getPropertyValue("--color-surface").trim() || "#fffdf8";
  const colorBorder = root.getPropertyValue("--color-border").trim() || "rgba(44, 36, 22, 0.14)";

  return {
    theme: "stripe" as const,
    variables: {
      colorPrimary,
      colorBackground,
      colorText,
      colorTextSecondary: root.getPropertyValue("--color-text-muted").trim() || "#4a4034",
      colorBorder,
      fontFamily: root.getPropertyValue("--font-sans").trim() || "Lexend, system-ui, sans-serif",
      borderRadius: root.getPropertyValue("--radius-md").trim() || "10px",
    },
  };
}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setStatus(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (error) {
      setStatus(error.message ?? "Payment could not be completed.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setStatus("Payment received. Your booking is now secured.");
    } else {
      setStatus("Payment is pending confirmation.");
    }

    setSubmitting(false);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.paymentPanel}>
        <p className={styles.meta}>Complete the secure Stripe payment to finalize the booking.</p>
        <PaymentElement />
      </div>
      {status && <p className={styles.meta}>{status}</p>}
      <button type="submit" className={styles.primaryButton} disabled={!stripe || submitting}>
        {submitting ? "Processing…" : "Confirm payment"}
      </button>
    </form>
  );
}

export function StripeBookingCheckout({ clientSecret }: { clientSecret: string }) {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      setStripePromise(null);
      return;
    }
    setStripePromise(loadStripe(key));
  }, []);

  const options = useMemo(
    () => ({
      clientSecret,
      appearance: getStripeAppearance(),
    }),
    [clientSecret],
  );

  if (!stripePromise) {
    return <p className={styles.meta}>Stripe is not configured for checkout in this environment.</p>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}
