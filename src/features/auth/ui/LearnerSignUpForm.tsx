"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Card, Alert } from "@/shared/ui";
import { PasswordField } from "@/shared/ui/PasswordField/PasswordField";
import { signInWithEmail, signUpLearner } from "@/features/auth/actions/auth.actions";
import styles from "./auth.module.css";

export function LearnerSignUpForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = await signUpLearner({
      name: formData.get("name") as string,
      email,
      password,
      ageBand: formData.get("ageBand") as "17-19" | "20-23" | "24+",
      ageConfirmed: formData.get("ageConfirmed") === "on",
      learnerDataConsent: formData.get("learnerDataConsent") === "on",
      marketingOptIn: formData.get("marketing") === "on",
      termsAccepted: formData.get("terms") === "on",
      privacyAccepted: formData.get("privacy") === "on",
    });

    if (!result.success) {
      setLoading(false);
      setError(result.error);
      return;
    }

    const loginResult = await signInWithEmail({ email, password, role: "learner" });
    if (loginResult.success) {
      window.location.assign(loginResult.data.redirectTo);
      return;
    }
    window.location.assign("/sign-in?role=learner&registered=1");
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.notebookOpen}>
        <div className={styles.bookSpine} aria-hidden="true" />
        <Card className={styles.authCard}>
          <div className={styles.pageMeta}>
            <span>WiselyFox</span>
            <span>Learner account</span>
          </div>
          <h1 className={styles.authTitle}>Make this space yours.</h1>
          <p className={styles.authSubtitle}>
            Create an independent account for learners aged 18 and older. No date of birth is
            collected or stored.
          </p>
          {error && <Alert variant="error">{error}</Alert>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input name="name" label="Your name" required autoComplete="name" />
            <Input name="email" type="email" label="Email address" required autoComplete="email" />
            <PasswordField
              name="password"
              label="Password"
              required
              minLength={10}
              helperText="At least 10 characters, with an uppercase letter, a number and a special character (!@#$%)"
              autoComplete="new-password"
            />

            <label className={styles.selectLabel} htmlFor="ageBand">
              Broad age range
            </label>
            <select id="ageBand" name="ageBand" className={styles.select} defaultValue="17-19">
              <option value="17-19">17–19</option>
              <option value="20-23">20–23</option>
              <option value="24+">24 or older</option>
            </select>
            <p className={styles.legalNote}>
              Ages 24 and older can use the full curriculum; age-tailored content currently goes
              through age 23.
            </p>

            <label className={styles.checkbox}>
              <input type="checkbox" name="ageConfirmed" required />
              <span>I confirm that I am 18 or older.</span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" name="learnerDataConsent" required />
              <span>
                I agree to WiselyFox storing my learning profile and progress to provide this
                service.
              </span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" name="terms" required />
              <span>
                I agree to the <Link href="/terms" target="_blank">Terms of Service</Link>.
              </span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" name="privacy" required />
              <span>
                I have read the <Link href="/privacy" target="_blank">Privacy Policy</Link>.
              </span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" name="marketing" />
              <span>Send me product tips and updates (optional).</span>
            </label>

            <div className={styles.formActions}>
              <Button type="submit" loading={loading} className={styles.fullWidthBtn}>
                Create learner account
              </Button>
            </div>
          </form>
          <p className={styles.link}>
            Aged 15–17? Ask a parent or guardian to set up your learner profile through a family
            account.
          </p>
          <p className={styles.link}>
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
