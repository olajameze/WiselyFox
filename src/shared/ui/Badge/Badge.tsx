"use client";

import { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

type BadgeVariant = "default" | "success" | "warning" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", children, className, ...props }: BadgeProps) {
  return (
    <span
      className={[styles.badge, styles[variant], className ?? ""].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
