import { InputHTMLAttributes, forwardRef, useId } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id, className, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const errorId = error ? `${inputId}-error` : undefined;
    const inputClassName = [styles.input, error ? styles.inputError : "", className ?? ""]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}
        {error ? (
          <input
            ref={ref}
            id={inputId}
            className={inputClassName}
            aria-invalid="true"
            aria-describedby={errorId}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={inputId}
            className={inputClassName}
            aria-invalid="false"
            aria-describedby={errorId}
            {...props}
          />
        )}
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
        {helperText && !error && <span className={styles.helper}>{helperText}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
