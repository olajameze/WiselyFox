import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireTutorProfile } from "@/shared/lib/permissions";
import { env } from "@/shared/lib/env";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function POST(request: Request) {
  try {
    await requireTutorProfile();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const docType = formData.get("documentType") as string | null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No document file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Invalid document type. Allowed types: PDF, JPEG, PNG, WEBP." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Document file is too large (maximum 10MB)." },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext =
    file.type === "application/pdf"
      ? "pdf"
      : file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
          ? "webp"
          : "jpg";

  const prefix = docType ? `${docType}-` : "";
  const filename = `${prefix}${randomUUID()}.${ext}`;

  if (env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(`tutor-docs/${filename}`, buffer, {
        access: "public",
        token: env.BLOB_READ_WRITE_TOKEN,
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    } catch {
      return NextResponse.json({ error: "Cloud storage upload failed" }, { status: 500 });
    }
  }

  const dir = path.join(process.cwd(), "public", "tutor-docs");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  const base = process.env.AUTH_URL ?? "http://localhost:3000";
  return NextResponse.json({ url: `${base}/tutor-docs/${filename}` });
}
