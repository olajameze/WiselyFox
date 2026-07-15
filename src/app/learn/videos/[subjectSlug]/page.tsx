import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireChild } from "@/shared/lib/permissions";
import { getLearnChildByUserId } from "@/features/learning/services/child-session.service";
import { getSubject } from "@/data/curriculum";
import { getSubjectVideoLibrary } from "@/data/lesson-hands-on";
import { resolveLessonVideo } from "@/data/lesson-videos";
import { ageBandLabel } from "@/features/learning/services/age-content.service";
import { SubjectVideosViewer } from "@/features/learning/ui/SubjectVideosViewer";
import { Button } from "@/shared/ui";
import styles from "@/features/parent/ui/parent.module.css";

export default async function SubjectVideosPage({
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

  const sectionTitles = subject.studyGuide.sections.map((s) => s.title);
  const lessonClips = subject.lessons.map((lesson) => ({
    title: lesson.title,
    video: resolveLessonVideo(subjectSlug, lesson.slug),
  }));

  const videos = getSubjectVideoLibrary(subjectSlug, sectionTitles, lessonClips);

  return (
    <>
      <Link href={`/learn/subjects/${subjectSlug}`}>
        <Button variant="ghost" size="sm">
          ← {subject.title}
        </Button>
      </Link>
      <header className={styles.pageHeader}>
        <h1>{subject.title} videos</h1>
        <p className={styles.pageSubtitle}>
          A dedicated watch list for {ageBandLabel(child.ageBand)}. Study guide reading stays on its own page.
        </p>
      </header>

      <SubjectVideosViewer
        subjectSlug={subjectSlug}
        subjectTitle={subject.title}
        videos={videos}
      />
    </>
  );
}
