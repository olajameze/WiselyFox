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
  psychology: [
    { keyPoints: ["Evidence over labels.", "Mind and behaviour can be studied kindly."], check: { prompt: "Psychology uses…", options: ["Evidence", "Only gossip", "Magic only", "No questions"], correctAnswer: "Evidence", explanation: "Careful methods matter." } },
    { keyPoints: ["Retrieval practice strengthens memory.", "Sleep supports consolidation."], check: { prompt: "Active recall means…", options: ["Testing yourself", "Only highlighting", "Skipping review", "Avoiding sleep"], correctAnswer: "Testing yourself", explanation: "Retrieval builds memory." } },
    { keyPoints: ["Attention is limited.", "Short focus blocks help many learners."], check: { prompt: "A helpful focus habit is…", options: ["Short calm blocks", "Never resting", "All-night cramming only", "Ignoring distractions forever"], correctAnswer: "Short calm blocks", explanation: "Attention needs breaks." } },
    { keyPoints: ["Slow down for important choices.", "Check more than one source."], check: { prompt: "Bias can…", options: ["Affect judgment", "Never appear", "Replace evidence", "Delete memory"], correctAnswer: "Affect judgment", explanation: "Awareness improves decisions." } },
  ],
  philosophy: [
    { keyPoints: ["Clear questions open inquiry.", "Definitions matter."], check: { prompt: "Philosophy often starts with…", options: ["Clear questions", "Only insults", "Ignoring reasons", "Random shouting"], correctAnswer: "Clear questions", explanation: "Questions frame thinking." } },
    { keyPoints: ["Give reasons for claims.", "Consider other views calmly."], check: { prompt: "A strong argument needs…", options: ["Reasons", "Only volume", "No evidence", "Ignoring others"], correctAnswer: "Reasons", explanation: "Reasons support claims." } },
    { keyPoints: ["Knowledge claims need justification.", "Uncertainty can be honest."], check: { prompt: "Saying 'I might be wrong' can be…", options: ["Intellectual honesty", "Always weakness", "Proof of failure", "Ignoring truth"], correctAnswer: "Intellectual honesty", explanation: "Humility aids inquiry." } },
    { keyPoints: ["Values can conflict.", "Explain trade-offs carefully."], check: { prompt: "Ethics weighs…", options: ["Values in real choices", "Only fashion", "Random noise", "No consequences"], correctAnswer: "Values in real choices", explanation: "Ethics is practical." } },
  ],
  sociology: [
    { keyPoints: ["Groups shape norms.", "Belonging affects behaviour."], check: { prompt: "A social norm is…", options: ["An expected group behaviour", "A type of rock", "Only a maths rule", "Weather"], correctAnswer: "An expected group behaviour", explanation: "Norms guide groups." } },
    { keyPoints: ["Avoid stereotypes.", "Use evidence about access and fairness."], check: { prompt: "Sociology studies…", options: ["Groups and social life", "Only atoms", "Only planets", "Magic"], correctAnswer: "Groups and social life", explanation: "Society is the focus." } },
    { keyPoints: ["Institutions organise roles.", "Rules can help or harm."], check: { prompt: "Schools are an example of…", options: ["An institution", "A planet", "An atom", "A password"], correctAnswer: "An institution", explanation: "Institutions structure life." } },
    { keyPoints: ["Ask who benefits from a rule.", "Evidence beats assumptions."], check: { prompt: "Fairness questions ask about…", options: ["Access and respect", "Only shoe size", "Ignoring people", "Deleting rules always"], correctAnswer: "Access and respect", explanation: "Fairness is social." } },
  ],
  economics: [
    { keyPoints: ["Resources are limited.", "Choices have opportunity costs."], check: { prompt: "Scarcity means…", options: ["Resources are limited", "Everything is free", "No choices exist", "Prices never change"], correctAnswer: "Resources are limited", explanation: "Limits force trade-offs." } },
    { keyPoints: ["Prices signal demand and supply.", "Incentives shape behaviour."], check: { prompt: "Opportunity cost is…", options: ["The next best option given up", "A free gift", "Only tax", "A coin type"], correctAnswer: "The next best option given up", explanation: "Trade-offs have costs." } },
    { keyPoints: ["Budgets plan income and spending.", "Trade creates mutual gains when fair."], check: { prompt: "A budget tracks…", options: ["Income and spending", "Only wishes", "Weather", "Homework titles"], correctAnswer: "Income and spending", explanation: "Budgets organise money." } },
    { keyPoints: ["Inflation raises general prices.", "Read economic claims carefully."], check: { prompt: "Inflation usually means prices…", options: ["Rise over time", "Fall forever", "Never change", "Disappear"], correctAnswer: "Rise over time", explanation: "General price level rises." } },
  ],
  astronomy: [
    { keyPoints: ["Earth rotates for day and night.", "Stars are distant suns."], check: { prompt: "Day and night happen because…", options: ["Earth rotates", "The Sun turns off", "Clouds delete the Moon", "Stars sink underground"], correctAnswer: "Earth rotates", explanation: "Rotation cycles light." } },
    { keyPoints: ["Moon phases come from sunlight angles.", "Orbit changes what we see."], check: { prompt: "Moon phases are caused by…", options: ["Changing sunlight angles", "The Moon melting", "Earth shrinking", "Paint on the Moon"], correctAnswer: "Changing sunlight angles", explanation: "Light and position matter." } },
    { keyPoints: ["Planets orbit the Sun.", "Scale models help, but simplify."], check: { prompt: "Earth orbits…", options: ["The Sun", "The Moon only", "A nearby star other than the Sun", "Nothing"], correctAnswer: "The Sun", explanation: "Solar system centre for planets." } },
    { keyPoints: ["Gravity shapes orbits.", "Evidence comes from observation and maths."], check: { prompt: "A light-year measures…", options: ["Distance", "Time of day only", "Temperature", "Mass of Earth only"], correctAnswer: "Distance", explanation: "How far light travels in a year." } },
  ],
  "artificial-intelligence": [
    { keyPoints: ["AI learns patterns from data.", "It is not magic and can be wrong."], check: { prompt: "AI systems mainly learn from…", options: ["Patterns in data", "Magic spells", "Guessing only", "Ignoring examples"], correctAnswer: "Patterns in data", explanation: "Machine learning uses data." } },
    { keyPoints: ["Supervised learning uses labels.", "Biased data can bias outputs."], check: { prompt: "Supervised learning uses…", options: ["Labelled examples", "No data", "Only rumours", "Random passwords"], correctAnswer: "Labelled examples", explanation: "Labels guide training." } },
    { keyPoints: ["Clear prompts help.", "Rewrite and verify answers."], check: { prompt: "A responsible AI habit is…", options: ["Checking facts and protecting privacy", "Sharing PINs with bots", "Trusting every answer", "Uploading private photos freely"], correctAnswer: "Checking facts and protecting privacy", explanation: "Verify and protect data." } },
    { keyPoints: ["Protect privacy.", "Ask consent before uploading people."], check: { prompt: "Confident AI answers…", options: ["Can still be wrong", "Are always perfect", "Never need checking", "Replace all teachers"], correctAnswer: "Can still be wrong", explanation: "Humans verify important claims." } },
  ],
  robotics: [
    { keyPoints: ["Sense, decide, act.", "People design robots."], check: { prompt: "A robot typically…", options: ["Senses, decides, and acts", "Only prints paper", "Never uses sensors", "Is always human"], correctAnswer: "Senses, decides, and acts", explanation: "Sense-decide-act defines robotics." } },
    { keyPoints: ["Sensors measure the world.", "Actuators create movement."], check: { prompt: "An actuator…", options: ["Creates movement or force", "Only stores photos", "Blocks all sensors", "Deletes programs"], correctAnswer: "Creates movement or force", explanation: "Actuators move parts." } },
    { keyPoints: ["Test with clear steps.", "Include stop conditions."], check: { prompt: "Safe robot testing needs…", options: ["Clear steps and supervision", "No rules", "Ignoring parents", "Skipping stop conditions"], correctAnswer: "Clear steps and supervision", explanation: "Safety first." } },
    { keyPoints: ["Humans set goals and ethics.", "Responsibility stays with people."], check: { prompt: "People stay responsible for…", options: ["Goals and ethical use of robots", "Nothing at all", "Only paint colour", "Ignoring errors"], correctAnswer: "Goals and ethical use of robots", explanation: "Humans set purpose and limits." } },
  ],
  english: [
    { keyPoints: ["Find the main idea.", "Details support the point."], check: { prompt: "The main idea is…", options: ["The big point of a text", "Only the last word", "A random detail", "The author's birthday"], correctAnswer: "The big point of a text", explanation: "Main idea is the core message." } },
    { keyPoints: ["Subject + verb builds clarity.", "Punctuation guides readers."], check: { prompt: "A clear sentence usually needs…", options: ["A subject and a verb", "Only emojis", "No punctuation ever", "Twenty clauses"], correctAnswer: "A subject and a verb", explanation: "Subject + verb builds clarity." } },
    { keyPoints: ["One idea per paragraph.", "Plan before drafting."], check: { prompt: "One paragraph should usually…", options: ["Develop one idea", "Cover ten unrelated topics", "Avoid evidence", "Skip a topic sentence always"], correctAnswer: "Develop one idea", explanation: "One idea per paragraph." } },
    { keyPoints: ["Know your speaking purpose.", "Listen as carefully as you speak."], check: { prompt: "Purposeful speaking starts with…", options: ["Knowing your goal", "Speaking as fast as possible", "Ignoring listeners", "Never practising"], correctAnswer: "Knowing your goal", explanation: "Purpose guides the talk." } },
  ],
  geometry: [
    { keyPoints: ["Name shape properties.", "Sketch before calculating."], check: { prompt: "Perimeter measures…", options: ["Distance around a shape", "Space inside only", "Temperature", "Speed"], correctAnswer: "Distance around a shape", explanation: "Perimeter goes around." } },
    { keyPoints: ["Add all outer sides for perimeter.", "Keep units consistent."], check: { prompt: "Area of a rectangle is…", options: ["Length times width", "Length plus width", "Only the diagonal", "Perimeter squared"], correctAnswer: "Length times width", explanation: "A = l × w." } },
    { keyPoints: ["Triangle area = ½bh.", "State square units."], check: { prompt: "Area of a triangle is…", options: ["Half base times height", "Base plus height", "Base times height times 2", "Perimeter only"], correctAnswer: "Half base times height", explanation: "A = ½bh." } },
    { keyPoints: ["Diameter = 2 × radius.", "Keep π clear in working."], check: { prompt: "Diameter is…", options: ["Twice the radius", "Half the radius", "Equal to area", "Always π"], correctAnswer: "Twice the radius", explanation: "d = 2r." } },
  ],
  statistics: [
    { keyPoints: ["Fair samples represent the group.", "Clear questions reduce bias."], check: { prompt: "A fair sample…", options: ["Represents the group studied", "Only includes friends", "Ignores the question", "Has zero people"], correctAnswer: "Represents the group studied", explanation: "Representation matters." } },
    { keyPoints: ["Mean averages; median is middle; mode is most common."], check: { prompt: "The median is…", options: ["The middle value when ordered", "Always the largest", "Never useful", "Only for words"], correctAnswer: "The middle value when ordered", explanation: "Order then pick middle." } },
    { keyPoints: ["Read axes and units first.", "Scales can change the story."], check: { prompt: "The mean is…", options: ["The average of the values", "The most common value", "The middle always", "A chart title"], correctAnswer: "The average of the values", explanation: "Add and divide for mean." } },
    { keyPoints: ["Correlation ≠ causation.", "State uncertainty honestly."], check: { prompt: "Correlation…", options: ["Does not always mean causation", "Always proves cause", "Means data is fake", "Removes all charts"], correctAnswer: "Does not always mean causation", explanation: "Be careful with cause claims." } },
  ],
  biology: [
    { keyPoints: ["Cells are life's building blocks.", "Observe living characteristics."], check: { prompt: "Cells are…", options: ["Basic units of life", "Only rocks", "Never in plants", "Only computers"], correctAnswer: "Basic units of life", explanation: "Life is cellular." } },
    { keyPoints: ["Photosynthesis captures light energy.", "Food chains transfer energy."], check: { prompt: "Photosynthesis mainly happens in…", options: ["Plants and some other producers", "Only metals", "Only clouds", "Never with light"], correctAnswer: "Plants and some other producers", explanation: "Producers capture light energy." } },
    { keyPoints: ["Respiration releases usable energy.", "Systems work together."], check: { prompt: "ATP is important because…", options: ["It carries usable energy in cells", "It replaces food forever", "It is a type of rock", "It stops respiration"], correctAnswer: "It carries usable energy in cells", explanation: "ATP fuels cell work." } },
    { keyPoints: ["Ecosystems include living and non-living parts.", "Changes can ripple."], check: { prompt: "An ecosystem includes…", options: ["Living and non-living parts", "Only one animal", "Only weather apps", "No interactions"], correctAnswer: "Living and non-living parts", explanation: "Ecosystems are connected systems." } },
  ],
  chemistry: [
    { keyPoints: ["Elements are one atom type.", "The periodic table organises them."], check: { prompt: "An element contains…", options: ["One type of atom", "Any random mixture", "Only light", "No atoms"], correctAnswer: "One type of atom", explanation: "Elements are pure atom types." } },
    { keyPoints: ["Compounds have fixed ratios.", "Mixtures can often be separated."], check: { prompt: "A mixture…", options: ["Can often be separated physically", "Always explodes", "Has no substances", "Is always one atom"], correctAnswer: "Can often be separated physically", explanation: "Mixtures keep separable parts." } },
    { keyPoints: ["Reactions rearrange atoms.", "Mass is conserved in closed systems."], check: { prompt: "In a closed chemical reaction, mass…", options: ["Is conserved", "Always doubles", "Disappears", "Becomes energy only with no matter"], correctAnswer: "Is conserved", explanation: "Atoms rearrange; mass holds." } },
    { keyPoints: ["Safety and supervision first.", "Never taste unknown chemicals."], check: { prompt: "In a lab you should…", options: ["Follow safety rules with supervision", "Taste unknown chemicals", "Ignore eye protection", "Mix everything quickly"], correctAnswer: "Follow safety rules with supervision", explanation: "Safety first." } },
  ],
  physics: [
    { keyPoints: ["Speed is distance ÷ time.", "Use units."], check: { prompt: "Speed is…", options: ["Distance divided by time", "Only direction", "Force times mass always", "A type of energy store"], correctAnswer: "Distance divided by time", explanation: "s = d/t." } },
    { keyPoints: ["Forces push or pull.", "Unbalanced forces change motion."], check: { prompt: "An unbalanced force…", options: ["Changes an object's motion", "Does nothing ever", "Removes gravity forever", "Stops time"], correctAnswer: "Changes an object's motion", explanation: "Net force accelerates." } },
    { keyPoints: ["Energy transfers and transforms.", "It is conserved in closed systems."], check: { prompt: "Energy in a closed system…", options: ["Is conserved", "Appears from nowhere", "Vanishes completely", "Is only light"], correctAnswer: "Is conserved", explanation: "Energy transforms and transfers." } },
    { keyPoints: ["Graphs show motion patterns.", "Label axes clearly."], check: { prompt: "A flat distance-time graph means…", options: ["No change in position", "Maximum acceleration", "Infinite speed", "Negative mass"], correctAnswer: "No change in position", explanation: "Flat means stationary." } },
  ],
  computing: [
    { keyPoints: ["Hardware is physical; software is code.", "Both are needed."], check: { prompt: "Software is…", options: ["Instructions programs run", "Only the keyboard", "Always a cable", "Never code"], correctAnswer: "Instructions programs run", explanation: "Software is code." } },
    { keyPoints: ["Algorithms are step-by-step methods.", "Test with small examples."], check: { prompt: "An algorithm is…", options: ["A step-by-step method", "A random guess", "Only a photo", "A type of battery"], correctAnswer: "A step-by-step method", explanation: "Algorithms are procedures." } },
    { keyPoints: ["The internet is a network of networks.", "Trust choices matter."], check: { prompt: "The internet is…", options: ["A network of networks", "One single cable in one house", "Only social apps", "Never about addresses"], correctAnswer: "A network of networks", explanation: "Many networks interconnect." } },
    { keyPoints: ["Databases organise records.", "Protect personal data."], check: { prompt: "Databases help by…", options: ["Organising records for search and update", "Deleting all files randomly", "Replacing electricity", "Blocking learning"], correctAnswer: "Organising records for search and update", explanation: "Structured data is searchable." } },
  ],
  cybersecurity: [
    { keyPoints: ["Pause on odd messages.", "Phishing tricks people."], check: { prompt: "Phishing tries to…", options: ["Trick you into sharing secrets", "Improve your sleep", "Fix grammar", "Water plants"], correctAnswer: "Trick you into sharing secrets", explanation: "Phishing is social engineering." } },
    { keyPoints: ["Unique passwords + MFA.", "Never share codes."], check: { prompt: "MFA means…", options: ["An extra login check beyond a password", "Sharing passwords widely", "Turning off updates", "Posting PINs publicly"], correctAnswer: "An extra login check beyond a password", explanation: "Multiple factors protect accounts." } },
    { keyPoints: ["Share less by default.", "Review permissions."], check: { prompt: "A good privacy habit is…", options: ["Reviewing what you share and app permissions", "Posting home addresses often", "Ignoring settings", "Using the same password everywhere"], correctAnswer: "Reviewing what you share and app permissions", explanation: "Minimise and review." } },
    { keyPoints: ["Tell a trusted adult.", "Secure accounts calmly."], check: { prompt: "After a suspected hack…", options: ["Tell a trusted adult and secure accounts", "Ignore it forever", "Share recovery codes online", "Delete evidence always without help"], correctAnswer: "Tell a trusted adult and secure accounts", explanation: "Report and secure." } },
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
