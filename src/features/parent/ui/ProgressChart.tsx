"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./parent.module.css";

type ChartPoint = { day: string; minutes: number };

export function ProgressChart({ data }: { data: ChartPoint[] }) {
  if (data.every((d) => d.minutes === 0)) {
    return <p className={styles.emptyChart}>No study time recorded yet this week.</p>;
  }

  return (
    <div className={styles.chartWrap}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} unit="m" />
          <Tooltip formatter={(value) => [`${value} min`, "Study time"]} />
          <Bar dataKey="minutes" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
