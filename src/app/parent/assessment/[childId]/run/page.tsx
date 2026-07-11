import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { AssessmentRunner } from "@/features/assessment/ui/AssessmentRunner";
import { Button } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function AssessmentRunPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId } = await params;
  await assertHouseholdAccess(childId, user.id);

  const child = await prisma.childProfile.findUnique({
    where: { id: childId },
    select: { displayName: true },
  });
  if (!child) notFound();

  return (
    <div className={styles.dashboard}>
      <Link href={`/parent/assessment/${childId}`}>
        <Button variant="ghost" size="sm">
          ← Back to assessment
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>Run assessment</h1>
        <p className={styles.pageSubtitle}>
          Five quick questions for {child.displayName}. Sit together if your child needs support.
        </p>
      </header>
      <AssessmentRunner childId={childId} childName={child.displayName} />
    </div>
  );
}
