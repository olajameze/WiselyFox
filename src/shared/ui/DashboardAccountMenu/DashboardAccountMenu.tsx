"use client";

import styles from "./DashboardAccountMenu.module.css";

export type DashboardAccountAction = {
  label: string;
  formAction: (formData: FormData) => void | Promise<void>;
  variant?: "default" | "danger";
};

type Props = {
  label?: string;
  actions: DashboardAccountAction[];
  variant?: "default" | "dark" | "inline";
};

export function DashboardAccountMenu({
  label = "Account",
  actions,
  variant = "default",
}: Props) {
  const summaryClass = [
    styles.accountSummary,
    variant === "dark" ? styles.accountSummaryDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const panelClass = [
    styles.accountPanel,
    variant === "dark" ? styles.accountPanelDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapClass = [
    styles.dashboardAccountMenu,
    variant === "inline" ? styles.inlineMenu : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <details className={wrapClass}>
      <summary className={summaryClass}>{label}</summary>
      <div className={panelClass} role="menu">
        {actions.map((item) => (
          <form key={item.label} action={item.formAction} className={styles.accountMenuForm}>
            <button
              type="submit"
              role="menuitem"
              className={[
                styles.accountItem,
                item.variant === "danger" ? styles.accountItemDanger : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
            </button>
          </form>
        ))}
      </div>
    </details>
  );
}
