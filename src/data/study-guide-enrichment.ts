import type { StudyGuideSection, StepCheck } from "./curriculum";

type GuideSectionEnrichment = {
  keyPoints?: string[];
  check?: StepCheck;
};

export const GUIDE_ENRICHMENTS: Record<string, GuideSectionEnrichment[]> = {
  maths: [
    {
      keyPoints: ["Count real objects before symbols.", "Number lines show addition and subtraction visually."],
      check: { prompt: "8 + 5 = ?", options: ["11", "12", "13", "14"], correctAnswer: "13", explanation: "8 + 5 = 13." },
    },
    {
      keyPoints: ["Addition combines; subtraction finds difference.", "Always check with the inverse operation."],
      check: { prompt: "15 − 7 = ?", options: ["6", "7", "8", "9"], correctAnswer: "8", explanation: "15 − 7 = 8." },
    },
    {
      keyPoints: ["Underline the question.", "Draw before calculating."],
      check: { prompt: "Round 47 to the nearest ten.", options: ["40", "45", "50", "47"], correctAnswer: "50", explanation: "47 is closer to 50." },
    },
    {
      keyPoints: ["Review weekly in parent dashboard.", "Short daily practice beats cramming."],
      check: { prompt: "What is 3 × 4?", options: ["7", "10", "12", "16"], correctAnswer: "12", explanation: "Three groups of four = 12." },
    },
  ],
  reading: [
    {
      keyPoints: ["Blend sounds smoothly.", "Patterns: -ing, -tion, silent e."],
      check: { prompt: "Which is a noun?", options: ["Run", "Happy", "Garden", "Quickly"], correctAnswer: "Garden", explanation: "Garden names a place." },
    },
    {
      keyPoints: ["Who? What? Why? after reading.", "Predict what happens next."],
      check: { prompt: "Main idea: 'Bees help plants grow.'", options: ["Bees are yellow", "Bees help plants", "Flowers are pretty", "Plants need water"], correctAnswer: "Bees help plants", explanation: "Focus is bees helping plants." },
    },
    {
      keyPoints: ["One new word daily.", "Use it in conversation."],
      check: { prompt: "'Enormous' is similar to…", options: ["Tiny", "Huge", "Quiet", "Slow"], correctAnswer: "Huge", explanation: "Huge means very big." },
    },
    {
      keyPoints: ["Sentences → paragraphs → stories.", "Ideas before spelling perfection."],
      check: { prompt: "Which prefix means 'not'?", options: ["Re-", "Un-", "Pre-", "Over-"], correctAnswer: "Un-", explanation: "Un- reverses meaning." },
    },
  ],
  coding: [
    {
      keyPoints: ["Order matters.", "Test each step."],
      check: { prompt: "An algorithm is…", options: ["A virus", "Step by step instructions", "A keyboard", "A cable"], correctAnswer: "Step by step instructions", explanation: "Algorithms are ordered steps." },
    },
    {
      keyPoints: ["Repeat patterns save code.", "Count loop iterations."],
      check: { prompt: "A loop is used to…", options: ["Delete code", "Repeat actions", "Turn off PC", "Print once"], correctAnswer: "Repeat actions", explanation: "Loops repeat blocks." },
    },
    {
      keyPoints: ["True/false decisions.", "Real-life if/else examples."],
      check: { prompt: "if x > 5, x is 7. Condition is…", options: ["False", "True", "Zero", "Error"], correctAnswer: "True", explanation: "7 is greater than 5." },
    },
    {
      keyPoints: ["Bugs are normal.", "Fix one thing at a time."],
      check: { prompt: "Binary digits are…", options: ["0 and 1", "1 and 2", "0 to 9", "A and B"], correctAnswer: "0 and 1", explanation: "Computers use base-2." },
    },
  ],
  money: [
    {
      keyPoints: ["100p = £1.", "Practice making amounts different ways."],
      check: { prompt: "How many 20p in £1?", options: ["4", "5", "10", "20"], correctAnswer: "5", explanation: "5 × 20p = £1." },
    },
    {
      keyPoints: ["Needs before wants.", "24-hour rule for big wants."],
      check: { prompt: "Change from £5 for £3.50?", options: ["£1.00", "£1.50", "£2.00", "£2.50"], correctAnswer: "£1.50", explanation: "£5.00 − £3.50 = £1.50." },
    },
    {
      keyPoints: ["Income − spending = savings potential.", "One goal at a time."],
      check: { prompt: "A budget tracks…", options: ["Weather", "Income and spending", "Homework", "Wishes only"], correctAnswer: "Income and spending", explanation: "Budgets plan money in and out." },
    },
    {
      keyPoints: ["Cards represent real money.", "Never share PINs."],
      check: { prompt: "Debit card money comes from…", options: ["Your account", "Free gifts", "Nowhere", "The government always"], correctAnswer: "Your account", explanation: "Debit spends money you have." },
    },
  ],
  "study-skills": [
    {
      keyPoints: ["Quiet, tidy, well-lit space.", "Phone away during focus."],
      check: { prompt: "Good focus block length?", options: ["3 hours", "10 to 25 minutes", "All night", "1 second"], correctAnswer: "10 to 25 minutes", explanation: "Short blocks with breaks work best." },
    },
    {
      keyPoints: ["10 to 25 min blocks + breaks.", "Movement restores attention.", "Prefrontal cortex fatigues with long cramming."],
      check: { prompt: "During a break, good to…", options: ["Move your body", "Stare at phone only", "Skip breaks", "Start 2-hour session"], correctAnswer: "Move your body", explanation: "Movement helps refocus." },
    },
    {
      keyPoints: ["Working memory holds ~4 to 7 items.", "Chunk information to reduce load.", "Spaced review + sleep consolidate memory."],
      check: { prompt: "Sleep helps learning by…", options: ["Deleting memory", "Consolidating what you studied", "Stopping growth", "Removing focus"], correctAnswer: "Consolidating what you studied", explanation: "Sleep transfers learning to long term memory." },
    },
    {
      keyPoints: ["What did I learn? What's tricky?", "Celebrate small wins.", "Metacognition improves next session."],
      check: { prompt: "Chunking phone numbers helps because…", options: ["It reduces memory load", "It deletes digits", "It avoids practice", "It removes sleep"], correctAnswer: "It reduces memory load", explanation: "Groups fit better in working memory." },
    },
  ],
  science: [
    { keyPoints: ["Observe → question → test → conclude.", "Change one variable in fair tests."], check: { prompt: "Living things need…", options: ["Energy and water", "Only TV", "Nothing", "Plastic only"], correctAnswer: "Energy and water", explanation: "Life needs fuel and water." } },
    { keyPoints: ["Producers, consumers, decomposers.", "Food chains show energy flow."], check: { prompt: "Plants make food by…", options: ["Photosynthesis", "Sleeping", "Magnetism", "Friction"], correctAnswer: "Photosynthesis", explanation: "Light energy → glucose." } },
    { keyPoints: ["Gravity pulls mass together.", "Friction opposes sliding."], check: { prompt: "Friction…", options: ["Opposes motion", "Speeds all objects", "Only in space", "Creates mass"], correctAnswer: "Opposes motion", explanation: "Rub surfaces to feel it." } },
    { keyPoints: ["Properties guide material choice.", "Particle model explains states of matter."], check: { prompt: "Day and night come from…", options: ["Earth rotating", "Moon vanishing", "Clouds only", "Seasons only"], correctAnswer: "Earth rotating", explanation: "Rotation cycles light." } },
  ],
  history: [
    { keyPoints: ["Earlier ← → later on timelines.", "Centuries group 100 years."], check: { prompt: "Timelines show…", options: ["Order of events", "Only colours", "Weather tomorrow", "Maths rules"], correctAnswer: "Order of events", explanation: "Chronology matters." } },
    { keyPoints: ["Primary = from the time.", "Secondary = later interpretation."], check: { prompt: "A diary from 1914 is…", options: ["Primary", "Secondary", "Fiction", "A map key"], correctAnswer: "Primary", explanation: "Contemporary evidence." } },
    { keyPoints: ["Technology, work, and cities changed.", "Weigh benefits and costs of change."], check: { prompt: "Factories increased…", options: ["Urban jobs", "Dinosaur numbers", "Moon distance", "Ocean salt"], correctAnswer: "Urban jobs", explanation: "Industrial shift to cities." } },
    { keyPoints: ["PEEL: Point, Evidence, Explain, Link.", "Cite sources in essays."], check: { prompt: "Historians need…", options: ["Evidence", "Only opinions", "No dates", "Random guesses"], correctAnswer: "Evidence", explanation: "Claims require proof." } },
  ],
  geography: [
    { keyPoints: ["Keys, scale, compass, grid refs.", "Maps are simplified models."], check: { prompt: "Map scale shows…", options: ["Real distance", "Cooking time", "Animal speed", "Word count"], correctAnswer: "Real distance", explanation: "Scale converts map to ground." } },
    { keyPoints: ["Weather = short term.", "Climate = long term pattern."], check: { prompt: "Evaporation is…", options: ["Liquid to vapour", "Rock formation", "Earthquake", "Tidal moon"], correctAnswer: "Liquid to vapour", explanation: "Part of water cycle." } },
    { keyPoints: ["Push and pull factors in migration.", "Density varies globally."], check: { prompt: "Cities often grow near…", options: ["Rivers and trade routes", "Only deserts", "Deep ocean", "Space"], correctAnswer: "Rivers and trade routes", explanation: "Water and transport attract settlement." } },
    { keyPoints: ["Renewables vs finite resources.", "Local choices link globally."], check: { prompt: "Solar power is…", options: ["Renewable", "Always finite coal", "A map symbol", "A history date"], correctAnswer: "Renewable", explanation: "Sunlight replenishes." } },
  ],
  "health-wellbeing": [
    { keyPoints: ["Balanced food, water, sleep.", "Routines support growing brains."], check: { prompt: "Balanced meals include…", options: ["Variety of groups", "Only sugar", "No water", "Skipping breakfast always"], correctAnswer: "Variety of groups", explanation: "Fuel and nutrients matter." } },
    { keyPoints: ["Movement lifts mood and focus.", "Mix cardio and strength safely."], check: { prompt: "Exercise can improve…", options: ["Mood", "Shoe colour only", "Gravity", "Calendar month"], correctAnswer: "Mood", explanation: "Activity supports wellbeing." } },
    { keyPoints: ["Sleep consolidates learning.", "Screen free wind-down helps."], check: { prompt: "Teens often need…", options: ["8 to 10 hours sleep", "2 hours only", "No sleep", "Only naps"], correctAnswer: "8 to 10 hours sleep", explanation: "Growth and memory need rest." } },
    { keyPoints: ["Talk to trusted adults.", "UK: Childline 0800 1111."], check: { prompt: "If worried, you should…", options: ["Talk to someone trusted", "Stay silent always", "Ignore feelings", "Only post online"], correctAnswer: "Talk to someone trusted", explanation: "Support helps early." } },
  ],
  "digital-skills": [
    { keyPoints: ["Strong unique passwords.", "Tell adults about bullying."], check: { prompt: "Never share…", options: ["Passwords", "Homework titles", "Your favourite subject", "Lesson names"], correctAnswer: "Passwords", explanation: "Credentials stay private." } },
    { keyPoints: ["CRAAP for websites.", "Compare multiple sources."], check: { prompt: "CRAAP checks…", options: ["Source quality", "Cooking heat", "Football scores", "Video length"], correctAnswer: "Source quality", explanation: "Currency, Relevance, Authority, Accuracy, Purpose." } },
    { keyPoints: ["One idea per slide.", "Accessible colours and alt text."], check: { prompt: "Good slides use…", options: ["Clear headings", "Tiny paragraphs", "50 animations", "No structure"], correctAnswer: "Clear headings", explanation: "Clarity helps audience." } },
    { keyPoints: ["Touch typing saves time.", "Accessibility tools include everyone."], check: { prompt: "Accessibility helps…", options: ["Different learning needs", "Nobody", "Only hackers", "Deleting files"], correctAnswer: "Different learning needs", explanation: "Inclusive design matters." } },
  ],
  "career-skills": [
    {
      keyPoints: ["Listen before speaking.", "Confirm next steps in writing."],
      check: { prompt: "Professional tone means…", options: ["Clear and polite", "All slang", "ALL CAPS", "No greeting"], correctAnswer: "Clear and polite", explanation: "Respectful clarity builds trust." },
    },
    {
      keyPoints: ["Meet deadlines.", "Share credit with teammates."],
      check: { prompt: "Good teamwork includes…", options: ["Flagging blockers early", "Hiding problems", "Missing deadlines", "Ignoring others"], correctAnswer: "Flagging blockers early", explanation: "Early warnings help the team adapt." },
    },
    {
      keyPoints: ["Revenue minus costs = profit.", "Every role affects the bottom line."],
      check: { prompt: "Profit is…", options: ["Revenue minus costs", "Only revenue", "Only costs", "Random luck"], correctAnswer: "Revenue minus costs", explanation: "Profit shows sustainable business health." },
    },
    {
      keyPoints: ["Feedback is data, not failure.", "Skills grow with practice."],
      check: { prompt: "Growth mindset means…", options: ["Skills improve with effort", "Talent never changes", "Avoid all feedback", "Quit when stuck"], correctAnswer: "Skills improve with effort", explanation: "Effort and feedback drive improvement." },
    },
  ],
};

export function enrichStudyGuideSections(
  subjectSlug: string,
  sections: StudyGuideSection[],
): StudyGuideSection[] {
  const enrichments = GUIDE_ENRICHMENTS[subjectSlug];
  if (!enrichments) return sections;

  return sections.map((section, i) => ({
    ...section,
    keyPoints: enrichments[i]?.keyPoints ?? section.keyPoints,
    check: enrichments[i]?.check ?? section.check,
  }));
}
