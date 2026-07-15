import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/features/parent/ui/parent.module.css";
import { getPilotCoordinatorEmail, getPilotFeedbackUrl, getSupportEmail, getSupportMailto } from "@/shared/lib/site-config";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with WiselyFox accounts, accessibility, data requests, and the family pilot.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  const supportEmail = getSupportEmail();
  const coordinatorEmail = getPilotCoordinatorEmail();
  const feedbackUrl = getPilotFeedbackUrl();

  return (
    <div className={`container ${styles.legalPage}`}>
      <h1>Support & pilot feedback</h1>
      <p>We are here to help families during the WiselyFox family pilot.</p>

      <h2>General support</h2>
      <p>
        Email{" "}
        <a href={getSupportMailto("WiselyFox support request")}>{supportEmail}</a> for account help,
        accessibility questions, or data requests (export, correction, deletion).
      </p>

      <h2>Family pilot coordinator</h2>
      <p>
        Pilot families can reach the coordinator at{" "}
        <a href={`mailto:${coordinatorEmail}`}>{coordinatorEmail}</a> for onboarding help, feedback,
        or scheduling a walkthrough.
      </p>

      {feedbackUrl ? (
        <>
          <h2>Share feedback</h2>
          <p>
            <a href={feedbackUrl} target="_blank" rel="noopener noreferrer">
              Open the pilot feedback form
            </a>
          </p>
        </>
      ) : (
        <p className={styles.meta}>
          Feedback form URL not configured yet. Email the coordinator with your thoughts on lessons,
          schedules, and accessibility.
        </p>
      )}

      <h2>Privacy & data rights</h2>
      <p>
        Parents control all child data. You can export or delete data from{" "}
        <Link href="/parent/settings">Settings</Link>, or email{" "}
        <a href={getSupportMailto("Data subject request")}>{supportEmail}</a>. See our{" "}
        <Link href="/privacy">Privacy Policy</Link> for GDPR rights and child data practices.
      </p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </div>
  );
}
