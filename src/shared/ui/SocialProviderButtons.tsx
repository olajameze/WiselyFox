"use client";

import { signIn as nextAuthSignIn } from "next-auth/react";
import styles from "@/features/auth/ui/auth.module.css";

type SocialProviderButtonsProps = {
  callbackUrl: string;
  googleLabel?: string;
  facebookLabel?: string;
};

/**
 * Shared Google / Facebook OAuth buttons.
 * The server-side signIn callback creates the user record (parent role with
 * a parent profile) and the jwt callback populates role/hasParentProfile so
 * the user lands on the right dashboard after sign-in.
 */
export function SocialProviderButtons({
  callbackUrl,
  googleLabel = "Google",
  facebookLabel = "Facebook",
}: SocialProviderButtonsProps) {
  return (
    <div className={styles.oauthRow}>
      <button
        type="button"
        className={styles.oauthButton}
        aria-label="Continue with Google"
        onClick={() => nextAuthSignIn("google", { callbackUrl })}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        {googleLabel}
      </button>
      <button
        type="button"
        className={styles.oauthButton}
        aria-label="Continue with Facebook"
        onClick={() => nextAuthSignIn("facebook", { callbackUrl })}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="#1877F2" d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z" />
        </svg>
        {facebookLabel}
      </button>
    </div>
  );
}
