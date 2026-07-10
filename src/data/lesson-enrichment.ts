import type { LessonStep, StepCheck, CurriculumLesson } from "./curriculum";

type LessonEnrichment = {
  learnKeyFacts?: string[];
  practiceCheck?: StepCheck;
  learnContent?: string;
  practiceContent?: string;
};

/** Accurate interactive checks and key facts merged into lessons at seed time */
export const LESSON_ENRICHMENTS: Record<string, LessonEnrichment> = {
  "maths|addition-basics": {
    learnContent:
      "Addition combines quantities into one total. The plus sign (+) means 'put together'. You can add in any order (4 + 3 = 3 + 4), this commutative property makes mental maths faster.",
    learnKeyFacts: [
      "Addition combines quantities into a total sum.",
      "The symbol + means 'plus' or 'add'.",
      "Commutative property: 4 + 3 = 3 + 4.",
    ],
    practiceCheck: {
      prompt: "What is 6 + 4?",
      options: ["8", "9", "10", "11"],
      correctAnswer: "10",
      explanation: "6 + 4 = 10. Count on from 6: 7, 8, 9, 10.",
    },
  },
  "maths|subtraction-basics": {
    learnKeyFacts: [
      "Subtraction finds the difference or what remains.",
      "The − symbol means 'take away' or 'minus'.",
      "Check subtraction with addition: if 9 − 4 = 5, then 5 + 4 = 9.",
    ],
    practiceCheck: {
      prompt: "What is 12 − 5?",
      options: ["6", "7", "8", "9"],
      correctAnswer: "7",
      explanation: "12 − 5 = 7.",
    },
  },
  "maths|multiplication-intro": {
    learnKeyFacts: [
      "Multiplication is repeated addition of equal groups.",
      "3 × 4 means '3 groups of 4' = 4 + 4 + 4 = 12.",
      "The × symbol can be read as 'times' or 'groups of'.",
    ],
    practiceCheck: {
      prompt: "What is 4 × 3?",
      options: ["7", "10", "12", "16"],
      correctAnswer: "12",
      explanation: "4 × 3 = 12 (four groups of three).",
    },
  },
  "maths|fractions-intro": {
    learnKeyFacts: [
      "A fraction shows parts of a whole: numerator / denominator.",
      "The denominator is the total equal parts; numerator is how many you have.",
      "When comparing fractions of the same whole, larger denominator = smaller piece.",
    ],
    practiceCheck: {
      prompt: "Which is larger: 1/2 or 1/4?",
      options: ["1/2", "1/4", "They are equal", "Cannot tell"],
      correctAnswer: "1/2",
      explanation: "Halves are bigger than quarters of the same whole.",
    },
  },
  "maths|place-value": {
    learnKeyFacts: [
      "Each digit's position gives its value: ones, tens, hundreds…",
      "In 352: 3 = 300, 5 = 50, 2 = 2.",
      "Moving one place left multiplies value by 10.",
    ],
    practiceCheck: {
      prompt: "What is the value of 7 in 274?",
      options: ["7", "70", "700", "274"],
      correctAnswer: "70",
      explanation: "7 is in the tens column, so its value is 70.",
    },
  },
  "maths|word-problems": {
    learnKeyFacts: [
      "Read twice: identify the question and the numbers given.",
      "Keywords: 'total/altogether' → add; 'left/difference' → subtract.",
      "Always check: does your answer fit the story?",
    ],
    practiceCheck: {
      prompt: "Sam has 12 stickers and gets 5 more. How many now?",
      options: ["7", "15", "17", "60"],
      correctAnswer: "17",
      explanation: "12 + 5 = 17 stickers altogether.",
    },
  },
  "reading|phonics-vowels": {
    learnKeyFacts: [
      "A, E, I, O, U are vowels; every word needs at least one.",
      "Short vowels: cat, bed, sit, hot, cup.",
      "Long vowels often say their name: cake, bee, kite, rope, cube.",
    ],
    practiceCheck: {
      prompt: "Which word has a short 'a' sound?",
      options: ["Cake", "Cat", "Rain", "Day"],
      correctAnswer: "Cat",
      explanation: "Cat has the short /a/ sound, like in 'apple'.",
    },
  },
  "reading|comprehension-main-idea": {
    learnContent:
      "The main idea is what the whole paragraph is mostly about, not every tiny detail. Topic sentences often appear at the start or end. Ask: 'If I told a friend one sentence about this, what would it be?'",
    learnKeyFacts: [
      "The main idea is what the text is mostly about.",
      "Supporting details give examples, reasons, or evidence.",
      "Ask: 'What would I tell a friend this was about?'",
    ],
    practiceCheck: {
      prompt: "Main idea: 'Dolphins are mammals that breathe air.'",
      options: ["Dolphins are yellow", "Dolphins are mammals that breathe air", "The ocean is deep", "Fish swim fast"],
      correctAnswer: "Dolphins are mammals that breathe air",
      explanation: "The sentence states dolphins are air-breathing mammals.",
    },
  },
  "reading|vocabulary-context": {
    learnKeyFacts: [
      "Context clues are hints in nearby words.",
      "Look for definitions, examples, or opposites.",
      "Re-read the sentence with your guess substituted.",
    ],
    practiceCheck: {
      prompt: "'The arid desert had almost no rain.' Arid means…",
      options: ["Wet", "Dry", "Cold", "Green"],
      correctAnswer: "Dry",
      explanation: "'Almost no rain' tells us arid means very dry.",
    },
  },
  "reading|writing-sentences": {
    learnKeyFacts: [
      "A complete sentence needs a subject and a verb.",
      "Capital letter at the start; full stop at the end.",
      "Vary length: mix short and longer sentences.",
    ],
    practiceCheck: {
      prompt: "Which is a complete sentence?",
      options: ["Running fast", "The dog barked loudly.", "Under the table", "Because it rained"],
      correctAnswer: "The dog barked loudly.",
      explanation: "It has subject (dog) + verb (barked) and ends properly.",
    },
  },
  "reading|inference": {
    learnKeyFacts: [
      "Inference = conclusion from clues + what you already know.",
      "Authors often imply rather than state everything.",
      "Ask: 'What must be true based on the clues?'",
    ],
    practiceCheck: {
      prompt: "'Maya grabbed her umbrella.' The weather is probably…",
      options: ["Sunny and hot", "Rainy or about to rain", "Snowing", "Windless"],
      correctAnswer: "Rainy or about to rain",
      explanation: "People usually take umbrellas when rain is expected.",
    },
  },
  "reading|paragraph-structure": {
    learnKeyFacts: [
      "One paragraph = one main idea.",
      "Topic sentence introduces the main point.",
      "Supporting sentences add detail; closing may summarise.",
    ],
    practiceCheck: {
      prompt: "The topic sentence usually…",
      options: ["Ends the book", "States the main idea", "Lists page numbers", "Is always a question"],
      correctAnswer: "States the main idea",
      explanation: "It tells the reader what the paragraph is about.",
    },
  },
  "coding|what-is-an-algorithm": {
    learnContent:
      "An algorithm is a finite sequence of clear steps that solves a problem. Computers follow instructions literally, ambiguous steps cause bugs. Recipes, directions, and morning routines are everyday algorithms.",
    learnKeyFacts: [
      "An algorithm is an ordered set of steps to solve a problem.",
      "Computers follow instructions literally, be precise.",
      "Everyday algorithms: recipes, directions, morning routines.",
    ],
    practiceCheck: {
      prompt: "What is an algorithm?",
      options: ["A computer virus", "Step by step instructions", "A keyboard", "A website"],
      correctAnswer: "Step by step instructions",
      explanation: "Algorithms are clear, ordered steps.",
    },
  },
  "coding|loops-basics": {
    learnKeyFacts: [
      "Loops repeat a block of code multiple times.",
      "Saves writing the same instruction again and again.",
      "Always know how many times the loop will run.",
    ],
    practiceCheck: {
      prompt: "repeat 4 times: print '*'. How many stars?",
      options: ["1", "2", "4", "8"],
      correctAnswer: "4",
      explanation: "The loop runs exactly 4 times → ****.",
    },
  },
  "coding|if-statements": {
    learnKeyFacts: [
      "if (condition) runs code only when condition is true.",
      "else runs when the condition is false.",
      "Conditions compare values: >, <, ==, >=, <=.",
    ],
    practiceCheck: {
      prompt: "if score > 10, celebrate. score is 12. What happens?",
      options: ["Nothing", "Celebrate runs", "Error", "Score becomes 10"],
      correctAnswer: "Celebrate runs",
      explanation: "12 > 10 is true, so celebrate() runs.",
    },
  },
  "coding|variables-intro": {
    learnKeyFacts: [
      "Variables store values that can change while the program runs.",
      "Use descriptive names: score, playerName, lives.",
      "Assignment: score = score + 1 adds one point.",
    ],
    practiceCheck: {
      prompt: "lives = 3, then lives = lives - 1. lives is now…",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      explanation: "3 − 1 = 2 lives remaining.",
    },
  },
  "coding|debugging-practice": {
    learnKeyFacts: [
      "A bug is an error in the program's logic or instructions.",
      "Debug by testing one change at a time.",
      "Trace values on paper for each step.",
    ],
    practiceCheck: {
      prompt: "Debugging means…",
      options: ["Adding errors", "Finding and fixing errors", "Deleting code", "Restarting the PC"],
      correctAnswer: "Finding and fixing errors",
      explanation: "Developers debug to fix mistakes.",
    },
  },
  "coding|pseudocode": {
    learnKeyFacts: [
      "Pseudocode plans logic in plain language before real code.",
      "Uses IF/THEN/ELSE and REPEAT structures.",
      "No strict syntax, focus on correct order of steps.",
    ],
    practiceCheck: {
      prompt: "Pseudocode helps you…",
      options: ["Plan before coding", "Delete files", "Charge batteries", "Print faster"],
      correctAnswer: "Plan before coding",
      explanation: "Planning prevents logic errors early.",
    },
  },
  "money|coins-and-notes": {
    learnKeyFacts: [
      "UK coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2.",
      "100 pence = £1.",
      "Notes: £5, £10, £20, £50 (common denominations).",
    ],
    practiceCheck: {
      prompt: "How many 10p coins make 50p?",
      options: ["3", "4", "5", "10"],
      correctAnswer: "5",
      explanation: "5 × 10p = 50p.",
    },
  },
  "money|needs-vs-wants": {
    learnKeyFacts: [
      "Needs: essentials for health and safety (food, shelter, clothing).",
      "Wants: extras you could live without (games, sweets).",
      "Budget needs first, then savings, then wants.",
    ],
    practiceCheck: {
      prompt: "Which is a need?",
      options: ["Video game", "Winter coat", "Sticker pack", "Extra sweets"],
      correctAnswer: "Winter coat",
      explanation: "Warm clothing is essential in cold weather.",
    },
  },
  "money|simple-budget": {
    learnKeyFacts: [
      "Budget = plan for money coming in and going out.",
      "Income − planned spending = amount left to save.",
      "Track weekly to avoid overspending.",
    ],
    practiceCheck: {
      prompt: "£10 income − £3 save − £5 spend = ? left",
      options: ["£0", "£1", "£2", "£8"],
      correctAnswer: "£2",
      explanation: "10 − 3 − 5 = £2 remaining.",
    },
  },
  "money|interest-basics": {
    learnKeyFacts: [
      "Interest is money earned on savings or paid on loans.",
      "Simple interest example: 5% of £100 = £5 per year.",
      "Compound interest earns interest on previous interest.",
    ],
    practiceCheck: {
      prompt: "5% simple interest on £100 saved for one year = ?",
      options: ["£5", "£50", "£105 total only", "£0"],
      correctAnswer: "£5",
      explanation: "5% of £100 = £5 interest (plus your £100).",
    },
  },
  "money|making-change": {
    learnKeyFacts: [
      "Change = amount paid − price of item.",
      "Count up from price to amount paid to check change.",
      "Always verify change at the till.",
    ],
    practiceCheck: {
      prompt: "Item £3.20, pay £5.00. Change?",
      options: ["£1.20", "£1.80", "£2.20", "£2.80"],
      correctAnswer: "£1.80",
      explanation: "£5.00 − £3.20 = £1.80.",
    },
  },
  "money|saving-goals": {
    learnKeyFacts: [
      "A savings goal gives purpose to putting money aside.",
      "Regular small amounts add up: £2/week × 5 weeks = £10.",
      "Track progress on a chart to stay motivated.",
    ],
    practiceCheck: {
      prompt: "Save £2/week for 4 weeks. Total saved?",
      options: ["£4", "£6", "£8", "£10"],
      correctAnswer: "£8",
      explanation: "2 × 4 = £8.",
    },
  },
  "study-skills|focus-environment": {
    learnKeyFacts: [
      "Remove distractions: phone away, quiet space, good light.",
      "Have water, pencils, and materials ready before starting.",
      "A consistent study spot signals 'learning mode' to your brain.",
      "Tell family you're in focus mode.",
    ],
    learnContent:
      "Your brain spends energy filtering noise and clutter. A prepared, predictable space frees that energy for thinking. Fix basics first: hunger, thirst, comfort, then start the timer.",
    practiceCheck: {
      prompt: "Before studying, you should…",
      options: ["Prepare materials", "Open every app", "Skip sleep", "Avoid water"],
      correctAnswer: "Prepare materials",
      explanation: "Being ready reduces interruptions.",
    },
  },
  "study-skills|note-taking": {
    learnKeyFacts: [
      "Notes capture key ideas, not every word.",
      "Cornell method: cues, notes, summary.",
      "Review notes within 24 hours.",
    ],
    practiceCheck: {
      prompt: "Cornell notes include a…",
      options: ["Summary section", "Shopping list only", "Random doodle only", "Nothing"],
      correctAnswer: "Summary section",
      explanation: "Summaries distil the main ideas.",
    },
  },
  "study-skills|spaced-revision": {
    learnKeyFacts: [
      "Spacing reviews beats one long cram session.",
      "Review at 1 day, 3 days, 7 days for strong memory.",
      "Sleep consolidates learning overnight.",
    ],
    practiceCheck: {
      prompt: "Spaced revision means…",
      options: ["Cram once", "Review over several days", "Never review", "Only read once"],
      correctAnswer: "Review over several days",
      explanation: "Spacing strengthens long term recall.",
    },
  },
  "study-skills|exam-calming": {
    learnKeyFacts: [
      "Slow breathing (4 in, 4 hold, 4 out) calms nerves.",
      "Read all questions before answering.",
      "Answer easy questions first, return to hard ones.",
    ],
    practiceCheck: {
      prompt: "If anxious in a test, first try…",
      options: ["Leave immediately", "Slow breathing", "Guess all randomly", "Hide the paper"],
      correctAnswer: "Slow breathing",
      explanation: "Breathing lowers stress so you can think clearly.",
    },
  },
  "study-skills|brain-learning-basics": {
    learnKeyFacts: [
      "Neuroplasticity: your brain forms and strengthens connections when you practise.",
      "Attention + effort start learning; sleep consolidates it into long term memory.",
      "Cramming without sleep weakens recall, spacing beats one long session.",
    ],
    learnContent:
      "Learning has three helpful stages: (1) focus your attention, (2) practise retrieval, (3) sleep so memories consolidate. Skills feel awkward at first because pathways are new, that is normal, not failure.",
    practiceCheck: {
      prompt: "Which best supports long term memory?",
      options: ["Spaced practice + sleep", "One all-night cram", "Never reviewing", "Only watching videos"],
      correctAnswer: "Spaced practice + sleep",
      explanation: "Spacing and sleep build durable memories.",
    },
  },
  "study-skills|working-memory-attention": {
    learnKeyFacts: [
      "Working memory holds roughly 4 to 7 items briefly while you think.",
      "Chunking groups items (e.g. phone number pairs) to free mental space.",
      "Fewer distractions mean more working memory for the actual task.",
    ],
    learnContent:
      "Attention and working memory work together like a small desk, clutter fills it fast. Short focus blocks, one task at a time, and phone-away rules protect the space your brain needs to learn.",
    practiceCheck: {
      prompt: "When a lesson feels overwhelming, best first step?",
      options: ["Break it into smaller chunks", "Study 5 hours straight", "Open every app", "Skip all breaks"],
      correctAnswer: "Break it into smaller chunks",
      explanation: "Smaller chunks fit working memory better.",
    },
  },
  "study-skills|active-recall": {
    learnKeyFacts: [
      "Active recall = testing memory without looking at notes.",
      "Harder than re-reading but builds stronger memory.",
      "Flashcards and self-quizzing are effective.",
    ],
    practiceCheck: {
      prompt: "Active recall means…",
      options: ["Re-reading only", "Testing memory without notes", "Skipping breaks", "Watching TV"],
      correctAnswer: "Testing memory without notes",
      explanation: "Retrieving information strengthens learning.",
    },
  },
  "study-skills|goal-setting": {
    learnKeyFacts: [
      "SMART goals: Specific, Measurable, Achievable, Relevant, Time bound.",
      "'Two maths lessons this week' beats 'get better at maths'.",
      "Write goals down and share with a parent.",
    ],
    practiceCheck: {
      prompt: "A SMART goal should be…",
      options: ["Vague", "Specific and measurable", "Impossible", "Secret"],
      correctAnswer: "Specific and measurable",
      explanation: "Clear goals are easier to track and achieve.",
    },
  },
  "science|living-things": {
    learnKeyFacts: [
      "Living things grow, reproduce, respond, and need energy.",
      "A habitat provides food, water, shelter, and space.",
      "Producers (plants) start most food chains.",
    ],
    practiceCheck: {
      prompt: "Which is a living thing?",
      options: ["Oak tree", "Plastic chair", "Rock", "Glass"],
      correctAnswer: "Oak tree",
      explanation: "Trees grow and reproduce.",
    },
  },
  "science|forces-motion": {
    learnKeyFacts: [
      "Forces are pushes or pulls measured in newtons.",
      "Gravity attracts mass toward Earth.",
      "Friction opposes motion between surfaces.",
    ],
    practiceCheck: {
      prompt: "Friction acts to…",
      options: ["Slow motion", "Speed everything", "Remove mass", "Create light"],
      correctAnswer: "Slow motion",
      explanation: "Friction opposes sliding.",
    },
  },
  "science|plants-photosynthesis": {
    practiceCheck: {
      prompt: "Photosynthesis mainly happens in…",
      options: ["Leaves", "Rocks", "Metal", "Plastic"],
      correctAnswer: "Leaves",
      explanation: "Chlorophyll traps light in leaves.",
    },
  },
  "coding|track-python-intro": {
    practiceCheck: {
      prompt: "What does print(3 + 4) output?",
      options: ["7", "34", "print", "Error always"],
      correctAnswer: "7",
      explanation: "Python evaluates 3 + 4 = 7.",
    },
  },
  "coding|track-html-css-intro": {
    practiceCheck: {
      prompt: "Which tag creates a paragraph?",
      options: ["<p>", "<div>", "<br>", "<img>"],
      correctAnswer: "<p>",
      explanation: "<p> wraps paragraph text.",
    },
  },
  "science|track-biology-intro": {
    practiceCheck: {
      prompt: "Mitochondria mainly provide…",
      options: ["Energy for the cell", "Green colour only", "Metal shells", "Sound"],
      correctAnswer: "Energy for the cell",
      explanation: "Powerhouse of the cell.",
    },
  },
  "maths|career-data-spreadsheets": {
    practiceCheck: {
      prompt: "What does =SUM(B2:B5) do?",
      options: ["Adds cells B2 to B5", "Deletes rows", "Sorts column A", "Sends email"],
      correctAnswer: "Adds cells B2 to B5",
      explanation: "SUM adds all values in the range.",
    },
  },
  "reading|career-professional-email": {
    practiceCheck: {
      prompt: "A professional email should have…",
      options: ["One clear purpose", "Ten topics at once", "No greeting", "Only emojis"],
      correctAnswer: "One clear purpose",
      explanation: "Focus helps busy readers.",
    },
  },
  "career-skills|career-workplace-communication": {
    practiceCheck: {
      prompt: "After meetings, send…",
      options: ["Action summary", "Nothing", "Random memes", "Only complaints"],
      correctAnswer: "Action summary",
      explanation: "Summaries align the team.",
    },
  },
  "career-skills|career-entrepreneurship-intro": {
    practiceCheck: {
      prompt: "Validating a business idea means…",
      options: ["Checking people want it", "Ignoring feedback", "Skipping costs", "Copying only"],
      correctAnswer: "Checking people want it",
      explanation: "Customer demand matters.",
    },
  },
};

export function enrichLessonSteps(subjectSlug: string, lesson: CurriculumLesson): LessonStep[] {
  const key = `${subjectSlug}|${lesson.slug}`;
  const enrichment = LESSON_ENRICHMENTS[key];
  if (!enrichment) return lesson.steps;

  return lesson.steps.map((step) => {
    const next = { ...step };
    if (step.title === "Learn") {
      if (enrichment.learnKeyFacts) next.keyFacts = enrichment.learnKeyFacts;
      if (enrichment.learnContent) next.content = enrichment.learnContent;
    }
    if (step.title === "Practice") {
      if (enrichment.practiceCheck) next.check = enrichment.practiceCheck;
      if (enrichment.practiceContent) next.content = enrichment.practiceContent;
    }
    if (step.title === "Review" && enrichment.practiceCheck) {
      next.check = {
        prompt: `Before you finish, ${enrichment.practiceCheck.prompt}`,
        options: enrichment.practiceCheck.options,
        correctAnswer: enrichment.practiceCheck.correctAnswer,
        explanation: enrichment.practiceCheck.explanation,
      };
    }
    return next;
  });
}
