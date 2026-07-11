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

  const [quizCerts, subjectCerts] = await Promise.all([
    prisma.quizAttempt.findMany({
      where: { childId: child.id, passed: true, certificateCode: { not: null } },
      orderBy: { completedAt: "desc" },
    }),
    prisma.subjectCompletion.findMany({
      where: { childId: child.id, certificateCode: { not: null } },
      orderBy: { completedAt: "desc" },
    }),
  ]);

  const all = [
    ...quizCerts.map((c) => ({
      id: c.id,
      type: "quiz" as const,
      title: c.subjectTitle,
      detail: `${c.score}%`,
      date: c.completedAt,
      code: c.certificateCode!,
    })),
    ...subjectCerts.map((c) => ({
      id: c.id,
      type: "subject" as const,
      title: c.subjectTitle,
      detail: "Subject complete",
      date: c.completedAt,
      code: c.certificateCode!,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <>
      <header className={styles.pageHeader}>
        <h1>Your certificates</h1>
        <p className={styles.pageSubtitle}>
          Earned when you pass a subject quiz (60%+) or complete every lesson in a subject.
        </p>
      </header>

      {all.length === 0 ? (
        <Card>
          <p className={styles.meta}>Pass a quiz or finish a full subject to earn your first certificate.</p>
          <Link href="/learn/quiz">
            <Button size="sm">Take a quiz</Button>
          </Link>
        </Card>
      ) : (
        <div className={styles.questList}>
          {all.map((c) => (
            <Card key={`${c.type}-${c.id}`}>
              <div className={styles.certCardHeader}>
                <strong>{c.title}</strong>
                <Badge variant="success">{c.detail}</Badge>
              </div>
              <p className={styles.meta}>
                {c.type === "quiz" ? "Quiz certificate" : "Subject completion"} ·{" "}
                {c.date.toLocaleDateString("en-GB")}
              </p>
              <p className={styles.meta}>Code: {c.code}</p>
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
