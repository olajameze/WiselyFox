import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/features/parent/ui/parent.module.css";
import { CONSENT_VERSION } from "@/shared/lib/consent";
import { getSupportEmail, getSupportMailto } from "@/shared/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using WiselyFox, the child-safe parent-guided learning platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const supportEmail = getSupportEmail();

  return (
    <div className={`container ${styles.legalPage}`}>
      <h1>Terms of Service</h1>
      <p>Version {CONSENT_VERSION}. Last updated: {new Date().toLocaleDateString("en-GB")}</p>

      <h2>1. Who may use WiselyFox</h2>
      <p>
        WiselyFox is a parent-guided learning service for families. Parent accounts must be created
        by an adult (18+). Children use PIN-only accounts issued by their parent. You must provide
        accurate information and keep credentials secure.
      </p>

      <h2>2. Parent responsibility</h2>
      <p>
        Parents are responsible for supervising child use, managing accessibility settings, approving
        rewards, and providing verifiable consent before a child profile is created. You may export or
        delete household data from Settings at any time.
      </p>

      <h2>3. Acceptable use</h2>
      <ul>
        <li>No harassment, abuse, or attempts to bypass security controls.</li>
        <li>No scraping, reverse engineering, or automated access without permission.</li>
        <li>No misuse of child access codes or sharing PINs publicly.</li>
      </ul>

      <h2>4. Family pilot</h2>
      <p>
        During the family pilot, billing may be disabled and features may change as we improve the
        product. We will give reasonable notice before enabling paid plans.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        Curriculum content, software, and branding remain WiselyFox property. You receive a limited
        personal, non-commercial licence to use the service for household learning.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        WiselyFox supports learning but is not a medical, diagnostic, or emergency service.
        Accommodations are strengths-based tools, not clinical treatment. Contact local professionals
        for health or safeguarding emergencies.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={getSupportMailto("Terms of Service question")}>{supportEmail}</a>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link> and <Link href="/support">Support</Link> page.
      </p>

      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </div>
  );
}
