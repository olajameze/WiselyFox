const MIN_TUTOR_AGE = 18;

export function calculateAge(dateOfBirth: Date, now = new Date()): number {
  let age = now.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = now.getMonth() - dateOfBirth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dateOfBirth.getDate())) {
    age -= 1;
  }
  return age;
}

export function isAdultTutorAge(dateOfBirth: Date, now = new Date()): boolean {
  return calculateAge(dateOfBirth, now) >= MIN_TUTOR_AGE;
}

export function parseDateOfBirth(value: string): Date | null {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}
