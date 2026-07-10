import type { LessonStep } from "./curriculum";

type LessonDepth = {
  warmUp?: string;
  learn: string;
  practice?: string;
  review?: string;
  keyFacts?: string[];
};

/** Subject-wide depth appended when a lesson has no specific entry. */
const SUBJECT_LEARN_DEPTH: Record<string, string> = {
  maths:
    "Go deeper: always show your working so you can trace mistakes. Mathematicians often solve the same problem two ways, for example adding up and counting back, to verify the answer. Link each idea to something real: shopping totals, cooking measures, or sports scores.",
  reading:
    "Go deeper: strong readers read once for gist, once for detail. Pause after each paragraph and ask who did what and why. Rereading is not failure, it is how adults understand complex texts at work and university.",
  coding:
    "Go deeper: computers do exactly what you instruct, not what you meant. Professional developers write small tests, run code often, and fix one bug at a time. Every app you use, games, school platforms, messaging, is built from algorithms, variables, and logic you are learning now.",
  money:
    "Go deeper: money skills protect future you. Compare prices per unit in shops, track pocket money for a week, and discuss needs versus wants with a parent. Employers and banks trust people who can budget accurately.",
  "study-skills":
    "Go deeper: your brain learns through attention, practice, spacing, and sleep, not last-minute panic. The strategies here are used by university students, apprentices, and professionals. Small daily habits beat rare long cram sessions.",
  science:
    "Go deeper: science is evidence, not opinion. Fair tests, careful measurement, and honest records separate good conclusions from guesses. These skills underpin healthcare, engineering, climate research, and forensic work.",
  history:
    "Go deeper: history explains how we got here. Always ask who wrote a source, what they could know, and what they might leave out. Understanding the past helps you judge news, politics, and community change today.",
  geography:
    "Go deeper: geography connects people, places, and environments. Maps are models, always read the key and scale. Patterns you spot locally often reflect global forces like trade, climate, and migration.",
  "health-wellbeing":
    "Go deeper: physical and mental health support learning. These lessons are educational, talk to a trusted adult or health professional about personal concerns. Building habits early makes adult life easier.",
  "digital-skills":
    "Go deeper: digital literacy is as important as reading and maths in modern jobs. Protect privacy, verify sources, and use tools accessibly. Employers expect safe, ethical technology use.",
  "career-skills":
    "Go deeper: careers are built from skills, relationships, and reliability, not luck alone. Practice communication, teamwork, and problem-solving at school; they transfer to every industry.",
};

export const LESSON_DEPTH: Record<string, LessonDepth> = {
  "maths|addition-basics": {
    warmUp: "Before adding large numbers, estimate the answer, if 48 + 21 is about 50 + 20 = 70, you know 69 is reasonable.",
    learn:
      "Regrouping (carrying): when ones digits sum to 10 or more, write the extra ten in the tens column. Example: 38 + 27 → 8+7=15 (write 5, carry 1), 3+2+1=6 → 65. Number lines help visual learners jump forwards.",
    practice: "Try adding three two-digit numbers. Add the first two, then add the third to that result.",
    review: "Addition is used in receipts, spreadsheets, and science data tables.",
    keyFacts: ["Estimate before calculating to catch big errors.", "Carrying moves tens when ones ≥ 10."],
  },
  "maths|subtraction-basics": {
    learn:
      "Borrowing: when the top digit is smaller, borrow 1 ten from the next column (it becomes 10 ones). Check subtraction by adding your answer to the number subtracted, you should return to the start.",
    keyFacts: ["Subtraction is the inverse of addition.", "Borrowing converts 1 ten into 10 ones."],
  },
  "maths|multiplication-intro": {
    learn:
      "Arrays show rows × columns. 4 × 3 is four rows of three dots. Commutative property: 4 × 3 = 3 × 4. Times tables speed mental maths, learn in chunks of 2s, 5s, 10s first.",
    keyFacts: ["Multiplication = equal groups.", "Arrays make times tables visual."],
  },
  "maths|fractions-intro": {
    learn:
      "Equivalent fractions name the same amount: 1/2 = 2/4 = 3/6. Simplify by dividing top and bottom by the same number. Compare fractions of the same whole, a bigger denominator means smaller pieces.",
    keyFacts: ["Numerator = parts you have.", "Denominator = equal parts in whole."],
  },
  "reading|phonics-vowels": {
    learn:
      "Short vowels: a as in cat, e in bed, i in sit, o in hot, u in cup. Long vowels often appear with silent e (cake) or two vowels together (team). Blend sounds smoothly without pausing between letters.",
    keyFacts: ["Every syllable needs a vowel sound.", "Silent e can lengthen the vowel before it."],
  },
  "reading|comprehension-main-idea": {
    learn:
      "Supporting details prove or explain the main idea, they are not the main idea themselves. Graphic organisers (web or table) help visual learners map who, what, where, when, why.",
    keyFacts: ["Main idea = what the text is mostly about.", "Details give evidence and examples."],
  },
  "coding|what-is-an-algorithm": {
    learn:
      "Algorithms need inputs, clear steps, and outputs. Debugging is finding which step fails. Real software uses the same logic as your sandwich algorithm, just more steps and data.",
    keyFacts: ["Inputs → process → outputs.", "Test each step before adding more."],
  },
  "coding|variables-intro": {
    learn:
      "Variables have names (identifiers), types (number, text, true/false), and values that change. Use meaningful names: score not x. Constants are variables that should not change (e.g. PI).",
    keyFacts: ["Variables store changeable data.", "Names should describe purpose."],
  },
  "science|living-things": {
    learn:
      "MRS GREN helps remember life processes: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition. Food chains show energy flow, energy is lost at each level, so fewer top predators exist.",
    keyFacts: ["Producers convert light to food.", "Consumers eat other organisms."],
  },
  "science|forces-motion": {
    learn:
      "Newton's first idea: objects stay still or keep moving unless a force acts. Resultant force determines acceleration. Weight is gravity pulling mass, measured in newtons, not kilograms (kg is mass).",
    keyFacts: ["Force = push or pull.", "Friction converts motion to heat."],
  },
  "study-skills|spaced-revision": {
    learn:
      "The forgetting curve drops memory quickly without review. Spacing fights this: review at 1 day, 3 days, 7 days, then 14. Pair with active recall, close the book and write what you remember.",
    keyFacts: ["Spacing beats cramming.", "Sleep consolidates memory."],
  },
  "study-skills|brain-learning-basics": {
    learn:
      "Synapses strengthen when you practise. Mistakes mean your brain is building new pathways, not that you cannot learn. Take breaks; the brain consolidates during rest and sleep.",
    keyFacts: ["Neuroplasticity = brain rewiring.", "Effort + sleep = durable learning."],
  },
};

export function enhanceLessonDepth(
  subjectSlug: string,
  lessonSlug: string,
  steps: LessonStep[],
): LessonStep[] {
  const key = `${subjectSlug}|${lessonSlug}`;
  const specific = LESSON_DEPTH[key];
  const fallbackLearn = SUBJECT_LEARN_DEPTH[subjectSlug];

  return steps.map((step) => {
    const next = { ...step };

    if (step.title === "Learn") {
      const parts = [step.content];
      if (specific?.learn) parts.push(specific.learn);
      else if (fallbackLearn) parts.push(fallbackLearn);
      next.content = parts.join("\n\n");
      if (specific?.keyFacts?.length) {
        next.keyFacts = [...(next.keyFacts ?? []), ...specific.keyFacts];
      }
    }

    if (step.title === "Warm up" && specific?.warmUp) {
      next.content = `${step.content}\n\n${specific.warmUp}`;
    }
    if (step.title === "Practice" && specific?.practice) {
      next.content = `${step.content}\n\n${specific.practice}`;
    }
    if (step.title === "Review" && specific?.review) {
      next.content = `${step.content}\n\n${specific.review}`;
    }

    return next;
  });
}
