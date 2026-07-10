import OpenAI from "openai";
import { z } from "zod";
import { env } from "@/shared/lib/env";
import { logAudit } from "@/server/services/audit.service";

const questionSchema = z.object({
  prompt: z.string().max(500),
  options: z.array(z.string()).min(2).max(6),
  correctAnswer: z.string(),
  explanation: z.string().max(300),
});

const BLOCKED_TERMS = ["violence", "weapon", "explicit", "personal data"];

export function sanitizeAiOutput(text: string): boolean {
  const lower = text.toLowerCase();
  return !BLOCKED_TERMS.some((t) => lower.includes(t));
}

export async function generateQuestion(topic: string, ageBand: string, actorId?: string) {
  if (!env.OPENAI_API_KEY) {
    return {
      prompt: `What is an important fact about ${topic}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
      explanation: "This is a fallback question when AI is unavailable.",
    };
  }

  const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: env.OPENAI_MODEL,
    messages: [
      {
        role: "system",
        content:
          "Generate a child-safe multiple-choice question. Return JSON only. No personal data. Age-appropriate.",
      },
      {
        role: "user",
        content: `Topic: ${topic}. Age band: ${ageBand}.`,
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: 400,
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  if (!sanitizeAiOutput(raw)) throw new Error("AI output failed safety filter");

  const parsed = questionSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) throw new Error("AI output failed validation");

  if (actorId) {
    await logAudit({ actorId, action: "ai.question_generated", metadata: { topic, ageBand } });
  }

  return parsed.data;
}
