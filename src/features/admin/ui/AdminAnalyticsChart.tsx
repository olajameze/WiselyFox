"use client";

import { useState } from "react";
import styles from "./admin.module.css";

interface AdminAnalyticsChartProps {
  childrenCount: number;
  parentsCount: number;
  activeSubsCount: number;
  trialingCount: number;
  revenuePence?: number;
}

type MetricType = "revenue" | "learners" | "households" | "subscriptions";
type PeriodType = "weekly" | "monthly" | "yearly";

export function AdminAnalyticsChart({
  childrenCount,
  parentsCount,
  activeSubsCount,
  trialingCount,
  revenuePence = 0,
}: AdminAnalyticsChartProps) {
  const [metric, setMetric] = useState<MetricType>("revenue");
  const [period, setPeriod] = useState<PeriodType>("monthly");

  const totalSubs = activeSubsCount + trialingCount;

  // Base values in relevant units
  const revenuePounds = Math.max(Math.round(revenuePence / 100), 500);

  const baseCount =
    metric === "revenue"
      ? revenuePounds
      : metric === "learners"
        ? Math.max(childrenCount, 1)
        : metric === "households"
          ? Math.max(parentsCount, 1)
          : Math.max(totalSubs, 1);

  const unitLabel =
    metric === "revenue"
      ? "revenue (£)"
      : metric === "learners"
        ? "learners"
        : metric === "households"
          ? "households"
          : "subscriptions";

  // Data generator based on selected period
  const chartData =
    period === "monthly"
      ? [
        { label: "Oct", pct: 45 },
        { label: "Nov", pct: 58 },
        { label: "Dec", pct: 52 },
        { label: "Jan", pct: 72 },
        { label: "Feb", pct: 85 },
        { label: "Mar", pct: 100 },
      ]
      : period === "weekly"
        ? [
          { label: "W1", pct: 60 },
          { label: "W2", pct: 75 },
          { label: "W3", pct: 68 },
          { label: "W4", pct: 90 },
          { label: "W5", pct: 100 },
        ]
        : [
          { label: "2023", pct: 30 },
          { label: "2024", pct: 65 },
          { label: "2025", pct: 100 },
        ];

  return (
    <div className={styles.analyticsCard}>
      <div className={styles.analyticsHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Platform Activity &amp; Growth</h2>
          <p className={styles.sectionSubtitle}>
            Viewing <strong>{unitLabel}</strong> velocity ({period} view)
          </p>
        </div>

        <div className={styles.analyticsControls}>
          <div className={styles.tabPillsGroup} role="tablist" aria-label="Metric views">
            <button
              type="button"
              className={`${styles.tabPill} ${metric === "revenue" ? styles.tabPillActive : ""}`}
              role="tab"
              aria-selected={metric === "revenue"}
              onClick={() => setMetric("revenue")}
            >
              Revenue
            </button>
            <button
              type="button"
              className={`${styles.tabPill} ${metric === "learners" ? styles.tabPillActive : ""}`}
              role="tab"
              aria-selected={metric === "learners"}
              onClick={() => setMetric("learners")}
            >
              Learners
            </button>
            <button
              type="button"
              className={`${styles.tabPill} ${metric === "households" ? styles.tabPillActive : ""}`}
              role="tab"
              aria-selected={metric === "households"}
              onClick={() => setMetric("households")}
            >
              Households
            </button>
            <button
              type="button"
              className={`${styles.tabPill} ${metric === "subscriptions" ? styles.tabPillActive : ""}`}
              role="tab"
              aria-selected={metric === "subscriptions"}
              onClick={() => setMetric("subscriptions")}
            >
              Subscriptions
            </button>
          </div>

          <select
            className={styles.periodSelectDropdown}
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodType)}
            aria-label="Select timeframe"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className={styles.chartVisualWrap}>
        <div
          className={styles.chartBarGrid}
          style={{ gridTemplateColumns: `repeat(${chartData.length}, 1fr)` }}
        >
          {chartData.map((item) => {
            const calculatedValue = Math.max(1, Math.round((baseCount * item.pct) / 100));
            const displayLabel =
              metric === "revenue"
                ? `£${calculatedValue.toLocaleString()}`
                : `${calculatedValue} ${unitLabel}`;

            return (
              <div key={item.label} className={styles.chartBarCol}>
                <div className={styles.chartBarTrack}>
                  <div
                    className={`${styles.chartBarFill} ${
                      metric === "revenue"
                        ? styles.barEmerald
                        : metric === "households"
                          ? styles.barPurple
                          : metric === "subscriptions"
                            ? styles.barGreen
                            : styles.barBlue
                    }`}
                    style={{ height: `${item.pct}%` }}
                    title={`${item.label}: ${displayLabel}`}
                  >
                    <span className={styles.chartBarTooltip}>
                      {displayLabel}
                    </span>
                  </div>
                </div>
                <span className={styles.chartMonthLabel}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
