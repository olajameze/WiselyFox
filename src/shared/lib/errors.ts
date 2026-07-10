export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 400,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function safeErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message;
  return "Something went wrong. Please try again.";
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export function ok<T>(data: T): ActionResult<T> {
  return { success: true, data };
}

export function fail(error: string): ActionResult<never> {
  return { success: false, error };
}
