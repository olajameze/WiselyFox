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

type MasteryPoint = { subject: string; mastery: number };

export function MasteryChart({ data }: { data: MasteryPoint[] }) {
  if (data.length === 0) {
    return <p className={styles.emptyChart}>Complete assessments to see subject mastery.</p>;
  }

  return (
    <div className={styles.chartWrap}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
          <YAxis type="category" dataKey="subject" width={80} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`${value}%`, "Mastery"]} />
          <Bar dataKey="mastery" fill="var(--color-accent)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
