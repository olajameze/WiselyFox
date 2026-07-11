import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { CertificateView } from "@/features/learning/ui/CertificateView";
import { PrintButton } from "@/features/parent/ui/PrintButton";
import { Button } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";
import printStyles from "@/features/parent/ui/print.module.css";

export default async function CertificatePrintPage({
  params,
}: {
  params: Promise<{ childId: string; attemptId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId, attemptId } = await params;

  const attempt = await prisma.quizAttempt.findFirst({
    where: {
      id: attemptId,
      childId,
      passed: true,
      certificateCode: { not: null },
      child: { parent: { userId: user.id } },
    },
    include: { child: true },
  });

  if (attempt?.certificateCode) {
    return (
      <div className={printStyles.printRoot}>
        <div className={`${styles.childActions} ${printStyles.screenOnly}`}>
          <Link href={`/parent/children/${childId}/certificates`}>
            <Button variant="ghost" size="sm">
              ← Certificates
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
      childId,
      certificateCode: { not: null },
      child: { parent: { userId: user.id } },
    },
    include: { child: true },
  });
  if (!subject?.certificateCode) notFound();

  return (
    <div className={printStyles.printRoot}>
      <div className={`${styles.childActions} ${printStyles.screenOnly}`}>
        <Link href={`/parent/children/${childId}/certificates`}>
          <Button variant="ghost" size="sm">
            ← Certificates
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
