export type CertificateRecord = {
  type: "quiz" | "subject";
  id: string;
  childName: string;
  title: string;
  score?: number;
  correct?: number;
  total?: number;
  certificateCode: string;
  completedAt: Date;
};

export function formatCertificateCode(code: string): string {
  return code.toUpperCase();
}

export function buildVerificationUrl(code: string): string {
  return `/api/certificates/verify?code=${encodeURIComponent(code)}`;
}
