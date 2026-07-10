import { NextResponse } from "next/server";
import { env } from "@/shared/lib/env";
import { processTrialReminders } from "@/server/services/trial-reminder.service";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await processTrialReminders();
  return NextResponse.json({ ok: true });
}
