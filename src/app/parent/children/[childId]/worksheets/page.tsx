import Link from "next/link";
import { notFound } from "next/navigation";
import { requireParentOwner, assertHouseholdAccess } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Button, Card } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function WorksheetsIndexPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const user = await requireParentOwner();
  const { childId } = await params;
  await assertHouseholdAccess(childId, user.id);

  const subjects = await prisma.subject.findMany({
    where: { published: true },
    orderBy: { title: "asc" },
    select: { slug: true, title: true },
  });

  return (
    <div className={styles.dashboard}>
      <Link href={`/parent/children/${childId}/results`}>
        <Button variant="ghost" size="sm">
          ← Results
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>Printable worksheets</h1>
        <p className={styles.pageSubtitle}>
          Print quiz questions on paper so your child can practise offline, no device or internet needed.
          Answer keys print on a separate page for parents.
        </p>
      </header>

      <div className={styles.questList}>
        {subjects.map((s) => (
          <Card key={s.slug}>
            <strong>{s.title}</strong>
            <p className={styles.meta}>Multiple-choice worksheet + parent answer key</p>
            <Link href={`/parent/children/${childId}/worksheets/${s.slug}`}>
              <Button size="sm">Open & print</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
