export type SubjectBoardEntry = {
  slug: string;
  title: string;
  description: string;
  ageBands: string[];
  lessonsCount: number;
  progress: number;
  status: "Ready" | "In progress" | "Complete";
  icon: string;
  category: string;
  pathLabel: string;
};

const SUBJECT_ICONS: Record<string, string> = {
  maths: "🔢",
  reading: "📖",
  science: "🧪",
  history: "🏛️",
  geography: "🌍",
  computing: "💻",
  coding: "🧠",
  artificial: "🤖",
  "artificial-intelligence": "🤖",
  robotics: "🛠️",
  psychology: "🧠",
  philosophy: "💭",
  sociology: "👥",
  economics: "💰",
  astronomy: "🌙",
  biology: "🧬",
  chemistry: "⚗️",
  physics: "🧲",
  english: "✍️",
  languages: "🌐",
  finance: "📈",
  wellbeing: "🌿",
  "health-wellbeing": "🌿",
  "career-skills": "🚀",
  writing: "✍️",
  digital: "📱",
  "digital-skills": "📱",
};

const SUBJECT_CATEGORIES: Record<string, string> = {
  maths: "Numbers",
  reading: "Literacy",
  science: "Science",
  history: "Humanities",
  geography: "World",
  computing: "Tech",
  coding: "Tech",
  robotics: "STEM",
  psychology: "Mind",
  philosophy: "Thinking",
  sociology: "Society",
  economics: "Money",
  astronomy: "Space",
  biology: "Life",
  chemistry: "Matter",
  physics: "Energy",
  english: "Language",
  finance: "Money",
  wellbeing: "Wellbeing",
  "career-skills": "Future",
  "artificial-intelligence": "AI",
  digital: "Digital",
  "digital-skills": "Digital",
};

export function buildSubjectBoardEntries(
  subjects: Array<{
    slug: string;
    title: string;
    description: string;
    ageBands: string[];
    lessons?: Array<unknown>;
  }>,
  childAgeBand: string,
  completedBySlug: Record<string, number> = {},
): SubjectBoardEntry[] {
  return subjects
    .filter(
      (subject) =>
        (subject.ageBands ?? []).includes(childAgeBand) ||
        (subject.ageBands ?? []).length === 0 ||
        (completedBySlug[subject.slug] ?? 0) > 0,
    )
    .map((subject) => {
      const lessonsCount = subject.lessons?.length ?? 0;
      const completeCount = completedBySlug[subject.slug] ?? 0;
      const progress = lessonsCount > 0 ? Math.min(100, Math.round((completeCount / lessonsCount) * 100)) : 0;
      const status: SubjectBoardEntry["status"] =
        progress >= 100 ? "Complete" : progress > 0 ? "In progress" : "Ready";

      const slugKey = subject.slug.toLowerCase();
      const icon = SUBJECT_ICONS[slugKey] ?? SUBJECT_ICONS[subject.slug.split("-")[0]] ?? "✨";
      const category = SUBJECT_CATEGORIES[slugKey] ?? SUBJECT_CATEGORIES[subject.slug.split("-")[0]] ?? "Skill";

      return {
        slug: subject.slug,
        title: subject.title,
        description: subject.description,
        ageBands: subject.ageBands ?? [],
        lessonsCount,
        progress,
        status,
        icon,
        category,
        pathLabel: `${Math.max(0, lessonsCount - completeCount)} more to go`,
      };
    })
    .sort((a, b) => {
      const order = { "In progress": 0, Ready: 1, Complete: 2 };
      return (order[a.status] ?? 99) - (order[b.status] ?? 99) || a.title.localeCompare(b.title);
    });
}
