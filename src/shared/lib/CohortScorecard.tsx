"use client";

import { useEffect, useState } from "react";
import { generateAnonymousNickname } from "@/shared/lib/nickname-generator";
import styles from "./CohortScorecard.module.css";

interface CohortMember {
  id: string;
  nickname: string;
  focusPoints: number;
  trend: "up" | "flat" | "down";
  isCurrentUser?: boolean;
}

export function CohortScorecard() {
  const [isCalmMode, setIsCalmMode] = useState(false);

  useEffect(() => {
    const checkCalmMode = () => {
      setIsCalmMode(document.documentElement.classList.contains("calmModeContainer"));
    };
    checkCalmMode(); // Initial check

    const observer = new MutationObserver(checkCalmMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Placeholder data - in a real app, this would come from a server-side fetch
  const currentUserSeed = "user-alex-123"; // Unique ID for the current user
  const currentUserNickname = generateAnonymousNickname(currentUserSeed);

  const cohortData: CohortMember[] = [
    { id: "1", nickname: generateAnonymousNickname("child-1"), focusPoints: 1200, trend: "up" as const }, // Explicitly assert literal type
    { id: "2", nickname: generateAnonymousNickname("child-2"), focusPoints: 1150, trend: "flat" as const }, // Explicitly assert literal type
    { id: "3", nickname: generateAnonymousNickname("child-3"), focusPoints: 1080, trend: "down" as const }, // Explicitly assert literal type
    { id: "4", nickname: generateAnonymousNickname("child-4"), focusPoints: 950, trend: "up" as const }, // Explicitly assert literal type
    { id: "5", nickname: generateAnonymousNickname("child-5"), focusPoints: 890, trend: "flat" as const }, // Explicitly assert literal type
    { id: "6", nickname: generateAnonymousNickname("child-6"), focusPoints: 720, trend: "up" as const }, // Explicitly assert literal type
    { id: currentUserSeed, nickname: currentUserNickname, focusPoints: 1000, trend: "up" as const, isCurrentUser: true }, // Current user's data, explicitly assert literal type
  ].sort((a, b) => b.focusPoints - a.focusPoints); // Sort by focus points

  const top3 = cohortData.slice(0, 3);
  const otherRanks = cohortData.slice(3, 6); // Ranks 4-6
  const currentUserRank = cohortData.findIndex(member => member.id === currentUserSeed) + 1;

  if (isCalmMode) {
    return (
      <div className={`${styles.card} ${styles.calmModeCard}`}>
        <h3>Your Personal Milestones</h3>
        <p>Current Streak: <strong>15 days</strong></p>
        <p>Next Goal: <strong>Complete 3 lessons</strong></p>
        {/* More personal milestone tracking here */}
      </div>
    );
  }

  return (
    <div className={`${styles.card} ${styles.scorecard}`}>
      <h3>Cohort Scorecard</h3>
      <div className={styles.podium}>
        {top3.map((member, index) => (
          <div key={member.id} className={`${styles.podiumPillar} ${styles[`rank${index + 1}`]}`}>
            <div className={styles.avatar}></div>
            <span className={styles.nickname}>{member.nickname}</span>
            <span className={styles.focusPoints}>{member.focusPoints} FP</span>
          </div>
        ))}
      </div>
      <ul className={styles.rankList}>
        {otherRanks.map((member) => ( // Removed unused 'index' parameter
          <li key={member.id} className={styles.rankItem}>
            <span className={styles.rankNumber}>#{cohortData.indexOf(member) + 1}</span>
            <span className={styles.nickname}>{member.nickname}</span>
            <span className={styles.focusPoints}>{member.focusPoints} FP</span>
            <span className={`${styles.trendArrow} ${styles[member.trend]}`}></span>
          </li>
        ))}
        {currentUserRank > 6 && ( // Show current user if not in top 6
          <li className={`${styles.rankItem} ${styles.currentUser}`}>
            <span className={styles.rankNumber}>#{currentUserRank}</span>
            <span className={styles.nickname}>{currentUserNickname}</span>
            <span className={styles.focusPoints}>{cohortData.find(m => m.id === currentUserSeed)?.focusPoints} FP</span>
            <span className={`${styles.trendArrow} ${styles[cohortData.find(m => m.id === currentUserSeed)?.trend ?? 'flat']}`}></span>
          </li>
        )}
      </ul>
    </div>
  );
}