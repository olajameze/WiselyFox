import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { getSubject } from "@/data/curriculum";
import { ageBandLabel } from "@/features/learning/services/age-content.service";
import { StudyGuideViewer } from "@/features/learning/ui/StudyGuideViewer";
import { Button, Alert } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function StudyGuidePage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const user = await requireChild();
  const child = await getLearnChildByUserId(user.id);
  if (!child) redirect("/child-sign-in");

  const { subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) notFound();

  return (
    <>
      <Link href={`/learn/subjects/${subjectSlug}`}>
        <Button variant="ghost" size="sm">
          ← {subject.title}
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>{subject.title} study guide</h1>
        <p className={styles.pageSubtitle}>
          Read, discuss, practise, and pass quick checks, tailored for {ageBandLabel(child.ageBand)}.
        </p>
      </header>

      <Alert variant="info" title="Multi method learning">
        This guide is for reading and practice. Open the Videos page for curated clips.
      </Alert>

      <StudyGuideViewer
        subjectSlug={subjectSlug}
        subjectTitle={subject.title}
        intro={subject.studyGuide.intro}
        sections={subject.studyGuide.sections}
      />
    </>
  );
}
