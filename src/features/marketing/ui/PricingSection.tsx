"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button/Button";
import { Badge } from "@/shared/ui/Badge/Badge";
import { Card } from "@/shared/ui/Card/Card";
import { WritingText } from "./WritingText";
import styles from "../styles/marketing.module.css";

const PRICES = {
  monthly: { essential: 5, family: 10 },
  annual: { essential: 50, family: 100 },
};

export function PricingSection() {
  const [interval, setInterval] = useState<"monthly" | "annual">("monthly");
  const prices = PRICES[interval];

  return (
    <div id="pricing" className={styles.pricingSection}>
      <WritingText
        text="Simple, honest pricing"
        as="h2"
        className={`${styles.sectionTitle} ${styles.sectionTitleLearn}`}
        startWhenVisible
        speed={22}
      />
      <WritingText
        text="Family pilot: full access with no card required. Paid plans launch later."
        as="p"
        className={styles.sectionSubtitle}
        startWhenVisible
        speed={12}
        delay={60}
      />

      <div className={styles.toggle} role="group" aria-label="Billing interval">
        <button
          type="button"
          className={[styles.toggleBtn, interval === "monthly" ? styles.toggleActive : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setInterval("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          className={[styles.toggleBtn, interval === "annual" ? styles.toggleActive : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setInterval("annual")}
        >
          Annual
        </button>
      </div>

      <div className={styles.pricingGrid}>
        <Card className={styles.pricingCard}>
          <WritingText
            text="Essential"
            as="h3"
            className={`${styles.cardTitle} ${styles.cardTitleLearn}`}
            startWhenVisible
            speed={18}
          />
          <p>1 child, Full learning access</p>
          <div className={styles.price}>
            £{prices.essential}
            <span>/{interval === "monthly" ? "mo" : "yr"}</span>
          </div>
          {interval === "annual" && <Badge variant="success">Save £10/year</Badge>}
          <p className={styles.pricingNote}>
            Pilot access with no payment during family testing.
          </p>
          <Link href={`/sign-up?plan=essential&interval=${interval}`}>
            <Button fullWidth>Join family pilot</Button>
          </Link>
        </Card>

        <Card className={`${styles.pricingCard} ${styles.popular}`}>
          <Badge>Best for families</Badge>
          <WritingText
            text="Family"
            as="h3"
            className={`${styles.cardTitle} ${styles.cardTitleWarm}`}
            startWhenVisible
            speed={18}
            delay={40}
          />
          <p>Up to 5 children, Household controls</p>
          <div className={styles.price}>
            £{prices.family}
            <span>/{interval === "monthly" ? "mo" : "yr"}</span>
          </div>
          {interval === "annual" && <Badge variant="success">Save £20/year</Badge>}
          <p className={styles.pricingNote}>
            Pilot access with no payment during family testing.
          </p>
          <Link href={`/sign-up?plan=family&interval=${interval}`}>
            <Button fullWidth>Join family pilot</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
