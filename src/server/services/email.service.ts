import { getResend } from "@/shared/lib/resend";
import { env } from "@/shared/lib/env";

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  const resend = getResend();
  if (!resend) {
    console.info("[email:dev]", params.subject, "->", params.to);
    return { id: "dev-mode" };
  }
  const from = env.EMAIL_FROM ?? "WiselyFox <onboarding@resend.dev>";
  const result = await resend.emails.send({
    from,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });
  return result.data;
}

export async function sendVerificationEmail(email: string, token: string) {
  const url = `${env.AUTH_URL ?? "http://localhost:3000"}/verify-email?token=${token}`;
  return sendEmail({
    to: email,
    subject: "Verify your WiselyFox account",
    html: `<p>Welcome to WiselyFox!</p><p><a href="${url}">Verify your email</a></p>`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const url = `${env.AUTH_URL ?? "http://localhost:3000"}/reset-password?token=${token}`;
  return sendEmail({
    to: email,
    subject: "Reset your WiselyFox password",
    html: `<p><a href="${url}">Reset your password</a>. This link expires in 1 hour.</p>`,
  });
}

export async function sendTrialReminderEmail(
  email: string,
  daysLeft: number,
  trialEndDate: string,
) {
  return sendEmail({
    to: email,
    subject: `Your WiselyFox trial ends in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`,
    html: `<p>Your free trial ends on <strong>${trialEndDate}</strong>.</p>
           <p>Your card on file will be charged unless you cancel before then.</p>
           <p><a href="${env.AUTH_URL ?? "http://localhost:3000"}/parent/settings">Manage billing</a></p>`,
  });
}

export async function sendWaitlistConfirmationEmail(email: string, name?: string) {
  const greeting = name ? `Hi ${name}` : "Hi there";
  return sendEmail({
    to: email,
    subject: "You're on the WiselyFox waiting list",
    html: `<p>${greeting},</p>
           <p>Thanks for joining the WiselyFox waiting list. We will email you when the app launches publicly.</p>
           <p>WiselyFox is built for calm, inclusive learning with parent-guided support for every mind.</p>
           <p>If you would like early access now, you can also <a href="${env.AUTH_URL ?? "http://localhost:3000"}/sign-up">join the family pilot</a>.</p>`,
  });
}
