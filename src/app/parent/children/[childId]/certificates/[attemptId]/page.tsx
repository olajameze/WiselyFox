import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner } from "@/shared/lib/permissions";
import { getQuizAttemptForParent } from "@/features/learning/services/quiz-results.service";
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
  const attempt = await getQuizAttemptForParent(attemptId, user.id);

  if (!attempt || attempt.childId !== childId || !attempt.passed || !attempt.certificateCode) {
    notFound();
  }

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

      <article className={printStyles.certificate}>
        <p className={printStyles.printMeta}>WiselyFox Certificate of Achievement</p>
        <h1 className={printStyles.certificateTitle}>Certificate of Achievement</h1>
        <p>This certifies that</p>
        <p className={printStyles.certificateName}>{attempt.child.displayName}</p>
        <p>
          has successfully passed the <strong>{attempt.subjectTitle}</strong> examination with a score of{" "}
          <strong>{attempt.score}%</strong> ({attempt.correct} of {attempt.total} correct).
        </p>
        <p className={printStyles.printMeta}>
          Awarded on {attempt.completedAt.toLocaleDateString("en-GB", { dateStyle: "long" })}
        </p>
        <span className={printStyles.certificateSeal}>{attempt.certificateCode}</span>
      </article>
    </div>
  );
}
