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

const AI_SYSTEM_PROMPT = [
  "Generate a child-safe multiple-choice question.",
  "Return JSON only with keys: prompt, options, correctAnswer, explanation.",
  "Use plain UK English. Short sentences. Age-appropriate.",
  "No personal data. No diagnostic claims. Strengths-based language.",
  "Do not use em dashes, en dashes as punctuation, or curly quotes.",
  "Use commas or full stops instead of dashes.",
].join(" ");

export function sanitizeAiOutput(text: string): boolean {
  const lower = text.toLowerCase();
  return !BLOCKED_TERMS.some((t) => lower.includes(t));
}

/** Normalize AI copy: strip dashes-as-punctuation and curly quotes. */
export function normalizeAiStyle(text: string): string {
  return text
    .replace(/\u2014/g, ", ")
    .replace(/\u2013/g, ", ")
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/,\s*,/g, ",")
    .replace(/\s+,/g, ",")
    .replace(/,\s*\./g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function fallbackQuestion(topic: string) {
  return {
    prompt: `What is an important fact about ${topic}?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: "Option A",
    explanation: "This is a fallback question when AI is unavailable.",
  };
}

function parseQuestionPayload(raw: string) {
  if (!sanitizeAiOutput(raw)) {
    throw new Error("AI output failed safety filter");
  }
  const normalized = normalizeAiStyle(raw);
  const parsed = questionSchema.safeParse(JSON.parse(normalized));
  if (!parsed.success) throw new Error("AI output failed validation");

  return {
    prompt: normalizeAiStyle(parsed.data.prompt),
    options: parsed.data.options.map((o) => normalizeAiStyle(o)),
    correctAnswer: normalizeAiStyle(parsed.data.correctAnswer),
    explanation: normalizeAiStyle(parsed.data.explanation),
  };
}

export async function generateQuestion(topic: string, ageBand: string, actorId?: string) {
  if (!env.OPENAI_API_KEY) {
    return fallbackQuestion(topic);
  }

  const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  const userContent = `Topic: ${topic}. Age band: ${ageBand}.`;

  async function requestOnce() {
    const response = await client.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [
        { role: "system", content: AI_SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
      response_format: { type: "json_object" },
      max_tokens: 400,
    });
    return response.choices[0]?.message?.content ?? "{}";
  }

  let data;
  try {
    data = parseQuestionPayload(await requestOnce());
  } catch {
    try {
      data = parseQuestionPayload(await requestOnce());
    } catch {
      return fallbackQuestion(topic);
    }
  }

  if (actorId) {
    await logAudit({ actorId, action: "ai.question_generated", metadata: { topic, ageBand } });
  }

  return data;
}
