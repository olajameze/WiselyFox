import styles from "./AdultLabLog.module.css";

export function AdultLabLog() {
  // Placeholder data for modules
  const modules = [
    { id: "1", title: "Data Structures 101", velocity: "High", completion: 85 },
    { id: "2", title: "Algorithms & Logic", velocity: "Medium", completion: 60 },
    { id: "3", title: "Web Dev Fundamentals", velocity: "Low", completion: 30 },
  ];

  return (
    <div className={styles.labLog}>
      <header className={styles.header}>
        <span className={styles.breadcrumbs}>wiselyfox://workspace/student/core_modules</span>
      </header>

      <div className={styles.moduleGrid}>
        {modules.map((module) => (
          <div key={module.id} className={styles.moduleCard}>
            <h3>{module.title}</h3>
            <div className={styles.moduleStats}>
              <span>Velocity: {module.velocity}</span>
              <span>Completion: {module.completion}%</span>
            </div>
            <button className={styles.runLessonButton}>
              [ run.lesson ]
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}