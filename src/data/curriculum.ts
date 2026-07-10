export type StepCheck = {
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type LearningMethod =
  | "read"
  | "watch"
  | "practice"
  | "quiz"
  | "discuss"
  | "draw"
  | "listen";

export type LessonStep = {
  title: string;
  content: string;
  tip?: string;
  keyFacts?: string[];
  check?: StepCheck;
  method?: LearningMethod;
  videoId?: string;
  videoTitle?: string;
  instructions?: string[];
};

export type CurriculumLesson = {
  slug: string;
  title: string;
  ageBand: string;
  difficulty: number;
  durationMinutes: number;
  steps: LessonStep[];
};

export type GuidePractice = {
  title: string;
  instructions: string[];
  reflection: string;
};

export type StudyGuideSection = {
  title: string;
  content: string;
  tips: string[];
  keyPoints?: string[];
  check?: StepCheck;
  videoId?: string;
  videoTitle?: string;
  practice?: GuidePractice;
};

export type CurriculumQuestion = {
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number;
  ageBand: string;
};

export type CurriculumSubject = {
  slug: string;
  title: string;
  description: string;
  ageBands: string[];
  studyGuide: {
    intro: string;
    sections: StudyGuideSection[];
  };
  lessons: CurriculumLesson[];
  questions: CurriculumQuestion[];
};

export const CURRICULUM: CurriculumSubject[] = [
  {
    slug: "maths",
    title: "Mathematics",
    description: "Number sense, operations, shape, and problem solving.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Maths builds step by step. Use objects, drawings, and short practice bursts. Celebrate effort, not speed.",
      sections: [
        {
          title: "Number sense",
          content:
            "Help your child see numbers in everyday life: counting stairs, sharing snacks equally, or spotting patterns on a calendar.",
          tips: ["Start with concrete objects before abstract symbols.", "Ask 'how do you know?' to build reasoning."],
        },
        {
          title: "Operations",
          content:
            "Addition combines groups; subtraction finds what's left or the difference. Use number lines for visual support.",
          tips: ["Break big problems into smaller chunks.", "Link maths to real situations like shopping or cooking."],
        },
        {
          title: "Problem solving",
          content:
            "Read the question twice. Underline key numbers. Draw a picture before calculating.",
          tips: ["It's okay to guess and check.", "Review mistakes together without blame."],
        },
        {
          title: "Parent checkpoints",
          content:
            "Check weekly mastery in the parent dashboard. If a topic stalls, revisit the study guide and run a short quiz.",
          tips: ["Short daily practice beats long cramming.", "Use calm mode if maths feels stressful."],
        },
      ],
    },
    lessons: [
      {
        slug: "addition-basics",
        title: "Addition basics",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Look around your room. Can you find groups of 2 or 3 things?", tip: "Point and count aloud together." },
          { title: "Learn", content: "Addition means putting groups together. 4 + 3 = 7 because four items plus three more makes seven.", tip: "Use fingers or blocks if helpful." },
          { title: "Practice", content: "Try: 5 + 2 = ? and 6 + 4 = ? Say your answers out loud before checking.", tip: "No rush, accuracy first." },
          { title: "Review", content: "You combined groups to find totals. Tomorrow we'll use bigger numbers!", tip: "High five for finishing." },
        ],
      },
      {
        slug: "subtraction-basics",
        title: "Subtraction basics",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "If you have 8 pencils and give away 3, how many are left?", tip: "Act it out with real objects." },
          { title: "Learn", content: "Subtraction finds what's left or the difference. 9 − 4 = 5.", tip: "Count back on a number line." },
          { title: "Practice", content: "Solve: 10 − 6 and 12 − 5. Draw dots and cross some out.", tip: "Drawing helps memory." },
          { title: "Review", content: "Subtraction is the opposite of addition. They work as a team!", tip: "Check answers with addition." },
        ],
      },
      {
        slug: "multiplication-intro",
        title: "Introduction to multiplication",
        ageBand: "8-10",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Multiplication is repeated addition. 3 × 2 means three groups of two.", tip: "Arrange objects in equal rows." },
          { title: "Learn", content: "3 × 4 = 12 because 3 + 3 + 3 + 3 = 12.", tip: "Arrays (rows and columns) make this visual." },
          { title: "Practice", content: "Try 2 × 5 and 4 × 3 using groups of objects.", tip: "Skip counting helps: 2, 4, 6, 8, 10." },
          { title: "Review", content: "Multiplication saves time when adding equal groups.", tip: "Learn times tables in small sets." },
        ],
      },
      {
        slug: "fractions-intro",
        title: "Fractions introduction",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Cut a sandwich in half. Each piece is 1/2 of the whole.", tip: "Food makes fractions fun." },
          { title: "Learn", content: "The bottom number (denominator) shows equal parts. The top (numerator) shows how many you have.", tip: "Shade fractions on paper." },
          { title: "Practice", content: "Which is bigger: 1/2 or 1/4? Draw both to compare.", tip: "Same whole, fair comparison." },
          { title: "Review", content: "Fractions describe parts of a whole. You'll use them in cooking, money, and science.", tip: "Practice with pizza slices!" },
        ],
      },
    ],
    questions: [
      { prompt: "What is 8 + 5?", options: ["11", "12", "13", "14"], correctAnswer: "13", explanation: "8 + 5 = 13.", difficulty: 1, ageBand: "8-10" },
      { prompt: "What is 15 − 7?", options: ["6", "7", "8", "9"], correctAnswer: "8", explanation: "15 − 7 = 8.", difficulty: 1, ageBand: "8-10" },
      { prompt: "What is 3 × 4?", options: ["7", "10", "12", "16"], correctAnswer: "12", explanation: "Three groups of four equals twelve.", difficulty: 2, ageBand: "8-10" },
      { prompt: "Which fraction is largest?", options: ["1/2", "1/4", "1/8", "1/3"], correctAnswer: "1/2", explanation: "Half is larger than smaller parts of the same whole.", difficulty: 2, ageBand: "11-13" },
      { prompt: "How many sides does a hexagon have?", options: ["4", "5", "6", "8"], correctAnswer: "6", explanation: "Hex means six.", difficulty: 1, ageBand: "8-10" },
      { prompt: "What is 24 ÷ 6?", options: ["3", "4", "5", "6"], correctAnswer: "4", explanation: "24 shared into six equal groups gives 4 each.", difficulty: 2, ageBand: "8-10" },
      { prompt: "Round 47 to the nearest ten.", options: ["40", "45", "50", "47"], correctAnswer: "50", explanation: "47 is closer to 50 than 40.", difficulty: 2, ageBand: "8-10" },
      { prompt: "What is 0.5 as a fraction?", options: ["1/4", "1/2", "1/3", "2/3"], correctAnswer: "1/2", explanation: "0.5 means five tenths, which equals one half.", difficulty: 2, ageBand: "11-13" },
    ],
  },
  {
    slug: "reading",
    title: "Reading & Literacy",
    description: "Phonics, comprehension, vocabulary, and writing foundations.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Reading grows with daily exposure. Read aloud together, ask questions, and let interests guide book choices.",
      sections: [
        {
          title: "Phonics & decoding",
          content: "Sound out unfamiliar words. Blend sounds smoothly. Recognise common patterns like 'tion' and 'ing'.",
          tips: ["Praise attempts at new words.", "Keep sessions short and positive."],
        },
        {
          title: "Comprehension",
          content: "After reading, ask: Who? What happened? Why? Predict what might happen next.",
          tips: ["Pause at cliff-hangers.", "Connect stories to your child's life."],
        },
        {
          title: "Vocabulary",
          content: "Learn one new word a day. Use it in conversation. Keep a word journal with drawings.",
          tips: ["Explain words in simple language.", "Repeat new words in different contexts."],
        },
        {
          title: "Writing foundations",
          content: "Start with sentences, then paragraphs. Plan with bullet points before writing stories.",
          tips: ["Celebrate ideas over spelling at first.", "Use dyslexia friendly fonts if needed."],
        },
      ],
    },
    lessons: [
      {
        slug: "phonics-vowels",
        title: "Vowel sounds",
        ageBand: "5-7",
        difficulty: 1,
        durationMinutes: 10,
        steps: [
          { title: "Warm up", content: "Say A, E, I, O, U. Each vowel can make more than one sound.", tip: "Sing the vowel song." },
          { title: "Learn", content: "Short 'a' sounds like in 'cat'. Long 'a' sounds like in 'cake'.", tip: "Hold your hand under your chin, jaw drops on short vowels." },
          { title: "Practice", content: "Sort these words: cat, cake, bed, bee. Short or long vowel?", tip: "Say them slowly." },
          { title: "Review", content: "Vowels are the heart of every word. Keep listening for their sounds.", tip: "Read one page tonight." },
        ],
      },
      {
        slug: "comprehension-main-idea",
        title: "Finding the main idea",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Every paragraph has a big idea, what is it mostly about?", tip: "Look at the title first." },
          { title: "Learn", content: "The main idea is the most important point. Details support it.", tip: "Ask: If I removed one sentence, would the meaning change?" },
          { title: "Practice", content: "Read: 'Dolphins are mammals that breathe air.' Main idea?", tip: "Answer in one sentence." },
          { title: "Review", content: "Main idea + details = strong comprehension.", tip: "Summarise books in one line." },
        ],
      },
      {
        slug: "vocabulary-context",
        title: "Words in context",
        ageBand: "8-10",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Sometimes you can guess a word's meaning from the sentence around it.", tip: "Read the whole sentence first." },
          { title: "Learn", content: "Context clues include definitions, examples, and opposites nearby.", tip: "Underline the mystery word." },
          { title: "Practice", content: "'The arid desert had almost no rain.' What might 'arid' mean?", tip: "Dry, the next clue helps!" },
          { title: "Review", content: "You don't need a dictionary for every word.", tip: "Keep a list of new favourites." },
        ],
      },
      {
        slug: "writing-sentences",
        title: "Strong sentences",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "A sentence needs a subject (who/what) and a verb (does what).", tip: "Act out verbs!" },
          { title: "Learn", content: "Vary sentence length. Short sentences add punch. Longer ones explain.", tip: "Read your work aloud." },
          { title: "Practice", content: "Combine: 'The dog barked. It was loud.' into one strong sentence.", tip: "Try: The dog barked loudly." },
          { title: "Review", content: "Clear sentences make readers want to keep going.", tip: "Edit one sentence today." },
        ],
      },
    ],
    questions: [
      { prompt: "Which word rhymes with 'light'?", options: ["Late", "Night", "Lot", "Let"], correctAnswer: "Night", explanation: "Light and night share the same ending sound.", difficulty: 1, ageBand: "5-7" },
      { prompt: "What is the main idea: 'Bees pollinate flowers, helping plants grow.'?", options: ["Bees are yellow", "Bees help plants", "Flowers are pretty", "Plants need water"], correctAnswer: "Bees help plants", explanation: "The sentence focuses on bees helping plants grow.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Which is a noun?", options: ["Run", "Happy", "Garden", "Quickly"], correctAnswer: "Garden", explanation: "A noun names a person, place, or thing.", difficulty: 1, ageBand: "8-10" },
      { prompt: "'Enormous' means very big. Which word is similar?", options: ["Tiny", "Huge", "Quiet", "Slow"], correctAnswer: "Huge", explanation: "Huge is a synonym for enormous.", difficulty: 2, ageBand: "8-10" },
      { prompt: "Which sentence is written correctly?", options: ["she goed home", "She went home.", "She go home.", "she Went home"], correctAnswer: "She went home.", explanation: "Capital letter and correct past tense.", difficulty: 2, ageBand: "8-10" },
      { prompt: "What is the opposite of 'ancient'?", options: ["Old", "Modern", "Historic", "Past"], correctAnswer: "Modern", explanation: "Modern means recent or current.", difficulty: 2, ageBand: "11-13" },
      { prompt: "In a story, the climax is...", options: ["The ending", "The most exciting moment", "The first chapter", "The title"], correctAnswer: "The most exciting moment", explanation: "The climax is the peak of tension.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Which prefix means 'not'?", options: ["Re-", "Un-", "Pre-", "Over-"], correctAnswer: "Un-", explanation: "Un- reverses meaning: happy → unhappy.", difficulty: 1, ageBand: "8-10" },
    ],
  },
  {
    slug: "coding",
    title: "Coding Basics",
    description: "Logic, sequences, patterns, and computational thinking.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Coding is structured problem solving. Start unplugged with puzzles and sequences before screens.",
      sections: [
        {
          title: "Sequences",
          content: "Computers follow instructions in order. One step out of place can break the program.",
          tips: ["Write steps for making a sandwich, that's an algorithm!", "Test each step."],
        },
        {
          title: "Loops",
          content: "Loops repeat actions. 'Repeat 5 times' saves writing the same line again.",
          tips: ["Spot patterns that repeat.", "Use loops for efficiency."],
        },
        {
          title: "Conditions",
          content: "If something is true, do A; otherwise do B. That's how games and apps make decisions.",
          tips: ["Use 'if rainy, take umbrella' examples.", "Trace decisions on paper."],
        },
        {
          title: "Debugging",
          content: "Bugs are normal. Read error messages, check one change at a time, and ask for help.",
          tips: ["Celebrate fixing bugs.", "Rubber duck debugging: explain code aloud."],
        },
      ],
    },
    lessons: [
      {
        slug: "what-is-an-algorithm",
        title: "What is an algorithm?",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 10,
        steps: [
          { title: "Warm up", content: "An algorithm is a step by step plan to solve a problem.", tip: "Follow a recipe, that's an algorithm!" },
          { title: "Learn", content: "Computers need exact instructions. They can't guess what you mean.", tip: "Be precise with each step." },
          { title: "Practice", content: "Write steps for a robot to cross a room without hitting a chair.", tip: "Test with a family member acting as the robot." },
          { title: "Review", content: "Algorithms are everywhere, not just in code.", tip: "Spot one algorithm today." },
        ],
      },
      {
        slug: "loops-basics",
        title: "Loops basics",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Instead of 'jump, jump, jump', say 'repeat jump 3 times'.", tip: "Clap a repeating pattern." },
          { title: "Learn", content: "Loops save time when actions repeat.", tip: "Count how many times the loop runs." },
          { title: "Practice", content: "How many stars print? repeat 4 times: print '*'", tip: "Four stars: ****" },
          { title: "Review", content: "Loops are core to games, animations, and apps.", tip: "Find loops in a favourite game." },
        ],
      },
      {
        slug: "if-statements",
        title: "If statements",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "If it's cold, wear a coat. Otherwise, don't.", tip: "Real-life if/else." },
          { title: "Learn", content: "if (score > 10) { celebrate() } runs only when the condition is true.", tip: "Conditions are true or false." },
          { title: "Practice", content: "Write: if age >= 13, allow account, else show parent screen.", tip: "Think about safety rules." },
          { title: "Review", content: "Conditions make programs smart and responsive.", tip: "Trace true/false on paper." },
        ],
      },
      {
        slug: "variables-intro",
        title: "Variables introduction",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "A variable is a named box that stores a value.", tip: "score = 0" },
          { title: "Learn", content: "You can change what's inside: score = score + 1", tip: "Names should describe the data." },
          { title: "Practice", content: "Track lives in a game: lives starts at 3, subtract 1 when hit.", tip: "Draw the box updating." },
          { title: "Review", content: "Variables remember information while your program runs.", tip: "Use clear names like 'playerName'." },
        ],
      },
    ],
    questions: [
      { prompt: "What is an algorithm?", options: ["A virus", "Step by step instructions", "A keyboard", "A website"], correctAnswer: "Step by step instructions", explanation: "Algorithms are ordered steps to solve problems.", difficulty: 1, ageBand: "8-10" },
      { prompt: "A loop is used to...", options: ["Delete code", "Repeat actions", "Turn off the computer", "Print once"], correctAnswer: "Repeat actions", explanation: "Loops repeat blocks of instructions.", difficulty: 1, ageBand: "8-10" },
      { prompt: "If x > 5, print 'big'. x is 7. What prints?", options: ["big", "small", "nothing", "7"], correctAnswer: "big", explanation: "7 is greater than 5, so the condition is true.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Which stores a player's name?", options: ["A loop", "A variable", "A bug", "A screen"], correctAnswer: "A variable", explanation: "Variables hold data like names and scores.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Debugging means...", options: ["Adding bugs", "Finding and fixing errors", "Deleting the program", "Restarting the PC"], correctAnswer: "Finding and fixing errors", explanation: "Debug = fix mistakes in code.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Binary uses which digits?", options: ["0 and 1", "1 and 2", "0 to 9", "A and B"], correctAnswer: "0 and 1", explanation: "Computers use base-2: 0 and 1.", difficulty: 2, ageBand: "11-13" },
      { prompt: "What comes after 'start' in a flowchart?", options: ["Random step", "The next instruction in order", "End always", "Nothing"], correctAnswer: "The next instruction in order", explanation: "Flow follows sequence unless a branch says otherwise.", difficulty: 1, ageBand: "8-10" },
      { prompt: "A function is...", options: ["A reusable block of code", "A type of computer", "An error message", "A cable"], correctAnswer: "A reusable block of code", explanation: "Functions group steps you can call by name.", difficulty: 2, ageBand: "11-13" },
    ],
  },
  {
    slug: "money",
    title: "Money Literacy",
    description: "Coins, budgeting, saving, and smart spending.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Money skills start early. Use real examples, pocket money, and saving goals your child chooses.",
      sections: [
        {
          title: "Recognising money",
          content: "Learn coins and notes. Practice making amounts in different ways (e.g. 50p as two 20p + 10p).",
          tips: ["Use a piggy bank for tangible saving.", "Play shop with price tags."],
        },
        {
          title: "Needs vs wants",
          content: "Needs keep us healthy and safe. Wants are extras. Both matter, plan for both.",
          tips: ["Ask before buying: need or want?", "Delay wants 24 hours when possible."],
        },
        {
          title: "Budgeting",
          content: "Income minus planned spending = what's left to save. Simple tables work well.",
          tips: ["Track pocket money weekly.", "Set one savings goal at a time."],
        },
        {
          title: "Digital money",
          content: "Cards and apps represent real money. Always check balances with a parent.",
          tips: ["Never share PINs or passwords.", "Discuss online purchases openly."],
        },
      ],
    },
    lessons: [
      {
        slug: "coins-and-notes",
        title: "Coins and notes",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 10,
        steps: [
          { title: "Warm up", content: "Sort coins by size and value. Which is worth the most?", tip: "Look at numbers on coins." },
          { title: "Learn", content: "UK coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2. Notes start at £5.", tip: "Make £1 in different ways." },
          { title: "Practice", content: "How many 10p coins make 50p?", tip: "Count in tens: five coins." },
          { title: "Review", content: "Knowing values helps you pay and get correct change.", tip: "Count change after shopping." },
        ],
      },
      {
        slug: "needs-vs-wants",
        title: "Needs vs wants",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Needs: food, shelter, clothes. Wants: toys, games, treats.", tip: "Sort pictures into two piles." },
          { title: "Learn", content: "Budgets cover needs first, then savings, then wants.", tip: "Needs aren't always boring!" },
          { title: "Practice", content: "List three needs and three wants from your week.", tip: "Discuss as a family." },
          { title: "Review", content: "Understanding needs vs wants prevents overspending.", tip: "Wait a day before big wants." },
        ],
      },
      {
        slug: "simple-budget",
        title: "Simple budgeting",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "If you get £10 pocket money, where should it go?", tip: "Save / spend / give jars." },
          { title: "Learn", content: "Budget: Income £10 − savings £3 − spend £5 = £2 left.", tip: "Write numbers in columns." },
          { title: "Practice", content: "Plan a £15 birthday budget for a gift and card.", tip: "Include a small buffer." },
          { title: "Review", content: "Budgets are plans, not punishments.", tip: "Review monthly with a parent." },
        ],
      },
      {
        slug: "interest-basics",
        title: "Interest basics",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Banks pay interest on savings. Lenders charge interest on loans.", tip: "Interest is money for using money." },
          { title: "Learn", content: "5% interest on £100 saves = £5 per year (simple example).", tip: "Compound interest grows faster over time." },
          { title: "Practice", content: "Which is better long term: save early or save late?", tip: "Early saving wins with time." },
          { title: "Review", content: "Interest affects savings accounts, loans, and credit.", tip: "Compare rates with a parent." },
        ],
      },
    ],
    questions: [
      { prompt: "How many 20p coins make £1?", options: ["4", "5", "10", "20"], correctAnswer: "5", explanation: "5 × 20p = 100p = £1.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Which is a need?", options: ["Video game", "Winter coat", "Candy", "Sticker pack"], correctAnswer: "Winter coat", explanation: "Clothing for warmth is a need.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Change from £5 for a £3.50 item?", options: ["£1.00", "£1.50", "£2.00", "£2.50"], correctAnswer: "£1.50", explanation: "£5.00 − £3.50 = £1.50.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Saving money helps you...", options: ["Reach future goals", "Avoid all spending", "Ignore budgets", "Lose money"], correctAnswer: "Reach future goals", explanation: "Savings fund goals over time.", difficulty: 1, ageBand: "8-10" },
      { prompt: "A budget tracks...", options: ["Only wishes", "Income and spending", "Weather", "Homework"], correctAnswer: "Income and spending", explanation: "Budgets plan money in and out.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Debit card money comes from...", options: ["Your account", "Free gifts", "The government always", "Nowhere"], correctAnswer: "Your account", explanation: "Debit spends money you already have.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Which is safest online?", options: ["Share card details in chat", "Shop with a parent on trusted sites", "Click unknown links", "Save passwords on public PCs"], correctAnswer: "Shop with a parent on trusted sites", explanation: "Trusted sites and parental oversight reduce risk.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Inflation means prices generally...", options: ["Fall forever", "Rise over time", "Stay fixed", "Disappear"], correctAnswer: "Rise over time", explanation: "Inflation is the gradual rise in prices.", difficulty: 2, ageBand: "14-16" },
    ],
  },
  {
    slug: "study-skills",
    title: "Study Skills",
    description: "Focus, memory, organisation, and learning how to learn.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Study skills help every subject. Your brain learns through focus, spacing, sleep, and practice, not just cramming. Build routines, breaks, and reflection.",
      sections: [
        {
          title: "Environment",
          content:
            "A quiet, tidy space with good light reduces distractions. The brain uses less energy filtering noise when the space is predictable. Keep materials ready before starting.",
          tips: ["Phone away during focus blocks.", "Same place builds habit and signals 'study mode' to your brain."],
        },
        {
          title: "Focus blocks",
          content:
            "Work in 10 to 25 minute blocks with short breaks. Attention is a limited resource, the prefrontal cortex fatigues after long stretches. Movement breaks restore blood flow and help ADHD learners recharge.",
          tips: ["Use the built-in focus timer.", "Stand and stretch every break, even 2 minutes helps."],
        },
        {
          title: "Memory & your brain",
          content:
            "Memories form in stages: attention → short term storage → long term consolidation (especially during sleep). Spaced revision, active recall, mnemonics, and teaching others strengthen neural pathways, a process called neuroplasticity.",
          tips: ["Review after 1 day, 3 days, 7 days.", "Sleep helps consolidate learning, all-nighters weaken recall."],
        },
        {
          title: "Reflection",
          content:
            "After studying, ask: What did I learn? What's still tricky? What will I do next? Metacognition (thinking about your thinking) improves future study sessions.",
          tips: ["Keep a learning journal.", "Celebrate small wins to motivate dopamine-positive habits."],
        },
      ],
    },
    lessons: [
      {
        slug: "focus-environment",
        title: "Setting up to focus",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 10,
        steps: [
          { title: "Warm up", content: "What distracts you? Noise, phone, hunger? Your brain can't focus well when basic needs aren't met.", tip: "Fix basics first: water, snack, comfortable seat." },
          { title: "Learn", content: "Prepare space: water, pencils, timer, clear desk. A consistent spot trains your brain that 'this place means learning'.", tip: "Tell family you're in focus mode." },
          { title: "Practice", content: "Set a 10-minute timer and read one page with phone away. Notice when attention wanders, that's normal.", tip: "Gently return focus without self-criticism." },
          { title: "Review", content: "Environment shapes focus. Small changes, light, noise, clutter, have a big impact on how long you can concentrate.", tip: "Adjust one thing tomorrow." },
        ],
      },
      {
        slug: "note-taking",
        title: "Simple note-taking",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Notes are for you, abbreviations and sketches are fine.", tip: "Don't copy every word." },
          { title: "Learn", content: "Cornell style: keywords on left, details on right, summary at bottom.", tip: "Use bullet points." },
          { title: "Practice", content: "Watch a 3-minute video. Write 5 bullet notes.", tip: "Pause to write." },
          { title: "Review", content: "Good notes make revision faster.", tip: "Review notes within 24 hours." },
        ],
      },
      {
        slug: "spaced-revision",
        title: "Spaced revision",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Cramming fades fast because memories need time and sleep to consolidate. Spacing reviews beats one long session.", tip: "Calendar small reviews." },
          { title: "Learn", content: "Review today, in 3 days, in 1 week. Each successful recall strengthens the neural pathway, your brain literally rewires with practice.", tip: "Flashcard apps can schedule this." },
          { title: "Practice", content: "Pick 5 facts. Schedule three review dates on paper or a calendar.", tip: "Stick to the schedule even if it feels easy." },
          { title: "Review", content: "Spacing builds long term memory. Pair with 7 to 9 hours sleep so your brain can consolidate what you studied.", tip: "Pair with good sleep." },
        ],
      },
      {
        slug: "exam-calming",
        title: "Calming exam nerves",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Butterflies are normal. Breath slows the stress response.", tip: "Try 4-in, 4-hold, 4-out breathing." },
          { title: "Learn", content: "Read all questions first. Start with ones you know.", tip: "Skip and return if stuck." },
          { title: "Practice", content: "Do a 5-question mock. Practice the breathing before starting.", tip: "Time limits gently." },
          { title: "Review", content: "Preparation + calm strategies = your best performance.", tip: "Visualise success briefly." },
        ],
      },
    ],
    questions: [
      { prompt: "A good focus block length for many learners is...", options: ["3 hours straight", "10 to 25 minutes", "All night", "1 second"], correctAnswer: "10 to 25 minutes", explanation: "Short blocks with breaks aid focus.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Spaced revision means...", options: ["Cram once", "Review over several days", "Never review", "Only read once"], correctAnswer: "Review over several days", explanation: "Spacing strengthens long term memory.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Before studying, you should...", options: ["Prepare materials", "Open every app", "Skip sleep", "Avoid water"], correctAnswer: "Prepare materials", explanation: "Ready tools reduce friction.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Teaching someone else helps you...", options: ["Forget faster", "Understand deeper", "Avoid learning", "Skip practice"], correctAnswer: "Understand deeper", explanation: "Explaining tests and deepens knowledge.", difficulty: 2, ageBand: "11-13" },
      { prompt: "During a break, it's good to...", options: ["Move your body", "Stare at phone only", "Start a new subject for hours", "Skip breaks"], correctAnswer: "Move your body", explanation: "Movement restores attention.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Cornell notes include a...", options: ["Summary section", "Shopping list only", "Random doodle only", "Nothing"], correctAnswer: "Summary section", explanation: "Summaries capture the big picture.", difficulty: 2, ageBand: "11-13" },
      { prompt: "If anxious in a test, first try...", options: ["Leave immediately", "Slow breathing", "Guess all randomly", "Hide the paper"], correctAnswer: "Slow breathing", explanation: "Breathing calms the nervous system.", difficulty: 2, ageBand: "14-16" },
      { prompt: "Sleep helps learning by...", options: ["Deleting memory", "Consolidating what you studied", "Stopping growth", "Removing focus"], correctAnswer: "Consolidating what you studied", explanation: "Sleep transfers learning to long term memory.", difficulty: 2, ageBand: "11-13" },
    ],
  },
];

import { enrichStudyGuideSections } from "./study-guide-enrichment";
import { CAREER_SKILLS_SUBJECT } from "./curriculum-career";
import { ADDITIONAL_SUBJECTS } from "./curriculum-subjects";
import { enhanceStudyGuideWithMedia } from "@/data/lesson-hands-on";

export const ALL_CURRICULUM_SUBJECTS = [...CURRICULUM, ...ADDITIONAL_SUBJECTS, CAREER_SKILLS_SUBJECT];

export function getSubject(slug: string) {
  const subject = ALL_CURRICULUM_SUBJECTS.find((s) => s.slug === slug);
  if (!subject) return undefined;
  const enrichedSections = enrichStudyGuideSections(subject.slug, subject.studyGuide.sections);
  return {
    ...subject,
    studyGuide: {
      ...subject.studyGuide,
      sections: enhanceStudyGuideWithMedia(subject.slug, enrichedSections),
    },
  };
}

export function getAllSubjects() {
  return ALL_CURRICULUM_SUBJECTS;
}
