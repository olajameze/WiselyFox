import type { CurriculumLesson, CurriculumQuestion } from "./curriculum";

export type SubjectTrack = {
  slug: string;
  title: string;
  category: string;
  lessons: CurriculumLesson[];
  questions: CurriculumQuestion[];
};

/** Specialty sub-subjects, unlock after completing foundation lessons in the parent subject. */
export const CURRICULUM_TRACKS: Record<string, SubjectTrack[]> = {
  coding: [
    {
      slug: "python",
      title: "Python",
      category: "Languages",
      lessons: [{
        slug: "intro",
        title: "Python fundamentals",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "Python is used in AI, data, automation, and web backends.", method: "discuss", tip: "Readable syntax helps beginners." },
          { title: "Learn", content: "Variables, print(), input(), and indentation define blocks. No semicolons needed.", method: "read", tip: "print('Hello') outputs text." },
          { title: "Practice", content: "What prints: print(3 + 4)?", method: "practice", tip: "Python evaluates maths in print." },
          { title: "Review", content: "Python powers software engineering, data science, and scripting.", method: "quiz", tip: "Try repl.it or Thonny with a parent." },
        ],
      }],
      questions: [{ prompt: "Python uses indentation for…", options: ["Code blocks", "Colours only", "Deleting files", "Email"], correctAnswer: "Code blocks", explanation: "Indented lines belong together.", difficulty: 2, ageBand: "11-13" }],
    },
    {
      slug: "html-css",
      title: "HTML & CSS",
      category: "Web fundamentals",
      lessons: [{
        slug: "intro",
        title: "HTML & CSS basics",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Every website uses HTML for structure and CSS for style.", method: "discuss", tip: "View page source with a parent." },
          { title: "Learn", content: "HTML tags: <h1>, <p>, <a href>. CSS selects elements: color, margin, font-size.", method: "read", tip: "Semantic tags help accessibility." },
          { title: "Practice", content: "Which tag makes a paragraph?", method: "practice", tip: "<p> wraps paragraph text." },
          { title: "Review", content: "Front-end developers master HTML/CSS before frameworks.", method: "quiz", tip: "Build a simple About Me page." },
        ],
      }],
      questions: [{ prompt: "CSS controls…", options: ["Visual style", "Only server databases", "Electricity", "Sound only"], correctAnswer: "Visual style", explanation: "CSS = presentation.", difficulty: 2, ageBand: "11-13" }],
    },
    {
      slug: "javascript",
      title: "JavaScript",
      category: "Web fundamentals",
      lessons: [{
        slug: "intro",
        title: "JavaScript essentials",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "JavaScript runs in browsers and on servers (Node.js).", method: "read", tip: "It makes pages interactive." },
          { title: "Learn", content: "const/let, functions, arrays, and DOM queries (document.querySelector).", method: "read", tip: "Console.log helps debugging." },
          { title: "Practice", content: "Arrays store ordered lists, access item at index 0 for first.", method: "practice", tip: "Try in browser devtools console." },
          { title: "Review", content: "JS bridges HTML/CSS to dynamic apps.", method: "quiz", tip: "Pair with MDN docs." },
        ],
      }],
      questions: [{ prompt: "JavaScript in browsers can…", options: ["Update the page interactively", "Only print paper", "Replace HTML entirely", "Skip logic"], correctAnswer: "Update the page interactively", explanation: "JS handles behaviour.", difficulty: 3, ageBand: "14-16" }],
    },
    {
      slug: "typescript",
      title: "TypeScript",
      category: "Languages",
      lessons: [{
        slug: "intro",
        title: "TypeScript introduction",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "TypeScript adds types to JavaScript for safer large projects.", method: "read", tip: "Used in React and Next.js teams." },
          { title: "Learn", content: "Types catch errors early: string, number, boolean, interfaces.", method: "read", tip: "TS compiles to JS." },
          { title: "Practice", content: "Why type a function parameter?", method: "discuss", tip: "Prevents passing wrong data." },
          { title: "Review", content: "Full-stack teams often standardise on TypeScript.", method: "quiz", tip: "Start with strict mode in tsconfig." },
        ],
      }],
      questions: [{ prompt: "TypeScript helps catch…", options: ["Type errors early", "Only spelling", "Hardware faults", "Weather"], correctAnswer: "Type errors early", explanation: "Static types aid reliability.", difficulty: 3, ageBand: "14-16" }],
    },
    {
      slug: "react",
      title: "React",
      category: "Front-end development",
      lessons: [{
        slug: "intro",
        title: "React components",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "React builds UIs from reusable components.", method: "read", tip: "Used by Meta, startups, and enterprises." },
          { title: "Learn", content: "JSX mixes markup with JS. Props pass data; state holds changing data.", method: "read", tip: "One-way data flow reduces bugs." },
          { title: "Practice", content: "A button component receives label text via…", method: "practice", tip: "Props from parent." },
          { title: "Review", content: "Front-end engineers combine React with TypeScript and testing.", method: "quiz", tip: "Create React App or Vite for practice." },
        ],
      }],
      questions: [{ prompt: "React components are…", options: ["Reusable UI pieces", "Only databases", "CSS files only", "Email servers"], correctAnswer: "Reusable UI pieces", explanation: "Compose interfaces from components.", difficulty: 3, ageBand: "14-16" }],
    },
    {
      slug: "nextjs",
      title: "Next.js",
      category: "Full-stack development",
      lessons: [{
        slug: "intro",
        title: "Next.js & full-stack intro",
        ageBand: "17-19",
        difficulty: 4,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Next.js is a React framework with routing, SSR, and API routes.", method: "read", tip: "Powers many production sites." },
          { title: "Learn", content: "App Router, server components, and API handlers connect front-end to data.", method: "read", tip: "Deploy on Vercel or similar." },
          { title: "Practice", content: "Server components run on the…", method: "practice", tip: "Server vs client split." },
          { title: "Review", content: "Full-stack developers ship UI + APIs together.", method: "quiz", tip: "Read official Next.js docs." },
        ],
      }],
      questions: [{ prompt: "Next.js builds on…", options: ["React", "Only Python", "Spreadsheets", "Email"], correctAnswer: "React", explanation: "Next extends React.", difficulty: 4, ageBand: "17-19" }],
    },
    {
      slug: "ai-tools",
      title: "AI tools for developers",
      category: "Tools & libraries",
      lessons: [{
        slug: "intro",
        title: "AI-assisted coding",
        ageBand: "17-19",
        difficulty: 4,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "AI assistants help draft code, tests, and docs, humans must review.", method: "discuss", tip: "Never paste secrets into AI tools." },
          { title: "Learn", content: "Prompt clearly: language, framework, constraints, tests. Verify output for bugs and bias.", method: "read", tip: "Understand code before shipping." },
          { title: "Practice", content: "Good prompt includes…", method: "practice", tip: "Context + acceptance criteria." },
          { title: "Review", content: "Software engineers use AI as a copilot, not a replacement for learning.", method: "quiz", tip: "Follow employer AI policies." },
        ],
      }],
      questions: [{ prompt: "AI-generated code should be…", options: ["Reviewed and tested", "Shipped blindly", "Never read", "Secret only"], correctAnswer: "Reviewed and tested", explanation: "Humans remain responsible.", difficulty: 4, ageBand: "17-19" }],
    },
    {
      slug: "git-tools",
      title: "Git & dev tools",
      category: "Tools & libraries",
      lessons: [{
        slug: "intro",
        title: "Git, npm & tooling",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Git tracks code history; npm installs JavaScript packages.", method: "read", tip: "Teams use GitHub/GitLab." },
          { title: "Learn", content: "commit, push, pull, branch, merge. package.json lists dependencies.", method: "read", tip: "Lock files ensure reproducible builds." },
          { title: "Practice", content: "Branches let teams work…", method: "discuss", tip: "In parallel without breaking main." },
          { title: "Review", content: "Tooling literacy is expected in software engineering roles.", method: "quiz", tip: "Practice on a toy repo." },
        ],
      }],
      questions: [{ prompt: "npm manages…", options: ["JavaScript packages", "Only images", "Paper mail", "Sports scores"], correctAnswer: "JavaScript packages", explanation: "Node package manager.", difficulty: 3, ageBand: "14-16" }],
    },
    {
      slug: "databases",
      title: "Databases & SQL",
      category: "Full-stack development",
      lessons: [{
        slug: "intro",
        title: "Databases intro",
        ageBand: "17-19",
        difficulty: 4,
        durationMinutes: 17,
        steps: [
          { title: "Warm up", content: "Apps store users, orders, and posts in databases.", method: "read", tip: "SQL vs NoSQL trade-offs." },
          { title: "Learn", content: "Tables, rows, keys. SELECT, WHERE, JOIN. ORMs like Prisma map to TypeScript.", method: "read", tip: "Never expose raw DB credentials." },
          { title: "Practice", content: "SELECT * FROM users WHERE age > 18 returns…", method: "practice", tip: "Filtered rows." },
          { title: "Review", content: "Back-end and full-stack roles require data modelling.", method: "quiz", tip: "Try SQLite locally." },
        ],
      }],
      questions: [{ prompt: "SQL is used to…", options: ["Query structured data", "Paint images", "Send post", "Play music"], correctAnswer: "Query structured data", explanation: "Structured query language.", difficulty: 4, ageBand: "17-19" }],
    },
  ],
  maths: [
    { slug: "algebra", title: "Algebra", category: "Core maths", lessons: [{ slug: "intro", title: "Algebra deep dive", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Variables represent unknown values.", method: "read", tip: "x can be any number that fits." }, { title: "Learn", content: "Solve linear equations by balancing both sides. Substitute into formulas.", method: "read", tip: "Show each step." }, { title: "Practice", content: "If 2x = 10, x = ?", method: "practice", tip: "Divide both sides by 2." }, { title: "Review", content: "Algebra underpins GCSE and A-level maths.", method: "quiz", tip: "Link to real budgets." }] }], questions: [{ prompt: "2x = 10 means x = …", options: ["5", "20", "2", "8"], correctAnswer: "5", explanation: "10 ÷ 2 = 5.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "geometry", title: "Geometry", category: "Core maths", lessons: [{ slug: "intro", title: "Shapes & angles", ageBand: "11-13", difficulty: 2, durationMinutes: 14, steps: [{ title: "Warm up", content: "Angles on a straight line sum to 180°.", method: "read", tip: "Use a protractor." }, { title: "Learn", content: "Area of rectangle = length × width. Triangle = ½ × base × height.", method: "read", tip: "Units matter: cm²." }, { title: "Practice", content: "Rectangle 4cm × 5cm area?", method: "practice", tip: "20 cm²." }, { title: "Review", content: "Geometry appears in design, construction, and exams.", method: "quiz", tip: "Draw and label diagrams." }] }], questions: [{ prompt: "Triangle area uses…", options: ["½ × base × height", "base + height only", "πr²", "No formula"], correctAnswer: "½ × base × height", explanation: "Standard triangle area.", difficulty: 2, ageBand: "11-13" }] },
    { slug: "statistics", title: "Statistics", category: "Applied maths", lessons: [{ slug: "intro", title: "Stats & probability", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Mean, median, mode summarise data sets.", method: "read", tip: "Median resists outliers." }, { title: "Learn", content: "Probability 0 to 1. Charts: bar, pie, scatter. Correlation ≠ causation.", method: "read", tip: "Label axes clearly." }, { title: "Practice", content: "Fair coin P(heads)?", method: "practice", tip: "0.5 for single flip." }, { title: "Review", content: "Data skills support science, business, and AI.", method: "quiz", tip: "Collect class survey data." }] }], questions: [{ prompt: "Median is the…", options: ["Middle value when ordered", "Largest value", "Always the mean", "Smallest only"], correctAnswer: "Middle value when ordered", explanation: "Middle of sorted data.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "finance-maths", title: "Financial maths", category: "Applied maths", lessons: [{ slug: "intro", title: "Interest & percentages at work", ageBand: "17-19", difficulty: 3, durationMinutes: 16, steps: [{ title: "Warm up", content: "Compare offers using percentages, not gut feeling.", method: "discuss", tip: "APR, tax, discounts." }, { title: "Learn", content: "Compound interest grows on interest. Percent change = (new−old)/old × 100.", method: "read", tip: "Spreadsheets help." }, { title: "Practice", content: "£100 at 10% simple interest one year?", method: "practice", tip: "£10 interest." }, { title: "Review", content: "Financial literacy is maths in daily life.", method: "quiz", tip: "Check FCA student resources." }] }], questions: [{ prompt: "10% of £200 is…", options: ["£20", "£2", "£2000", "£10"], correctAnswer: "£20", explanation: "0.10 × 200 = 20.", difficulty: 3, ageBand: "17-19" }] },
  ],
  reading: [
    { slug: "creative-writing", title: "Creative writing", category: "Writing", lessons: [{ slug: "intro", title: "Stories & voice", ageBand: "11-13", difficulty: 2, durationMinutes: 14, steps: [{ title: "Warm up", content: "Strong openings hook the reader.", method: "read", tip: "Show, don't only tell." }, { title: "Learn", content: "Character, setting, conflict, resolution. Vary sentence length.", method: "read", tip: "Read drafts aloud." }, { title: "Practice", content: "Write a 3-sentence story opening.", method: "practice", tip: "Include a problem." }, { title: "Review", content: "Creative writing builds empathy and communication.", method: "discuss", tip: "Share with a parent." }] }], questions: [{ prompt: "A story needs…", options: ["Conflict or problem", "Only lists", "No characters", "Random words"], correctAnswer: "Conflict or problem", explanation: "Conflict drives plot.", difficulty: 2, ageBand: "11-13" }] },
    { slug: "journalism", title: "Journalism", category: "Non-fiction", lessons: [{ slug: "intro", title: "News writing", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "News leads answer who, what, when, where, why.", method: "read", tip: "Fact vs opinion." }, { title: "Learn", content: "Inverted pyramid: key facts first. Quote sources accurately.", method: "read", tip: "Check two sources." }, { title: "Practice", content: "Rewrite a headline to be clearer.", method: "practice", tip: "Active verbs." }, { title: "Review", content: "Media literacy supports citizenship.", method: "quiz", tip: "Compare BBC/Reuters style." }] }], questions: [{ prompt: "News leads should be…", options: ["Clear and factual", "All fictional", "Very long", "Without sources"], correctAnswer: "Clear and factual", explanation: "Accuracy first.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "academic-writing", title: "Academic writing", category: "Study skills", lessons: [{ slug: "intro", title: "Essays & citations", ageBand: "17-19", difficulty: 3, durationMinutes: 16, steps: [{ title: "Warm up", content: "Academic writing argues with evidence.", method: "read", tip: "Avoid plagiarism." }, { title: "Learn", content: "Harvard/APA cite authors and dates. Bibliography lists all sources.", method: "read", tip: "Reference managers help." }, { title: "Practice", content: "Paraphrase one sentence and cite the source.", method: "practice", tip: "Own words + reference." }, { title: "Review", content: "Needed for GCSE, A-level, and university.", method: "quiz", tip: "Use library guides." }] }], questions: [{ prompt: "Citations give credit to…", options: ["Original authors", "Nobody", "Only yourself", "Random sites"], correctAnswer: "Original authors", explanation: "Academic honesty.", difficulty: 3, ageBand: "17-19" }] },
  ],
  science: [
    { slug: "biology", title: "Biology", category: "Life science", lessons: [{ slug: "intro", title: "Cells & systems", ageBand: "11-13", difficulty: 2, durationMinutes: 15, steps: [{ title: "Warm up", content: "Cells are life's building blocks.", method: "read", tip: "Plant vs animal cells." }, { title: "Learn", content: "Nucleus, cytoplasm, membrane. Organs work in systems (digestive, circulatory).", method: "read", tip: "Microscopes reveal detail." }, { title: "Practice", content: "Mitochondria supply…", method: "practice", tip: "Energy (ATP)." }, { title: "Review", content: "Biology links to medicine and ecology.", method: "quiz", tip: "Label a cell diagram." }] }], questions: [{ prompt: "Cells are…", options: ["Life's building blocks", "Only in rocks", "Always visible", "Made of metal"], correctAnswer: "Life's building blocks", explanation: "Basic unit of life.", difficulty: 2, ageBand: "11-13" }] },
    { slug: "chemistry", title: "Chemistry", category: "Physical science", lessons: [{ slug: "intro", title: "Atoms & reactions", ageBand: "14-16", difficulty: 3, durationMinutes: 16, steps: [{ title: "Warm up", content: "Elements are pure substances of one atom type.", method: "read", tip: "Periodic table organises them." }, { title: "Learn", content: "Atoms rearrange in reactions. Acids, bases, pH scale 0 to 14.", method: "read", tip: "Lab safety first." }, { title: "Practice", content: "pH 7 is…", method: "practice", tip: "Neutral." }, { title: "Review", content: "Chemistry explains materials and medicines.", method: "quiz", tip: "Balance simple equations." }] }], questions: [{ prompt: "pH 7 is…", options: ["Neutral", "Always acid", "Always alkali", "A metal"], correctAnswer: "Neutral", explanation: "Middle of pH scale.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "physics", title: "Physics", category: "Physical science", lessons: [{ slug: "intro", title: "Energy & electricity", ageBand: "14-16", difficulty: 3, durationMinutes: 16, steps: [{ title: "Warm up", content: "Energy transforms but is conserved.", method: "read", tip: "Kinetic + potential." }, { title: "Learn", content: "Circuits: series vs parallel. V = IR. Power = energy/time.", method: "read", tip: "Draw circuit diagrams." }, { title: "Practice", content: "More resistance usually…", method: "practice", tip: "Reduces current (V fixed)." }, { title: "Review", content: "Physics underpins engineering.", method: "quiz", tip: "Units: volts, amps, ohms." }] }], questions: [{ prompt: "Energy is…", options: ["Conserved in transformations", "Destroyed in motion", "Only heat", "Unmeasurable"], correctAnswer: "Conserved in transformations", explanation: "Energy changes form.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "environmental", title: "Environmental science", category: "Applied science", lessons: [{ slug: "intro", title: "Ecosystems & climate", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Ecosystems recycle nutrients.", method: "discuss", tip: "Producers → consumers." }, { title: "Learn", content: "Greenhouse gases trap heat. Human activity shifts climate patterns.", method: "read", tip: "Mitigation vs adaptation." }, { title: "Practice", content: "Renewable energy reduces…", method: "practice", tip: "Fossil emissions." }, { title: "Review", content: "Environmental science guides policy.", method: "quiz", tip: "Local conservation projects." }] }], questions: [{ prompt: "Renewables include…", options: ["Solar and wind", "Only coal", "Plastic waste", "None"], correctAnswer: "Solar and wind", explanation: "Replenishing sources.", difficulty: 3, ageBand: "14-16" }] },
  ],
  history: [
    { slug: "ancient", title: "Ancient history", category: "Periods", lessons: [{ slug: "intro", title: "Ancient civilisations", ageBand: "11-13", difficulty: 2, durationMinutes: 14, steps: [{ title: "Warm up", content: "Egypt, Greece, Rome left laws, art, and engineering.", method: "read", tip: "Timeline context." }, { title: "Learn", content: "Compare governments, trade, and beliefs. Archaeology recovers evidence.", method: "read", tip: "Primary artefacts." }, { title: "Practice", content: "Roman roads helped…", method: "discuss", tip: "Army and trade speed." }, { title: "Review", content: "Ancient ideas still influence today.", method: "quiz", tip: "Museum virtual tours." }] }], questions: [{ prompt: "Archaeology studies…", options: ["Material evidence", "Only fiction", "Future weather", "Maths only"], correctAnswer: "Material evidence", explanation: "Dig and analyse artefacts.", difficulty: 2, ageBand: "11-13" }] },
    { slug: "modern", title: "Modern history", category: "Periods", lessons: [{ slug: "intro", title: "20th century change", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "World wars reshaped borders and technology.", method: "read", tip: "Respect sensitive topics." }, { title: "Learn", content: "Causes, alliances, home front, consequences. Use multiple perspectives.", method: "read", tip: "Memorials remember loss." }, { title: "Practice", content: "Why use veteran oral history?", method: "discuss", tip: "Personal primary accounts." }, { title: "Review", content: "Modern history explains today's alliances.", method: "quiz", tip: "Compare textbook vs diary." }] }], questions: [{ prompt: "Primary sources from wartime include…", options: ["Letters and diaries", "Only novels", "Future blogs", "Maths homework"], correctAnswer: "Letters and diaries", explanation: "Contemporary accounts.", difficulty: 3, ageBand: "14-16" }] },
  ],
  geography: [
    { slug: "human-geo", title: "Human geography", category: "Branches", lessons: [{ slug: "intro", title: "Cities & migration", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Why do people move?", method: "discuss", tip: "Push/pull factors." }, { title: "Learn", content: "Urbanisation, slums, planning, sustainable cities.", method: "read", tip: "UN urban goals." }, { title: "Practice", content: "Define urbanisation.", method: "practice", tip: "Growth of city populations." }, { title: "Review", content: "Human geo links to politics and economics.", method: "quiz", tip: "Case study one city." }] }], questions: [{ prompt: "Urbanisation is…", options: ["City population growth", "Ocean cooling", "Mountain height", "Only farming"], correctAnswer: "City population growth", explanation: "Shift to urban living.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "physical-geo", title: "Physical geography", category: "Branches", lessons: [{ slug: "intro", title: "Landforms & tectonics", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Earth's plates move slowly.", method: "read", tip: "Earthquakes at boundaries." }, { title: "Learn", content: "Constructive vs destructive margins. Erosion shapes coasts.", method: "read", tip: "Cross-section sketches." }, { title: "Practice", content: "Erosion at coasts creates…", method: "practice", tip: "Cliffs, beaches, stacks." }, { title: "Review", content: "Physical processes shape hazards and resources.", method: "quiz", tip: "OS map relief features." }] }], questions: [{ prompt: "Plate tectonics explains…", options: ["Earthquakes and volcanoes", "Only weather", "Moon phases", "Stock prices"], correctAnswer: "Earthquakes and volcanoes", explanation: "Plate movement releases energy.", difficulty: 3, ageBand: "14-16" }] },
  ],
  money: [
    { slug: "investing", title: "Investing basics", category: "Finance", lessons: [{ slug: "intro", title: "Savings & investing", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Saving is low risk; investing has ups and downs.", method: "discuss", tip: "Never invest money you need soon." }, { title: "Learn", content: "Stocks, bonds, funds diversify risk. Compound growth over decades.", method: "read", tip: "Fees matter." }, { title: "Practice", content: "Diversification means…", method: "practice", tip: "Not all eggs one basket." }, { title: "Review", content: "Long term habits beat timing the market.", method: "quiz", tip: "FCA beginner guides." }] }], questions: [{ prompt: "Diversification…", options: ["Spreads risk", "Guarantees profit", "Eliminates tax", "Removes maths"], correctAnswer: "Spreads risk", explanation: "Multiple assets reduce single failure.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "taxes", title: "Tax & payslips", category: "Work finance", lessons: [{ slug: "intro", title: "Understanding payslips", ageBand: "17-19", difficulty: 3, durationMinutes: 14, steps: [{ title: "Warm up", content: "Gross pay ≠ take-home pay.", method: "read", tip: "Tax and NI deducted." }, { title: "Learn", content: "Income tax bands, National Insurance, pension contributions.", method: "read", tip: "Check PAYE code." }, { title: "Practice", content: "Net pay is…", method: "practice", tip: "After deductions." }, { title: "Review", content: "Essential for first jobs.", method: "quiz", tip: "HMRC student resources." }] }], questions: [{ prompt: "Net pay is…", options: ["Take-home after deductions", "Before tax", "Only bonus", "Employer profit"], correctAnswer: "Take-home after deductions", explanation: "What lands in your account.", difficulty: 3, ageBand: "17-19" }] },
  ],
  "study-skills": [
    { slug: "exam-prep", title: "Exam preparation", category: "Assessment", lessons: [{ slug: "intro", title: "Exam strategies", ageBand: "14-16", difficulty: 2, durationMinutes: 14, steps: [{ title: "Warm up", content: "Exams test retrieval under time pressure.", method: "read", tip: "Practice papers help." }, { title: "Learn", content: "Timetable revision, active recall, sleep, calm breathing.", method: "read", tip: "Mark schemes show what examiners want." }, { title: "Practice", content: "Plan a two-week revision timetable.", method: "practice", tip: "Mix subjects." }, { title: "Review", content: "Strategy + knowledge = performance.", method: "quiz", tip: "Simulate exam conditions once." }] }], questions: [{ prompt: "Active recall in revision means…", options: ["Testing yourself", "Only highlighting", "Skipping sleep", "Cramming once"], correctAnswer: "Testing yourself", explanation: "Retrieval strengthens memory.", difficulty: 2, ageBand: "14-16" }] },
    { slug: "presentations", title: "Presentations", category: "Communication", lessons: [{ slug: "intro", title: "Presenting your work", ageBand: "14-16", difficulty: 2, durationMinutes: 13, steps: [{ title: "Warm up", content: "Audience, message, structure.", method: "discuss", tip: "Start with why it matters." }, { title: "Learn", content: "Clear slides, eye contact, steady pace. Practice reduces nerves.", method: "read", tip: "Notes not full script." }, { title: "Practice", content: "Present 60 seconds to a parent.", method: "practice", tip: "Time yourself." }, { title: "Review", content: "Presentation skills help school and work.", method: "quiz", tip: "Record and review." }] }], questions: [{ prompt: "Good presentations…", options: ["Focus on key message", "Read tiny text", "Avoid practice", "Skip structure"], correctAnswer: "Focus on key message", explanation: "Clarity for audience.", difficulty: 2, ageBand: "14-16" }] },
  ],
  "health-wellbeing": [
    { slug: "nutrition", title: "Nutrition science", category: "Body", lessons: [{ slug: "intro", title: "Macros & micros", ageBand: "14-16", difficulty: 2, durationMinutes: 14, steps: [{ title: "Warm up", content: "Carbs, protein, fats each have roles.", method: "read", tip: "Vitamins/minerals too." }, { title: "Learn", content: "Balanced plates fuel sport and study. Hydration supports focus.", method: "read", tip: "Read nutrition labels." }, { title: "Practice", content: "Plan a balanced training day meals.", method: "practice", tip: "Protein after exercise." }, { title: "Review", content: "Food choices affect energy and mood.", method: "quiz", tip: "NHS Eatwell guidance." }] }], questions: [{ prompt: "Protein helps…", options: ["Growth and repair", "Only taste", "Delete sleep", "Remove water"], correctAnswer: "Growth and repair", explanation: "Building body tissues.", difficulty: 2, ageBand: "14-16" }] },
    { slug: "mindfulness", title: "Mindfulness", category: "Mental health", lessons: [{ slug: "intro", title: "Calm & focus techniques", ageBand: "11-13", difficulty: 2, durationMinutes: 12, steps: [{ title: "Warm up", content: "Notice breath without judging thoughts.", method: "listen", tip: "2 minutes is enough." }, { title: "Learn", content: "Grounding: 5 things you see, 4 hear, 3 touch, 2 smell, 1 taste.", method: "practice", tip: "Use before exams." }, { title: "Practice", content: "Try 4-4-4 breathing once.", method: "practice", tip: "In, hold, out." }, { title: "Review", content: "Skills complement professional support when needed.", method: "discuss", tip: "Talk to adults if overwhelmed." }] }], questions: [{ prompt: "Mindfulness means…", options: ["Paying attention on purpose", "Ignoring all feelings", "Skipping help", "Only sleeping"], correctAnswer: "Paying attention on purpose", explanation: "Awareness without judgment.", difficulty: 2, ageBand: "11-13" }] },
  ],
  "digital-skills": [
    { slug: "cybersecurity", title: "Cybersecurity", category: "Safety", lessons: [{ slug: "intro", title: "Security basics", ageBand: "14-16", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Phishing tricks users into revealing secrets.", method: "read", tip: "Check sender URLs." }, { title: "Learn", content: "2FA, updates, backups, strong passwords. Report suspicious links.", method: "read", tip: "NCSC guidance for families." }, { title: "Practice", content: "Spot red flags in a fake email.", method: "practice", tip: "Urgent threats, odd links." }, { title: "Review", content: "Security skills protect school and future jobs.", method: "quiz", tip: "Never click unknown attachments." }] }], questions: [{ prompt: "2FA adds…", options: ["Extra login step", "Free games", "Slower internet only", "No benefit"], correctAnswer: "Extra login step", explanation: "Second factor secures accounts.", difficulty: 3, ageBand: "14-16" }] },
    { slug: "cloud-basics", title: "Cloud computing", category: "Career tech", lessons: [{ slug: "intro", title: "Cloud & APIs intro", ageBand: "17-19", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Files and apps can run on remote servers.", method: "read", tip: "Google Drive is cloud storage." }, { title: "Learn", content: "IaaS/PaaS/SaaS basics. Deploy apps without owning servers.", method: "read", tip: "Understand regions and costs." }, { title: "Practice", content: "SaaS means software you…", method: "practice", tip: "Use via browser subscription." }, { title: "Review", content: "Cloud literacy supports IT careers.", method: "quiz", tip: "Explore free cloud tiers with parents." }] }], questions: [{ prompt: "Cloud storage means data lives…", options: ["On remote servers", "Only on paper", "Nowhere", "In pencils"], correctAnswer: "On remote servers", explanation: "Accessed via internet.", difficulty: 3, ageBand: "17-19" }] },
  ],
  "career-skills": [
    { slug: "leadership", title: "Leadership", category: "Workplace", lessons: [{ slug: "intro", title: "Leading projects", ageBand: "17-19", difficulty: 3, durationMinutes: 15, steps: [{ title: "Warm up", content: "Leaders clarify goals and support the team.", method: "discuss", tip: "Listen first." }, { title: "Learn", content: "Delegate, give feedback, track milestones, celebrate wins.", method: "read", tip: "Lead by example." }, { title: "Practice", content: "Plan a small group task with roles.", method: "practice", tip: "One owner per task." }, { title: "Review", content: "Leadership appears in school projects and jobs.", method: "quiz", tip: "Reflect after team work." }] }], questions: [{ prompt: "Good leaders…", options: ["Listen and clarify goals", "Ignore team input", "Hide deadlines", "Avoid feedback"], correctAnswer: "Listen and clarify goals", explanation: "Direction + respect.", difficulty: 3, ageBand: "17-19" }] },
    { slug: "networking", title: "Professional networking", category: "Career growth", lessons: [{ slug: "intro", title: "Networking & mentors", ageBand: "20-23", difficulty: 3, durationMinutes: 14, steps: [{ title: "Warm up", content: "Networking is genuine relationship building, not using people.", method: "discuss", tip: "Offer help too." }, { title: "Learn", content: "LinkedIn, careers fairs, alumni, informational interviews.", method: "read", tip: "Follow up politely." }, { title: "Practice", content: "Write a short LinkedIn about section draft.", method: "practice", tip: "Skills + interests + goals." }, { title: "Review", content: "Mentors accelerate learning.", method: "quiz", tip: "Thank people for their time." }] }], questions: [{ prompt: "Informational interviews are…", options: ["Learning conversations", "Job offers", "Sales calls only", "Exams"], correctAnswer: "Learning conversations", explanation: "Ask about roles and paths.", difficulty: 3, ageBand: "20-23" }] },
  ],
};

/** Lesson slug stored in DB: track-{trackSlug}-{lessonSlug} */
export function trackLessonSlug(trackSlug: string, lessonSlug: string): string {
  return `track-${trackSlug}-${lessonSlug}`;
}

export function getTracksForSubject(subjectSlug: string): SubjectTrack[] {
  return CURRICULUM_TRACKS[subjectSlug] ?? [];
}

export function getTrackSlugsForSubject(subjectSlug: string): string[] {
  return getTracksForSubject(subjectSlug).map((t) => t.slug);
}

export function parseTrackFromLessonSlug(
  lessonSlug: string,
  subjectSlug: string,
): { trackSlug: string; track: SubjectTrack } | null {
  if (!lessonSlug.startsWith("track-")) return null;
  const rest = lessonSlug.slice(6);
  const tracks = getTracksForSubject(subjectSlug).sort((a, b) => b.slug.length - a.slug.length);
  for (const track of tracks) {
    if (rest.startsWith(`${track.slug}-`)) {
      return { trackSlug: track.slug, track };
    }
  }
  return null;
}

export function getTrackMeta(subjectSlug: string, trackSlug: string): SubjectTrack | undefined {
  return getTracksForSubject(subjectSlug).find((t) => t.slug === trackSlug);
}
