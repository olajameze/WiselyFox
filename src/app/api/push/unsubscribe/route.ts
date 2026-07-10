import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/features/auth/auth";
import { prisma } from "@/shared/lib/prisma";

const bodySchema = z.object({
  endpoint: z.string().url(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  await prisma.pushSubscription.deleteMany({
    where: { userId: session.user.id, endpoint: parsed.data.endpoint },
  });

  return NextResponse.json({ success: true });
}
