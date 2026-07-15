/** Curated educational embed IDs (youtube-nocookie), parent-supervised viewing. */

import { resolveLessonVideo } from "./lesson-videos";

export type VideoRef = { videoId: string; videoTitle: string };

export type PracticeActivity = {
  title: string;
  instructions: string[];
  reflection: string;
};

/** One overview video per subject for study guide intro (oEmbed-verified IDs). */
export const SUBJECT_OVERVIEW_VIDEO: Record<string, VideoRef> = {
  maths: { videoId: "T5Qf0qSSJFI", videoTitle: "Math Antics: Place Value" },
  reading: { videoId: "pLlv2o6UfTU", videoTitle: "Crash Course: Navigating Digital Information" },
  coding: { videoId: "O5nskjZ_GoI", videoTitle: "Crash Course Computer Science #1" },
  money: { videoId: "sVKQn2I4HDM", videoTitle: "Budgeting Basics" },
  "study-skills": { videoId: "IlU-zDU6aQ0", videoTitle: "Study Less, Study Smart" },
  science: { videoId: "N6IAzlugWw0", videoTitle: "Khan Academy: The scientific method" },
  history: { videoId: "Yocja_N5s1I", videoTitle: "Crash Course World History #1" },
  geography: { videoId: "93LLwiMjDko", videoTitle: "Crash Course Geography #1" },
  "health-wellbeing": { videoId: "5MuIMqhT8DM", videoTitle: "TED: Sleep is your superpower" },
  "digital-skills": { videoId: "vNpkUyEOa_8", videoTitle: "Common Sense: My Online Neighborhood" },
  "career-skills": { videoId: "HAnw168huqA", videoTitle: "Think Fast, Talk Smart: Communication" },
  psychology: { videoId: "vo4pMVb0R6M", videoTitle: "Crash Course Psychology #1" },
  philosophy: { videoId: "1A_CAkYt3GY", videoTitle: "Crash Course Philosophy #1" },
  sociology: { videoId: "YnCJU6PaCio", videoTitle: "Crash Course Sociology #1" },
  economics: { videoId: "3ez10ADR_gM", videoTitle: "Crash Course Economics #1" },
  astronomy: { videoId: "0rHUDWjR5gg", videoTitle: "Crash Course Astronomy #1" },
  "artificial-intelligence": { videoId: "a0_lo_GDcFw", videoTitle: "Crash Course AI #1" },
  robotics: { videoId: "vVTA-E3G8bQ", videoTitle: "TED-Ed: Talos, the first robot" },
  english: { videoId: "HAnw168huqA", videoTitle: "Clear English communication" },
  geometry: { videoId: "xCdxURXMdFY", videoTitle: "Math Antics: Area" },
  statistics: { videoId: "h8EYEJ32oQ8", videoTitle: "Khan Academy: Mean, median, mode" },
  biology: { videoId: "QnQe0xW_JY4", videoTitle: "Crash Course Biology #1" },
  chemistry: { videoId: "FSyAehMdpyI", videoTitle: "Crash Course Chemistry #1" },
  physics: { videoId: "ZM8ECpBuQYE", videoTitle: "Crash Course Physics #1" },
  computing: { videoId: "O5nskjZ_GoI", videoTitle: "Crash Course Computer Science #1" },
  cybersecurity: { videoId: "inWWhr5tnEA", videoTitle: "What is cybersecurity?" },
};

/** Section-level videos aligned to study guide sections (by index). */
export const SECTION_VIDEOS: Record<string, VideoRef[]> = {
  maths: [
    { videoId: "T5Qf0qSSJFI", videoTitle: "Place value" },
    { videoId: "FJ5qLWP3Fqo", videoTitle: "Multiplication" },
    { videoId: "mAvuom42NyY", videoTitle: "Addition for word problems" },
    { videoId: "IlU-zDU6aQ0", videoTitle: "Practice habits" },
  ],
  reading: [
    { videoId: "saF3-f0XWAY", videoTitle: "Phonics and decoding" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Finding the main idea in sources" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Context and claims" },
    { videoId: "HAnw168huqA", videoTitle: "Clear sentences and speaking" },
  ],
  coding: [
    { videoId: "O5nskjZ_GoI", videoTitle: "Algorithms in early computing" },
    { videoId: "RBSGKlAvoiM", videoTitle: "Loops and data structures" },
    { videoId: "O5nskjZ_GoI", videoTitle: "If/else decisions" },
    { videoId: "rfscVS0vtbw", videoTitle: "Variables in Python" },
  ],
  money: [
    { videoId: "sVKQn2I4HDM", videoTitle: "Coins, notes, and budgets" },
    { videoId: "_7J1JVCxWJM", videoTitle: "Needs vs wants" },
    { videoId: "7GSGA8SVsOs", videoTitle: "Simple budgets" },
    { videoId: "GtaoP0skPWc", videoTitle: "Saving and interest" },
  ],
  "study-skills": [
    { videoId: "IlU-zDU6aQ0", videoTitle: "Focus environment" },
    { videoId: "E7CwqNHn_Ns", videoTitle: "Note-taking" },
    { videoId: "SZbdK9e9bxs", videoTitle: "Memory techniques" },
    { videoId: "IlU-zDU6aQ0", videoTitle: "Reflection habits" },
  ],
  science: [
    { videoId: "N6IAzlugWw0", videoTitle: "Scientific thinking" },
    { videoId: "QnQe0xW_JY4", videoTitle: "Living things" },
    { videoId: "ZM8ECpBuQYE", videoTitle: "Forces and motion" },
    { videoId: "libKVRa01L8", videoTitle: "Earth and space" },
  ],
  history: [
    { videoId: "Yocja_N5s1I", videoTitle: "Timelines" },
    { videoId: "n7ndRwqJYDM", videoTitle: "Primary sources and civilisations" },
    { videoId: "8Nn5uqE3C9w", videoTitle: "Causes of change" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Evaluating historical claims" },
  ],
  geography: [
    { videoId: "93LLwiMjDko", videoTitle: "Map skills and geography" },
    { videoId: "HCDVN7DCzYE", videoTitle: "Weather and climate" },
    { videoId: "93LLwiMjDko", videoTitle: "Human geography" },
    { videoId: "oJAbATJCugs", videoTitle: "Sustainability" },
  ],
  "health-wellbeing": [
    { videoId: "xyQY8a-ng6g", videoTitle: "Food and the brain" },
    { videoId: "aUaInS6HIGo", videoTitle: "Movement and health" },
    { videoId: "5MuIMqhT8DM", videoTitle: "Sleep and learning" },
    { videoId: "w6T02g5hnT4", videoTitle: "Mental wellbeing and mindfulness" },
  ],
  "digital-skills": [
    { videoId: "vNpkUyEOa_8", videoTitle: "Online safety" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Research skills" },
    { videoId: "E7CwqNHn_Ns", videoTitle: "Documents and notes" },
    { videoId: "MjPpG2e71Ec", videoTitle: "Privacy tools" },
  ],
  "career-skills": [
    { videoId: "HAnw168huqA", videoTitle: "Communication at work" },
    { videoId: "HAnw168huqA", videoTitle: "Teamwork conversations" },
    { videoId: "3ez10ADR_gM", videoTitle: "Business and economics basics" },
    { videoId: "5MgBikgcWnY", videoTitle: "Growth mindset for skills" },
  ],
  psychology: [
    { videoId: "vo4pMVb0R6M", videoTitle: "What psychologists study" },
    { videoId: "bSycdIx-C48", videoTitle: "Memory and learning" },
    { videoId: "w6T02g5hnT4", videoTitle: "Emotion and calm focus" },
    { videoId: "UGxGDdQnC1Y", videoTitle: "Thinking carefully with others" },
  ],
  philosophy: [
    { videoId: "1A_CAkYt3GY", videoTitle: "Asking good questions" },
    { videoId: "NKEhdsnKKHs", videoTitle: "Logic basics" },
    { videoId: "3_t4obUc51A", videoTitle: "Ethics" },
    { videoId: "1A_CAkYt3GY", videoTitle: "Knowledge and belief" },
  ],
  sociology: [
    { videoId: "YnCJU6PaCio", videoTitle: "The sociological perspective" },
    { videoId: "DbTt_ySTjaY", videoTitle: "Groups and norms" },
    { videoId: "YnCJU6PaCio", videoTitle: "Institutions" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Inequality, fairness, and media" },
  ],
  economics: [
    { videoId: "3ez10ADR_gM", videoTitle: "Scarcity and choice" },
    { videoId: "LwLh6ax0zTE", videoTitle: "Supply and demand" },
    { videoId: "3ez10ADR_gM", videoTitle: "Incentives" },
    { videoId: "sVKQn2I4HDM", videoTitle: "Everyday economics" },
  ],
  astronomy: [
    { videoId: "0rHUDWjR5gg", videoTitle: "What astronomy is" },
    { videoId: "libKVRa01L8", videoTitle: "Earth in space" },
    { videoId: "0rHUDWjR5gg", videoTitle: "Stars and light" },
    { videoId: "0fKBhvDjuy0", videoTitle: "Scale of the cosmos" },
  ],
  "artificial-intelligence": [
    { videoId: "a0_lo_GDcFw", videoTitle: "What AI is" },
    { videoId: "4qVRBYAdLAo", videoTitle: "Machine learning" },
    { videoId: "z-EtmaFJieY", videoTitle: "Using AI ideas carefully" },
    { videoId: "oV3ZY6tJiA0", videoTitle: "Ethics and neural nets" },
  ],
  robotics: [
    { videoId: "vVTA-E3G8bQ", videoTitle: "What robots are" },
    { videoId: "O5nskjZ_GoI", videoTitle: "Sensors and computing" },
    { videoId: "z-EtmaFJieY", videoTitle: "Control and learning" },
    { videoId: "a0_lo_GDcFw", videoTitle: "Robots and people" },
  ],
  english: [
    { videoId: "saF3-f0XWAY", videoTitle: "Reading foundations" },
    { videoId: "HAnw168huqA", videoTitle: "Clear sentences" },
    { videoId: "E7CwqNHn_Ns", videoTitle: "Writing structure" },
    { videoId: "HAnw168huqA", videoTitle: "Speaking and listening" },
  ],
  geometry: [
    { videoId: "AAY1bsazcgM", videoTitle: "Shapes and perimeter" },
    { videoId: "AAY1bsazcgM", videoTitle: "Perimeter" },
    { videoId: "xCdxURXMdFY", videoTitle: "Area" },
    { videoId: "O-cawByg2aA", videoTitle: "Circles" },
  ],
  statistics: [
    { videoId: "h8EYEJ32oQ8", videoTitle: "Collecting data ideas" },
    { videoId: "k3aKKasOmIw", videoTitle: "Mean, median, mode" },
    { videoId: "h8EYEJ32oQ8", videoTitle: "Charts and averages" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Careful claims" },
  ],
  biology: [
    { videoId: "QnQe0xW_JY4", videoTitle: "Life and cells" },
    { videoId: "sQK3Yr4Sc_k", videoTitle: "Energy for life" },
    { videoId: "00jbG_cfGuQ", videoTitle: "Body energy systems" },
    { videoId: "oJAbATJCugs", videoTitle: "Ecosystems and change" },
  ],
  chemistry: [
    { videoId: "FSyAehMdpyI", videoTitle: "Atoms and elements" },
    { videoId: "bka20Q9TN6M", videoTitle: "Compounds and matter" },
    { videoId: "FSyAehMdpyI", videoTitle: "Reactions" },
    { videoId: "N6IAzlugWw0", videoTitle: "Safety and method" },
  ],
  physics: [
    { videoId: "ZM8ECpBuQYE", videoTitle: "Motion" },
    { videoId: "ZM8ECpBuQYE", videoTitle: "Forces" },
    { videoId: "00jbG_cfGuQ", videoTitle: "Energy" },
    { videoId: "ZM8ECpBuQYE", videoTitle: "Models and graphs" },
  ],
  computing: [
    { videoId: "O5nskjZ_GoI", videoTitle: "Hardware and software" },
    { videoId: "RBSGKlAvoiM", videoTitle: "Algorithms and data" },
    { videoId: "O5nskjZ_GoI", videoTitle: "Networks" },
    { videoId: "HXV3zeQKqGY", videoTitle: "Storing data" },
  ],
  cybersecurity: [
    { videoId: "pLlv2o6UfTU", videoTitle: "Threats basics" },
    { videoId: "inWWhr5tnEA", videoTitle: "Passwords and MFA" },
    { videoId: "7bRZdUtmH8k", videoTitle: "Privacy" },
    { videoId: "sdpxddDzXfE", videoTitle: "Safe response" },
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
  psychology: [
    { title: "Evidence check", instructions: ["Write one claim about learning.", "Find one supporting reason.", "Note what evidence is missing.", "Revise the claim kindly."], reflection: "What made the claim clearer?" },
    { title: "Self-test three", instructions: ["Pick a topic you studied today.", "Write three recall questions.", "Answer without notes.", "Check and fix gaps."], reflection: "Which question was hardest?" },
    { title: "Focus block", instructions: ["Remove one distraction.", "Set a 10-minute timer.", "Work on one task.", "Rate focus 1 to 5."], reflection: "What helped attention?" },
    { title: "Respectful disagree", instructions: ["Write a claim you disagree with.", "Write one fair counter-reason.", "Keep language kind.", "Share with a parent if helpful."], reflection: "Did you focus on the idea?" },
  ],
  philosophy: [
    { title: "Define the term", instructions: ["Pick a big word (fairness, knowledge, or duty).", "Write your definition in one sentence.", "Ask someone else's definition.", "Compare differences."], reflection: "Why do definitions matter?" },
    { title: "Premise practice", instructions: ["Write a short argument.", "Label premises and conclusion.", "Check if the conclusion follows.", "Fix one weak premise."], reflection: "Was the argument valid?" },
    { title: "Values map", instructions: ["Name two values in a small dilemma.", "List who is affected.", "Write one reasoned choice.", "Discuss with a parent."], reflection: "Which value weighed most?" },
    { title: "Belief update", instructions: ["Write a belief you hold.", "Add one piece of evidence.", "Note what would change your mind.", "Keep an open mind."], reflection: "How strong is your evidence?" },
  ],
  sociology: [
    { title: "Personal and public", instructions: ["Write one personal habit.", "Name a school or family rule that shapes it.", "Explain the link in one sentence.", "Share with a parent."], reflection: "How does society shape the habit?" },
    { title: "Norms list", instructions: ["List two home norms and two school norms.", "Mark written or unspoken.", "Note one that helps belonging.", "Ask if any exclude."], reflection: "Which norm is most important?" },
    { title: "Institution sketch", instructions: ["Pick school, media, or government.", "Write its main purpose.", "List two roles people play.", "Note one outcome it produces."], reflection: "Who sets the rules?" },
    { title: "Headline rewrite", instructions: ["Find one news headline.", "Rewrite it more precisely.", "Remove exaggeration.", "Check a second source."], reflection: "What changed in meaning?" },
  ],
  economics: [
    { title: "Trade-off note", instructions: ["Choose an evening activity.", "Write the opportunity cost.", "List one benefit of each option.", "Decide and explain why."], reflection: "What did you give up?" },
    { title: "Price story", instructions: ["Name a popular scarce item.", "Predict what happens to price.", "Give one reason for demand.", "Give one reason for supply."], reflection: "Did supply or demand dominate?" },
    { title: "Incentive design", instructions: ["Pick a helpful habit (recycling).", "Design one positive incentive.", "Predict an unintended effect.", "Adjust the plan."], reflection: "Who responds to the incentive?" },
    { title: "Mini budget", instructions: ["List sample income.", "List three expenses.", "Set one saving goal.", "Check if numbers balance."], reflection: "What is left to save?" },
  ],
  astronomy: [
    { title: "Sky journal", instructions: ["With a parent, look at the night sky safely.", "Note moon phase if visible.", "List two objects you see.", "Write one question."], reflection: "What do you want to learn next?" },
    { title: "Day and night model", instructions: ["Use a ball and lamp.", "Mark your location.", "Rotate the ball.", "Point to day and night sides."], reflection: "What causes day and night?" },
    { title: "Light travel thought", instructions: ["Write why distant light is old news.", "Give one galaxy example in words.", "Explain to someone.", "Ask one follow-up question."], reflection: "How does distance equal time?" },
    { title: "Scale order", instructions: ["Order: Earth, solar system, Milky Way.", "Write powers-of-ten style sizes if you can.", "Check with a trusted source.", "Teach someone the order."], reflection: "Which jump in scale surprised you?" },
  ],
  "artificial-intelligence": [
    { title: "AI around you", instructions: ["List three AI tools you use.", "Write what each tries to do.", "Note one risk for each.", "Share with a parent."], reflection: "Which tool needs the most checking?" },
    { title: "Tiny labelled set", instructions: ["Write three sample messages.", "Label spam or not spam.", "Explain how a model could learn.", "Note a bias risk."], reflection: "Were your labels fair?" },
    { title: "Prompt practice", instructions: ["Write a clear learning prompt.", "Ask for an explanation, not final answers.", "Rewrite the output in your words.", "Check one fact."], reflection: "Did verification catch an error?" },
    { title: "Privacy rules", instructions: ["List two things never to paste into AI.", "Write a family AI rule.", "Ask a parent to review it.", "Post the rule near your study space."], reflection: "Which rule protects you most?" },
  ],
  robotics: [
    { title: "Sense decide act", instructions: ["Draw a robot.", "Label a sensor.", "Label a decision.", "Label an actuator."], reflection: "Which part was hardest to label?" },
    { title: "Sensor match", instructions: ["List light, distance, and sound.", "Match each to a device.", "Say what output it might trigger.", "Check with a parent."], reflection: "Which sensor is most familiar?" },
    { title: "Safe sequence", instructions: ["Write five robot tidy-up steps.", "Add a stop condition.", "Remove one unsafe step.", "Number the final list."], reflection: "Where is the emergency stop?" },
    { title: "Benefit and risk", instructions: ["Pick a helpful robot.", "Write one benefit.", "Write one risk.", "Suggest a safety rule."], reflection: "Who should stay in control?" },
  ],
  english: [
    { title: "Main idea find", instructions: ["Read one paragraph.", "Underline the main idea.", "List two details.", "Summarise aloud."], reflection: "Did the first sentence help?" },
    { title: "Sentence polish", instructions: ["Write three sentences.", "Check subject and verb.", "Read aloud.", "Fix one unclear sentence."], reflection: "Which sentence is clearest?" },
    { title: "Paragraph build", instructions: ["Choose one idea.", "Write a topic sentence.", "Add two supports.", "Add a closing line."], reflection: "Is it one idea only?" },
    { title: "30-second talk", instructions: ["Pick a hobby.", "Write three points.", "Practise timing 30 seconds.", "Present to a parent."], reflection: "Was your purpose clear?" },
  ],
  geometry: [
    { title: "Shape hunt", instructions: ["Find five shapes at home.", "Name each.", "Note sides or curves.", "Sketch one."], reflection: "Which property mattered most?" },
    { title: "Perimeter walk", instructions: ["Measure a book in cm.", "Add all sides.", "Check units.", "Compare with a second object."], reflection: "Did you miss a side?" },
    { title: "Area grid", instructions: ["Draw a 4 by 3 rectangle on squared paper.", "Count squares.", "Multiply length × width.", "Confirm both match."], reflection: "Why use square units?" },
    { title: "Circle parts", instructions: ["Draw a circle.", "Mark radius and diameter.", "Write C ≈ πd.", "Write A ≈ πr²."], reflection: "Did you mix radius and diameter?" },
  ],
  statistics: [
    { title: "Fair question", instructions: ["Write one survey question.", "Rewrite it to be fairer.", "Say who should be asked.", "Note sample size."], reflection: "What bias did you remove?" },
    { title: "MMM practice", instructions: ["Use 2, 3, 3, 7.", "Find mean.", "Find median.", "Find mode."], reflection: "Which measure fits best here?" },
    { title: "Chart checklist", instructions: ["Invent a bar chart title.", "Name two axes.", "Choose units.", "Write one careful claim."], reflection: "What could mislead a reader?" },
    { title: "Claim rewrite", instructions: ["Write an overconfident claim.", "Rewrite carefully.", "Add a limit.", "Share with a parent."], reflection: "Is the careful claim clearer?" },
  ],
  biology: [
    { title: "Living checklist", instructions: ["List three living things.", "Tick shared needs.", "Name one non-living thing.", "Explain the difference."], reflection: "What need is shared most?" },
    { title: "Food chain draw", instructions: ["Start with a plant.", "Add a herbivore.", "Add a carnivore.", "Add sunlight as energy."], reflection: "Where does energy enter?" },
    { title: "Breathing link", instructions: ["Note resting breathing.", "Do light activity safely.", "Note breathing again.", "Explain energy need simply."], reflection: "Why did rate change?" },
    { title: "Habitat factors", instructions: ["Pick a park or garden.", "List two living factors.", "List two non-living factors.", "Show one interaction."], reflection: "Which factor is easiest to change?" },
  ],
  chemistry: [
    { title: "Element hunt", instructions: ["Find five element names with a parent.", "Write their symbols if known.", "Say if each is metal or not if you can.", "Keep a mini table."], reflection: "Which element surprised you?" },
    { title: "Sort matter", instructions: ["Classify water, salad, oxygen.", "Use element, compound, or mixture.", "Explain one choice.", "Check with a parent."], reflection: "Which was trickiest?" },
    { title: "Reaction story", instructions: ["Describe burning wood carefully.", "Name reactants in words.", "Name products in words.", "State that atoms rearrange."], reflection: "What stayed the same conceptually?" },
    { title: "Safety card", instructions: ["Write three lab rules.", "Add eye protection.", "Add adult supervision.", "Keep the card visible."], reflection: "Which rule is non-negotiable?" },
  ],
  physics: [
    { title: "Speed calc", instructions: ["Use 100 m in 20 s.", "Write speed = distance/time.", "Calculate.", "Include units."], reflection: "What do the units tell you?" },
    { title: "Force arrows", instructions: ["Draw a book on a table.", "Add gravity arrow.", "Add support arrow.", "Say if forces balance."], reflection: "Are the arrows equal?" },
    { title: "Energy trail", instructions: ["Describe a falling ball.", "Name energy stores.", "Describe the bounce transfer.", "Note energy spreading as heat/sound."], reflection: "Where did energy go?" },
    { title: "Graph sketch", instructions: ["Draw distance-time axes.", "Show walking.", "Show resting as flat.", "Label axes."], reflection: "What does flat mean?" },
  ],
  computing: [
    { title: "Hardware vs software", instructions: ["List three hardware items.", "List three software items.", "Explain one dependency.", "Share with a parent."], reflection: "Can software run without hardware?" },
    { title: "Algorithm write", instructions: ["Write steps to find the largest of three numbers.", "Number each step.", "Test with 4, 9, 2.", "Fix unclear wording."], reflection: "Did your steps always work?" },
    { title: "Network sketch", instructions: ["Draw device to router.", "Draw router to internet.", "Label Wi-Fi vs internet.", "Note one trust choice."], reflection: "What leaves your home network?" },
    { title: "Mini database", instructions: ["Make columns: title, author, read?", "Add three books.", "Sort by read status.", "Ask one query aloud."], reflection: "Why do columns help?" },
  ],
  cybersecurity: [
    { title: "Phish flags", instructions: ["Write a fake urgent message.", "Highlight three red flags.", "Say what you would do instead.", "Tell a parent the plan."], reflection: "Which flag is easiest to spot?" },
    { title: "MFA check", instructions: ["Pick one important account with a parent.", "Check if MFA is on.", "Turn it on if safe and allowed.", "Store backup codes safely."], reflection: "Did MFA add a second check?" },
    { title: "Privacy checklist", instructions: ["List five privacy habits.", "Review one app permission together.", "Reduce one unnecessary share.", "Write a weekly reminder."], reflection: "What did you share less of?" },
    { title: "Incident steps", instructions: ["Write stop, tell adult, secure account.", "Add change password from a safe device.", "Add report if needed.", "Practise saying the steps."], reflection: "Who is your first trusted adult?" },
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
  psychology: ["Write the question in your own words.", "Give one evidence-based reason.", "Avoid labels about people.", "Check your answer with a parent.", "Note one kind insight."],
  philosophy: ["Clarify key terms first.", "List premises and a conclusion.", "Check whether the conclusion follows.", "Consider one other viewpoint.", "Revise for clarity."],
  sociology: ["Connect a personal example to a wider pattern.", "Avoid stereotypes.", "Use respectful language.", "Cite where an idea came from.", "Discuss with a parent."],
  economics: ["Name the trade-off clearly.", "Use simple numbers when helpful.", "State who benefits and who pays.", "Check your units.", "Explain to a parent."],
  astronomy: ["Use a model or sketch.", "Label Earth, Sun, or Moon carefully.", "Keep scale honest (huge distances).", "Write one observation.", "Share with a parent."],
  "artificial-intelligence": ["State the AI task clearly.", "Protect private data.", "Verify important answers.", "Rewrite in your own words.", "Ask a parent if unsure."],
  robotics: ["Think sense, decide, act.", "Keep safety first.", "Change one variable when testing.", "Label diagrams.", "Discuss with a parent."],
  english: ["Read aloud when helpful.", "Underline key words.", "Write in full sentences.", "Edit once for clarity.", "Share with someone."],
  geometry: ["Sketch the shape first.", "Label lengths.", "State the formula.", "Include units.", "Check by estimating."],
  statistics: ["Order data when needed.", "Show working for mean.", "Check chart scales.", "Avoid overclaiming.", "Cite the sample."],
  biology: ["Use respectful language about bodies.", "Draw and label.", "Link energy ideas.", "Give real examples.", "Ask a trusted adult about health."],
  chemistry: ["Never mix chemicals unsupervised.", "Use precise words.", "Classify carefully.", "Respect lab rules.", "Check with a parent."],
  physics: ["Define quantities.", "Include units.", "Draw force or motion diagrams.", "Check if the model fits.", "Estimate before calculating."],
  computing: ["Separate hardware and software.", "Write steps before details.", "Test with small examples.", "Protect personal data.", "Ask before installing software."],
  cybersecurity: ["Pause before clicking.", "Work with a parent on accounts.", "Use unique passwords.", "Enable MFA when possible.", "Report problems early."],
};

/** Multiple videos per subject so Practice steps can show a related clip. */
export const LESSON_VIDEO_POOL: Record<string, VideoRef[]> = {
  maths: [
    { videoId: "T5Qf0qSSJFI", videoTitle: "Place value" },
    { videoId: "FJ5qLWP3Fqo", videoTitle: "Multiplication" },
    { videoId: "Y6M89-6106I", videoTitle: "Subtraction" },
    { videoId: "52ZlXsFJULI", videoTitle: "Fractions" },
  ],
  reading: [
    { videoId: "saF3-f0XWAY", videoTitle: "Phonics" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Critical reading" },
    { videoId: "E7CwqNHn_Ns", videoTitle: "Notes and paragraphs" },
    { videoId: "HAnw168huqA", videoTitle: "Clear communication" },
  ],
  coding: [
    { videoId: "O5nskjZ_GoI", videoTitle: "Computer science intro" },
    { videoId: "rfscVS0vtbw", videoTitle: "Python basics" },
    { videoId: "UB1O30fR-EE", videoTitle: "HTML basics" },
    { videoId: "RGOj5yH7evk", videoTitle: "Git basics" },
  ],
  money: [
    { videoId: "sVKQn2I4HDM", videoTitle: "Money basics" },
    { videoId: "7GSGA8SVsOs", videoTitle: "Budgeting" },
    { videoId: "GtaoP0skPWc", videoTitle: "Interest" },
  ],
  "study-skills": [
    { videoId: "IlU-zDU6aQ0", videoTitle: "Study techniques" },
    { videoId: "E7CwqNHn_Ns", videoTitle: "Note-taking" },
    { videoId: "SZbdK9e9bxs", videoTitle: "Memory" },
  ],
  science: [
    { videoId: "QnQe0xW_JY4", videoTitle: "Living things" },
    { videoId: "ZM8ECpBuQYE", videoTitle: "Forces and motion" },
    { videoId: "sQK3Yr4Sc_k", videoTitle: "Photosynthesis" },
    { videoId: "libKVRa01L8", videoTitle: "Earth and space" },
  ],
  history: [
    { videoId: "Yocja_N5s1I", videoTitle: "Timelines and sources" },
    { videoId: "n7ndRwqJYDM", videoTitle: "Historical evidence" },
  ],
  geography: [
    { videoId: "93LLwiMjDko", videoTitle: "What is geography?" },
    { videoId: "HCDVN7DCzYE", videoTitle: "Earth systems" },
  ],
  "health-wellbeing": [
    { videoId: "xyQY8a-ng6g", videoTitle: "Food and the brain" },
    { videoId: "5MuIMqhT8DM", videoTitle: "Healthy sleep habits" },
    { videoId: "w6T02g5hnT4", videoTitle: "Wellbeing basics" },
  ],
  "digital-skills": [
    { videoId: "vNpkUyEOa_8", videoTitle: "Online safety" },
    { videoId: "pLlv2o6UfTU", videoTitle: "Digital research" },
  ],
  "career-skills": [
    { videoId: "HAnw168huqA", videoTitle: "Workplace skills" },
    { videoId: "Tt08KmFfIYQ", videoTitle: "CV and applications" },
  ],
  psychology: [
    { videoId: "vo4pMVb0R6M", videoTitle: "Psychology intro" },
    { videoId: "bSycdIx-C48", videoTitle: "Memory" },
    { videoId: "UGxGDdQnC1Y", videoTitle: "Social influence" },
  ],
  philosophy: [
    { videoId: "1A_CAkYt3GY", videoTitle: "Philosophy intro" },
    { videoId: "NKEhdsnKKHs", videoTitle: "How to argue" },
    { videoId: "3_t4obUc51A", videoTitle: "Ethics" },
  ],
  sociology: [
    { videoId: "YnCJU6PaCio", videoTitle: "Sociology intro" },
    { videoId: "DbTt_ySTjaY", videoTitle: "Sociological paradigms" },
  ],
  economics: [
    { videoId: "3ez10ADR_gM", videoTitle: "Economics intro" },
    { videoId: "LwLh6ax0zTE", videoTitle: "Supply and demand" },
  ],
  astronomy: [
    { videoId: "0rHUDWjR5gg", videoTitle: "Astronomy intro" },
    { videoId: "libKVRa01L8", videoTitle: "Solar system" },
    { videoId: "0fKBhvDjuy0", videoTitle: "Powers of Ten" },
  ],
  "artificial-intelligence": [
    { videoId: "a0_lo_GDcFw", videoTitle: "AI intro" },
    { videoId: "4qVRBYAdLAo", videoTitle: "Supervised learning" },
    { videoId: "aircAruvnKk", videoTitle: "Neural networks" },
  ],
  robotics: [
    { videoId: "vVTA-E3G8bQ", videoTitle: "Robots intro" },
    { videoId: "O5nskjZ_GoI", videoTitle: "Computing foundations" },
  ],
  english: [
    { videoId: "saF3-f0XWAY", videoTitle: "Phonics" },
    { videoId: "HAnw168huqA", videoTitle: "Communication" },
    { videoId: "E7CwqNHn_Ns", videoTitle: "Organising ideas" },
  ],
  geometry: [
    { videoId: "AAY1bsazcgM", videoTitle: "Perimeter" },
    { videoId: "xCdxURXMdFY", videoTitle: "Area" },
    { videoId: "O-cawByg2aA", videoTitle: "Circles" },
  ],
  statistics: [
    { videoId: "h8EYEJ32oQ8", videoTitle: "Statistics intro" },
    { videoId: "k3aKKasOmIw", videoTitle: "Mean median mode" },
  ],
  biology: [
    { videoId: "QnQe0xW_JY4", videoTitle: "Biology intro" },
    { videoId: "sQK3Yr4Sc_k", videoTitle: "Photosynthesis" },
  ],
  chemistry: [
    { videoId: "FSyAehMdpyI", videoTitle: "Chemistry intro" },
    { videoId: "bka20Q9TN6M", videoTitle: "Chemistry basics" },
  ],
  physics: [
    { videoId: "ZM8ECpBuQYE", videoTitle: "Physics intro" },
    { videoId: "00jbG_cfGuQ", videoTitle: "Energy in living systems" },
  ],
  computing: [
    { videoId: "O5nskjZ_GoI", videoTitle: "Computing intro" },
    { videoId: "HXV3zeQKqGY", videoTitle: "Databases" },
  ],
  cybersecurity: [
    { videoId: "inWWhr5tnEA", videoTitle: "Cybersecurity intro" },
    { videoId: "sdpxddDzXfE", videoTitle: "Protecting data" },
  ],
};

function hashSlug(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

/** Topic-accurate Learn video for each subject/lesson (including track categories). */
export function videoForLesson(subjectSlug: string, lessonSlug: string): VideoRef {
  return resolveLessonVideo(subjectSlug, lessonSlug);
}

/** Secondary clip for Practice steps (related topic walkthrough). */
export function practiceVideoForLesson(subjectSlug: string, lessonSlug: string): VideoRef {
  const learn = resolveLessonVideo(subjectSlug, lessonSlug);
  const pool = LESSON_VIDEO_POOL[subjectSlug];
  if (pool?.length) {
    const alt = pool[(hashSlug(lessonSlug) + 1) % pool.length];
    if (alt && alt.videoId !== learn.videoId) return alt;
  }
  return learn;
}

