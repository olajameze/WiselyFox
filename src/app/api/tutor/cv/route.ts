import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { env } from "@/shared/lib/env";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["application/pdf"]);

export async function POST(request: Request) {
  try {
    await requireTutorProfile();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("cv");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No CV provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "CV must be a PDF file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(`tutor-cvs/${randomUUID()}.pdf`, buffer, {
        access: "public",
        token: env.BLOB_READ_WRITE_TOKEN,
        contentType: "application/pdf",
      });
      return NextResponse.json({ url: blob.url });
    } catch {
      return NextResponse.json({ error: "CV upload failed" }, { status: 500 });
    }
  }

  const filename = `${randomUUID()}.pdf`;
  const dir = path.join(process.cwd(), "public", "tutor-cvs");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  const base = process.env.AUTH_URL ?? "http://localhost:3000";
  return NextResponse.json({ url: `${base}/tutor-cvs/${filename}` });
}
