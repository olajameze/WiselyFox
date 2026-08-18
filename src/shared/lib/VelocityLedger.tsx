"use client";

import { generateAnonymousNickname } from "@/shared/lib/nickname-generator";
import styles from "./VelocityLedger.module.css";

interface LeaderboardEntry {
  id: string;
  nickname: string;
  completionSpeed: number; // e.g., minutes per lesson
  isCurrentUser?: boolean;
}

export function VelocityLedger() {
  // Placeholder data for 30-day activity (0-5 intensity levels)
  const activityData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    intensity: Math.floor(Math.random() * 6), // 0-5
  }));

  // Placeholder data for leaderboard
  const currentUserSeed = "user-alex-123";
  const currentUserNickname = generateAnonymousNickname(currentUserSeed);

  const leaderboardData: LeaderboardEntry[] = [
    { id: "1", nickname: generateAnonymousNickname("student-a"), completionSpeed: 15 },
    { id: "2", nickname: generateAnonymousNickname("student-b"), completionSpeed: 18 },
    { id: "3", nickname: generateAnonymousNickname("student-c"), completionSpeed: 20 },
    { id: "4", nickname: generateAnonymousNickname("student-d"), completionSpeed: 22 },
    { id: currentUserSeed, nickname: currentUserNickname, completionSpeed: 17, isCurrentUser: true },
  ].sort((a, b) => a.completionSpeed - b.completionSpeed); // Faster is better

  return (
    <div className={`${styles.card} ${styles.velocityLedger}`}>
      <h3>Velocity Ledger</h3>

      <div className={styles.section}>
        <h4>30-Day Contribution</h4>
        <div className={styles.contributionGrid}>
          {activityData.map((day) => (
            <div
              key={day.date}
              className={styles.contributionCell}
              style={{ opacity: day.intensity / 5 }}
              title={`Date: ${day.date}, Intensity: ${day.intensity}`}
            ></div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4>Professional Milestones</h4>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Learner</th>
              <th>Avg. Speed (min/lesson)</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={entry.id} className={entry.isCurrentUser ? styles.currentUserRow : ""}>
                <td>#{index + 1}</td>
                <td>{entry.nickname}</td>
                <td>{entry.completionSpeed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}