import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { env } from "@/shared/lib/env";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    await requireTutorProfile();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("photo");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No photo provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 2MB)" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  if (env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const blob = await put(`tutor-photos/${randomUUID()}.${ext}`, buffer, {
        access: "public",
        token: env.BLOB_READ_WRITE_TOKEN,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    } catch {
      return NextResponse.json({ error: "Blob upload failed" }, { status: 500 });
    }
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${randomUUID()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "tutor-photos");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  const base = process.env.AUTH_URL ?? "http://localhost:3000";
  return NextResponse.json({ url: `${base}/tutor-photos/${filename}` });
}
