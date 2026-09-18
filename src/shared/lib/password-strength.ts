import { z } from "zod";

/**
 * Shared password policy for all account creation flows (parent, tutor).
 *
 * Requirements:
 * - At least 10 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character (non-alphanumeric)
 *
 * Kept in one place so any future sign-up path (e.g. admin-created accounts)
 * reuses the exact same rule and error copy.
 */
export const strongPasswordSchema = z
  .string()
  .min(10, "Password must be at least 10 characters long")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter")
  .regex(/[a-z]/, "Password must include at least one lowercase letter")
  .regex(/[0-9]/, "Password must include at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must include at least one special character (e.g. !@#$%)");

export function validateStrongPassword(password: string): { ok: true } | { ok: false; message: string } {
  const result = strongPasswordSchema.safeParse(password);
  if (result.success) return { ok: true };
  return { ok: false, message: result.error.issues[0]?.message ?? "Password is not strong enough" };
}

/** Client-side helper: returns an array of unmet requirements (empty = strong). */
export function passwordRequirements(password: string): string[] {
  const unmet: string[] = [];
  if (password.length < 10) unmet.push("At least 10 characters");
  if (!/[A-Z]/.test(password)) unmet.push("An uppercase letter");
  if (!/[a-z]/.test(password)) unmet.push("A lowercase letter");
  if (!/[0-9]/.test(password)) unmet.push("A number");
  if (!/[^A-Za-z0-9]/.test(password)) unmet.push("A special character (!@#$%…)");
  return unmet;
}
