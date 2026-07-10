"use client";

import styles from "./learnActivity.module.css";

type Props = {
  videoId: string;
  title: string;
};

export function LessonVideoEmbed({ videoId, title }: Props) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className={styles.videoWrap}>
      <iframe
        className={styles.videoFrame}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <p className={styles.learnMeta}>Watch with a parent if you need help, Video supports this lesson step</p>
    </div>
  );
}
