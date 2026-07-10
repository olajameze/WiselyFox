import Link from "next/link";
import { redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { prisma } from "@/shared/lib/prisma";
import { Card, Button, Badge } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function LearnCertificatesPage() {
  const user = await requireChild();
  const child = await prisma.childProfile.findFirst({
    where: { userId: user.id },
  });
  if (!child) redirect("/child-sign-in");

  const certificates = await prisma.quizAttempt.findMany({
    where: { childId: child.id, passed: true, certificateCode: { not: null } },
    orderBy: { completedAt: "desc" },
  });

  return (
    <>
      <header className={styles.pageHeader}>
        <h1>Your certificates</h1>
        <p className={styles.pageSubtitle}>Earned when you pass a subject quiz (60% or higher).</p>
      </header>

      {certificates.length === 0 ? (
        <Card>
          <p className={styles.meta}>Pass a subject quiz to earn your first certificate!</p>
          <Link href="/learn/quiz">
            <Button size="sm">Take a quiz</Button>
          </Link>
        </Card>
      ) : (
        <div className={styles.questList}>
          {certificates.map((c) => (
            <Card key={c.id}>
              <strong>{c.subjectTitle}</strong>{" "}
              <Badge variant="success">{c.score}%</Badge>
              <p className={styles.meta}>{c.completedAt.toLocaleDateString("en-GB")}</p>
              <Link href={`/learn/certificates/${c.id}`}>
                <Button size="sm">View certificate</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
