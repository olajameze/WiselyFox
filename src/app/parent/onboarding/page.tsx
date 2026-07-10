"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Card, Alert } from "@/shared/ui";
import { createChildProfile, completeOnboarding } from "@/features/onboarding/actions/onboarding.actions";
import { AGE_BANDS, AGE_BAND_LABELS, type AgeBand } from "@/data/age-bands";
import { CONSENT_COPY } from "@/shared/lib/consent";
import Link from "next/link";
import styles from "@/features/parent/ui/parent.module.css";

const LEARNING_NEEDS = ["ADHD", "AUTISM", "DYSLEXIA", "ANXIETY", "PROCESSING", "OTHER"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [form, setForm] = useState({
    displayName: "",
    ageBand: "8-10" as AgeBand,
    pin: "",
    interests: "",
    goals: "",
    learningNeeds: [] as string[],
    reducedMotion: false,
    calmColors: false,
    sessionLengthMinutes: 15,
    engagementStyle: "BALANCED" as "GENTLE" | "BALANCED" | "ENERGETIC",
    childDataConsent: false,
  });

  async function finish() {
    if (!form.childDataConsent) {
      setError("Please confirm parent consent before creating a child profile.");
      return;
    }
    setLoading(true);
    setError("");
    const result = await createChildProfile({ ...form, childDataConsent: true });
    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }
    setAccessCode(result.data.accessCode);
    await completeOnboarding();
    setLoading(false);
    setStep(4);
  }

  return (
    <div className={styles.wizard}>
      <div className={styles.wizardSteps}>
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={[styles.wizardStep, step > s ? styles.wizardStepDone : ""]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      {step === 0 && (
        <Card>
          <h2>About your child</h2>
          <Input
            label="Display name"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          />
          <label className={styles.fieldBlock}>
            Age band
            <select
              value={form.ageBand}
              onChange={(e) =>
                setForm({ ...form, ageBand: e.target.value as AgeBand })
              }
              className={styles.select}
            >
              {AGE_BANDS.map((band) => (
                <option key={band} value={band}>
                  {AGE_BAND_LABELS[band]}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="PIN (4 to 6 digits)"
            value={form.pin}
            onChange={(e) => setForm({ ...form, pin: e.target.value })}
            className={styles.fieldBlock}
          />
          <div className={styles.formActions}>
            <Button onClick={() => setStep(1)}>Continue</Button>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <h2>Goals & interests</h2>
          <Input
            label="Interests (optional)"
            value={form.interests}
            onChange={(e) => setForm({ ...form, interests: e.target.value })}
          />
          <Input
            label="Learning goals (optional)"
            value={form.goals}
            onChange={(e) => setForm({ ...form, goals: e.target.value })}
            className={styles.fieldBlock}
          />
          <div className={styles.fieldRow}>
            <Button variant="ghost" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button onClick={() => setStep(2)}>Continue</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2>Learning needs (optional)</h2>
          <p className={styles.questionMeta}>
            Select any that apply. This helps us tailor the experience. You can change this later.
          </p>
          {LEARNING_NEEDS.map((need) => (
            <label key={need} className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={form.learningNeeds.includes(need)}
                onChange={(e) => {
                  const needs = e.target.checked
                    ? [...form.learningNeeds, need]
                    : form.learningNeeds.filter((n) => n !== need);
                  setForm({ ...form, learningNeeds: needs });
                }}
              />
              {need.charAt(0) + need.slice(1).toLowerCase()}
            </label>
          ))}
          <label className={[styles.checkboxRow, styles.fieldBlock].join(" ")}>
            <input
              type="checkbox"
              checked={form.calmColors}
              onChange={(e) => setForm({ ...form, calmColors: e.target.checked })}
            />
            Prefer calm colours
          </label>
          <div className={styles.fieldRow}>
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)}>Continue</Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <h2>{CONSENT_COPY.childData.title}</h2>
          <p>{CONSENT_COPY.childData.body}</p>
          <p className={styles.meta}>
            Read our{" "}
            <Link href="/privacy" target="_blank">
              Privacy Policy
            </Link>{" "}
            for full details on GDPR and child data rights.
          </p>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={form.childDataConsent}
              onChange={(e) => setForm({ ...form, childDataConsent: e.target.checked })}
            />
            I am the parent or legal guardian and I give consent for this child&apos;s learning
            data to be processed.
          </label>
          <div className={styles.fieldRow}>
            <Button variant="ghost" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button loading={loading} disabled={!form.childDataConsent} onClick={finish}>
              Create profile
            </Button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <h2>All set!</h2>
          <Alert variant="success" title="Child access code">
            Share this code with your child: <strong>{accessCode}</strong>
          </Alert>
          <p>They can sign in at the child login page with this code and their PIN.</p>
          <div className={styles.formActions}>
            <Button onClick={() => router.push("/parent")}>Go to dashboard</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
