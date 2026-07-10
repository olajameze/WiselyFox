import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { getWorksheetQuestions } from "@/features/parent/services/printable-content.service";
import { PrintButton } from "@/features/parent/ui/PrintButton";
import { Button } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";
import printStyles from "@/features/parent/ui/print.module.css";

export default async function WorksheetPrintPage({
  params,
}: {
  params: Promise<{ childId: string; subjectSlug: string }>;
}) {
  const user = await requireParentOwner();
  const { childId, subjectSlug } = await params;
  const child = await assertHouseholdAccess(childId, user.id);

  let worksheet;
  try {
    worksheet = await getWorksheetQuestions(subjectSlug, child.ageBand);
  } catch {
    notFound();
  }

  if (worksheet.questions.length === 0) notFound();

  return (
    <div className={printStyles.printRoot}>
      <div className={`${styles.childActions} ${printStyles.screenOnly}`}>
        <Link href={`/parent/children/${childId}/worksheets`}>
          <Button variant="ghost" size="sm">
            ← Worksheets
          </Button>
        </Link>
        <PrintButton label="Print worksheet" />
      </div>

      <header className={printStyles.printHeader}>
        <h1>{worksheet.subjectTitle}, offline worksheet</h1>
        <p className={printStyles.printMeta}>
          Learner: {child.displayName}, Ages {child.ageBand}, Circle the best answer (A, B, C, or D)
        </p>
      </header>

      <section className={printStyles.printSection}>
        {worksheet.questions.map((q) => (
          <div key={q.number} className={printStyles.questionBlock}>
            <p className={printStyles.questionPrompt}>
              {q.number}. {q.prompt}
            </p>
            <ol className={printStyles.optionList}>
              {q.options.map((opt) => (
                <li key={opt}>{opt}</li>
              ))}
            </ol>
            <div className={printStyles.answerLine} aria-hidden="true" />
          </div>
        ))}
      </section>

      <section className={`${printStyles.printSection} parent-answer-key`}>
        <h2>Parent answer key, do not share with child until finished</h2>
        <table className={printStyles.printTable}>
          <thead>
            <tr>
              <th>#</th>
              <th>Correct answer</th>
              <th>Explanation</th>
            </tr>
          </thead>
          <tbody>
            {worksheet.questions.map((q) => (
              <tr key={q.number}>
                <td>{q.number}</td>
                <td>{q.correctAnswer}</td>
                <td>{q.explanation ?? ", "}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
