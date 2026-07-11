import Link from "next/link";
import { notFound } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { CertificateView } from "@/features/learning/ui/CertificateView";
import { PrintButton } from "@/features/parent/ui/PrintButton";
import { Button } from "@/shared/ui";
import printStyles from "@/features/parent/ui/print.module.css";
import styles from "@/features/parent/ui/parent.module.css";

export default async function LearnCertificatePage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireChild();
  const { attemptId } = await params;

  const attempt = await prisma.quizAttempt.findFirst({
    where: {
      id: attemptId,
      passed: true,
      certificateCode: { not: null },
      child: { userId: user.id },
    },
    include: { child: true },
  });

  if (attempt?.certificateCode) {
    return (
      <div className={printStyles.printRoot}>
        <div className={`${styles.childActions} ${printStyles.screenOnly}`}>
          <Link href="/learn/certificates">
            <Button variant="ghost" size="sm">
              ← All certificates
            </Button>
          </Link>
          <PrintButton label="Print certificate" />
        </div>
        <CertificateView
          certificate={{
            type: "quiz",
            id: attempt.id,
            childName: attempt.child.displayName,
            title: attempt.subjectTitle,
            score: attempt.score,
            correct: attempt.correct,
            total: attempt.total,
            certificateCode: attempt.certificateCode,
            completedAt: attempt.completedAt,
          }}
        />
      </div>
    );
  }

  const subject = await prisma.subjectCompletion.findFirst({
    where: {
      id: attemptId,
      certificateCode: { not: null },
      child: { userId: user.id },
    },
    include: { child: true },
  });
  if (!subject?.certificateCode) notFound();

  return (
    <div className={printStyles.printRoot}>
      <div className={`${styles.childActions} ${printStyles.screenOnly}`}>
        <Link href="/learn/certificates">
          <Button variant="ghost" size="sm">
            ← All certificates
          </Button>
        </Link>
        <PrintButton label="Print certificate" />
      </div>
      <CertificateView
        certificate={{
          type: "subject",
          id: subject.id,
          childName: subject.child.displayName,
          title: subject.subjectTitle,
          certificateCode: subject.certificateCode,
          completedAt: subject.completedAt,
        }}
      />
    </div>
  );
}
