"use client";

import { useId, useState } from "react";
import { Input } from "@/shared/ui/Input/Input";
import styles from "./PasswordField.module.css";

type PasswordFieldProps = React.ComponentProps<typeof Input> & {
  label: string;
};

export function PasswordField({ label, id, ...props }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrap}>
        <Input
          {...props}
          id={inputId}
          label={label}
          type={showPassword ? "text" : "password"}
          className={styles.input}
        />
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
