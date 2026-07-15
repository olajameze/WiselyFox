import type { CurriculumLesson, CurriculumQuestion } from "./curriculum";

/** Additional lessons and questions merged at seed time for deeper pilot content */
export const CURRICULUM_EXTRA: Record<
  string,
  { lessons: CurriculumLesson[]; questions: CurriculumQuestion[] }
> = {
  maths: {
    lessons: [
      {
        slug: "place-value",
        title: "Place value",
        ageBand: "8-10",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "In 352, the 3 stands for 3 hundreds, 5 tens, and 2 ones.", tip: "Use base-10 blocks if you have them." },
          { title: "Learn", content: "Each digit's place tells its value. Moving left ×10.", tip: "Write numbers in a place value chart." },
          { title: "Practice", content: "What is the value of 7 in 274?", tip: "It's in the tens place: 70." },
          { title: "Review", content: "Place value helps with bigger addition and subtraction.", tip: "Say the number aloud: two hundred seventy-four." },
        ],
      },
      {
        slug: "word-problems",
        title: "Word problems",
        ageBand: "8-10",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Read the story. What is the question asking?", tip: "Underline important numbers." },
          { title: "Learn", content: "Decide: add, subtract, multiply, or divide?", tip: "Draw a picture of the story." },
          { title: "Practice", content: "Sam has 12 stickers and gets 5 more. How many now?", tip: "Addition: 12 + 5 = 17." },
          { title: "Review", content: "Always check: does your answer make sense?", tip: "Read the question one more time." },
        ],
      },
    ],
    questions: [
      { prompt: "What is 45 + 38?", options: ["73", "83", "93", "103"], correctAnswer: "83", explanation: "45 + 38 = 83.", difficulty: 2, ageBand: "8-10" },
      { prompt: "How many tens in 240?", options: ["2", "4", "24", "240"], correctAnswer: "24", explanation: "240 has 24 tens.", difficulty: 2, ageBand: "8-10" },
    ],
  },
  reading: {
    lessons: [
      {
        slug: "inference",
        title: "Making inferences",
        ageBand: "8-10",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Authors don't always say everything, we infer from clues.", tip: "Think like a detective." },
          { title: "Learn", content: "Use text clues + what you know = inference.", tip: "Ask: what probably happened?" },
          { title: "Practice", content: "'Maya grabbed her umbrella.' What's the weather likely like?", tip: "Rainy or cloudy." },
          { title: "Review", content: "Inferences make stories richer.", tip: "Discuss books together." },
        ],
      },
      {
        slug: "paragraph-structure",
        title: "Paragraph structure",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Paragraphs group one big idea.", tip: "Look for the topic sentence." },
          { title: "Learn", content: "Topic sentence → details → closing sentence.", tip: "One paragraph = one main point." },
          { title: "Practice", content: "Write a paragraph about your favourite hobby.", tip: "Start with the main idea." },
          { title: "Review", content: "Clear paragraphs help readers follow your thinking.", tip: "Read your paragraph aloud." },
        ],
      },
    ],
    questions: [
      { prompt: "An inference is...", options: ["A random guess", "A conclusion from clues", "The title", "A spelling rule"], correctAnswer: "A conclusion from clues", explanation: "Inferences use evidence from the text.", difficulty: 2, ageBand: "8-10" },
      { prompt: "The topic sentence usually...", options: ["Ends the book", "States the main idea", "Lists page numbers", "Is always a question"], correctAnswer: "States the main idea", explanation: "It introduces what the paragraph is about.", difficulty: 2, ageBand: "11-13" },
    ],
  },
  coding: {
    lessons: [
      {
        slug: "debugging-practice",
        title: "Debugging practice",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "A bug is a mistake in instructions.", tip: "Stay calm, bugs are normal." },
          { title: "Learn", content: "Check one line at a time. Trace with sample input.", tip: "Use paper to track values." },
          { title: "Practice", content: "Loop should print 3 times but prints 2. Check the count.", tip: "Off by one errors are common." },
          { title: "Review", content: "Debugging is a core skill for coders.", tip: "Explain the fix to someone." },
        ],
      },
      {
        slug: "pseudocode",
        title: "Pseudocode basics",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Pseudocode is planning in plain English before real code.", tip: "No strict syntax needed." },
          { title: "Learn", content: "IF score > 10 THEN show win ENDIF", tip: "Use indentation for loops." },
          { title: "Practice", content: "Write pseudocode for making a sandwich.", tip: "Be specific for a robot!" },
          { title: "Review", content: "Plan first, code second.", tip: "Save time by planning." },
        ],
      },
    ],
    questions: [
      { prompt: "Off by one errors often happen in...", options: ["Loops", "Screens", "Keyboards", "Cables"], correctAnswer: "Loops", explanation: "Loop counts are easy to get wrong by one.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Pseudocode helps you...", options: ["Plan before coding", "Delete files", "Charge batteries", "Print faster"], correctAnswer: "Plan before coding", explanation: "It's a planning language.", difficulty: 1, ageBand: "11-13" },
    ],
  },
  money: {
    lessons: [
      {
        slug: "making-change",
        title: "Making change",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 10,
        steps: [
          { title: "Warm up", content: "Change is what's left after you pay.", tip: "Count up from price to amount paid." },
          { title: "Learn", content: "Item £2.30, pay £5.00 → change £2.70.", tip: "Use number line jumps." },
          { title: "Practice", content: "Pay £10 for £6.45 item. Change?", tip: "£3.55 change." },
          { title: "Review", content: "Checking change builds number confidence.", tip: "Practice with play money." },
        ],
      },
      {
        slug: "saving-goals",
        title: "Saving goals",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "A goal gives saving a purpose.", tip: "Draw your goal." },
          { title: "Learn", content: "Split pocket money: save / spend / give.", tip: "Jars work well." },
          { title: "Practice", content: "Save £2/week for 5 weeks. Total?", tip: "£10 saved." },
          { title: "Review", content: "Small amounts add up.", tip: "Track on a chart." },
        ],
      },
    ],
    questions: [
      { prompt: "Change from £5 for £3.20?", options: ["£1.20", "£1.80", "£2.20", "£2.80"], correctAnswer: "£1.80", explanation: "£5.00 − £3.20 = £1.80.", difficulty: 1, ageBand: "8-10" },
      { prompt: "£2/week for 4 weeks saves...", options: ["£4", "£6", "£8", "£10"], correctAnswer: "£8", explanation: "2 × 4 = 8.", difficulty: 1, ageBand: "8-10" },
    ],
  },
  "study-skills": {
    lessons: [
      {
        slug: "brain-learning-basics",
        title: "How your brain learns",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Have you noticed skills get easier with practice? That's your brain building stronger connections.", tip: "Think of a skill that felt hard at first." },
          { title: "Learn", content: "Neuroplasticity means your brain rewires when you learn. Attention starts the process; practice strengthens pathways; sleep consolidates memories into long term storage.", tip: "Effort + rest = lasting learning." },
          { title: "Practice", content: "Which helps long term memory most?", tip: "Spacing + sleep beat one cram night." },
          { title: "Review", content: "Your brain is not fixed, it grows with focused practice, good sleep, and healthy breaks.", tip: "Review this lesson in three days." },
        ],
      },
      {
        slug: "working-memory-attention",
        title: "Working memory & attention",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "Working memory is your mental workspace, it holds a few ideas at once while you think.", tip: "Try remembering a phone number without writing it." },
          { title: "Learn", content: "Most people hold about 4 to 7 items in working memory. Chunking groups information (e.g. 07123 456789) and reducing distractions frees space for thinking.", tip: "One task at a time in focus blocks." },
          { title: "Practice", content: "Best strategy when a lesson feels overwhelming?", tip: "Break into smaller chunks." },
          { title: "Review", content: "Protect attention: phone away, short blocks, movement breaks. Your brain learns better when load is manageable.", tip: "Use the focus timer." },
        ],
      },
      {
        slug: "active-recall",
        title: "Active recall",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Close the book and try to remember, that's active recall.", tip: "Harder but stronger memory." },
          { title: "Learn", content: "Test yourself instead of only re-reading.", tip: "Use flashcards." },
          { title: "Practice", content: "List 3 facts from yesterday's lesson from memory.", tip: "Check and fill gaps." },
          { title: "Review", content: "Recall beats passive reading for long term memory.", tip: "Quiz yourself weekly." },
        ],
      },
      {
        slug: "goal-setting",
        title: "SMART learning goals",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Goals work best when specific and time bound.", tip: "SMART = Specific, Measurable, Achievable, Relevant, Time bound." },
          { title: "Learn", content: "'Do 2 maths lessons this week' beats 'get better at maths'.", tip: "Write goals down." },
          { title: "Practice", content: "Write one SMART goal for this week.", tip: "Share with a parent." },
          { title: "Review", content: "Goals guide daily missions.", tip: "Celebrate when you hit them." },
        ],
      },
    ],
    questions: [
      { prompt: "Neuroplasticity means the brain…", options: ["Can change with practice", "Never changes", "Only works at night", "Deletes all memories daily"], correctAnswer: "Can change with practice", explanation: "Practice strengthens neural pathways.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Chunking helps because it…", options: ["Reduces working memory load", "Eliminates need to study", "Replaces sleep", "Makes phones louder"], correctAnswer: "Reduces working memory load", explanation: "Grouping items frees mental workspace.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Active recall means...", options: ["Re-reading only", "Testing memory without notes", "Skipping breaks", "Watching TV"], correctAnswer: "Testing memory without notes", explanation: "Retrieval strengthens learning.", difficulty: 2, ageBand: "11-13" },
      { prompt: "A SMART goal should be...", options: ["Vague", "Specific and measurable", "Impossible", "Secret"], correctAnswer: "Specific and measurable", explanation: "Clear goals are easier to track.", difficulty: 1, ageBand: "11-13" },
    ],
  },
  science: {
    lessons: [
      {
        slug: "plants-photosynthesis",
        title: "Plants & photosynthesis",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "What do plants need to grow green and tall?", method: "discuss", tip: "Light, water, carbon dioxide." },
          { title: "Learn", content: "Photosynthesis: chlorophyll in leaves traps light energy to make glucose and release oxygen.", method: "watch", tip: "Plants are producers in food chains." },
          { title: "Practice", content: "Draw a plant and label roots, stem, leaves, and sunlight arrow.", method: "draw", tip: "Arrows show energy flow." },
          { title: "Review", content: "Oxygen from plants supports animal life.", method: "quiz", tip: "Test leaves vs roots roles." },
        ],
      },
      {
        slug: "scientific-method",
        title: "The scientific method",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 13,
        steps: [
          { title: "Warm up", content: "Why do scientists repeat experiments?", method: "discuss", tip: "To check results are reliable." },
          { title: "Learn", content: "Question → hypothesis → fair test → results → conclusion. Change one variable.", method: "read", tip: "Record data in tables." },
          { title: "Practice", content: "Design a fair test: which paper towel absorbs most water?", method: "practice", tip: "Same water volume each time." },
          { title: "Review", content: "Evidence can support or disprove a hypothesis.", method: "quiz", tip: "Write your conclusion in one sentence." },
        ],
      },
    ],
    questions: [
      { prompt: "Photosynthesis produces…", options: ["Oxygen and glucose", "Only plastic", "Rocks", "Metal"], correctAnswer: "Oxygen and glucose", explanation: "Plants make food and oxygen.", difficulty: 2, ageBand: "11-13" },
      { prompt: "A fair test changes…", options: ["One variable", "All variables", "Nothing", "Only the label"], correctAnswer: "One variable", explanation: "Isolate cause and effect.", difficulty: 2, ageBand: "11-13" },
    ],
  },
  history: {
    lessons: [
      {
        slug: "local-history",
        title: "Local history detectives",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "What is oldest near your home, building, tree, monument?", method: "discuss", tip: "History is everywhere." },
          { title: "Learn", content: "Local history uses maps, photos, and stories from your area.", method: "read", tip: "Libraries keep archives." },
          { title: "Practice", content: "Interview a relative about one change they remember.", method: "listen", tip: "Record with permission." },
          { title: "Review", content: "Small stories build big pictures of the past.", method: "discuss", tip: "Thank your interviewee." },
        ],
      },
    ],
    questions: [
      { prompt: "Local history can use…", options: ["Photos and maps", "Only fiction", "Nothing real", "Only videos games"], correctAnswer: "Photos and maps", explanation: "Evidence exists locally.", difficulty: 1, ageBand: "8-10" },
    ],
  },
  geography: {
    lessons: [
      {
        slug: "rivers-coasts",
        title: "Rivers & coasts",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "Where does a river start and end?", method: "discuss", tip: "Source → mouth." },
          { title: "Learn", content: "Erosion, transport, deposition shape valleys and beaches.", method: "read", tip: "Long profile: steep upper, gentle lower." },
          { title: "Practice", content: "Sketch a river from source to sea with labels.", method: "draw", tip: "Add settlement where flood plain is flat." },
          { title: "Review", content: "Human activity affects rivers, flood defences matter.", method: "quiz", tip: "Research one UK river." },
        ],
      },
    ],
    questions: [
      { prompt: "Deposition happens when a river…", options: ["Drops sediment", "Only evaporates", "Stops existing", "Becomes maths"], correctAnswer: "Drops sediment", explanation: "Slowing water drops load.", difficulty: 2, ageBand: "11-13" },
    ],
  },
  "health-wellbeing": {
    lessons: [
      {
        slug: "hydration-habits",
        title: "Hydration habits",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 10,
        steps: [
          { title: "Warm up", content: "How does your body feel when you're thirsty?", method: "listen", tip: "Water supports focus." },
          { title: "Learn", content: "Water carries nutrients and regulates temperature. Sip through the day.", method: "read", tip: "More water when active or hot." },
          { title: "Practice", content: "Track water glasses today on paper.", method: "practice", tip: "Agree a daily goal with a parent." },
          { title: "Review", content: "Hydration is a simple brain boost.", method: "quiz", tip: "Keep a bottle at your study desk." },
        ],
      },
    ],
    questions: [
      { prompt: "Water helps the body…", options: ["Regulate temperature", "Skip sleep", "Avoid food", "Delete memory"], correctAnswer: "Regulate temperature", explanation: "Water supports vital functions.", difficulty: 1, ageBand: "8-10" },
    ],
  },
  "digital-skills": {
    lessons: [
      {
        slug: "passwords-privacy",
        title: "Passwords & privacy",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "What makes a password strong?", method: "discuss", tip: "Length + mix of characters." },
          { title: "Learn", content: "Use unique passwords, two factor authentication, and never share codes.", method: "read", tip: "Password managers help families." },
          { title: "Practice", content: "With a parent, update one weak password.", method: "practice", tip: "Never reuse school and game passwords." },
          { title: "Review", content: "Privacy protects your future digital footprint.", method: "quiz", tip: "Review app permissions monthly." },
        ],
      },
    ],
    questions: [
      { prompt: "Strong passwords are…", options: ["Unique and long", "Your name only", "Shared with friends", "Posted online"], correctAnswer: "Unique and long", explanation: "Uniqueness limits breach damage.", difficulty: 2, ageBand: "11-13" },
    ],
  },
};
