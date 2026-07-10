"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      children,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.button,
      styles[variant],
      size !== "md" ? styles[size] : "",
      fullWidth ? styles.fullWidth : "",
      loading ? styles.loading : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
