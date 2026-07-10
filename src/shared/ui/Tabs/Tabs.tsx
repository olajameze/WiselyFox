"use client";

import { ReactNode, useState } from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
}

export function Tabs({ items, defaultTab }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);

  return (
    <div className={styles.tabs}>
      <div className={styles.list} role="tablist">
        {items.map((item) => {
          const isActive = active === item.id;
          return isActive ? (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected="true"
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              className={[styles.tab, styles.active].join(" ")}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          ) : (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
              className={styles.tab}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          id={`panel-${item.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${item.id}`}
          className={active === item.id ? styles.panel : styles.panelHidden}
          hidden={active !== item.id}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
