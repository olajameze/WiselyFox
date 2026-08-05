"use client";

import { useState } from "react";
import { LoginStepOne, type LoginRole } from "./LoginStepOne";
import { LoginStepTwo } from "./LoginStepTwo";
import styles from "./LoginFlow.module.css";

type LoginFlowProps = {
  defaultRole?: LoginRole;
  callbackUrl?: string;
};

export function LoginFlow({ defaultRole, callbackUrl }: LoginFlowProps) {
  const [step, setStep] = useState<1 | 2>(defaultRole ? 2 : 1);
  const [role, setRole] = useState<LoginRole | null>(defaultRole ?? null);

  function handleSelectRole(nextRole: LoginRole) {
    setRole(nextRole);
    setStep(2);
  }

  function handleBack() {
    setStep(1);
  }

  return (
    <div className={styles.loginPage}>
      {/* Geometric crosshair backdrop behind the card */}
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.notebookOpen}>
        <div className={styles.bookSpine} aria-hidden="true" />
        <div className={styles.page} role="tabpanel" aria-live="polite">
          <div key={step} className={styles.stepWrap}>
            {step === 1 ? (
              <LoginStepOne onSelect={handleSelectRole} />
            ) : (
              role && (
                <LoginStepTwo role={role} callbackUrl={callbackUrl} onBack={handleBack} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
