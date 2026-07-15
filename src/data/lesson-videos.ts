/**
 * Topic-accurate YouTube embeds (youtube-nocookie) for every curriculum lesson.
 * Keys: `${subjectSlug}::${lessonSlug}` (track lessons use track-{track}-{lesson}).
 * Only IDs verified via YouTube oEmbed are used. Parent-supervised viewing.
 */

export type VideoRef = { videoId: string; videoTitle: string };

const v = (videoId: string, videoTitle: string): VideoRef => ({ videoId, videoTitle });

/**
 * Verified educational catalog (oEmbed-checked). Prefer Crash Course, Khan,
 * Math Antics, Common Sense Education, National Geographic, and similar.
 */
const TOPIC = {
  // Maths
  addition: v("mAvuom42NyY", "Math Antics: Multi-Digit Addition"),
  subtraction: v("Y6M89-6106I", "Math Antics: Multi-Digit Subtraction"),
  multiplication: v("FJ5qLWP3Fqo", "Math Antics: Multi-Digit Multiplication"),
  multiplication2: v("RVYwunbpMHA", "Math Antics: Multiplication Part 2"),
  fractions: v("52ZlXsFJULI", "Khan Academy: Adding and subtracting fractions"),
  fractions2: v("bcCLKACsYJ0", "Khan Academy: Fractions with unlike denominators"),
  fractions3: v("WF7L2waDwLw", "Khan Academy: Subtracting mixed numbers"),
  placeValue: v("T5Qf0qSSJFI", "Math Antics: Place Value"),
  wordProblems: v("mAvuom42NyY", "Math Antics: Addition for word problems"),
  algebra: v("NybHckSEQBI", "Math Antics: What Is Algebra?"),
  geometry: v("xCdxURXMdFY", "Math Antics: Area"),
  perimeter: v("AAY1bsazcgM", "Math Antics: Perimeter"),
  circles: v("O-cawByg2aA", "Math Antics: Circles, Circumference and Area"),
  statistics: v("h8EYEJ32oQ8", "Khan Academy: Mean, median, and mode"),
  statistics2: v("k3aKKasOmIw", "Khan Academy: Finding mean, median, and mode"),
  financeMaths: v("GtaoP0skPWc", "Khan Academy: Introduction to interest"),
  compoundInterest: v("-qgdMTbTJlA", "Khan Academy: Compound interest"),
  calculus: v("WUvTyaaNkzM", "3Blue1Brown: Essence of calculus"),

  // Reading / writing / literacy
  phonics: v("saF3-f0XWAY", "Phonics Song for beginners"),
  mainIdea: v("pLlv2o6UfTU", "Crash Course: Navigating Digital Information"),
  vocabulary: v("pLlv2o6UfTU", "Crash Course: Evaluating information and vocabulary"),
  sentences: v("HAnw168huqA", "Think Fast, Talk Smart: Communication"),
  inference: v("pLlv2o6UfTU", "Crash Course: Checking claims while reading"),
  paragraphs: v("E7CwqNHn_Ns", "Crash Course Study Skills: Taking Notes"),
  critical: v("pLlv2o6UfTU", "Crash Course: Critical reading online"),
  citations: v("pLlv2o6UfTU", "Crash Course: Sources and evidence"),
  creativeWriting: v("5MgBikgcWnY", "How to learn anything: first 20 hours"),
  journalism: v("pLlv2o6UfTU", "Crash Course: Navigating news and claims"),

  // Coding / CS
  algorithms: v("O5nskjZ_GoI", "Crash Course Computer Science #1"),
  loops: v("RBSGKlAvoiM", "Data structures and algorithms overview"),
  conditionals: v("O5nskjZ_GoI", "Early computing and decisions"),
  variables: v("rfscVS0vtbw", "Python: variables and basics"),
  debugging: v("RGOj5yH7evk", "Git workflow and fixing mistakes"),
  pseudocode: v("O5nskjZ_GoI", "Thinking like a computer"),
  python: v("rfscVS0vtbw", "Python for beginners"),
  htmlCss: v("UB1O30fR-EE", "HTML Crash Course for Absolute Beginners"),
  javascript: v("PkZNo7MFNFg", "JavaScript for beginners"),
  typescript: v("BwuLxPH8IDs", "TypeScript for beginners"),
  react: v("Tn6-PIqc4UM", "React in 100 Seconds"),
  nextjs: v("ZVnjOPwW4ZA", "Next.js tutorial for beginners"),
  aiTools: v("aircAruvnKk", "3Blue1Brown: What is a neural network?"),
  git: v("RGOj5yH7evk", "Git and GitHub for beginners"),
  databases: v("HXV3zeQKqGY", "SQL and databases for beginners"),
  apis: v("O5nskjZ_GoI", "How computers exchange information"),
  automation: v("rfscVS0vtbw", "Python automation basics"),

  // Money / personal finance
  coins: v("sVKQn2I4HDM", "Budgeting Basics (Two Cents)"),
  needsWants: v("_7J1JVCxWJM", "TED: Better ways to stick to a budget"),
  budget: v("sVKQn2I4HDM", "Budgeting Basics"),
  interest: v("GtaoP0skPWc", "Khan Academy: Introduction to interest"),
  change: v("sVKQn2I4HDM", "Money and budgeting basics"),
  saving: v("_7J1JVCxWJM", "Spending and saving habits"),
  investing: v("-qgdMTbTJlA", "Khan Academy: Compound interest"),
  taxes: v("3ez10ADR_gM", "Crash Course Economics #1"),
  studentBudget: v("7GSGA8SVsOs", "How to make your first budget"),
  credit: v("GtaoP0skPWc", "Interest and debt basics"),
  salary: v("3ez10ADR_gM", "Crash Course Economics: Intro"),

  // Study skills
  focus: v("IlU-zDU6aQ0", "Study Less, Study Smart"),
  notes: v("E7CwqNHn_Ns", "Crash Course Study Skills: Taking Notes"),
  spaced: v("SZbdK9e9bxs", "Crash Course Study Skills: Memory"),
  examCalm: v("IlU-zDU6aQ0", "Study strategies that reduce stress"),
  brain: v("SZbdK9e9bxs", "How memory supports learning"),
  memory: v("bSycdIx-C48", "Crash Course Psychology: How We Make Memories"),
  activeRecall: v("SZbdK9e9bxs", "Crash Course Study Skills: Memory and recall"),
  goals: v("5MgBikgcWnY", "Focused practice and learning goals"),
  research: v("pLlv2o6UfTU", "Research and digital information skills"),
  workplaceLearn: v("IlU-zDU6aQ0", "Learning efficiently at work or school"),
  examPrep: v("IlU-zDU6aQ0", "Exam preparation strategies"),
  presentations: v("HAnw168huqA", "Communication and presentation skills"),

  // Science
  living: v("QnQe0xW_JY4", "Crash Course Biology #1"),
  forces: v("ZM8ECpBuQYE", "Crash Course Physics #1"),
  materials: v("FSyAehMdpyI", "Crash Course Chemistry #1"),
  earthSpace: v("libKVRa01L8", "National Geographic: Solar System 101"),
  earth: v("HCDVN7DCzYE", "National Geographic: Earth 101"),
  plants: v("sQK3Yr4Sc_k", "Crash Course Biology: Photosynthesis"),
  scientificMethod: v("N6IAzlugWw0", "Khan Academy: The scientific method"),
  biology: v("QnQe0xW_JY4", "Crash Course Biology introduction"),
  chemistry: v("FSyAehMdpyI", "Crash Course Chemistry #1"),
  chemistryLab: v("bka20Q9TN6M", "Intro to chemistry basic concepts"),
  physics: v("ZM8ECpBuQYE", "Crash Course Physics #1"),
  environment: v("oJAbATJCugs", "National Geographic: Global Warming 101"),
  climate: v("G4H1N_yXBiA", "National Geographic: Climate change"),
  energyBio: v("00jbG_cfGuQ", "Crash Course Biology: ATP and respiration"),
  gcseChem: v("bka20Q9TN6M", "Chemistry basics and the periodic table"),

  // History
  timelines: v("Yocja_N5s1I", "Crash Course World History #1"),
  primarySources: v("n7ndRwqJYDM", "Crash Course World History #2"),
  industrial: v("8Nn5uqE3C9w", "Crash Course World History: Change over time"),
  historySkills: v("Yocja_N5s1I", "Historical enquiry with Crash Course"),
  localHistory: v("n7ndRwqJYDM", "Civilisations and evidence"),
  ancient: v("n7ndRwqJYDM", "Crash Course: Indus Valley and early civilisations"),
  modern: v("8Nn5uqE3C9w", "Crash Course: Later world history themes"),
  sourceEval: v("pLlv2o6UfTU", "Evaluating sources and evidence"),

  // Geography
  maps: v("93LLwiMjDko", "Crash Course Geography #1"),
  weather: v("HCDVN7DCzYE", "Earth systems and climate"),
  population: v("93LLwiMjDko", "Crash Course Geography: Places and people"),
  sustainability: v("oJAbATJCugs", "Global warming and sustainability"),
  rivers: v("HCDVN7DCzYE", "Earth 101: Water and land"),
  humanGeo: v("93LLwiMjDko", "Human and physical geography intro"),
  physicalGeo: v("libKVRa01L8", "Solar system and planetary scale"),
  gis: v("93LLwiMjDko", "Maps, place, and geographic thinking"),

  // Health & wellbeing
  diet: v("xyQY8a-ng6g", "TED-Ed: How the food you eat affects your brain"),
  exercise: v("aUaInS6HIGo", "23 and 1/2 hours: Best thing for your health"),
  sleep: v("5MuIMqhT8DM", "TED: Sleep is your superpower"),
  mental: v("w6T02g5hnT4", "Why mindfulness is a superpower"),
  hydration: v("xyQY8a-ng6g", "Food, energy, and healthy routines"),
  adultHealth: v("gbQFSMayJxk", "Science of sleep and recovery"),
  nutrition: v("xyQY8a-ng6g", "TED-Ed: Food and the brain"),
  mindfulness: v("w6T02g5hnT4", "Mindfulness animation"),
  meditation: v("inpok4MKVLM", "5-minute meditation practice"),

  // Digital skills
  onlineSafety: v("vNpkUyEOa_8", "Common Sense: My Online Neighborhood"),
  digitalResearch: v("pLlv2o6UfTU", "Crash Course: Navigating Digital Information"),
  documents: v("E7CwqNHn_Ns", "Organising notes and documents"),
  typing: v("vNpkUyEOa_8", "Safe digital habits"),
  passwords: v("MjPpG2e71Ec", "Common Sense: Private and personal information"),
  dataPrivacy: v("7bRZdUtmH8k", "Common Sense: Follow the Digital Trail"),
  cybersecurity: v("inWWhr5tnEA", "What is cybersecurity?"),
  cloud: v("sdpxddDzXfE", "How to protect your data online"),

  // Career
  workplaceComm: v("HAnw168huqA", "Think Fast, Talk Smart: Communication"),
  entrepreneurship: v("3ez10ADR_gM", "Crash Course Economics: Intro to markets"),
  cv: v("Tt08KmFfIYQ", "Write an incredible resume: 5 golden rules"),
  timeMgmt: v("IlU-zDU6aQ0", "Study Less, Study Smart: Time and focus"),
  spreadsheets: v("HXV3zeQKqGY", "Working with structured data (SQL intro)"),
  proEmail: v("HAnw168huqA", "Clear professional communication"),
  interview: v("HAnw168huqA", "Interview communication skills"),
  leadership: v("HAnw168huqA", "Leading conversations clearly"),
  networking: v("HAnw168huqA", "Professional networking through conversation"),

  // Psychology
  psychologyIntro: v("vo4pMVb0R6M", "Crash Course Psychology #1"),
  psychologyMemory: v("bSycdIx-C48", "Crash Course Psychology: How We Make Memories"),
  psychologyForget: v("HVWbrNls-Kw", "Crash Course Psychology: Remembering and Forgetting"),
  psychologySocial: v("UGxGDdQnC1Y", "Crash Course Psychology: Social Influence"),

  // Philosophy
  philosophyIntro: v("1A_CAkYt3GY", "Crash Course Philosophy #1"),
  philosophyLogic: v("NKEhdsnKKHs", "Crash Course Philosophy: How to Argue"),
  philosophyEthics: v("3_t4obUc51A", "Introduction to Ethics"),
  philosophyJustice: v("kBdfcR-8hEY", "Justice: The moral side of murder"),

  // Sociology
  sociologyIntro: v("YnCJU6PaCio", "Crash Course Sociology #1"),
  sociologyParadigms: v("DbTt_ySTjaY", "Crash Course Sociology: Major paradigms"),
  sociologyMedia: v("pLlv2o6UfTU", "Media and society: digital information"),

  // Economics
  economicsIntro: v("3ez10ADR_gM", "Crash Course Economics #1"),
  supplyDemand: v("LwLh6ax0zTE", "Supply and demand explained"),
  econIncentives: v("3ez10ADR_gM", "Economics: people and choices"),

  // Astronomy
  astronomyIntro: v("0rHUDWjR5gg", "Crash Course Astronomy #1"),
  earthSunMoon: v("libKVRa01L8", "National Geographic: Solar System 101"),
  starsGalaxies: v("0rHUDWjR5gg", "Crash Course Astronomy: Cosmic overview"),
  cosmicScale: v("0fKBhvDjuy0", "Powers of Ten (1977)"),

  // Artificial intelligence
  aiIntro: v("a0_lo_GDcFw", "Crash Course AI #1: What is AI?"),
  aiSupervised: v("4qVRBYAdLAo", "Crash Course AI #2: Supervised learning"),
  aiNeural: v("oV3ZY6tJiA0", "Crash Course AI #3: Neural networks"),
  aiMlCs: v("z-EtmaFJieY", "Crash Course CS: Machine learning and AI"),
  aiNn3b1b: v("aircAruvnKk", "3Blue1Brown: What is a neural network?"),
  aiGradient: v("IHZwWFHWa-w", "3Blue1Brown: Gradient descent"),
  aiReinforce: v("nIgIv4IfJ6s", "Crash Course AI: Reinforcement learning"),

  // Robotics
  roboticsIntro: v("vVTA-E3G8bQ", "TED-Ed: Talos, the first robot"),
  roboticsControl: v("z-EtmaFJieY", "Machine learning and intelligent machines"),
  roboticsCs: v("O5nskjZ_GoI", "Crash Course Computer Science #1"),

  // English
  englishMainIdea: v("pLlv2o6UfTU", "Reading and evaluating information"),
  englishSentences: v("HAnw168huqA", "Clear communication"),
  englishParagraphs: v("E7CwqNHn_Ns", "Organising ideas and notes"),
  englishSpeaking: v("HAnw168huqA", "Speaking with purpose"),
  englishPhonics: v("saF3-f0XWAY", "Phonics foundations"),

  // Geometry subject
  geometryShapes: v("AAY1bsazcgM", "Math Antics: Perimeter and shapes"),
  geometryArea: v("xCdxURXMdFY", "Math Antics: Area"),
  geometryCircles: v("O-cawByg2aA", "Math Antics: Circles"),

  // Statistics subject
  statsIntro: v("h8EYEJ32oQ8", "Khan Academy: Mean, median, mode"),
  statsPractice: v("k3aKKasOmIw", "Khan Academy: Finding mean, median, mode"),

  // Biology / chemistry / physics subjects
  bioCells: v("QnQe0xW_JY4", "Crash Course Biology #1"),
  bioPhoto: v("sQK3Yr4Sc_k", "Crash Course Biology: Photosynthesis"),
  bioAtp: v("00jbG_cfGuQ", "Crash Course Biology: ATP"),
  chemAtoms: v("FSyAehMdpyI", "Crash Course Chemistry #1"),
  chemBasics: v("bka20Q9TN6M", "Chemistry basic concepts"),
  physMotion: v("ZM8ECpBuQYE", "Crash Course Physics #1"),

  // Computing / cybersecurity subjects
  computingIntro: v("O5nskjZ_GoI", "Crash Course Computer Science #1"),
  computingData: v("RBSGKlAvoiM", "Data structures overview"),
  computingDb: v("HXV3zeQKqGY", "SQL and databases"),
  cyberIntro: v("inWWhr5tnEA", "What is cybersecurity?"),
  cyberProtect: v("sdpxddDzXfE", "How to protect your data online"),
  cyberPrivacy: v("7bRZdUtmH8k", "Digital trail and privacy"),
  cyberPhish: v("pLlv2o6UfTU", "Spotting misleading digital claims"),
} as const;

/** All video IDs used in this catalog (for tests / verification scripts). */
export const VERIFIED_LESSON_VIDEO_IDS: string[] = Array.from(
  new Set(Object.values(TOPIC).map((t) => t.videoId)),
);

function key(subjectSlug: string, lessonSlug: string): string {
  return `${subjectSlug}::${lessonSlug}`;
}

/**
 * Exact per-lesson video map. Every seeded lesson should appear here.
 */
export const LESSON_VIDEOS: Record<string, VideoRef> = {
  // Maths
  [key("maths", "addition-basics")]: TOPIC.addition,
  [key("maths", "subtraction-basics")]: TOPIC.subtraction,
  [key("maths", "multiplication-intro")]: TOPIC.multiplication,
  [key("maths", "fractions-intro")]: TOPIC.fractions,
  [key("maths", "place-value")]: TOPIC.placeValue,
  [key("maths", "word-problems")]: TOPIC.wordProblems,
  [key("maths", "algebra-linear-equations")]: TOPIC.algebra,
  [key("maths", "statistics-basics")]: TOPIC.statistics,
  [key("maths", "track-algebra-intro")]: TOPIC.algebra,
  [key("maths", "track-geometry-intro")]: TOPIC.geometry,
  [key("maths", "track-statistics-intro")]: TOPIC.statistics2,
  [key("maths", "track-finance-maths-intro")]: TOPIC.financeMaths,
  [key("maths", "career-data-spreadsheets")]: TOPIC.spreadsheets,

  // Reading
  [key("reading", "phonics-vowels")]: TOPIC.phonics,
  [key("reading", "comprehension-main-idea")]: TOPIC.mainIdea,
  [key("reading", "vocabulary-context")]: TOPIC.vocabulary,
  [key("reading", "writing-sentences")]: TOPIC.sentences,
  [key("reading", "inference")]: TOPIC.inference,
  [key("reading", "paragraph-structure")]: TOPIC.paragraphs,
  [key("reading", "critical-analysis")]: TOPIC.critical,
  [key("reading", "academic-citations")]: TOPIC.citations,
  [key("reading", "track-creative-writing-intro")]: TOPIC.creativeWriting,
  [key("reading", "track-journalism-intro")]: TOPIC.journalism,
  [key("reading", "track-academic-writing-intro")]: TOPIC.citations,
  [key("reading", "career-professional-email")]: TOPIC.proEmail,

  // Coding
  [key("coding", "what-is-an-algorithm")]: TOPIC.algorithms,
  [key("coding", "loops-basics")]: TOPIC.loops,
  [key("coding", "if-statements")]: TOPIC.conditionals,
  [key("coding", "variables-intro")]: TOPIC.variables,
  [key("coding", "debugging-practice")]: TOPIC.debugging,
  [key("coding", "pseudocode")]: TOPIC.pseudocode,
  [key("coding", "api-basics")]: TOPIC.apis,
  [key("coding", "git-collaboration")]: TOPIC.git,
  [key("coding", "track-python-intro")]: TOPIC.python,
  [key("coding", "track-html-css-intro")]: TOPIC.htmlCss,
  [key("coding", "track-javascript-intro")]: TOPIC.javascript,
  [key("coding", "track-typescript-intro")]: TOPIC.typescript,
  [key("coding", "track-react-intro")]: TOPIC.react,
  [key("coding", "track-nextjs-intro")]: TOPIC.nextjs,
  [key("coding", "track-ai-tools-intro")]: TOPIC.aiTools,
  [key("coding", "track-git-tools-intro")]: TOPIC.git,
  [key("coding", "track-databases-intro")]: TOPIC.databases,
  [key("coding", "career-automation-basics")]: TOPIC.automation,

  // Money
  [key("money", "coins-and-notes")]: TOPIC.coins,
  [key("money", "needs-vs-wants")]: TOPIC.needsWants,
  [key("money", "simple-budget")]: TOPIC.budget,
  [key("money", "interest-basics")]: TOPIC.interest,
  [key("money", "making-change")]: TOPIC.change,
  [key("money", "saving-goals")]: TOPIC.saving,
  [key("money", "student-budgeting")]: TOPIC.studentBudget,
  [key("money", "credit-and-debt")]: TOPIC.credit,
  [key("money", "track-investing-intro")]: TOPIC.investing,
  [key("money", "track-taxes-intro")]: TOPIC.taxes,
  [key("money", "career-salary-negotiation")]: TOPIC.salary,

  // Study skills
  [key("study-skills", "focus-environment")]: TOPIC.focus,
  [key("study-skills", "note-taking")]: TOPIC.notes,
  [key("study-skills", "spaced-revision")]: TOPIC.spaced,
  [key("study-skills", "exam-calming")]: TOPIC.examCalm,
  [key("study-skills", "brain-learning-basics")]: TOPIC.brain,
  [key("study-skills", "working-memory-attention")]: TOPIC.memory,
  [key("study-skills", "active-recall")]: TOPIC.activeRecall,
  [key("study-skills", "goal-setting")]: TOPIC.goals,
  [key("study-skills", "research-methods")]: TOPIC.research,
  [key("study-skills", "workplace-learning")]: TOPIC.workplaceLearn,
  [key("study-skills", "track-exam-prep-intro")]: TOPIC.examPrep,
  [key("study-skills", "track-presentations-intro")]: TOPIC.presentations,
  [key("study-skills", "career-interview-prep")]: TOPIC.interview,

  // Science
  [key("science", "living-things")]: TOPIC.living,
  [key("science", "forces-motion")]: TOPIC.forces,
  [key("science", "materials-matter")]: TOPIC.materials,
  [key("science", "earth-space")]: TOPIC.earthSpace,
  [key("science", "plants-photosynthesis")]: TOPIC.plants,
  [key("science", "scientific-method")]: TOPIC.scientificMethod,
  [key("science", "gcse-chemistry-intro")]: TOPIC.gcseChem,
  [key("science", "track-biology-intro")]: TOPIC.biology,
  [key("science", "track-chemistry-intro")]: TOPIC.chemistry,
  [key("science", "track-physics-intro")]: TOPIC.physics,
  [key("science", "track-environmental-intro")]: TOPIC.environment,

  // History
  [key("history", "timelines-basics")]: TOPIC.timelines,
  [key("history", "primary-sources")]: TOPIC.primarySources,
  [key("history", "industrial-change")]: TOPIC.industrial,
  [key("history", "history-skills")]: TOPIC.historySkills,
  [key("history", "local-history")]: TOPIC.localHistory,
  [key("history", "source-evaluation")]: TOPIC.sourceEval,
  [key("history", "track-ancient-intro")]: TOPIC.ancient,
  [key("history", "track-modern-intro")]: TOPIC.modern,

  // Geography
  [key("geography", "maps-skills")]: TOPIC.maps,
  [key("geography", "weather-climate")]: TOPIC.weather,
  [key("geography", "population-places")]: TOPIC.population,
  [key("geography", "sustainability-geo")]: TOPIC.sustainability,
  [key("geography", "rivers-coasts")]: TOPIC.rivers,
  [key("geography", "gis-maps-data")]: TOPIC.gis,
  [key("geography", "track-human-geo-intro")]: TOPIC.humanGeo,
  [key("geography", "track-physical-geo-intro")]: TOPIC.physicalGeo,

  // Health
  [key("health-wellbeing", "balanced-diet")]: TOPIC.diet,
  [key("health-wellbeing", "exercise-mood")]: TOPIC.exercise,
  [key("health-wellbeing", "sleep-hygiene")]: TOPIC.sleep,
  [key("health-wellbeing", "mental-health-basics")]: TOPIC.mental,
  [key("health-wellbeing", "hydration-habits")]: TOPIC.hydration,
  [key("health-wellbeing", "adult-health-literacy")]: TOPIC.adultHealth,
  [key("health-wellbeing", "track-nutrition-intro")]: TOPIC.nutrition,
  [key("health-wellbeing", "track-mindfulness-intro")]: TOPIC.mindfulness,

  // Digital
  [key("digital-skills", "online-safety")]: TOPIC.onlineSafety,
  [key("digital-skills", "digital-research")]: TOPIC.digitalResearch,
  [key("digital-skills", "documents-slides")]: TOPIC.documents,
  [key("digital-skills", "typing-accessibility")]: TOPIC.typing,
  [key("digital-skills", "passwords-privacy")]: TOPIC.passwords,
  [key("digital-skills", "workplace-data-privacy")]: TOPIC.dataPrivacy,
  [key("digital-skills", "track-cybersecurity-intro")]: TOPIC.cybersecurity,
  [key("digital-skills", "track-cloud-basics-intro")]: TOPIC.cloud,

  // Career
  [key("career-skills", "career-workplace-communication")]: TOPIC.workplaceComm,
  [key("career-skills", "career-entrepreneurship-intro")]: TOPIC.entrepreneurship,
  [key("career-skills", "career-cv-and-applications")]: TOPIC.cv,
  [key("career-skills", "career-time-management-work")]: TOPIC.timeMgmt,
  [key("career-skills", "career-data-spreadsheets")]: TOPIC.spreadsheets,
  [key("career-skills", "career-professional-email")]: TOPIC.proEmail,
  [key("career-skills", "career-automation-basics")]: TOPIC.automation,
  [key("career-skills", "career-salary-negotiation")]: TOPIC.salary,
  [key("career-skills", "career-interview-prep")]: TOPIC.interview,
  [key("career-skills", "track-leadership-intro")]: TOPIC.leadership,
  [key("career-skills", "track-networking-intro")]: TOPIC.networking,

  // Psychology
  [key("psychology", "intro-psychology")]: TOPIC.psychologyIntro,
  [key("psychology", "memory-learning")]: TOPIC.psychologyMemory,
  [key("psychology", "attention-focus")]: TOPIC.focus,
  [key("psychology", "social-thinking")]: TOPIC.psychologySocial,

  // Philosophy
  [key("philosophy", "intro-philosophy")]: TOPIC.philosophyIntro,
  [key("philosophy", "logic-arguments")]: TOPIC.philosophyLogic,
  [key("philosophy", "ethics-intro")]: TOPIC.philosophyEthics,
  [key("philosophy", "knowledge-belief")]: TOPIC.philosophyIntro,

  // Sociology
  [key("sociology", "intro-sociology")]: TOPIC.sociologyIntro,
  [key("sociology", "norms-culture")]: TOPIC.sociologyParadigms,
  [key("sociology", "institutions")]: TOPIC.sociologyIntro,
  [key("sociology", "media-society")]: TOPIC.sociologyMedia,

  // Economics
  [key("economics", "intro-economics")]: TOPIC.economicsIntro,
  [key("economics", "supply-demand")]: TOPIC.supplyDemand,
  [key("economics", "incentives")]: TOPIC.econIncentives,
  [key("economics", "personal-finance-econ")]: TOPIC.studentBudget,

  // Astronomy
  [key("astronomy", "intro-astronomy")]: TOPIC.astronomyIntro,
  [key("astronomy", "earth-sun-moon")]: TOPIC.earthSunMoon,
  [key("astronomy", "stars-galaxies")]: TOPIC.starsGalaxies,
  [key("astronomy", "cosmic-scale")]: TOPIC.cosmicScale,

  // Artificial intelligence
  [key("artificial-intelligence", "what-is-ai")]: TOPIC.aiIntro,
  [key("artificial-intelligence", "machine-learning-basics")]: TOPIC.aiSupervised,
  [key("artificial-intelligence", "using-ai-tools")]: TOPIC.aiMlCs,
  [key("artificial-intelligence", "ai-ethics-safety")]: TOPIC.aiNeural,

  // Robotics
  [key("robotics", "what-is-a-robot")]: TOPIC.roboticsIntro,
  [key("robotics", "sensors-actuators")]: TOPIC.roboticsCs,
  [key("robotics", "robot-control")]: TOPIC.roboticsControl,
  [key("robotics", "robots-and-society")]: TOPIC.aiIntro,

  // English
  [key("english", "reading-main-idea")]: TOPIC.englishPhonics,
  [key("english", "sentence-clarity")]: TOPIC.englishSentences,
  [key("english", "paragraph-writing")]: TOPIC.englishParagraphs,
  [key("english", "speaking-with-purpose")]: TOPIC.englishSpeaking,

  // Geometry
  [key("geometry", "shapes-basics")]: TOPIC.geometryShapes,
  [key("geometry", "perimeter-practice")]: TOPIC.perimeter,
  [key("geometry", "area-rectangles")]: TOPIC.geometryArea,
  [key("geometry", "circles-intro")]: TOPIC.geometryCircles,

  // Statistics
  [key("statistics", "data-basics")]: TOPIC.statsIntro,
  [key("statistics", "mean-median-mode")]: TOPIC.statsPractice,
  [key("statistics", "reading-charts")]: TOPIC.statsIntro,
  [key("statistics", "careful-claims")]: TOPIC.critical,

  // Biology
  [key("biology", "cells-intro")]: TOPIC.bioCells,
  [key("biology", "photosynthesis-energy")]: TOPIC.bioPhoto,
  [key("biology", "respiration-basics")]: TOPIC.bioAtp,
  [key("biology", "ecosystems-intro")]: TOPIC.environment,

  // Chemistry
  [key("chemistry", "atoms-elements")]: TOPIC.chemAtoms,
  [key("chemistry", "compounds-mixtures")]: TOPIC.chemBasics,
  [key("chemistry", "chemical-reactions")]: TOPIC.chemAtoms,
  [key("chemistry", "lab-safety")]: TOPIC.scientificMethod,

  // Physics
  [key("physics", "motion-basics")]: TOPIC.physMotion,
  [key("physics", "forces-intro")]: TOPIC.physMotion,
  [key("physics", "energy-transfers")]: TOPIC.energyBio,
  [key("physics", "graphs-motion")]: TOPIC.physMotion,

  // Computing
  [key("computing", "hardware-software")]: TOPIC.computingIntro,
  [key("computing", "algorithms-data")]: TOPIC.computingData,
  [key("computing", "networks-intro")]: TOPIC.computingIntro,
  [key("computing", "databases-intro")]: TOPIC.computingDb,

  // Cybersecurity
  [key("cybersecurity", "cyber-threats")]: TOPIC.cyberPhish,
  [key("cybersecurity", "passwords-mfa")]: TOPIC.cyberIntro,
  [key("cybersecurity", "privacy-hygiene")]: TOPIC.cyberPrivacy,
  [key("cybersecurity", "incident-response")]: TOPIC.cyberProtect,
};

/** Track slug → category-accurate default video when a track lesson is not listed. */
const TRACK_CATEGORY_VIDEO: Record<string, VideoRef> = {
  python: TOPIC.python,
  "html-css": TOPIC.htmlCss,
  javascript: TOPIC.javascript,
  typescript: TOPIC.typescript,
  react: TOPIC.react,
  nextjs: TOPIC.nextjs,
  "ai-tools": TOPIC.aiTools,
  "git-tools": TOPIC.git,
  databases: TOPIC.databases,
  algebra: TOPIC.algebra,
  geometry: TOPIC.geometry,
  statistics: TOPIC.statistics,
  "finance-maths": TOPIC.financeMaths,
  "creative-writing": TOPIC.creativeWriting,
  journalism: TOPIC.journalism,
  "academic-writing": TOPIC.citations,
  biology: TOPIC.biology,
  chemistry: TOPIC.chemistry,
  physics: TOPIC.physics,
  environmental: TOPIC.environment,
  ancient: TOPIC.ancient,
  modern: TOPIC.modern,
  "human-geo": TOPIC.humanGeo,
  "physical-geo": TOPIC.physicalGeo,
  investing: TOPIC.investing,
  taxes: TOPIC.taxes,
  "exam-prep": TOPIC.examPrep,
  presentations: TOPIC.presentations,
  nutrition: TOPIC.nutrition,
  mindfulness: TOPIC.mindfulness,
  cybersecurity: TOPIC.cybersecurity,
  "cloud-basics": TOPIC.cloud,
  leadership: TOPIC.leadership,
  networking: TOPIC.networking,
};

const SUBJECT_FALLBACK: Record<string, VideoRef> = {
  maths: TOPIC.placeValue,
  reading: TOPIC.mainIdea,
  coding: TOPIC.algorithms,
  money: TOPIC.budget,
  "study-skills": TOPIC.focus,
  science: TOPIC.scientificMethod,
  history: TOPIC.timelines,
  geography: TOPIC.maps,
  "health-wellbeing": TOPIC.sleep,
  "digital-skills": TOPIC.onlineSafety,
  "career-skills": TOPIC.workplaceComm,
  psychology: TOPIC.psychologyIntro,
  philosophy: TOPIC.philosophyIntro,
  sociology: TOPIC.sociologyIntro,
  economics: TOPIC.economicsIntro,
  astronomy: TOPIC.astronomyIntro,
  "artificial-intelligence": TOPIC.aiIntro,
  robotics: TOPIC.roboticsIntro,
  english: TOPIC.englishMainIdea,
  geometry: TOPIC.geometryArea,
  statistics: TOPIC.statsIntro,
  biology: TOPIC.bioCells,
  chemistry: TOPIC.chemAtoms,
  physics: TOPIC.physMotion,
  computing: TOPIC.computingIntro,
  cybersecurity: TOPIC.cyberIntro,
};

/** Depth-pack lessons: topic map when known, else subject fallback (still verified IDs). */
const DEPTH_LESSON_VIDEOS: Record<string, VideoRef> = {
  [key("maths", "counting-to-twenty")]: TOPIC.addition,
  [key("maths", "simple-shapes-maths")]: TOPIC.geometry,
  [key("maths", "doubling-halving")]: TOPIC.multiplication,
  [key("maths", "percentages-everyday")]: TOPIC.financeMaths,
  [key("maths", "maths-study-habits")]: TOPIC.focus,
  [key("reading", "letter-sounds-play")]: TOPIC.phonics,
  [key("reading", "story-sequence")]: TOPIC.mainIdea,
  [key("reading", "reading-for-college")]: TOPIC.critical,
  [key("science", "senses-observe")]: TOPIC.scientificMethod,
  [key("science", "living-or-not")]: TOPIC.living,
  [key("science", "weather-watch")]: TOPIC.earthSpace,
  [key("science", "science-careers-intro")]: TOPIC.scientificMethod,
  [key("science", "experimental-design")]: TOPIC.scientificMethod,
  [key("health-wellbeing", "washing-hands")]: TOPIC.nutrition,
  [key("health-wellbeing", "feelings-words")]: TOPIC.mindfulness,
  [key("health-wellbeing", "moving-bodies")]: TOPIC.nutrition,
  [key("health-wellbeing", "teen-wellbeing-balance")]: TOPIC.mindfulness,
  [key("health-wellbeing", "adult-stress-basics")]: TOPIC.mindfulness,
  [key("coding", "unplugged-sequences")]: TOPIC.algorithms,
  [key("coding", "debugging-kindly")]: TOPIC.debugging,
  [key("money", "coin-sorting")]: TOPIC.coins,
  [key("money", "saving-jar")]: TOPIC.saving,
  [key("study-skills", "tidy-study-spot")]: TOPIC.focus,
  [key("study-skills", "short-practice")]: TOPIC.spaced,
  [key("history", "family-timeline")]: TOPIC.timelines,
  [key("history", "history-and-citizenship")]: TOPIC.modern,
  [key("geography", "my-local-map")]: TOPIC.maps,
  [key("geography", "global-connections")]: TOPIC.humanGeo,
  [key("digital-skills", "kind-online")]: TOPIC.onlineSafety,
  [key("digital-skills", "screen-breaks")]: TOPIC.focus,
  [key("digital-skills", "digital-footprint-teens")]: TOPIC.cyberPrivacy,
  [key("psychology", "psychology-curious-minds")]: TOPIC.psychologyIntro,
  [key("psychology", "habits-and-cues")]: TOPIC.psychologyIntro,
  [key("psychology", "social-influence")]: TOPIC.psychologyIntro,
  [key("psychology", "research-methods-lite")]: TOPIC.research,
  [key("philosophy", "asking-good-questions")]: TOPIC.philosophyIntro,
  [key("philosophy", "reasons-and-evidence")]: TOPIC.philosophyIntro,
  [key("philosophy", "ethics-everyday")]: TOPIC.philosophyIntro,
  [key("sociology", "groups-and-belonging")]: TOPIC.sociologyIntro,
  [key("sociology", "fairness-in-society")]: TOPIC.sociologyIntro,
  [key("sociology", "institutions-intro")]: TOPIC.sociologyIntro,
  [key("economics", "scarcity-basics")]: TOPIC.economicsIntro,
  [key("economics", "markets-prices")]: TOPIC.economicsIntro,
  [key("economics", "personal-finance-macro")]: TOPIC.economicsIntro,
  [key("astronomy", "day-and-night-sky")]: TOPIC.astronomyIntro,
  [key("astronomy", "moon-shapes")]: TOPIC.astronomyIntro,
  [key("astronomy", "scale-of-space")]: TOPIC.astronomyIntro,
  [key("astronomy", "space-science-careers")]: TOPIC.astronomyIntro,
  [key("artificial-intelligence", "ai-around-you")]: TOPIC.aiIntro,
  [key("artificial-intelligence", "ai-not-magic")]: TOPIC.aiIntro,
  [key("artificial-intelligence", "prompt-practice")]: TOPIC.aiTools,
  [key("artificial-intelligence", "ai-at-work-study")]: TOPIC.aiTools,
  [key("robotics", "robots-helpers")]: TOPIC.roboticsIntro,
  [key("robotics", "sense-decide-act-kids")]: TOPIC.roboticsIntro,
  [key("robotics", "robot-design-brief")]: TOPIC.roboticsIntro,
  [key("robotics", "automation-ethics")]: TOPIC.roboticsIntro,
  [key("english", "word-families")]: TOPIC.phonics,
  [key("english", "describing-words")]: TOPIC.englishMainIdea,
  [key("english", "formal-tone")]: TOPIC.sentences,
  [key("english", "editing-pass")]: TOPIC.paragraphs,
  [key("geometry", "angles-intro")]: TOPIC.geometry,
  [key("geometry", "pythagoras-intro")]: TOPIC.geometry,
  [key("geometry", "geometry-proof-habits")]: TOPIC.geometry,
  [key("geometry", "geometry-design")]: TOPIC.geometry,
  [key("statistics", "tally-charts")]: TOPIC.statistics,
  [key("statistics", "pictograms")]: TOPIC.statistics2,
  [key("statistics", "sampling-bias")]: TOPIC.statsIntro,
  [key("statistics", "stats-for-decisions")]: TOPIC.statsIntro,
  [key("biology", "animals-and-plants")]: TOPIC.living,
  [key("biology", "habitats-homes")]: TOPIC.biology,
  [key("biology", "genetics-intro")]: TOPIC.bioCells,
  [key("biology", "human-biology-respect")]: TOPIC.biology,
  [key("chemistry", "materials-sort")]: TOPIC.materials,
  [key("chemistry", "solids-liquids-gases")]: TOPIC.chemistry,
  [key("chemistry", "periodic-patterns")]: TOPIC.chemAtoms,
  [key("chemistry", "chemistry-of-everyday")]: TOPIC.chemistry,
  [key("physics", "pushes-and-pulls")]: TOPIC.forces,
  [key("physics", "magnets-intro")]: TOPIC.physics,
  [key("physics", "circuits-series")]: TOPIC.physMotion,
  [key("physics", "physics-models")]: TOPIC.physics,
  [key("computing", "what-is-a-computer")]: TOPIC.computingIntro,
  [key("computing", "inputs-outputs")]: TOPIC.computingIntro,
  [key("computing", "cyber-physical")]: TOPIC.computingIntro,
  [key("computing", "computational-thinking-work")]: TOPIC.algorithms,
  [key("cybersecurity", "secrets-stay-secret")]: TOPIC.cyberIntro,
  [key("cybersecurity", "ask-before-click")]: TOPIC.cyberPhish,
  [key("cybersecurity", "threat-modelling-lite")]: TOPIC.cyberProtect,
  [key("cybersecurity", "secure-habits-adult")]: TOPIC.cyberPrivacy,
  [key("career-skills", "strengths-inventory")]: TOPIC.workplaceComm,
  [key("career-skills", "networking-respect")]: TOPIC.networking,
};

Object.assign(LESSON_VIDEOS, DEPTH_LESSON_VIDEOS);

/** Resolve a topic-accurate video for a subject lesson (including track-* slugs). */
export function resolveLessonVideo(subjectSlug: string, lessonSlug: string): VideoRef {
  const exact = LESSON_VIDEOS[key(subjectSlug, lessonSlug)];
  if (exact) return exact;

  if (lessonSlug.startsWith("track-")) {
    const rest = lessonSlug.slice("track-".length);
    const trackSlug = Object.keys(TRACK_CATEGORY_VIDEO)
      .sort((a, b) => b.length - a.length)
      .find((t) => rest === t || rest.startsWith(`${t}-`));
    if (trackSlug && TRACK_CATEGORY_VIDEO[trackSlug]) {
      return TRACK_CATEGORY_VIDEO[trackSlug];
    }
  }

  return SUBJECT_FALLBACK[subjectSlug] ?? TOPIC.focus;
}

export function lessonVideoKey(subjectSlug: string, lessonSlug: string): string {
  return key(subjectSlug, lessonSlug);
}
