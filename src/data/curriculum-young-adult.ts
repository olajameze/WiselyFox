import type { CurriculumLesson, CurriculumQuestion } from "./curriculum";

/** College-prep and young-adult content (ages 17 to 23) */
export const CURRICULUM_YOUNG_ADULT: Record<
  string,
  { lessons: CurriculumLesson[]; questions: CurriculumQuestion[] }
> = {
  maths: {
    lessons: [
      {
        slug: "algebra-linear-equations",
        title: "Linear equations",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "A linear equation has variable x to power 1, e.g. 2x + 5 = 13.", tip: "Balance both sides like a scale." },
          { title: "Learn", content: "Isolate x: subtract 5 → 2x = 8, divide by 2 → x = 4. Always do the same to both sides.", tip: "Check by substituting x back." },
          { title: "Practice", content: "Solve 3x − 7 = 14.", tip: "Add 7 first, then divide by 3." },
          { title: "Review", content: "Linear equations model rates, budgets, and science formulas.", tip: "Graph y = mx + c to visualise." },
        ],
      },
      {
        slug: "statistics-basics",
        title: "Statistics: mean, median, mode",
        ageBand: "20-23",
        difficulty: 3,
        durationMinutes: 20,
        steps: [
          { title: "Warm up", content: "Data sets need summary numbers. Mean = average; median = middle value; mode = most frequent.", tip: "Sort data for median." },
          { title: "Learn", content: "Mean = sum ÷ count. Median resists outliers. Mode useful for categories.", tip: "Report which measure you use and why." },
          { title: "Practice", content: "Scores: 72, 85, 85, 90. Find mean and median.", tip: "Mean = 332/4 = 83." },
          { title: "Review", content: "Choose the measure that best represents your data story.", tip: "Watch for skewed data." },
        ],
      },
    ],
    questions: [
      { prompt: "Solve 2x + 5 = 17", options: ["x = 4", "x = 6", "x = 11", "x = 22"], correctAnswer: "x = 6", explanation: "2x = 12, x = 6.", difficulty: 3, ageBand: "17-19" },
      { prompt: "Mean of 4, 6, 8, 10?", options: ["6", "7", "8", "9"], correctAnswer: "7", explanation: "28 ÷ 4 = 7.", difficulty: 3, ageBand: "20-23" },
      { prompt: "Gradient in y = 3x + 2 is…", options: ["2", "3", "5", "x"], correctAnswer: "3", explanation: "In y = mx + c, m is gradient.", difficulty: 3, ageBand: "17-19" },
      { prompt: "Median of 3, 5, 9, 12, 12?", options: ["5", "9", "10", "12"], correctAnswer: "9", explanation: "Middle value when ordered.", difficulty: 3, ageBand: "20-23" },
    ],
  },
  reading: {
    lessons: [
      {
        slug: "critical-analysis",
        title: "Critical reading & bias",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Authors have viewpoints. Ask: who wrote this, why, and what evidence supports the claim?", tip: "Separate fact from opinion." },
          { title: "Learn", content: "Bias = slanted presentation. Look for loaded words, missing counter-evidence, and sources.", tip: "Compare two articles on the same topic." },
          { title: "Practice", content: "'Everyone knows this product is the best.' What is weak here?", tip: "No evidence; appeal to popularity." },
          { title: "Review", content: "Critical reading protects you online and in study.", tip: "Cross-check reliable sources." },
        ],
      },
      {
        slug: "academic-citations",
        title: "Academic writing & citations",
        ageBand: "20-23",
        difficulty: 3,
        durationMinutes: 20,
        steps: [
          { title: "Warm up", content: "Citing sources gives credit and shows evidence for your arguments.", tip: "Note author, title, date as you read." },
          { title: "Learn", content: "Paraphrase in your words; quote sparingly with quotation marks. Avoid plagiarism.", tip: "Use your institution's style guide (Harvard, APA)." },
          { title: "Practice", content: "Why cite a statistic in an essay?", tip: "Readers can verify and trust your work." },
          { title: "Review", content: "Good citations strengthen essays and reports.", tip: "Reference managers save time." },
        ],
      },
    ],
    questions: [
      { prompt: "A claim without evidence is mainly…", options: ["Fact", "Opinion or unproven", "A citation", "A statistic"], correctAnswer: "Opinion or unproven", explanation: "Claims need supporting evidence.", difficulty: 3, ageBand: "17-19" },
      { prompt: "Plagiarism means…", options: ["Using your own notes", "Presenting others' work as yours", "Reading widely", "Paraphrasing properly"], correctAnswer: "Presenting others' work as yours", explanation: "Always credit original authors.", difficulty: 3, ageBand: "20-23" },
    ],
  },
  coding: {
    lessons: [
      {
        slug: "api-basics",
        title: "APIs and JSON",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "An API lets programs request data from a server using URLs and structured responses.", tip: "Think: menu (API) → kitchen (server)." },
          { title: "Learn", content: "JSON format: {\"name\": \"Alex\", \"score\": 90}. Keys in quotes, pairs separated by commas.", tip: "Validate JSON with a linter." },
          { title: "Practice", content: "GET /users/1 might return user data. Is this read or write?", tip: "GET reads data." },
          { title: "Review", content: "APIs power apps, websites, and data projects.", tip: "Never expose secret keys in front-end code." },
        ],
      },
      {
        slug: "git-collaboration",
        title: "Git basics for projects",
        ageBand: "20-23",
        difficulty: 3,
        durationMinutes: 20,
        steps: [
          { title: "Warm up", content: "Git tracks code changes so teams can collaborate safely.", tip: "Commit = saved snapshot." },
          { title: "Learn", content: "commit saves work; push shares to remote; pull gets teammates' changes; branch for features.", tip: "Write clear commit messages." },
          { title: "Practice", content: "You finish a feature on a branch. Next step before merging?", tip: "Test, then pull request / review." },
          { title: "Review", content: "Version control is essential for uni and industry projects.", tip: "Commit small and often." },
        ],
      },
    ],
    questions: [
      { prompt: "JSON is used to…", options: ["Store structured data", "Print paper", "Delete files", "Slow networks"], correctAnswer: "Store structured data", explanation: "JSON is a common data exchange format.", difficulty: 3, ageBand: "17-19" },
      { prompt: "git commit creates…", options: ["A snapshot of changes", "A virus", "A new computer", "An invoice"], correctAnswer: "A snapshot of changes", explanation: "Commits record project history.", difficulty: 3, ageBand: "20-23" },
    ],
  },
  money: {
    lessons: [
      {
        slug: "student-budgeting",
        title: "Student budgeting",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Student income may include loan, part-time work, family support. Track fixed vs flexible costs.", tip: "Rent and travel are often fixed." },
          { title: "Learn", content: "50/30/20 rule adapted: essentials, study/social, savings buffer.", tip: "Review weekly in term time." },
          { title: "Practice", content: "£800 income, £500 essentials, £150 social, how much to save?", tip: "£150 buffer if possible." },
          { title: "Review", content: "Budgets reduce money stress during study.", tip: "Use student discounts wisely." },
        ],
      },
      {
        slug: "credit-and-debt",
        title: "Credit scores & debt",
        ageBand: "20-23",
        difficulty: 3,
        durationMinutes: 20,
        steps: [
          { title: "Warm up", content: "Credit scores reflect repayment history. Higher scores → better loan rates.", tip: "Pay bills on time." },
          { title: "Learn", content: "APR = yearly borrowing cost. Minimum payments prolong debt. Compound interest works against you on loans.", tip: "Read terms before signing." },
          { title: "Practice", content: "Missing credit card payments mainly hurts…", tip: "Credit score and adds fees." },
          { title: "Review", content: "Understand debt before using buy-now-pay-later or credit cards.", tip: "Seek free debt advice if struggling." },
        ],
      },
    ],
    questions: [
      { prompt: "Fixed costs include…", options: ["Rent", "Random snacks", "Impulse buys", "One-off treats"], correctAnswer: "Rent", explanation: "Fixed costs recur regularly.", difficulty: 3, ageBand: "17-19" },
      { prompt: "APR on a loan tells you…", options: ["Annual cost of borrowing", "Your salary", "Tax rate", "Savings goal"], correctAnswer: "Annual cost of borrowing", explanation: "APR = yearly interest + fees as a rate.", difficulty: 3, ageBand: "20-23" },
    ],
  },
  "study-skills": {
    lessons: [
      {
        slug: "research-methods",
        title: "Research & source quality",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Good research uses credible sources: academic journals, official stats, expert institutions.", tip: "Check publication date." },
          { title: "Learn", content: "CRAAP test: Currency, Relevance, Authority, Accuracy, Purpose.", tip: "Avoid single social media posts as sole evidence." },
          { title: "Practice", content: "A .gov or university site is usually more reliable than…", tip: "Anonymous forum posts." },
          { title: "Review", content: "Strong sources strengthen coursework and job applications.", tip: "Keep a source log." },
        ],
      },
      {
        slug: "workplace-learning",
        title: "Learning at work & uni",
        ageBand: "20-23",
        difficulty: 3,
        durationMinutes: 20,
        steps: [
          { title: "Warm up", content: "Adult learning blends courses, on-the-job practice, and reflection.", tip: "Ask mentors for feedback." },
          { title: "Learn", content: "Set weekly learning goals tied to career or degree outcomes. Use spaced revision for exams.", tip: "Block focus time on calendar." },
          { title: "Practice", content: "After a training session, best next step?", tip: "Apply one skill within 48 hours." },
          { title: "Review", content: "Lifelong learning builds career resilience.", tip: "Share goals with a parent or mentor." },
        ],
      },
    ],
    questions: [
      { prompt: "CRAAP helps evaluate…", options: ["Source quality", "Cooking time", "Sports scores", "Video games"], correctAnswer: "Source quality", explanation: "CRAAP checks if sources are trustworthy.", difficulty: 3, ageBand: "17-19" },
      { prompt: "Applying new skills within 48 hours…", options: ["Strengthens retention", "Wastes time", "Is illegal", "Deletes memory"], correctAnswer: "Strengthens retention", explanation: "Practice soon after learning helps memory.", difficulty: 3, ageBand: "20-23" },
    ],
  },
  science: {
    lessons: [
      {
        slug: "gcse-chemistry-intro",
        title: "Particles & chemical reactions",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Are atoms created or rearranged in reactions?", method: "discuss", tip: "Rearranged, conservation of mass." },
          { title: "Learn", content: "Reactants → products. Balance equations. Energy can be released (exothermic) or taken in (endothermic).", method: "read", tip: "Dot-and-cross diagrams show bonding." },
          { title: "Practice", content: "Balance: H2 + O2 → H2O (with parent guide).", method: "practice", tip: "Same atoms each side." },
          { title: "Review", content: "Chemistry explains materials in health, engineering, and climate tech.", method: "quiz", tip: "Lab safety always first." },
        ],
      },
    ],
    questions: [
      { prompt: "In chemical reactions atoms are…", options: ["Rearranged", "Destroyed", "Created from nothing", "Removed from universe"], correctAnswer: "Rearranged", explanation: "Conservation of mass.", difficulty: 3, ageBand: "14-16" },
    ],
  },
  history: {
    lessons: [
      {
        slug: "source-evaluation",
        title: "Evaluating historical sources",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Why might two eyewitness accounts differ?", method: "discuss", tip: "Viewpoint, memory, bias." },
          { title: "Learn", content: "Corroboration, provenance, and context build arguments at A-level and beyond.", method: "read", tip: "Footnote every quotation." },
          { title: "Practice", content: "Compare two short sources on the same event.", method: "practice", tip: "Note agreement and conflict." },
          { title: "Review", content: "Historians argue with evidence, not opinion alone.", method: "quiz", tip: "Use university library guides." },
        ],
      },
    ],
    questions: [
      { prompt: "Provenance means…", options: ["Origin and authorship of a source", "A type of map", "Future prediction", "Maths formula"], correctAnswer: "Origin and authorship of a source", explanation: "Who, when, why matters.", difficulty: 3, ageBand: "17-19" },
    ],
  },
  geography: {
    lessons: [
      {
        slug: "gis-maps-data",
        title: "GIS & data maps",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "What patterns might a heat map of rainfall show?", method: "discuss", tip: "Climate zones, relief, coasts." },
          { title: "Learn", content: "GIS layers stack data: population, hazards, land use. Choropleth shades show rates.", method: "read", tip: "Always read the legend." },
          { title: "Practice", content: "Find one open GIS map online and describe two patterns.", method: "practice", tip: "Office for National Statistics has UK data." },
          { title: "Review", content: "Geospatial skills are used in planning, climate, and logistics careers.", method: "quiz", tip: "Try QGIS or web maps with a parent." },
        ],
      },
    ],
    questions: [
      { prompt: "A choropleth map uses…", options: ["Shading for rates", "Only cartoons", "No legend", "Random colours"], correctAnswer: "Shading for rates", explanation: "Darker often means higher values.", difficulty: 3, ageBand: "17-19" },
    ],
  },
  "health-wellbeing": {
    lessons: [
      {
        slug: "adult-health-literacy",
        title: "Health literacy for young adults",
        ageBand: "20-23",
        difficulty: 3,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "How do you check if health advice online is reliable?", method: "discuss", tip: "NHS, WHO, qualified clinicians." },
          { title: "Learn", content: "Register with a GP, understand screenings, vaccines, and when to seek urgent care.", method: "read", tip: "NHS 111 for non-emergency advice (UK)." },
          { title: "Practice", content: "Find NHS guidance on one topic relevant to you.", method: "practice", tip: "Avoid unqualified influencers." },
          { title: "Review", content: "Health literacy supports independent adult life.", method: "quiz", tip: "Discuss questions with GP, not only social media." },
        ],
      },
    ],
    questions: [
      { prompt: "Reliable UK health info often comes from…", options: ["NHS", "Random memes", "Anonymous forums only", "Unverified ads"], correctAnswer: "NHS", explanation: "Use qualified sources.", difficulty: 3, ageBand: "20-23" },
    ],
  },
  "digital-skills": {
    lessons: [
      {
        slug: "workplace-data-privacy",
        title: "Data privacy at work",
        ageBand: "20-23",
        difficulty: 3,
        durationMinutes: 17,
        steps: [
          { title: "Warm up", content: "What is GDPR in simple terms?", method: "discuss", tip: "EU/UK rules protecting personal data." },
          { title: "Learn", content: "Handle work data on approved systems only. Report breaches. Understand consent and retention.", method: "read", tip: "Employers train you, ask questions." },
          { title: "Practice", content: "List three personal data types a shop might hold about customers.", method: "practice", tip: "Name, email, purchase history." },
          { title: "Review", content: "Privacy skills are required in most modern jobs.", method: "quiz", tip: "Read your workplace acceptable use policy." },
        ],
      },
    ],
    questions: [
      { prompt: "GDPR relates to…", options: ["Personal data protection", "Cooking recipes", "Sports scores", "Music theory"], correctAnswer: "Personal data protection", explanation: "Privacy law in UK/EU context.", difficulty: 3, ageBand: "20-23" },
    ],
  },
};
