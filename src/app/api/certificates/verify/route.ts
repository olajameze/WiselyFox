import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.trim().toUpperCase();
  if (!code) {
    return NextResponse.json({ valid: false, error: "Missing certificate code" }, { status: 400 });
  }

  const [quiz, subject] = await Promise.all([
    prisma.quizAttempt.findFirst({
      where: { certificateCode: code, passed: true },
      include: { child: { select: { displayName: true } } },
    }),
    prisma.subjectCompletion.findFirst({
      where: { certificateCode: code },
      include: { child: { select: { displayName: true } } },
    }),
  ]);

  if (quiz) {
    return NextResponse.json({
      valid: true,
      type: "quiz",
      childName: quiz.child.displayName,
      title: quiz.subjectTitle,
      score: quiz.score,
      completedAt: quiz.completedAt.toISOString(),
      code,
    });
  }

  if (subject) {
    return NextResponse.json({
      valid: true,
      type: "subject",
      childName: subject.child.displayName,
      title: subject.subjectTitle,
      completedAt: subject.completedAt.toISOString(),
      code,
    });
  }

  return NextResponse.json({ valid: false, error: "Certificate not found" }, { status: 404 });
}
