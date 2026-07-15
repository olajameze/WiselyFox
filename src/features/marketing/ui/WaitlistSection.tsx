"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Alert, Card } from "@/shared/ui";
import { joinWaitlist } from "@/features/marketing/actions/waitlist.actions";
import { WritingText } from "./WritingText";
import styles from "../styles/marketing.module.css";

export function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const result = await joinWaitlist({
      email,
      name: name.trim() || undefined,
      marketingOptIn,
    });

    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }

    if (result.data.alreadyRegistered) {
      setSuccess("You are already on the waiting list. We will email you when WiselyFox launches.");
      return;
    }

    setSuccess("You are on the list. Check your inbox for a confirmation email.");
    setEmail("");
    setName("");
    setMarketingOptIn(false);
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
          <label className={styles.waitlistCheckbox}>
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
            />
            <span>Send me occasional product updates (optional)</span>
          </label>
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
