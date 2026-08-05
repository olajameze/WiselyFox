"use client";

import { signOutUser } from "@/features/auth/actions/session.actions";
import styles from "./SidebarSignOut.module.css";

type Props = {
  variant?: "default" | "dark";
};

/**
 * Always-visible sign out button shown in dashboard sidebars,
 * independent of the collapsible Account menu.
 */
export function SidebarSignOut({ variant = "default" }: Props) {
  return (
    <form action={signOutUser} className={styles.form}>
      <button
        type="submit"
        className={[
          styles.signOut,
          variant === "dark" ? styles.signOutDark : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Sign out
      </button>
    </form>
  );
}
