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

function escapeHtml(value: string): string {
  const amp = "\u0026amp;";
  const lt = "\u0026lt;";
  const gt = "\u0026gt;";
  const quot = "\u0026quot;";
  const apos = "\u0026#39;";
  return value.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return amp;
      case "<":
        return lt;
      case ">":
        return gt;
      case '"':
        return quot;
      case "'":
        return apos;
      default:
        return ch;
    }
  });
}

export async function sendWaitlistConfirmationEmail(
  email: string,
  name?: string | null,
  ageBandLabels: string[] = [],
) {
  const greeting = escapeHtml(name?.trim() || "Hello");
  const bands = ageBandLabels.map((b) => escapeHtml(b));
  const bandList = bands.length
    ? `<p style="margin:0 0 18px;color:#4e4438;">You asked us to keep an eye out for <strong style="color:#1e1710;">${bands.join(
        ", ",
      )}</strong>.</p>`
    : "";

  const baseUrl = env.AUTH_URL ?? "http://localhost:3000";
  const cta = `${baseUrl}/sign-up`;

  const html = `
  <!doctype html>
  <html lang="en">
    <body style="margin:0;padding:0;background:#1e222b;font-family:Georgia,'Times New Roman',serif;">
      <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
        <div style="background:#faf5e8;border-radius:10px 10px 4px 4px;box-shadow:0 18px 40px rgba(0,0,0,0.35);padding:40px 36px;border-top:10px solid #203354;">
          <div style="font-family:'Trebuchet MS',sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#df6e61;margin-bottom:18px;">WiselyFox · Learning journal</div>
          <h1 style="font-family:'Trebuchet MS',sans-serif;font-size:30px;line-height:1.2;color:#1e1710;margin:0 0 6px;letter-spacing:-0.01em;">
            You're on the priority waitlist
          </h1>
          <p style="font-size:16px;line-height:1.7;color:#4e4438;margin:0 0 18px;">${greeting},</p>
          <p style="font-size:16px;line-height:1.7;color:#4e4438;margin:0 0 18px;">
            Thank you for joining the <strong style="color:#1e1710;">WiselyFox waiting list</strong>. Your place is
            reserved, and we'll email you the moment the app opens its doors publicly — before anyone else.
          </p>
          ${bandList}
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fffdf8;border-left:4px solid #2563EB;border-radius:4px;margin:0 0 22px;">
            <tr>
              <td style="padding:18px 20px;">
                <h2 style="font-family:'Trebuchet MS',sans-serif;font-size:18px;color:#1e1710;margin:0 0 8px;">Calm Mode</h2>
                <p style="font-size:15px;line-height:1.6;color:#4e4438;margin:0;">Softer colours, reduced motion, and hidden timers — gentle celebrations with no confetti when calm mode is on.</p>
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fffdf8;border-left:4px solid #F59E0B;border-radius:4px;margin:0 0 22px;">
            <tr>
              <td style="padding:18px 20px;">
                <h2 style="font-family:'Trebuchet MS',sans-serif;font-size:18px;color:#1e1710;margin:0 0 8px;">Age-Elastic layout</h2>
                <p style="font-size:15px;line-height:1.6;color:#4e4438;margin:0;">One calm layout that stretches with your child — from ages 5 to 7 through hands-on lessons for 11 to 13, and beyond.</p>
              </td>
            </tr>
          </table>
          <p style="font-size:16px;line-height:1.7;color:#4e4438;margin:0 0 24px;">
            WiselyFox is built for calm, inclusive learning with parent-guided support for every mind.
            No ads, no public profiles, and we never sell identifiable child data.
          </p>
          <a href="${cta}" style="display:inline-block;background:#2563EB;color:#ffffff;font-family:'Trebuchet MS',sans-serif;font-weight:bold;text-decoration:none;font-size:16px;padding:14px 28px;border-radius:6px;">
            Join the family pilot
          </a>
          <p style="font-size:13px;line-height:1.6;color:#8a7f72;margin:26px 0 0;">
            You received this email because you joined the WiselyFox waiting list.
            If you'd rather not hear from us, you can ignore this message — we'll only send launch updates.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;

  return sendEmail({
    to: email,
    subject: "You're on the priority WiselyFox waiting list",
    html,
  });
}
