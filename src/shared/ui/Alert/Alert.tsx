import { HTMLAttributes, ReactNode } from "react";
import styles from "./Alert.module.css";

type AlertVariant = "info" | "success" | "warning" | "error";

interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "role"> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
}

export function Alert({
  variant = "info",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const classes = [styles.alert, styles[variant], className ?? ""].filter(Boolean).join(" ");

  const content = (
    <>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </>
  );

  if (variant === "error") {
    return (
      <div className={classes} role="alert" {...props}>
        {content}
      </div>
    );
  }

  return (
    <div className={classes} role="status" {...props}>
      {content}
    </div>
  );
}
