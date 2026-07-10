import type { CurriculumLesson, CurriculumQuestion, CurriculumSubject } from "@/data/curriculum";

/** Tier-2 career & business lessons, unlock after 9 completions per subject */
export const CURRICULUM_CAREER: Record<
  string,
  { lessons: CurriculumLesson[]; questions: CurriculumQuestion[] }
> = {
  maths: {
    lessons: [
      {
        slug: "career-data-spreadsheets",
        title: "Spreadsheets for work",
        ageBand: "17-19",
        difficulty: 4,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Spreadsheets organise numbers for budgets, sales, and projects.", tip: "Cells use columns (letters) and rows (numbers)." },
          { title: "Learn", content: "Formulas start with =. SUM(A1:A10) adds a range. Use for invoices and reports.", tip: "Label columns clearly." },
          { title: "Practice", content: "What does =SUM(B2:B5) do?", tip: "Adds values in cells B2 through B5." },
          { title: "Review", content: "Spreadsheet skills are essential in finance, admin, and operations.", tip: "Export clean CSV for sharing." },
        ],
      },
    ],
    questions: [
      { prompt: "Spreadsheet formulas start with…", options: ["=", "+", "#", "@"], correctAnswer: "=", explanation: "Formulas begin with an equals sign.", difficulty: 4, ageBand: "17-19" },
    ],
  },
  reading: {
    lessons: [
      {
        slug: "career-professional-email",
        title: "Professional emails",
        ageBand: "17-19",
        difficulty: 4,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Work emails need a clear subject, polite tone, and one main request.", tip: "Avoid slang and ALL CAPS." },
          { title: "Learn", content: "Structure: greeting → purpose → details → thanks → sign off.", tip: "Proofread before send." },
          { title: "Practice", content: "Best subject line for a meeting request?", tip: "Specific date and topic." },
          { title: "Review", content: "Clear writing opens doors in every career.", tip: "Reply within one business day when possible." },
        ],
      },
    ],
    questions: [
      { prompt: "A professional email should have…", options: ["One clear purpose", "Ten topics at once", "No greeting", "Only emojis"], correctAnswer: "One clear purpose", explanation: "Focus helps busy readers.", difficulty: 4, ageBand: "17-19" },
    ],
  },
  coding: {
    lessons: [
      {
        slug: "career-automation-basics",
        title: "Workplace automation",
        ageBand: "20-23",
        difficulty: 4,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Automation repeats boring digital tasks: reports, reminders, data entry.", tip: "Start with one repetitive task." },
          { title: "Learn", content: "Scripts, macros, and no code tools save hours. Always test on sample data first.", tip: "Document what the automation does." },
          { title: "Practice", content: "Why test automation on copies, not live data?", tip: "Prevents accidental deletes or wrong sends." },
          { title: "Review", content: "Automation is a high-value skill in modern jobs.", tip: "Ask permission before automating shared systems." },
        ],
      },
    ],
    questions: [
      { prompt: "Test automations on sample data to avoid…", options: ["Mistakes on real records", "Learning", "Saving time", "Documentation"], correctAnswer: "Mistakes on real records", explanation: "Protect production data.", difficulty: 4, ageBand: "20-23" },
    ],
  },
  money: {
    lessons: [
      {
        slug: "career-salary-negotiation",
        title: "Salary & negotiation basics",
        ageBand: "20-23",
        difficulty: 4,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Research typical pay for your role and region before interviews.", tip: "Use official salary surveys." },
          { title: "Learn", content: "Negotiate after an offer. Focus on value you bring. Benefits count too.", tip: "Practice with a mentor." },
          { title: "Practice", content: "When is the best time to discuss salary?", tip: "After they want to hire you." },
          { title: "Review", content: "Fair pay supports long term career health.", tip: "Get offers in writing." },
        ],
      },
    ],
    questions: [
      { prompt: "Salary negotiation usually happens…", options: ["After an offer", "Before applying", "Never", "Only on social media"], correctAnswer: "After an offer", explanation: "Negotiate when they have chosen you.", difficulty: 4, ageBand: "20-23" },
    ],
  },
  "study-skills": {
    lessons: [
      {
        slug: "career-interview-prep",
        title: "Interview preparation",
        ageBand: "17-19",
        difficulty: 4,
        durationMinutes: 18,
        steps: [
          { title: "Warm up", content: "Interviews test skills, attitude, and fit. Prepare stories with STAR: Situation, Task, Action, Result.", tip: "Research the company." },
          { title: "Learn", content: "Dress appropriately, arrive early, ask thoughtful questions.", tip: "Bring copies of CV if in person." },
          { title: "Practice", content: "STAR helps you answer…", tip: "Behavioural questions with clear examples." },
          { title: "Review", content: "Preparation reduces anxiety and improves outcomes.", tip: "Send a thank-you note after." },
        ],
      },
    ],
    questions: [
      { prompt: "STAR stands for Situation, Task, Action, and…", options: ["Result", "Random", "Resume", "Rating"], correctAnswer: "Result", explanation: "End with the outcome you achieved.", difficulty: 4, ageBand: "17-19" },
    ],
  },
};

export const CAREER_SKILLS_SUBJECT: CurriculumSubject = {
  slug: "career-skills",
  title: "Career & Business",
  description: "Workplace communication, entrepreneurship, teamwork, and job ready skills.",
  ageBands: ["14-16", "17-19", "20-23"],
  studyGuide: {
    intro:
      "Career skills bridge school and work. Practice communication, reliability, and problem-solving, employers value these highly.",
    sections: [
      {
        title: "Communication",
        content: "Listen first, speak clearly, confirm next steps in writing.",
        tips: ["Use professional tone in email.", "Ask clarifying questions."],
      },
      {
        title: "Teamwork",
        content: "Share credit, meet deadlines, and flag blockers early.",
        tips: ["Use shared task lists.", "Respect diverse working styles."],
      },
      {
        title: "Business basics",
        content: "Revenue, costs, and profit matter in every organisation.",
        tips: ["Track time on projects.", "Understand your role in the bigger picture."],
      },
      {
        title: "Growth mindset",
        content: "Skills improve with feedback and practice.",
        tips: ["Request constructive feedback.", "Celebrate small wins."],
      },
    ],
  },
  lessons: [
    {
      slug: "career-workplace-communication",
      title: "Workplace communication",
      ageBand: "17-19",
      difficulty: 3,
      durationMinutes: 15,
      steps: [
        { title: "Warm up", content: "At work, clarity prevents costly mistakes.", tip: "Repeat key instructions back." },
        { title: "Learn", content: "Confirm who does what by when. Use bullet points in updates.", tip: "Pick the right channel: chat vs email vs meeting." },
        { title: "Practice", content: "After a meeting, best follow-up?", tip: "Short summary email with action items." },
        { title: "Review", content: "Strong communicators are trusted with responsibility.", tip: "Practice active listening." },
      ],
    },
    {
      slug: "career-entrepreneurship-intro",
      title: "Entrepreneurship introduction",
      ageBand: "17-19",
      difficulty: 3,
      durationMinutes: 18,
      steps: [
        { title: "Warm up", content: "Entrepreneurs solve problems people will pay for.", tip: "Start with a real customer need." },
        { title: "Learn", content: "Idea → prototype → feedback → improve. Revenue must exceed costs long term.", tip: "Keep startup costs low at first." },
        { title: "Practice", content: "First step before selling a product?", tip: "Validate that people want it." },
        { title: "Review", content: "Entrepreneurship builds creativity and resilience.", tip: "Talk to potential customers early." },
      ],
    },
    {
      slug: "career-cv-and-applications",
      title: "CVs and job applications",
      ageBand: "20-23",
      difficulty: 3,
      durationMinutes: 18,
      steps: [
        { title: "Warm up", content: "A CV is a one page summary of skills, experience, and education.", tip: "Tailor each application." },
        { title: "Learn", content: "Use action verbs: led, designed, improved. Quantify results where possible.", tip: "Match keywords from the job description." },
        { title: "Practice", content: "'Increased sales by 15%' is strong because it…", tip: "Shows measurable impact." },
        { title: "Review", content: "Good applications open interviews.", tip: "Proofread twice." },
      ],
    },
    {
      slug: "career-time-management-work",
      title: "Time management at work",
      ageBand: "20-23",
      difficulty: 3,
      durationMinutes: 15,
      steps: [
        { title: "Warm up", content: "Prioritise urgent vs important tasks.", tip: "Use a simple daily top three list." },
        { title: "Learn", content: "Block focus time. Batch similar tasks. Say no to low value work when overloaded.", tip: "Share realistic deadlines." },
        { title: "Practice", content: "Deep work blocks help because…", tip: "They reduce context switching." },
        { title: "Review", content: "Time skills reduce burnout and raise quality.", tip: "Review your week every Friday." },
      ],
    },
  ],
  questions: [
    { prompt: "A CV should highlight…", options: ["Relevant skills and results", "Only hobbies", "Jokes", "Nothing"], correctAnswer: "Relevant skills and results", explanation: "Employers scan for fit and impact.", difficulty: 3, ageBand: "20-23" },
    { prompt: "Validating a business idea means…", options: ["Checking people want it", "Ignoring feedback", "Skipping costs", "Copying competitors only"], correctAnswer: "Checking people want it", explanation: "Customer demand matters.", difficulty: 3, ageBand: "17-19" },
    { prompt: "After meetings, send…", options: ["Action summary", "Nothing", "Random memes", "Only complaints"], correctAnswer: "Action summary", explanation: "Summaries align the team.", difficulty: 3, ageBand: "17-19" },
    { prompt: "Deep work blocks reduce…", options: ["Context switching", "All communication", "Deadlines", "Skills"], correctAnswer: "Context switching", explanation: "Focused blocks improve output.", difficulty: 3, ageBand: "20-23" },
  ],
};
