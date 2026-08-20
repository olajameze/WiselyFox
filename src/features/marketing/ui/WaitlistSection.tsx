"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button, Input, Alert, Card } from "@/shared/ui";
import { joinWaitlistAction } from "@/features/marketing/actions/waitlist.actions";
import { WritingText } from "./WritingText";
import { TurnstileWidget, type TurnstileApi } from "./TurnstileWidget";
import { AGE_BANDS, AGE_BAND_LABELS, type AgeBand } from "@/data/age-bands";
import styles from "../styles/marketing.module.css";

const NEXT_PUBLIC_TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [ageBands, setAgeBands] = useState<AgeBand[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileApiRef = useRef<TurnstileApi | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleAgeBand(band: AgeBand) {
    setAgeBands((prev) =>
      prev.includes(band) ? prev.filter((b) => b !== band) : [...prev, band],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setLoading(false);
      setError("Please complete the security check before joining.");
      return;
    }

    const result = await joinWaitlistAction({
      email,
      name: name.trim() || undefined,
      ageBands,
      marketingOptIn,
      turnstileToken,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      turnstileApiRef.current?.reset();
      return;
    }

    if (result.data.alreadyRegistered) {
      setSuccess("You are already on the waiting list. We will email you when WiselyFox launches.");
      turnstileApiRef.current?.reset();
      setTurnstileToken("");
      return;
    }

    setSuccess("You are on the list. Check your inbox for a priority confirmation email.");
    setEmail("");
    setName("");
    setAgeBands([]);
    setMarketingOptIn(false);
    turnstileApiRef.current?.reset();
    setTurnstileToken("");
  }

  return (
    <section
      id="waitlist"
      className={`${styles.section} ${styles.notebookSection} ${styles.notebookSectionAlt}`}
    >
      <WritingText
        text="Join the waiting list"
        as="h2"
        className={`${styles.sectionTitle} ${styles.sectionTitleTrust}`}
        startWhenVisible
        speed={22}
      />
      <WritingText
        text="Get an email when WiselyFox launches publicly. No account required today."
        as="p"
        className={styles.sectionSubtitle}
        startWhenVisible
        speed={12}
        delay={60}
      />

      <Card className={styles.waitlistCard}>
        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <form className={styles.waitlistForm} onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <div className={styles.waitlistFieldset} role="group" aria-labelledby="age-bands-legend">
            <span id="age-bands-legend" className={styles.waitlistLegend}>
              Age bands that interest you
            </span>
            <div className={styles.waitlistChips}>
              {AGE_BANDS.map((band) => (
                <label key={band} className={styles.waitlistChip}>
                  <input
                    type="checkbox"
                    name="ageBands"
                    value={band}
                    checked={ageBands.includes(band)}
                    onChange={() => toggleAgeBand(band)}
                  />
                  <span>{AGE_BAND_LABELS[band]}</span>
                </label>
              ))}
            </div>
          </div>

          <label className={styles.waitlistCheckbox}>
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
            />
            <span>Send me occasional product updates (optional)</span>
          </label>

          {NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <TurnstileWidget
              siteKey={NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              onTokenChange={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken("")}
              apiRef={turnstileApiRef}
            />
          )}

          <p className={styles.waitlistLegal}>
            We use your email only to notify you about launch and optional updates you choose. See
            our{" "}
            <Link href="/privacy" target="_blank">
              Privacy Policy
            </Link>
            .
          </p>
          <div className={styles.waitlistActions}>
            <Button type="submit" loading={loading}>
              Join waiting list
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}
