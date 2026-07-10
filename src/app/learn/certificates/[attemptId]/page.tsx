import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
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
  if (!attempt) notFound();

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

      <article className={printStyles.certificate}>
        <p className={printStyles.printMeta}>WiselyFox Certificate of Achievement</p>
        <h1 className={printStyles.certificateTitle}>Certificate of Achievement</h1>
        <p>This certifies that</p>
        <p className={printStyles.certificateName}>{attempt.child.displayName}</p>
        <p>
          has successfully passed the <strong>{attempt.subjectTitle}</strong> examination with a score of{" "}
          <strong>{attempt.score}%</strong>.
        </p>
        <p className={printStyles.printMeta}>
          Awarded on {attempt.completedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
        </p>
        <span className={printStyles.certificateSeal}>{attempt.certificateCode}</span>
      </article>
    </div>
  );
}
