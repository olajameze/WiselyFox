import { z } from "zod";
import type { LessonStep } from "@/data/curriculum";

const learningMethodSchema = z.enum([
  "read",
  "watch",
  "practice",
  "quiz",
  "discuss",
  "draw",
  "listen",
]);

const stepCheckSchema = z.object({
  prompt: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  explanation: z.string(),
});

const lessonStepSchema = z.object({
  title: z.string(),
  content: z.string(),
  tip: z.string().optional(),
  keyFacts: z.array(z.string()).optional(),
  method: learningMethodSchema.optional(),
  videoId: z.string().optional(),
  videoTitle: z.string().optional(),
  instructions: z.array(z.string()).optional(),
  check: stepCheckSchema.optional(),
});

const lessonContentSchema = z.object({
  steps: z.array(lessonStepSchema).min(1),
});

export function parseLessonContent(raw: string): { steps: LessonStep[] } {
  const json: unknown = JSON.parse(raw);
  return lessonContentSchema.parse(json);
}
