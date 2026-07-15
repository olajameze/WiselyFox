import Link from "next/link";
import { Button, Card, Badge, Alert } from "@/shared/ui";
import { LessonVideoEmbed } from "@/features/learning/ui/LessonVideoEmbed";
import type { SubjectVideoItem } from "@/data/lesson-hands-on";
import styles from "./learnActivity.module.css";

function kindLabel(kind: SubjectVideoItem["kind"]) {
  if (kind === "overview") return "Overview";
  if (kind === "topic") return "Topic";
  return "Lesson clip";
}

export function SubjectVideosViewer({
  subjectSlug,
  subjectTitle,
  videos,
}: {
  subjectSlug: string;
  subjectTitle: string;
  videos: SubjectVideoItem[];
}) {
  return (
    <>
      <Alert variant="info" title="Videos for visual learners">
        Watch these {subjectTitle} clips here. Study guide text stays separate so reading stays calm and clear.
        Parent-supervised viewing recommended.
      </Alert>

      {videos.length === 0 ? (
        <Alert variant="warning">No curated videos for this subject yet.</Alert>
      ) : (
        videos.map((video) => (
          <Card key={`${video.kind}-${video.videoId}-${video.title}`} className={styles.lessonCard}>
            <div className={styles.dailyFactHeader}>
              <h3 className={styles.lessonHeading}>{video.title}</h3>
              <Badge>{kindLabel(video.kind)}</Badge>
            </div>
            <p className={styles.learnMeta}>{video.videoTitle}</p>
            <LessonVideoEmbed videoId={video.videoId} title={video.videoTitle} />
          </Card>
        ))
      )}

      <div className={styles.btnGroup}>
        <Link href={`/learn/guide/${subjectSlug}`}>
          <Button variant="secondary" size="sm">
            Open study guide
          </Button>
        </Link>
        <Link href={`/learn/subjects/${subjectSlug}`}>
          <Button size="sm">Start {subjectTitle} lessons</Button>
        </Link>
        <Link href={`/learn/quiz/${subjectSlug}`}>
          <Button variant="ghost" size="sm">
            Take quiz
          </Button>
        </Link>
      </div>
    </>
  );
}
