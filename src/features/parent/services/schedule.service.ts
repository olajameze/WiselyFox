import { getPrismaClient } from "@/shared/lib/prisma";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type ScheduleItem = {
  id: string;
  childId: string;
  dayOfWeek: number;
  title: string;
  subject: string | null;
  timeLabel: string | null;
  sortOrder: number;
  createdAt: Date;
};

export async function getTodaySchedule(childId: string): Promise<ScheduleItem[]> {
  const day = new Date().getDay();
  try {
    const client = getPrismaClient();
    const scheduleModel = client.learningScheduleItem;
    if (!scheduleModel || typeof scheduleModel.findMany !== "function") {
      return [];
    }
    return await scheduleModel.findMany({
      where: { childId, dayOfWeek: day },
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    return [];
  }
}

export async function getWeekSchedule(childId: string) {
  try {
    const client = getPrismaClient();
    const scheduleModel = client.learningScheduleItem;
    if (!scheduleModel || typeof scheduleModel.findMany !== "function") {
      return DAY_NAMES.map((dayName, dayOfWeek) => ({ dayOfWeek, dayName, items: [] }));
    }
    const items = await scheduleModel.findMany({
      where: { childId },
      orderBy: [{ dayOfWeek: "asc" }, { sortOrder: "asc" }],
    });
    return DAY_NAMES.map((name, dayOfWeek) => ({
      dayOfWeek,
      dayName: name,
      items: items.filter((i) => i.dayOfWeek === dayOfWeek),
    }));
  } catch {
    return DAY_NAMES.map((dayName, dayOfWeek) => ({ dayOfWeek, dayName, items: [] }));
  }
}

export const DEFAULT_SCHEDULE = [
  { dayOfWeek: 1, title: "Maths lesson", subject: "maths", timeLabel: "After school" },
  { dayOfWeek: 1, title: "Reading practice", subject: "reading", timeLabel: "Before dinner" },
  { dayOfWeek: 3, title: "Quick quiz", subject: "maths", timeLabel: "After school" },
  { dayOfWeek: 3, title: "Focus session", subject: "study-skills", timeLabel: "Morning" },
  { dayOfWeek: 5, title: "Coding fun", subject: "coding", timeLabel: "Weekend" },
  { dayOfWeek: 5, title: "Money skills", subject: "money", timeLabel: "Weekend" },
];
