/** Curated educational embed IDs (youtube-nocookie), parent-supervised viewing. */

export type VideoRef = { videoId: string; videoTitle: string };

export type PracticeActivity = {
  title: string;
  instructions: string[];
  reflection: string;
};

/** One overview video per subject for study guide intro. */
export const SUBJECT_OVERVIEW_VIDEO: Record<string, VideoRef> = {
  maths: { videoId: "Hmwvj9LN4bY", videoTitle: "Number lines and counting" },
  reading: { videoId: "BFrXj9B0L7E", videoTitle: "Reading comprehension strategies" },
  coding: { videoId: "ePgZ8KG816g", videoTitle: "What is computer science?" },
  money: { videoId: "zo7iGTvDgsw", videoTitle: "Money and budgeting basics" },
  "study-skills": { videoId: "TdWAj5O9k4E", videoTitle: "How to study effectively" },
  science: { videoId: "lVqUMK0_PL4", videoTitle: "Introduction to living things" },
  history: { videoId: "oOg5V7Ruir0", videoTitle: "Understanding timelines" },
  geography: { videoId: "al-do-Gq74E", videoTitle: "The water cycle" },
  "health-wellbeing": { videoId: "GYQS3pP9HZ8", videoTitle: "Healthy habits for learners" },
  "digital-skills": { videoId: "Awfy3cZjiWk", videoTitle: "Staying safe online" },
  "career-skills": { videoId: "ZadieB50EF0", videoTitle: "Workplace skills introduction" },
};

/** Section-level videos aligned to study guide sections (by index). */
export const SECTION_VIDEOS: Record<string, VideoRef[]> = {
  maths: [
    { videoId: "Hmwvj9LN4bY", videoTitle: "Number sense visualised" },
    { videoId: "2tc0QDfWIQU", videoTitle: "Multiplication as groups" },
    { videoId: "3qFFFKKfPCY", videoTitle: "Solving word problems" },
    { videoId: "TdWAj5O9k4E", videoTitle: "Practice habits" },
  ],
  reading: [
    { videoId: "BFrXj9B0L7E", videoTitle: "Phonics and decoding" },
    { videoId: "m9Oj2HmQyXs", videoTitle: "Finding the main idea" },
    { videoId: "m9Oj2HmQyXs", videoTitle: "Context clues" },
    { videoId: "BFrXj9B0L7E", videoTitle: "Writing clear sentences" },
  ],
  coding: [
    { videoId: "ePgZ8KG816g", videoTitle: "Algorithms in daily life" },
    { videoId: "lkIFF4maKMU", videoTitle: "Loops explained" },
    { videoId: "ePgZ8KG816g", videoTitle: "If/else decisions" },
    { videoId: "lkIFF4maKMU", videoTitle: "Variables and debugging" },
  ],
  money: [
    { videoId: "zo7iGTvDgsw", videoTitle: "Coins and notes" },
    { videoId: "zo7iGTvDgsw", videoTitle: "Needs vs wants" },
    { videoId: "zo7iGTvDgsw", videoTitle: "Simple budgets" },
    { videoId: "zo7iGTvDgsw", videoTitle: "Saving and interest" },
  ],
  "study-skills": [
    { videoId: "TdWAj5O9k4E", videoTitle: "Focus environment" },
    { videoId: "TdWAj5O9k4E", videoTitle: "Focus blocks" },
    { videoId: "TdWAj5O9k4E", videoTitle: "Memory techniques" },
    { videoId: "TdWAj5O9k4E", videoTitle: "Reflection habits" },
  ],
  science: [
    { videoId: "lVqUMK0_PL4", videoTitle: "Scientific thinking" },
    { videoId: "dNiN_k99Ih4", videoTitle: "Living things" },
    { videoId: "00jbG_cfGuQ", videoTitle: "Forces and motion" },
    { videoId: "nq1yq0tuw5s", videoTitle: "Earth and space" },
  ],
  history: [
    { videoId: "oOg5V7Ruir0", videoTitle: "Timelines" },
    { videoId: "oOg5V7Ruir0", videoTitle: "Primary sources" },
    { videoId: "oOg5V7Ruir0", videoTitle: "Causes of change" },
    { videoId: "oOg5V7Ruir0", videoTitle: "Local history" },
  ],
  geography: [
    { videoId: "al-do-Gq74E", videoTitle: "Map skills" },
    { videoId: "al-do-Gq74E", videoTitle: "Weather and climate" },
    { videoId: "al-do-Gq74E", videoTitle: "Human geography" },
    { videoId: "al-do-Gq74E", videoTitle: "Sustainability" },
  ],
  "health-wellbeing": [
    { videoId: "GYQS3pP9HZ8", videoTitle: "Balanced living" },
    { videoId: "GYQS3pP9HZ8", videoTitle: "Physical activity" },
    { videoId: "GYQS3pP9HZ8", videoTitle: "Sleep and learning" },
    { videoId: "GYQS3pP9HZ8", videoTitle: "Mental wellbeing" },
  ],
  "digital-skills": [
    { videoId: "Awfy3cZjiWk", videoTitle: "Online safety" },
    { videoId: "Awfy3cZjiWk", videoTitle: "Research skills" },
    { videoId: "Awfy3cZjiWk", videoTitle: "Documents and slides" },
    { videoId: "Awfy3cZjiWk", videoTitle: "Accessibility tools" },
  ],
  "career-skills": [
    { videoId: "ZadieB50EF0", videoTitle: "Communication at work" },
    { videoId: "ZadieB50EF0", videoTitle: "Teamwork" },
    { videoId: "ZadieB50EF0", videoTitle: "Business basics" },
    { videoId: "ZadieB50EF0", videoTitle: "Growth mindset" },
  ],
};

/** Hands on practice for each study guide section (by index). */
export const SECTION_PRACTICE: Record<string, PracticeActivity[]> = {
  maths: [
    { title: "Count real objects", instructions: ["Collect 10 small items (buttons, blocks, or pasta).", "Split them into two groups.", "Count each group and the total.", "Write the total as an addition sentence."], reflection: "Tell a parent how many you counted." },
    { title: "Number line hop", instructions: ["Draw a line 0 to 20 on paper.", "Mark jumps of +3 three times.", "Circle where you land.", "Check by counting on fingers."], reflection: "What sum did your jumps show?" },
    { title: "Word problem sketch", instructions: ["Read a short problem aloud.", "Underline the question.", "Draw a picture of the story.", "Solve and label units."], reflection: "Explain your drawing to someone." },
    { title: "Five-minute drill", instructions: ["Set a 5-minute timer.", "Do 5 problems you find tricky.", "Check answers.", "Note one mistake to fix tomorrow."], reflection: "What improved after practice?" },
  ],
  reading: [
    { title: "Sound hunt", instructions: ["Pick a page from any book.", "Find three words with the same vowel sound.", "Read them aloud slowly.", "Use each in a spoken sentence."], reflection: "Which sound was easiest to hear?" },
    { title: "Main idea marker", instructions: ["Read one paragraph.", "Highlight the sentence that sums it up.", "List two supporting details.", "Summarise in one spoken sentence."], reflection: "Did the first or last sentence help most?" },
    { title: "Context clue detective", instructions: ["Find an unfamiliar word.", "Read the sentence before and after.", "Guess the meaning.", "Check in a dictionary if unsure."], reflection: "Were your clues correct?" },
    { title: "Sentence builder", instructions: ["Write three sentences about your day.", "Include a noun, verb, and adjective in each.", "Read aloud for flow.", "Edit one sentence to be clearer."], reflection: "Which sentence sounds best?" },
  ],
  coding: [
    { title: "Algorithm recipe", instructions: ["Write steps to make a sandwich.", "Number each step.", "Ask someone to follow exactly.", "Fix any unclear step."], reflection: "Where did instructions need more detail?" },
    { title: "Loop pattern", instructions: ["Draw a square with repeated sides.", "Write 'repeat 4 times: draw side, turn 90°'.", "Trace the path with your finger.", "Count how many turns."], reflection: "What repeated in your loop?" },
    { title: "If/else role-play", instructions: ["Rule: IF raining THEN umbrella ELSE sunglasses.", "Test with three weather scenarios.", "Say the choice each time.", "Write one more rule."], reflection: "When did else branch run?" },
    { title: "Debug three lines", instructions: ["Write a 3-step morning routine with one step missing.", "Swap with a parent to find the bug.", "Fix and retest.", "Celebrate finding the error."], reflection: "Debugging is normal, what did you fix?" },
  ],
  money: [
    { title: "Coin sort", instructions: ["Lay out UK coins (with a parent).", "Sort by value.", "Make 50p three different ways.", "Say each combination aloud."], reflection: "Which combination was fastest?" },
    { title: "Needs vs wants sort", instructions: ["List 8 things you bought or want.", "Label each need or want.", "Discuss two labels with a parent.", "Pick one want to save for."], reflection: "Why was it a need or want?" },
    { title: "Mini budget", instructions: ["Write pocket money or sample income.", "List three expenses.", "Subtract from income.", "Decide one saving goal."], reflection: "What is left after expenses?" },
    { title: "Change challenge", instructions: ["Price three items under £5.", "Use play money or drawings.", "Calculate change from £5.", "Check with addition back."], reflection: "Did change + price = £5?" },
  ],
  "study-skills": [
    { title: "Focus zone setup", instructions: ["Clear desk except study items.", "Fill a water bottle.", "Put phone in another room.", "Tell family you are focusing 15 minutes."], reflection: "What distraction did you remove?" },
    { title: "Timer sprint", instructions: ["Set a 15-minute timer.", "Work on one subject only.", "Stand and stretch 2 minutes.", "Note focus score 1 to 5."], reflection: "What helped you stay on task?" },
    { title: "Flashcard five", instructions: ["Write 5 facts on small cards.", "Quiz yourself once.", "Sort into 'know' and 'review'.", "Schedule tomorrow's review."], reflection: "Which card was hardest?" },
    { title: "Two-minute journal", instructions: ["Write: I learned…", "Write: I am still unsure about…", "Write: Next I will…", "Share with a parent if you want."], reflection: "What will you do next?" },
  ],
  science: [
    { title: "Fair test plan", instructions: ["Question: which surface is slipperiest?", "List materials to keep the same.", "Choose one thing to change.", "Predict the outcome."], reflection: "Why change only one variable?" },
    { title: "Habitat sketch", instructions: ["Pick a local habitat.", "Draw plants and two animals.", "Label food and water sources.", "Show a simple food chain."], reflection: "Who eats whom?" },
    { title: "Friction test", instructions: ["Roll a toy on towel vs table.", "Measure distance in hand-spans.", "Repeat three times.", "Record results in a table."], reflection: "Which surface had more friction?" },
    { title: "Day and night model", instructions: ["Use a ball (Earth) and lamp (Sun).", "Mark your country.", "Rotate Earth slowly.", "Point to day vs night side."], reflection: "What causes day and night?" },
  ],
  history: [
    { title: "Personal timeline", instructions: ["Draw a horizontal line.", "Mark birth, school start, and today.", "Add two family events.", "Label years if known."], reflection: "Which event is furthest back?" },
    { title: "Source sort", instructions: ["Find one photo and one textbook paragraph.", "Label primary or secondary.", "Note who created each.", "Say which feels closer to the event."], reflection: "Why is the photo primary?" },
    { title: "Cause web", instructions: ["Pick one invention (e.g. railways).", "Write three effects on daily life.", "Draw arrows cause → effect.", "Discuss with a parent."], reflection: "Which effect matters most today?" },
    { title: "Interview note", instructions: ["Ask a relative one memory from childhood.", "Write three bullet notes.", "Do not record without permission.", "Thank them."], reflection: "How is their memory a primary source?" },
  ],
  geography: [
    { title: "Room map", instructions: ["Sketch your room from above.", "Add a key for bed, desk, door.", "Mark north with an arrow.", "Give map to someone to follow."], reflection: "Could they find the desk?" },
    { title: "Weather log", instructions: ["Record weather at the same time today.", "Note temperature if possible.", "Describe sky and wind.", "Predict tomorrow."], reflection: "What pattern do you see?" },
    { title: "Settlement why", instructions: ["Name your town.", "List three reasons people live there.", "Mark river, roads, or jobs.", "Compare with a village."], reflection: "Which reason is strongest?" },
    { title: "Eco audit", instructions: ["List three energy uses at home.", "Suggest one reduction.", "Try it today.", "Note if it was easy."], reflection: "What small change helps sustainability?" },
  ],
  "health-wellbeing": [
    { title: "Balanced plate sketch", instructions: ["Draw a plate.", "Add portions: veg, protein, carbs.", "Add water glass.", "Compare to today's lunch."], reflection: "What food group was missing?" },
    { title: "Movement break", instructions: ["Do 5 minutes: walk, stretch, or dance.", "Notice heart rate.", "Drink water.", "Rate mood before and after 1 to 5."], reflection: "Did mood change?" },
    { title: "Wind-down plan", instructions: ["List 4 screen free activities.", "Pick one for tonight.", "Set a bedtime.", "Place phone away from bed."], reflection: "What helps you sleep?" },
    { title: "Coping card", instructions: ["Write three calm-down strategies.", "Decorate the card.", "Keep it in your study space.", "Use one when stressed."], reflection: "Which strategy will you try first?" },
  ],
  "digital-skills": [
    { title: "Privacy check", instructions: ["With a parent, open one app settings.", "Review profile visibility.", "Toggle one safer option.", "Write one rule for sharing."], reflection: "What did you change?" },
    { title: "Source triangulation", instructions: ["Pick a fact to verify.", "Find it on three sites.", "Note authors.", "Decide most trustworthy."], reflection: "Did all three agree?" },
    { title: "Three-slide teach", instructions: ["Pick a topic you know.", "Make 3 slides: title, explain, example.", "Use large text.", "Present in 60 seconds."], reflection: "What would you improve?" },
    { title: "Accessibility try", instructions: ["Enable high contrast or larger text.", "Read one paragraph.", "Note if easier.", "Reset or keep if helpful."], reflection: "Did visuals help reading?" },
  ],
  "career-skills": [
    { title: "Professional message", instructions: ["Draft a short thank-you note.", "Include greeting and clear purpose.", "Proofread.", "Read aloud."], reflection: "Does it sound polite and clear?" },
    { title: "Team task split", instructions: ["Plan a chore with family.", "Assign roles.", "Set a deadline.", "Check in when done."], reflection: "Did everyone know their job?" },
    { title: "Mini P&L", instructions: ["Imagine a lemonade stand.", "List 3 costs and price per cup.", "Estimate cups sold.", "Calculate rough profit."], reflection: "Revenue minus costs = ?" },
    { title: "Feedback practice", instructions: ["Ask for one kind feedback on a skill.", "Listen without arguing.", "Write one improvement.", "Try it once."], reflection: "How will you grow?" },
  ],
};

/** Default hands on steps for lesson Practice steps by subject. */
export const LESSON_PRACTICE_STEPS: Record<string, string[]> = {
  maths: ["Read the problem twice.", "Use objects or drawings to model it.", "Calculate step by step.", "Say the answer with units.", "Check with a parent or reverse operation."],
  reading: ["Read the passage aloud.", "Underline key words.", "Answer in full sentences.", "Read your answer back.", "Ask someone if it makes sense."],
  coding: ["Read each instruction line by line.", "Predict the output before running.", "Try on paper or in a sandbox with a parent.", "Change one line and test again.", "Note what changed."],
  money: ["Use real or drawn coins safely.", "Write amounts in pounds and pence.", "Double-check totals.", "Explain your thinking to a parent.", "Connect to a real shopping example."],
  "study-skills": ["Set a short timer.", "Follow each step in order.", "Pause if stuck and breathe.", "Tick off completed steps.", "Reflect aloud for 30 seconds."],
  science: ["Gather safe household materials.", "Measure carefully.", "Record observations in a table.", "Repeat once to check.", "Clean up and wash hands."],
  history: ["Use a source (photo, text, or interview).", "Take brief notes.", "Label fact vs opinion.", "Write one sentence conclusion.", "Cite where information came from."],
  geography: ["Use a map, globe, or sketch.", "Label features clearly.", "Add a scale or key.", "Compare two places.", "Explain a pattern you notice."],
  "health-wellbeing": ["Move safely for your body.", "Track how you feel before/after.", "Hydrate.", "Discuss with a trusted adult.", "Choose one habit for this week."],
  "digital-skills": ["Work with a parent on accounts/settings.", "Never share passwords.", "Save work with a clear filename.", "Back up if possible.", "Review what you learned."],
  "career-skills": ["Use a real or practice scenario.", "Write bullets before speaking.", "Time yourself briefly.", "Get feedback from a parent.", "Note one improvement."],
};

/** Multiple videos per subject so each lesson can get a distinct clip. */
export const LESSON_VIDEO_POOL: Record<string, VideoRef[]> = {
  maths: [
    { videoId: "Hmwvj9LN4bY", videoTitle: "Number lines" },
    { videoId: "2tc0QDfWIQU", videoTitle: "Multiplication groups" },
    { videoId: "3qFFFKKfPCY", videoTitle: "Word problems" },
    { videoId: "K7s1uZ2b0Z0", videoTitle: "Fractions visualised" },
  ],
  reading: [
    { videoId: "BFrXj9B0L7E", videoTitle: "Reading strategies" },
    { videoId: "m9Oj2HmQyXs", videoTitle: "Main idea" },
    { videoId: "BFrXj9B0L7E", videoTitle: "Vocabulary in context" },
    { videoId: "m9Oj2HmQyXs", videoTitle: "Writing clearly" },
  ],
  coding: [
    { videoId: "ePgZ8KG816g", videoTitle: "Computer science intro" },
    { videoId: "lkIFF4maKMU", videoTitle: "Loops and logic" },
    { videoId: "ePgZ8KG816g", videoTitle: "If/else decisions" },
    { videoId: "lkIFF4maKMU", videoTitle: "Variables explained" },
  ],
  money: [
    { videoId: "zo7iGTvDgsw", videoTitle: "Money basics" },
    { videoId: "zo7iGTvDgsw", videoTitle: "Budgeting" },
    { videoId: "zo7iGTvDgsw", videoTitle: "Saving habits" },
  ],
  "study-skills": [
    { videoId: "TdWAj5O9k4E", videoTitle: "Study techniques" },
    { videoId: "TdWAj5O9k4E", videoTitle: "Focus and memory" },
    { videoId: "TdWAj5O9k4E", videoTitle: "Exam preparation" },
  ],
  science: [
    { videoId: "lVqUMK0_PL4", videoTitle: "Living things" },
    { videoId: "00jbG_cfGuQ", videoTitle: "Gravity and forces" },
    { videoId: "dNiN_k99Ih4", videoTitle: "Photosynthesis" },
    { videoId: "nq1yq0tuw5s", videoTitle: "Earth and space" },
  ],
  history: [
    { videoId: "oOg5V7Ruir0", videoTitle: "Timelines and sources" },
    { videoId: "oOg5V7Ruir0", videoTitle: "Historical evidence" },
  ],
  geography: [
    { videoId: "al-do-Gq74E", videoTitle: "Water cycle" },
    { videoId: "al-do-Gq74E", videoTitle: "Maps and climate" },
  ],
  "health-wellbeing": [
    { videoId: "GYQS3pP9HZ8", videoTitle: "Healthy habits" },
    { videoId: "GYQS3pP9HZ8", videoTitle: "Wellbeing basics" },
  ],
  "digital-skills": [
    { videoId: "Awfy3cZjiWk", videoTitle: "Online safety" },
    { videoId: "Awfy3cZjiWk", videoTitle: "Digital research" },
  ],
  "career-skills": [
    { videoId: "ZadieB50EF0", videoTitle: "Workplace skills" },
    { videoId: "ZadieB50EF0", videoTitle: "Career development" },
  ],
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

/** Pick a lesson-specific video from the subject pool. */
export function videoForLesson(subjectSlug: string, lessonSlug: string): VideoRef | undefined {
  const pool = LESSON_VIDEO_POOL[subjectSlug];
  if (pool?.length) return pool[hashSlug(lessonSlug) % pool.length];
  return SUBJECT_OVERVIEW_VIDEO[subjectSlug];
}

/** Secondary clip for Practice steps (visual walkthrough). */
export function practiceVideoForLesson(subjectSlug: string, lessonSlug: string): VideoRef | undefined {
  const pool = LESSON_VIDEO_POOL[subjectSlug];
  if (!pool?.length) return undefined;
  return pool[(hashSlug(lessonSlug) + 1) % pool.length];
}

