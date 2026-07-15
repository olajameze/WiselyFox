import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/features/parent/ui/parent.module.css";
import { CONSENT_VERSION } from "@/shared/lib/consent";
import { getSupportEmail, getSupportMailto } from "@/shared/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How WiselyFox collects, uses, and protects family data. Parent consent, child PIN accounts, and your rights.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const supportEmail = getSupportEmail();

  return (
    <div className={`container ${styles.legalPage}`}>
      <h1>Privacy Policy</h1>
      <p>Version {CONSENT_VERSION}. Last updated: {new Date().toLocaleDateString("en-GB")}</p>

      <h2>Who we are</h2>
      <p>
        WiselyFox is a child-safe learning platform for families. Parents create and control all
        child accounts. Contact:{" "}
        <a href={getSupportMailto("Privacy question")}>{supportEmail}</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Service data (contract / legitimate interest):</strong> parent account details,
          child display name, age band, learning progress, assessments, schedules, accessibility
          settings, and rewards needed to run the app.
        </li>
        <li>
          <strong>Marketing data (consent, opt-in only):</strong> parent email for product updates
          if you choose to receive them. Off by default at sign-up.
        </li>
        <li>
          <strong>We never sell identifiable child data.</strong> No third-party ads on child
          screens.
        </li>
      </ul>

      <h2>Children&apos;s data (COPPA / GDPR-minded)</h2>
      <ul>
        <li>Children sign in with a parent-issued access code and PIN only. No child email.</li>
        <li>No public child profiles, social feeds, or location tracking.</li>
        <li>
          Before each child profile is created, a parent must give explicit consent on the
          onboarding screen. Consent is logged with a version number and timestamp.
        </li>
        <li>
          Parents can withdraw child-data consent, export JSON data, or delete the household from
          Settings. After withdrawal, child learning access is paused until consent is renewed.
        </li>
      </ul>

      <h2>Lawful bases (GDPR summary)</h2>
      <ul>
        <li>Account & learning features: performance of our service to the parent.</li>
        <li>Security & fraud prevention: legitimate interest, balanced against your rights.</li>
        <li>Marketing email: consent only, withdraw anytime in Settings.</li>
        <li>Anonymized research exports: anonymization with k-anonymity (minimum 30 learners per cell).</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Parents may access, export, correct, or delete data from{" "}
        <Link href="/parent/settings">Settings</Link> or by emailing{" "}
        <a href={getSupportMailto("Data subject request")}>{supportEmail}</a>. EU/UK users may also
        lodge complaints with their local supervisory authority.
      </p>

      <h2>Retention</h2>
      <ul>
        <li>Active accounts: for the life of the subscription or pilot, plus up to 30 days after closure.</li>
        <li>Audit logs (admin access): 12 months.</li>
        <li>Anonymized aggregates: indefinite, with no identifiable child data.</li>
      </ul>

      <h2>Anonymized research</h2>
      <p>
        We may publish aggregated learning trends for education partners. Cells with fewer than 30
        learners are suppressed. No individual is identifiable.
      </p>

      <h2>Support</h2>
      <p>
        Visit <Link href="/support">Support & pilot feedback</Link> or email{" "}
        <a href={getSupportMailto()}>{supportEmail}</a>.
      </p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </div>
  );
}
