"use client";

import { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  footer?: ReactNode;
  elevated?: boolean;
  interactive?: boolean;
}

export function Card({
  children,
  header,
  footer,
  elevated,
  interactive,
  className,
  ...props
}: CardProps) {
  const classes = [
    styles.card,
    elevated ? styles.elevated : "",
    interactive ? styles.interactive : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
