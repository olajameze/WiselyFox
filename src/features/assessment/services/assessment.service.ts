export const ASSESSMENT_QUESTIONS = [
  {
    id: "read-1",
    domain: "reading",
    prompt: "Which word rhymes with 'cat'?",
    options: ["Dog", "Hat", "Sun", "Run"],
    correct: "Hat",
  },
  {
    id: "math-1",
    domain: "maths",
    prompt: "What is 7 + 5?",
    options: ["10", "11", "12", "13"],
    correct: "12",
  },
  {
    id: "logic-1",
    domain: "logic",
    prompt: "If all bloops are razzies, and this is a bloop, it must be a...",
    options: ["Razzy", "Zibble", "Flomp", "Unknown"],
    correct: "Razzy",
  },
  {
    id: "memory-1",
    domain: "memory",
    prompt: "Remember: 3, 7, 1. What was the middle number?",
    options: ["3", "7", "1", "5"],
    correct: "7",
  },
  {
    id: "attention-1",
    domain: "attention",
    prompt: "How many times does the letter 'e' appear in 'elephant'?",
    options: ["1", "2", "3", "4"],
    correct: "2",
  },
];

export function scoreAssessment(
  answers: { questionId: string; correct: boolean; responseTimeMs: number; confidence: number }[],
) {
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  const score = total > 0 ? (correct / total) * 100 : 0;
  const avgConfidence = answers.reduce((s, a) => s + a.confidence, 0) / Math.max(total, 1);

  let level = "Foundation";
  if (score >= 80 && avgConfidence >= 3.5) level = "Advanced";
  else if (score >= 55) level = "Developing";
  else if (score >= 30) level = "Emerging";

  return { level, score, avgConfidence };
}
