import type { CurriculumLesson, CurriculumQuestion, LessonStep } from "./curriculum";

/**
 * Age-band fills and deeper STEM/extended content merged at seed time.
 * Ensures every listed subject band has real lessons, and expands thin subjects.
 */

function L(
  slug: string,
  title: string,
  ageBand: string,
  difficulty: number,
  durationMinutes: number,
  warm: string,
  learn: string,
  practice: string,
  review: string,
): CurriculumLesson {
  const steps: LessonStep[] = [
    { title: "Warm up", content: warm, tip: "Take a calm breath and begin." },
    { title: "Learn", content: learn, tip: "Pause and note one clear idea.", method: "watch" },
    { title: "Practice", content: practice, tip: "Show your thinking.", method: "practice" },
    { title: "Review", content: review, tip: "Share one takeaway with a parent.", method: "discuss" },
  ];
  return { slug, title, ageBand, difficulty, durationMinutes, steps };
}

function Q(
  prompt: string,
  correctAnswer: string,
  options: string[],
  explanation: string,
  difficulty: number,
  ageBand: string,
): CurriculumQuestion {
  return { prompt, options, correctAnswer, explanation, difficulty, ageBand };
}

type Pack = { lessons: CurriculumLesson[]; questions: CurriculumQuestion[] };

export const CURRICULUM_DEPTH: Record<string, Pack> = {
  maths: {
    lessons: [
      L("counting-to-twenty", "Counting to 20", "5-7", 1, 12, "Can you count your fingers and toes?", "Numbers tell how many. Practice counting objects one by one without skipping.", "Count 12 toys or crayons out loud.", "Careful counting builds number sense."),
      L("simple-shapes-maths", "Shapes around us", "5-7", 1, 11, "Find a circle in the room.", "Circles, squares, and triangles are shapes. Counting sides helps you name them.", "Draw one circle, one square, and one triangle.", "Shapes are maths you can see."),
      L("doubling-halving", "Doubling and halving", "5-7", 1, 12, "What is double 2?", "Double means twice as many. Half means split into two equal groups.", "What is half of 8? Use counters if you like.", "Doubling and halving are early multiplication ideas."),
      L("percentages-everyday", "Percentages in everyday life", "14-16", 3, 15, "What does 50% mean?", "Percent means per hundred. Discounts, scores, and interest use percentages.", "Find 20% of £50.", "Percentages compare parts of a whole."),
      L("maths-study-habits", "Maths study habits", "20-23", 3, 14, "When do you learn maths best?", "Short practice, checking work, and explaining steps aloud strengthen adult maths fluency.", "Plan three 20-minute maths sessions this week.", "Habits beat cramming."),
    ],
    questions: [
      Q("How many sides does a triangle have?", "3", ["2", "3", "4", "5"], "Tri means three.", 1, "5-7"),
      Q("Double 4 is…", "8", ["6", "7", "8", "10"], "4 + 4 = 8.", 1, "5-7"),
      Q("20% of 50 is…", "10", ["5", "10", "20", "40"], "0.2 × 50 = 10.", 3, "14-16"),
    ],
  },
  reading: {
    lessons: [
      L("letter-sounds-play", "Letter sounds play", "5-7", 1, 11, "What sound does B make?", "Letters stand for sounds. Blending sounds helps you read new words.", "Blend c-a-t and say the word.", "Sounds build words."),
      L("story-sequence", "Story order", "5-7", 1, 12, "What happened first in a story you know?", "Stories have a beginning, middle, and end. Order helps you understand.", "Retell a short story in three steps.", "Sequence keeps stories clear."),
      L("reading-for-college", "Reading denser texts", "20-23", 3, 15, "How do you mark a tough paragraph?", "Annotate claims, evidence, and questions. Summarise each section in one sentence.", "Annotate one page of a non-fiction text.", "Active reading supports study and work."),
    ],
    questions: [
      Q("Stories usually have…", "A beginning, middle, and end", ["Only a title", "A beginning, middle, and end", "No order", "Only pictures"], "Sequence aids understanding.", 1, "5-7"),
      Q("Blending means…", "Putting sounds together", ["Putting sounds together", "Skipping letters", "Only drawing", "Deleting words"], "Blend sounds to read.", 1, "5-7"),
    ],
  },
  science: {
    lessons: [
      L("senses-observe", "Using your senses to observe", "5-7", 1, 12, "What can you see and hear right now?", "Scientists observe carefully. Use eyes, ears, and safe touch with a parent.", "Describe an apple using three senses.", "Observation is the start of science."),
      L("living-or-not", "Living or not living?", "5-7", 1, 11, "Is a rock alive?", "Living things grow, need food or energy, and respond. Non-living things do not.", "Sort five objects into living and non-living.", "Sorting trains scientific thinking."),
      L("weather-watch", "Weather watch", "5-7", 1, 11, "Is it sunny, cloudy, or rainy today?", "Weather changes day to day. Recording weather helps you notice patterns.", "Draw today's weather and write one word for it.", "Records turn noticing into science."),
      L("science-careers-intro", "Science in real jobs", "20-23", 3, 14, "Where have you seen science at work?", "Labs, hospitals, farms, and climate work use scientific methods and careful data.", "Name two science-related roles and one skill each needs.", "Science skills transfer to many careers."),
      L("experimental-design", "Experimental design", "17-19", 3, 15, "What makes a test fair?", "Control variables, repeat measurements, and record uncertainty. Good design supports stronger conclusions.", "Design a fair test for plant growth with one changed variable.", "Fair tests build trust in results."),
    ],
    questions: [
      Q("A good observation is…", "Careful and specific", ["Careful and specific", "A random guess", "Always wrong", "Only shouting"], "Scientists notice details.", 1, "5-7"),
      Q("A living thing usually…", "Grows and needs energy", ["Grows and needs energy", "Never changes", "Is always metal", "Has no needs"], "Life needs energy and growth.", 1, "5-7"),
      Q("A fair experiment usually changes…", "One variable", ["One variable", "Every variable at once", "Nothing measurable", "Only the title"], "Isolate cause and effect.", 3, "17-19"),
    ],
  },
  "health-wellbeing": {
    lessons: [
      L("washing-hands", "Washing hands well", "5-7", 1, 10, "When should you wash your hands?", "Soap and water clean away germs before eating and after the toilet.", "Practice washing for about 20 seconds with a parent.", "Clean hands protect you and others."),
      L("feelings-words", "Naming feelings", "5-7", 1, 11, "How do you feel today?", "Happy, sad, angry, and calm are feeling words. Naming feelings helps you ask for help.", "Draw a face for happy and a face for calm.", "Feelings are okay to talk about."),
      L("moving-bodies", "Moving every day", "5-7", 1, 10, "What is your favourite way to move?", "Running, stretching, and playing help bodies stay strong and minds feel better.", "Do 10 star jumps or a short stretch with a parent.", "Daily movement is a healthy habit."),
      L("teen-wellbeing-balance", "Balance for teens", "17-19", 3, 14, "What drains your energy most?", "Sleep, movement, friendships, and boundaries support wellbeing during exam years.", "Plan a balanced week with study, rest, and movement.", "Balance is a skill."),
      L("adult-stress-basics", "Managing stress as a young adult", "20-23", 3, 14, "What stresses you most in a week?", "Sleep, movement, breaks, and talking to trusted people support stress management.", "Write a personal calm plan with three actions.", "Support and routines are strengths."),
    ],
    questions: [
      Q("Wash hands before…", "Eating", ["Eating", "Only sleeping", "Never", "Watching TV only"], "Clean hands before food.", 1, "5-7"),
      Q("Naming a feeling can help you…", "Ask for help", ["Ask for help", "Hide forever", "Skip sleep", "Ignore friends always"], "Words open support.", 1, "5-7"),
      Q("A balanced week usually includes…", "Rest and movement", ["Rest and movement", "Only all-night study", "No sleep", "Ignoring friends always"], "Rest supports learning.", 3, "17-19"),
    ],
  },
  coding: {
    lessons: [
      L("unplugged-sequences", "Unplugged sequences", "5-7", 1, 12, "Can you give steps to make a sandwich?", "Coding starts with clear steps in order. Computers follow instructions carefully.", "Write 4 steps to tidy toys.", "Order matters in instructions."),
      L("debugging-kindly", "Finding mistakes kindly", "5-7", 1, 11, "What do you do if a step is wrong?", "Bugs are mistakes to fix, not something to fear. Check each step.", "Fix a silly recipe that says 'bake the eggs first' for toast.", "Calm checking finds bugs."),
    ],
    questions: [
      Q("Instructions should be…", "In a clear order", ["In a clear order", "Random", "Secret always", "Only pictures forever"], "Sequence matters.", 1, "5-7"),
    ],
  },
  money: {
    lessons: [
      L("coin-sorting", "Sorting coins", "5-7", 1, 11, "Can you spot a 1p and a 2p?", "Coins have different values. Sorting helps you learn what each is worth.", "With a parent, sort a few coins by value.", "Knowing coins builds money sense."),
      L("saving-jar", "A saving jar", "5-7", 1, 10, "What would you save for?", "Saving means keeping some money for later instead of spending it all now.", "Draw a jar and write one saving goal.", "Goals make saving meaningful."),
    ],
    questions: [
      Q("Saving means…", "Keeping some money for later", ["Keeping some money for later", "Spending everything now", "Throwing money away", "Ignoring goals"], "Save for later goals.", 1, "5-7"),
    ],
  },
  "study-skills": {
    lessons: [
      L("tidy-study-spot", "A tidy study spot", "5-7", 1, 10, "Where do you like to learn?", "A calm spot with light and your tools ready helps focus.", "Set up a small tidy learning space with a parent.", "Place supports focus."),
      L("short-practice", "Short practice wins", "5-7", 1, 10, "Can you focus for a short song?", "Little practice often is better than long tired practice.", "Practice one skill for 5 calm minutes.", "Short sessions build habits."),
    ],
    questions: [
      Q("A good study habit is…", "Short regular practice", ["Short regular practice", "Only all-night cramming", "Never reviewing", "Skipping sleep"], "Little and often works.", 1, "5-7"),
    ],
  },
  history: {
    lessons: [
      L("family-timeline", "My family timeline", "5-7", 1, 11, "Who is older, you or a parent?", "Timelines show what happened earlier and later.", "Put three family events in order with a parent.", "Order helps history."),
      L("history-and-citizenship", "History and citizenship", "20-23", 3, 14, "How does the past shape voting and rights today?", "Historical evidence helps explain institutions and rights. Check sources before sharing claims.", "Summarise one historical reform and its modern effect.", "Past evidence informs present citizenship."),
    ],
    questions: [
      Q("Earlier events go…", "Toward the start of a timeline", ["Toward the start of a timeline", "Nowhere", "Only in the future", "In random places"], "Timelines run earlier to later.", 1, "5-7"),
      Q("Good historical claims need…", "Evidence from sources", ["Evidence from sources", "Only rumours", "No dates", "Ignoring context"], "Evidence first.", 3, "20-23"),
    ],
  },
  geography: {
    lessons: [
      L("my-local-map", "My local map", "5-7", 1, 11, "What landmarks are near your home?", "Maps show places. Simple drawings can be maps too.", "Draw a map from home to school or a park.", "Maps help us navigate."),
      L("global-connections", "Global connections", "20-23", 3, 14, "How does trade link distant places?", "People, goods, and ideas connect places. Geography explains interdependence and impacts.", "Trace one everyday product from origin to you.", "Places are linked systems."),
    ],
    questions: [
      Q("A map helps you…", "Find places", ["Find places", "Cook dinner", "Sleep better always", "Skip all questions"], "Maps show location.", 1, "5-7"),
      Q("Interdependence means places…", "Rely on each other through links", ["Rely on each other through links", "Never trade", "Exist alone forever", "Ignore resources"], "Connections matter.", 3, "20-23"),
    ],
  },
  "digital-skills": {
    lessons: [
      L("kind-online", "Being kind online", "5-7", 1, 10, "How do kind words feel?", "Online, use kind words and tell a trusted adult if something feels wrong.", "Write one kind message you could send a friend.", "Kindness belongs online too."),
      L("screen-breaks", "Screen breaks", "5-7", 1, 10, "When do your eyes feel tired?", "Looking away and moving helps after screen time.", "Practice a 20-second look-away break.", "Breaks keep bodies comfortable."),
      L("digital-footprint-teens", "Your digital footprint", "17-19", 3, 14, "What stays online after you post?", "Public posts can last. Check privacy settings and think before sharing.", "Review privacy settings on one account with a parent.", "Footprints are lasting."),
    ],
    questions: [
      Q("If something online feels wrong…", "Tell a trusted adult", ["Tell a trusted adult", "Keep it secret always", "Share passwords", "Ignore forever"], "Adults can help.", 1, "5-7"),
      Q("A digital footprint is…", "What you leave online over time", ["What you leave online over time", "Only your shoe size", "A type of virus", "Never important"], "Posts can persist.", 3, "17-19"),
    ],
  },

  psychology: {
    lessons: [
      L("psychology-curious-minds", "Curious minds", "11-13", 2, 13, "What makes people curious?", "Psychology asks careful questions about thinking and behaviour without labelling people.", "Write two curious questions about how people learn.", "Curiosity plus evidence is psychology."),
      L("habits-and-cues", "Habits and cues", "11-13", 2, 13, "What cue starts a habit for you?", "Habits link cues, routines, and rewards. Changing the cue can change the habit.", "Map one habit: cue → routine → reward.", "Small cue changes help."),
      L("social-influence", "Social influence", "17-19", 3, 14, "When have peers influenced a choice?", "People are influenced by norms and groups. Noticing influence helps you choose thoughtfully.", "Describe one helpful and one unhelpful social influence.", "Awareness supports autonomy."),
      L("research-methods-lite", "Simple research ideas", "20-23", 3, 15, "What is a survey good for?", "Surveys, observations, and experiments answer different questions. Ethics and consent matter.", "Design a fair 3-question survey about study habits.", "Methods shape what you can claim."),
    ],
    questions: [
      Q("Psychology studies…", "Mind and behaviour with evidence", ["Mind and behaviour with evidence", "Only fashion", "Magic only", "Weather exclusively"], "Evidence-based study of people.", 2, "11-13"),
      Q("A habit loop often includes…", "Cue, routine, reward", ["Cue, routine, reward", "Only luck", "No triggers", "Skipping all practice"], "Cues start routines.", 2, "11-13"),
      Q("Ethical research needs…", "Consent and care for people", ["Consent and care for people", "Secret harm", "No questions", "Fake data"], "People come first.", 3, "20-23"),
    ],
  },
  philosophy: {
    lessons: [
      L("asking-good-questions", "Asking good questions", "11-13", 2, 13, "What is a question that has more than one answer?", "Philosophy asks clear questions about knowledge, fairness, and meaning.", "Write one philosophical question about fairness at school.", "Good questions open thinking."),
      L("reasons-and-evidence", "Reasons and evidence", "11-13", 2, 13, "How do you know a claim is strong?", "Strong arguments give reasons and consider other views calmly.", "Give two reasons for or against a school rule.", "Reasons beat shouting."),
      L("ethics-everyday", "Everyday ethics", "20-23", 3, 14, "When is honesty hardest?", "Ethics weighs values like honesty, kindness, and fairness in real choices.", "Describe a dilemma and two values in tension.", "Values guide careful decisions."),
    ],
    questions: [
      Q("Philosophy often starts with…", "Clear questions", ["Clear questions", "Only insults", "Ignoring reasons", "Random shouting"], "Questions frame inquiry.", 2, "11-13"),
      Q("A strong argument needs…", "Reasons", ["Reasons", "No evidence ever", "Only volume", "Ignoring others"], "Reasons support claims.", 2, "11-13"),
    ],
  },
  sociology: {
    lessons: [
      L("groups-and-belonging", "Groups and belonging", "11-13", 2, 13, "Which groups do you belong to?", "Sociology studies how groups, norms, and institutions shape everyday life.", "List three groups you belong to and one shared norm.", "Groups shape habits and identity."),
      L("fairness-in-society", "Fairness in society", "11-13", 2, 13, "What does fairness look like in a classroom?", "Sociologists ask who has access to resources and respect, using evidence not stereotypes.", "Write one fair and one unfair classroom rule example.", "Fairness can be studied carefully."),
      L("institutions-intro", "Institutions around us", "20-23", 3, 14, "Name an institution that affects your week.", "Schools, media, and workplaces are institutions with rules and roles.", "Explain how one institution shapes a daily routine.", "Institutions organise social life."),
    ],
    questions: [
      Q("Sociology studies…", "Groups and social life", ["Groups and social life", "Only atoms", "Only planets", "Magic spells"], "Society and groups.", 2, "11-13"),
      Q("A social norm is…", "An expected way to behave in a group", ["An expected way to behave in a group", "A type of rock", "A maths formula only", "A weather report"], "Norms guide behaviour.", 2, "11-13"),
    ],
  },
  economics: {
    lessons: [
      L("scarcity-basics", "Scarcity basics", "11-13", 2, 13, "Why can't we have everything we want?", "Scarcity means limited resources. Choices have opportunity costs.", "Name a choice you made and what you gave up.", "Every choice has a trade-off."),
      L("markets-prices", "Markets and prices", "11-13", 2, 13, "Why might a popular toy cost more?", "Prices signal demand and supply. When many want something scarce, prices often rise.", "Explain why ice cream might cost more on a hot day at a busy stall.", "Prices carry information."),
      L("personal-finance-macro", "Personal choices and the wider economy", "20-23", 3, 15, "How do interest rates affect borrowing?", "Household choices link to jobs, prices, and interest. Read claims carefully.", "List two ways inflation could affect a weekly budget.", "Macro ideas meet daily money."),
    ],
    questions: [
      Q("Scarcity means…", "Resources are limited", ["Resources are limited", "Everything is free forever", "No choices exist", "Prices never change"], "Limits force trade-offs.", 2, "11-13"),
      Q("Opportunity cost is…", "The next best option you give up", ["The next best option you give up", "A free gift", "Only tax", "A type of coin"], "Trade-offs have costs.", 2, "11-13"),
    ],
  },
  astronomy: {
    lessons: [
      L("day-and-night-sky", "Day and night sky", "8-10", 1, 12, "Why does the sky look different at night?", "Earth turns, so day and night change what we see. Stars are suns very far away.", "Draw day sky and night sky side by side.", "Earth's rotation shapes the sky we see."),
      L("moon-shapes", "Moon shapes", "8-10", 1, 12, "Have you seen a crescent moon?", "The Moon's lit shape changes as it orbits Earth. We call these phases.", "Keep a 3-night moon sketch diary with a parent.", "Phases are about light and position."),
      L("scale-of-space", "The scale of space", "17-19", 3, 15, "How far is a light-year conceptually?", "Space distances are huge. Models and analogies help, but they simplify.", "Compare Earth–Sun distance to a scaled model with a parent.", "Scale needs careful models."),
      L("space-science-careers", "Space science pathways", "20-23", 3, 14, "What skills help space science?", "Astronomy uses physics, coding, and careful data. Many roles support missions on Earth.", "List two space-related roles and a skill for each.", "Curiosity plus maths opens doors."),
    ],
    questions: [
      Q("Day and night happen because…", "Earth rotates", ["Earth rotates", "The Sun turns off", "Clouds delete the Moon", "Stars move into the ground"], "Rotation cycles light.", 1, "8-10"),
      Q("Moon phases are caused by…", "Changing angles of sunlight", ["Changing angles of sunlight", "The Moon melting", "Earth shrinking", "Clouds painting the Moon"], "Light and orbit create phases.", 1, "8-10"),
    ],
  },

  "artificial-intelligence": {
    lessons: [
      L("ai-around-you", "AI around you", "8-10", 1, 12, "Does a video app suggest what to watch next?", "Some apps use AI to suggest content. AI can be helpful, but a person should still choose.", "List two apps that make suggestions.", "Suggestions are not orders."),
      L("ai-not-magic", "AI is not magic", "8-10", 1, 12, "Can a computer be wrong?", "AI learns patterns from examples. It can make mistakes, so check important answers.", "Tell a parent one thing AI might get wrong.", "Humans check AI."),
      L("prompt-practice", "Clear prompts", "17-19", 3, 14, "What makes a prompt clear?", "State the goal, audience, and constraints. Then verify facts yourself.", "Write a prompt that asks for a 5-bullet summary of photosynthesis for age 11.", "Clear prompts improve usefulness."),
      L("ai-at-work-study", "AI for study and work", "20-23", 3, 15, "When is AI a helper vs a shortcut that skips learning?", "Use AI to draft, quiz, or explain, then rewrite and cite per rules.", "Create a personal AI use policy with three rules.", "Integrity keeps learning real."),
    ],
    questions: [
      Q("AI suggestions…", "Can be helpful but may be wrong", ["Can be helpful but may be wrong", "Are always perfect", "Never use data", "Replace parents"], "Verify important answers.", 1, "8-10"),
      Q("A clear prompt includes…", "Goal and constraints", ["Goal and constraints", "Only emojis", "Your passwords", "No topic"], "Specific prompts work better.", 3, "17-19"),
    ],
  },
  robotics: {
    lessons: [
      L("robots-helpers", "Robots that help", "8-10", 1, 12, "Have you seen a robot vacuum?", "Some robots help with chores or factory work. People design and control them.", "Draw a helpful robot and label what it does.", "Robots are tools people design."),
      L("sense-decide-act-kids", "Sense, decide, act", "8-10", 1, 12, "How does a robot know a wall is near?", "Sensors help robots sense. Programs help them decide. Motors help them act.", "Act out sense-decide-act with a simple obstacle game.", "Three steps make a robot loop."),
      L("robot-design-brief", "Robot design brief", "17-19", 3, 15, "What problem could a robot solve safely?", "Good design starts with users, safety, and clear success measures.", "Write a one-page design brief for a classroom tidy robot.", "Safety and purpose first."),
      L("automation-ethics", "Automation ethics", "20-23", 3, 14, "Who is responsible if a robot errs?", "People remain accountable for goals, testing, and oversight.", "Debate one benefit and one risk of warehouse robots.", "Ethics guides automation."),
    ],
    questions: [
      Q("Robots are…", "Machines people design to sense and act", ["Machines people design to sense and act", "Always alive", "Never programmed", "Only toys with no purpose"], "People design robots.", 1, "8-10"),
      Q("Sensors help a robot…", "Notice the world", ["Notice the world", "Ignore obstacles", "Delete code", "Skip safety"], "Sensing enables response.", 1, "8-10"),
    ],
  },
  english: {
    lessons: [
      L("word-families", "Word families", "5-7", 1, 11, "What words rhyme with cat?", "Word families share patterns that help reading and spelling.", "List four words in the -at family.", "Patterns unlock many words."),
      L("describing-words", "Describing words", "5-7", 1, 11, "How would you describe a sunny day?", "Adjectives describe nouns and make writing clearer.", "Write two sentences with a describing word in each.", "Details paint pictures."),
      L("formal-tone", "Formal tone", "17-19", 3, 14, "When should writing sound formal?", "Match tone to audience: school, work, or friends.", "Rewrite a casual message into a polite email.", "Audience shapes tone."),
      L("editing-pass", "Editing pass", "20-23", 3, 14, "What do you check last when editing?", "Edit for clarity, then grammar, then proofreading typos.", "Edit a short paragraph in three passes.", "Editing is rewriting with care."),
    ],
    questions: [
      Q("An adjective…", "Describes a noun", ["Describes a noun", "Is always a verb", "Deletes meaning", "Is only a number"], "Adjectives add detail.", 1, "5-7"),
      Q("Formal writing should be…", "Clear and respectful", ["Clear and respectful", "Full of slang only", "ALL CAPS always", "Without a purpose"], "Tone matches audience.", 3, "17-19"),
    ],
  },
  geometry: {
    lessons: [
      L("angles-intro", "Angles introduction", "14-16", 3, 14, "What does a right angle look like?", "Angles measure turn. Right angles are 90°. Straight lines are 180°.", "Find three right angles in the room.", "Angle facts unlock diagrams."),
      L("pythagoras-intro", "Pythagoras introduction", "14-16", 3, 15, "What is special about a right-angled triangle?", "In a right-angled triangle, a² + b² = c² for the sides.", "Check whether 3, 4, 5 fits Pythagoras.", "Right angles enable the theorem."),
      L("geometry-proof-habits", "Geometry reasoning habits", "17-19", 3, 15, "Why do we write reasons in geometry?", "Clear diagrams and stated reasons make arguments checkable.", "Write a two-step reason chain for angles on a straight line.", "Reasons make maths convincing."),
      L("geometry-design", "Geometry in design", "20-23", 3, 14, "Where do designers use geometry?", "Architecture, games, and product design use shape, symmetry, and measurement.", "Sketch a logo idea using two shapes and note symmetries.", "Geometry shapes the built world."),
    ],
    questions: [
      Q("A right angle is…", "90 degrees", ["45 degrees", "90 degrees", "180 degrees", "360 degrees"], "Corner of a square.", 3, "14-16"),
      Q("Pythagoras applies to…", "Right-angled triangles", ["Right-angled triangles", "All circles only", "Only squares", "No triangles"], "a² + b² = c².", 3, "14-16"),
    ],
  },
  statistics: {
    lessons: [
      L("tally-charts", "Tally charts", "8-10", 1, 12, "How can you count votes quickly?", "Tally marks group counts in fives. Charts organise results.", "Make a tally of favourite colours in your household.", "Tallies turn counting into data."),
      L("pictograms", "Pictograms", "8-10", 1, 12, "What does each picture stand for?", "Pictograms use pictures for amounts. Always read the key.", "Draw a pictogram key where one star = 2 votes.", "Keys unlock pictograms."),
      L("sampling-bias", "Sampling bias", "17-19", 3, 14, "Why might an online poll mislead?", "Who you ask changes results. Biased samples distort conclusions.", "Rewrite a biased sample plan into a fairer one.", "Fair samples support fair claims."),
      L("stats-for-decisions", "Statistics for decisions", "20-23", 3, 15, "How do averages help decisions?", "Means and medians summarise, but check spread and sample quality before acting.", "Compare mean vs median for a small income-like list with an outlier.", "Choose the right summary carefully."),
    ],
    questions: [
      Q("A tally chart helps you…", "Count and organise data", ["Count and organise data", "Delete results", "Ignore numbers", "Skip keys"], "Tallies organise counts.", 1, "8-10"),
      Q("A biased sample…", "Does not fairly represent the group", ["Does not fairly represent the group", "Is always perfect", "Has no people", "Removes all questions"], "Representation matters.", 3, "17-19"),
    ],
  },
  biology: {
    lessons: [
      L("animals-and-plants", "Animals and plants", "8-10", 1, 12, "How are animals and plants different?", "Plants often make food using light. Animals eat to get energy. Both are living.", "List two plants and two animals near you.", "Living things differ in how they get energy."),
      L("habitats-homes", "Habitats are homes", "8-10", 1, 12, "Where does a woodlouse like to live?", "A habitat gives living things what they need: food, water, shelter.", "Describe a habitat for a bird you have seen.", "Habitats support life."),
      L("genetics-intro", "Genes introduction", "17-19", 3, 15, "What do genes influence?", "Genes carry instructions in cells. Traits come from genes and environment together.", "Explain one trait that can run in families without diagnosing anyone.", "Genes are instructions, not destiny."),
      L("human-biology-respect", "Human biology with respect", "20-23", 3, 14, "Why use respectful language about bodies?", "Systems keep us alive. Ask trusted adults about personal health questions.", "Label three body systems by main job (e.g. transport, support, control).", "Respect and accuracy belong together."),
    ],
    questions: [
      Q("A habitat provides…", "Food, water, and shelter", ["Food, water, and shelter", "Only toys", "Nothing living needs", "Only screens"], "Habitats meet needs.", 1, "8-10"),
      Q("Plants often get energy from…", "Light", ["Light", "Only rocks", "Plastic", "Wind alone always"], "Photosynthesis uses light.", 1, "8-10"),
    ],
  },
  chemistry: {
    lessons: [
      L("materials-sort", "Sorting materials", "8-10", 1, 12, "Is wood bendier than metal?", "Materials have properties: hard, soft, waterproof, bendy. Properties guide uses.", "Sort five objects by hard/soft or waterproof/not.", "Properties explain material choices."),
      L("solids-liquids-gases", "Solids, liquids, gases", "8-10", 1, 12, "Can you pour a solid?", "Solids keep shape. Liquids flow. Gases spread to fill space.", "Give one example of each state of matter.", "States describe matter."),
      L("periodic-patterns", "Periodic table patterns", "17-19", 3, 15, "Why group elements?", "The periodic table groups elements with similar properties to predict behaviour.", "Find three metals and one noble gas with a parent online.", "Patterns help prediction."),
      L("chemistry-of-everyday", "Everyday chemistry", "20-23", 3, 14, "Where is chemistry in cooking or cleaning?", "Reactions and mixtures appear in kitchens and industry. Safety still matters.", "Explain dissolving salt as a mixture process.", "Chemistry is everyday matter change."),
    ],
    questions: [
      Q("A liquid…", "Flows and takes the shape of its container", ["Flows and takes the shape of its container", "Never moves", "Is always a metal", "Has fixed shape like a brick"], "Liquids flow.", 1, "8-10"),
      Q("Material properties help us…", "Choose the right use", ["Choose the right use", "Ignore safety", "Delete science", "Avoid all tools"], "Match property to purpose.", 1, "8-10"),
    ],
  },
  physics: {
    lessons: [
      L("pushes-and-pulls", "Pushes and pulls", "8-10", 1, 12, "Can you push a door open?", "Forces are pushes or pulls. They can start, stop, or change movement.", "List three pushes and three pulls you do today.", "Forces change motion."),
      L("magnets-intro", "Magnets introduction", "8-10", 1, 12, "What sticks to a fridge magnet?", "Magnets attract some metals. Opposite poles attract; like poles repel.", "Test which classroom objects a fridge magnet attracts (with a parent).", "Magnets show non-contact forces."),
      L("circuits-series", "Simple electric circuits", "17-19", 3, 15, "What must be complete for a bulb to light?", "A complete circuit lets current flow. Series circuits share one path.", "Draw a series circuit with battery, bulb, and switch.", "Complete paths power devices."),
      L("physics-models", "Models in physics", "20-23", 3, 14, "When is a model useful even if incomplete?", "Models simplify reality to predict and explain. State assumptions.", "Explain one limit of a particle model of gas.", "Honest limits improve models."),
    ],
    questions: [
      Q("A force can be…", "A push or a pull", ["A push or a pull", "Only a colour", "Only a sound", "Never a change"], "Forces push or pull.", 1, "8-10"),
      Q("Like magnetic poles…", "Repel", ["Repel", "Always attract", "Disappear", "Become liquids"], "Like poles push apart.", 1, "8-10"),
    ],
  },
  computing: {
    lessons: [
      L("what-is-a-computer", "What is a computer?", "8-10", 1, 12, "Is a phone a computer?", "Computers follow instructions to process information. Phones and laptops are computers.", "Name three computers in your home or school.", "Many devices are computers."),
      L("inputs-outputs", "Inputs and outputs", "8-10", 1, 12, "Is a keyboard an input?", "Inputs send information in. Outputs show results, like screens and speakers.", "Label two inputs and two outputs on a device.", "I/O connects people and machines."),
      L("cyber-physical", "Computing systems in the world", "17-19", 3, 14, "Where do computers control real devices?", "Embedded systems appear in cars, hospitals, and homes. Reliability matters.", "Give two examples of embedded computers.", "Computing reaches beyond laptops."),
      L("computational-thinking-work", "Computational thinking at work", "20-23", 3, 14, "How do you break a big problem down?", "Decompose, spot patterns, abstract, and write algorithms before coding.", "Decompose planning a trip into five sub-tasks.", "Thinking precedes coding."),
    ],
    questions: [
      Q("A keyboard is usually an…", "Input", ["Input", "Output only", "Power cable", "Operating system"], "Keyboards send data in.", 1, "8-10"),
      Q("Computers follow…", "Instructions", ["Instructions", "Only guesses", "No programs ever", "Random weather"], "Programs are instructions.", 1, "8-10"),
    ],
  },
  cybersecurity: {
    lessons: [
      L("secrets-stay-secret", "Secrets stay secret", "8-10", 1, 11, "Should you share a password?", "Passwords and PINs are secrets. Never share them, even with friends online.", "Practice saying 'I keep passwords private' with a parent.", "Private secrets stay offline too."),
      L("ask-before-click", "Ask before you click", "8-10", 1, 11, "What if a link looks strange?", "Pause on odd messages. Ask a trusted adult before clicking or downloading.", "Role-play saying no to a fake 'free gift' message.", "Pause protects you."),
      L("threat-modelling-lite", "Simple threat thinking", "17-19", 3, 14, "What are you trying to protect?", "Name assets (accounts, files), threats, and simple controls.", "Threat-model your email account in five bullets.", "Clear thinking beats fear."),
      L("secure-habits-adult", "Secure habits for adults", "20-23", 3, 14, "Which accounts need MFA most?", "Unique passwords, MFA, updates, and careful sharing protect adult digital life.", "Turn on MFA for one important account with a parent/guardian if needed.", "Layered habits reduce risk."),
    ],
    questions: [
      Q("Passwords should be…", "Kept private", ["Kept private", "Shared with classmates", "Posted online", "The word password"], "Secrets stay secret.", 1, "8-10"),
      Q("Before clicking a strange link…", "Ask a trusted adult", ["Ask a trusted adult", "Click immediately", "Share it widely", "Enter your PIN"], "Pause and verify.", 1, "8-10"),
    ],
  },
  "career-skills": {
    lessons: [
      L("strengths-inventory", "Strengths inventory", "14-16", 2, 13, "What are you already good at?", "Career growth starts with strengths, interests, and values—not a single fixed label.", "List five strengths and one way each helps others.", "Strengths guide exploration."),
      L("networking-respect", "Respectful networking", "20-23", 3, 14, "How do you ask for advice politely?", "Short, specific, grateful messages build professional relationships.", "Draft a 4-sentence outreach message to a mentor.", "Respect opens doors."),
    ],
    questions: [
      Q("Career exploration should start with…", "Strengths and interests", ["Strengths and interests", "Fear only", "Ignoring feedback", "One rigid label forever"], "Build from strengths.", 2, "14-16"),
    ],
  },
};
