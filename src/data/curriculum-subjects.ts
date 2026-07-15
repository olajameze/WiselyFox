import type { CurriculumSubject } from "@/data/curriculum";

/**
 * Science, History, Geography, Health & Wellbeing, and Digital Skills.
 * Lessons mix reading, video, practice, discussion, and drawing methods.
 */
export const ADDITIONAL_SUBJECTS: CurriculumSubject[] = [
  {
    slug: "science",
    title: "Science",
    description: "Living things, forces, materials, Earth & space, explore how the world works.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Science asks questions, tests ideas, and uses evidence. Mix watching, reading, hands on practice, and discussion, different methods suit different brains.",
      sections: [
        {
          title: "Scientific thinking",
          content:
            "Observe carefully, ask a question, predict, test fairly, and record results. Change one variable at a time so you know what caused the change.",
          tips: ["Write predictions before experiments.", "It's okay if results surprise you, that's science."],
        },
        {
          title: "Living things",
          content:
            "All living things need food/water, grow, reproduce, respond, and (most) move. Plants make food by photosynthesis; animals eat plants or other animals.",
          tips: ["Draw life cycles to remember stages.", "Use a magnifying glass safely outdoors."],
        },
        {
          title: "Forces & energy",
          content:
            "Forces push or pull. Gravity pulls objects down. Friction opposes motion. Energy transfers when things move, heat, light, or sound.",
          tips: ["Roll balls on different surfaces to feel friction.", "Label forces on diagrams."],
        },
        {
          title: "Materials & Earth",
          content:
            "Materials have properties: hard, flexible, magnetic, transparent. Earth has layers; weather is driven by the Sun and water cycle.",
          tips: ["Sort household objects by property.", "Track weather for a week."],
        },
      ],
    },
    lessons: [
      {
        slug: "living-things",
        title: "Living things & habitats",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "Name three living things near you. What do they all need to survive?", method: "discuss", tip: "Think: food, water, air, shelter." },
          {
            title: "Learn",
            content: "Living things grow, reproduce, respond, and need energy. A habitat provides what a species needs, pond, forest, or city park.",
            method: "watch",
            tip: "After the video, name one living and one non-living thing.",
          },
          { title: "Practice", content: "Draw a habitat (e.g. garden). Label food, water, shelter, and two animals that live there.", method: "draw", tip: "Use arrows to show who eats what." },
          { title: "Review", content: "Scientists classify living things to study patterns. Your habitat map shows relationships in an ecosystem.", method: "read", tip: "Compare with a friend, did you spot different details?" },
        ],
      },
      {
        slug: "forces-motion",
        title: "Forces & motion",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "Push a book gently, then harder. What changed?", method: "practice", tip: "Force changes speed or direction." },
          {
            title: "Learn",
            content: "Forces are pushes or pulls. Gravity pulls objects toward Earth. Friction slows things on rough surfaces.",
            method: "watch",
            tip: "Notice gravity when you drop a pencil.",
          },
          { title: "Practice", content: "Roll a toy on carpet vs smooth floor. Which stops first? Why?", method: "practice", tip: "Friction is higher on carpet." },
          { title: "Review", content: "Unbalanced forces change motion; balanced forces keep steady speed.", method: "quiz", tip: "Draw arrows for push, pull, friction." },
        ],
      },
      {
        slug: "materials-matter",
        title: "Materials & properties",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Pick five objects. Are they solid, liquid, or gas at room temperature?", method: "practice", tip: "Water can be all three!" },
          {
            title: "Learn",
            content: "Materials have properties: conductivity, magnetism, solubility, hardness. Scientists choose materials for jobs, copper for wires, rubber for grips.",
            method: "read",
            tip: "Properties are tested, not guessed.",
          },
          { title: "Practice", content: "Sort items at home: magnetic? transparent? waterproof?", method: "practice", tip: "Make a table with tick marks." },
          { title: "Review", content: "Particle model: solids vibrate in place, liquids flow, gases spread out.", method: "draw", tip: "Sketch particle diagrams for each state." },
        ],
      },
      {
        slug: "earth-space",
        title: "Earth, Moon & space",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "Why do we get day and night?", method: "discuss", tip: "Earth spins, one rotation ≈ 24 hours." },
          {
            title: "Learn",
            content: "Earth orbits the Sun yearly; the Moon orbits Earth monthly. Phases of the Moon are caused by how much sunlit side we see.",
            method: "watch",
            tip: "Watch the sky for the Moon this week.",
          },
          { title: "Practice", content: "Sketch Earth, Sun, and Moon for day vs night on your location.", method: "draw", tip: "Label day side and night side." },
          { title: "Review", content: "Space science uses models, your diagram is a scientific model.", method: "read", tip: "NASA and ESA publish free images to explore." },
        ],
      },
    ],
    questions: [
      { prompt: "Living things need…", options: ["Food and water", "Only TV", "Nothing", "Only sleep"], correctAnswer: "Food and water", explanation: "Life needs energy and water.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Gravity is a…", options: ["Pull toward Earth", "Type of plant", "Form of light", "Sound wave"], correctAnswer: "Pull toward Earth", explanation: "Gravity attracts mass.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Friction…", options: ["Opposes motion", "Speeds everything up", "Only happens in space", "Removes mass"], correctAnswer: "Opposes motion", explanation: "Friction acts against sliding.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Day and night are caused by…", options: ["Earth rotating", "The Moon disappearing", "Clouds", "Seasons only"], correctAnswer: "Earth rotating", explanation: "Rotation gives day/night cycle.", difficulty: 2, ageBand: "11-13" },
      { prompt: "A fair test changes…", options: ["One variable", "Every variable at once", "Nothing", "Only the scientist"], correctAnswer: "One variable", explanation: "Fair tests isolate cause.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Photosynthesis happens mainly in…", options: ["Plant leaves", "Rocks", "Metal", "Plastic"], correctAnswer: "Plant leaves", explanation: "Chlorophyll in leaves traps light.", difficulty: 2, ageBand: "11-13" },
    ],
  },
  {
    slug: "history",
    title: "History",
    description: "Timelines, sources, and how the past shapes today.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "History uses evidence from sources, letters, photos, artefacts, accounts. Read, watch, discuss, and check facts like a historian.",
      sections: [
        { title: "Timelines", content: "Order events on a timeline: BCE/CE or centuries. Duration and sequence matter.", tips: ["Make a family timeline first.", "Use scale: 100 years vs 10 years."] },
        { title: "Sources", content: "Primary sources were created at the time; secondary sources interpret later. Ask: who, when, why?", tips: ["Compare two sources on the same event.", "Spot bias, all sources have a viewpoint."] },
        { title: "Change & cause", content: "Historians ask what changed and why. Causes can be social, economic, political, or technological.", tips: ["Use 'because' chains.", "Avoid present-day judgment without context."] },
        { title: "Local & world", content: "Connect local history to national and global stories.", tips: ["Visit a local museum or archive online.", "Interview grandparents respectfully."] },
      ],
    },
    lessons: [
      {
        slug: "timelines-basics",
        title: "Timelines & chronology",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Put these in order: you were born, your school opened, dinosaurs lived.", method: "discuss", tip: "Dinosaurs are millions of years ago!" },
          { title: "Learn", content: "A timeline shows when events happened. Dates go left (earlier) to right (later) or top to bottom.", method: "read", tip: "Centuries: 1900s = 1900 to 1999." },
          { title: "Practice", content: "Draw a timeline of your life with five events.", method: "draw", tip: "Add years if you know them." },
          { title: "Review", content: "Chronology stops us confusing 'before' and 'after'.", method: "quiz", tip: "Teach your timeline to someone." },
        ],
      },
      {
        slug: "primary-sources",
        title: "Primary & secondary sources",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "Is a Roman coin primary or secondary?", method: "discuss", tip: "Was it from the time itself?" },
          { title: "Learn", content: "Primary = from the time studied (diary, photo, artefact). Secondary = later analysis (textbook, documentary).", method: "read", tip: "Both are useful, check reliability." },
          { title: "Practice", content: "Find one primary and one secondary source about any topic online with a parent.", method: "practice", tip: "Note who created each." },
          { title: "Review", content: "Good historians cross-check sources.", method: "quiz", tip: "Ask: what is missing from this source?" },
        ],
      },
      {
        slug: "industrial-change",
        title: "Industrial change",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "How did machines change where people worked?", method: "discuss", tip: "Farm → factory → office over centuries." },
          { title: "Learn", content: "The Industrial Revolution shifted production to factories, cities grew, and transport (railways) expanded trade.", method: "read", tip: "Technology, work, and daily life all changed." },
          { title: "Practice", content: "List three modern technologies and their effects on jobs.", method: "practice", tip: "Think computers, AI, renewable energy." },
          { title: "Review", content: "Change brings benefits and challenges, historians weigh both.", method: "discuss", tip: "Compare with a parent: what changed in their lifetime?" },
        ],
      },
      {
        slug: "history-skills",
        title: "Writing like a historian",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "What is the difference between fact and interpretation?", method: "discuss", tip: "Facts have evidence; interpretations argue." },
          { title: "Learn", content: "Structure essays: introduction, explained paragraphs (PEEL: Point, Evidence, Explain, Link), conclusion.", method: "read", tip: "Every claim needs evidence from a source." },
          { title: "Practice", content: "Write one PEEL paragraph about any historical event you know.", method: "practice", tip: "Quote or reference a source." },
          { title: "Review", content: "Clear writing shows clear thinking.", method: "quiz", tip: "Swap with a parent for feedback." },
        ],
      },
    ],
    questions: [
      { prompt: "A timeline shows…", options: ["Order of events", "Only colours", "Future weather", "Maths sums"], correctAnswer: "Order of events", explanation: "Timelines show chronology.", difficulty: 1, ageBand: "8-10" },
      { prompt: "A Roman coin is a…", options: ["Primary source", "Secondary source", "Fiction novel", "Modern blog"], correctAnswer: "Primary source", explanation: "Artefacts from the time are primary.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Historians cross-check sources to…", options: ["Improve reliability", "Avoid all reading", "Delete evidence", "Skip dates"], correctAnswer: "Improve reliability", explanation: "Multiple sources strengthen arguments.", difficulty: 2, ageBand: "11-13" },
      { prompt: "PEEL paragraphs include…", options: ["Evidence", "Only jokes", "No links", "Random guesses"], correctAnswer: "Evidence", explanation: "Point, Evidence, Explain, Link.", difficulty: 3, ageBand: "14-16" },
    ],
  },
  {
    slug: "geography",
    title: "Geography",
    description: "Maps, climates, people & places, from local to global.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Geography links places, people, and environments. Use maps, data, photos, and field observation.",
      sections: [
        { title: "Maps & skills", content: "Read keys, scale, compass directions, and grid references. Maps are models of Earth.", tips: ["Try OS maps online.", "Draw a map of your route to school."] },
        { title: "Weather & climate", content: "Weather is short term; climate is long term pattern. The Sun and water cycle drive weather.", tips: ["Log weather for a week.", "Compare UK vs equator climates."] },
        { title: "Human geography", content: "Cities, migration, trade, and culture shape landscapes.", tips: ["Why do people live near rivers?", "Discuss fair trade."] },
        { title: "Sustainability", content: "Resources are finite. Geography helps us plan sustainable futures.", tips: ["Reduce, reuse, recycle locally.", "Study renewable energy maps."] },
      ],
    },
    lessons: [
      {
        slug: "maps-skills",
        title: "Maps & directions",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Which way is north from where you sit?", method: "practice", tip: "Use a compass app with a parent." },
          { title: "Learn", content: "Maps use symbols, keys, and scale. North is usually at the top.", method: "read", tip: "Scale shows real distance." },
          { title: "Practice", content: "Sketch a treasure map of a room with a key and compass rose.", method: "draw", tip: "Include at least five symbols." },
          { title: "Review", content: "Cartographers simplify the world so we can navigate.", method: "quiz", tip: "Give your map to someone to follow." },
        ],
      },
      {
        slug: "weather-climate",
        title: "Weather & climate",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "What's the difference between weather today and climate over 30 years?", method: "discuss", tip: "Climate is the long term average." },
          { title: "Learn", content: "The water cycle: evaporation, condensation, precipitation. Oceans and the Sun power weather systems.", method: "watch", tip: "Draw the cycle after watching." },
          { title: "Practice", content: "Record temperature and conditions for five days.", method: "practice", tip: "Same time each day is fairer." },
          { title: "Review", content: "Climate change shifts long term patterns, geography helps us respond.", method: "read", tip: "Compare notes with Met Office learning resources." },
        ],
      },
      {
        slug: "population-places",
        title: "Population & settlements",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Why do cities grow near rivers or coasts?", method: "discuss", tip: "Water, trade, transport." },
          { title: "Learn", content: "Population density varies. Push factors (drought, conflict) and pull factors (jobs, safety) drive migration.", method: "read", tip: "Data tables and choropleth maps show patterns." },
          { title: "Practice", content: "Find population data for two countries and compare one reason for the difference.", method: "practice", tip: "Use official stats sites." },
          { title: "Review", content: "Human geography connects people to place.", method: "quiz", tip: "Discuss migration respectfully, real lives behind data." },
        ],
      },
      {
        slug: "sustainability-geo",
        title: "Sustainability & resources",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 16,
        steps: [
          { title: "Warm up", content: "Name renewable and non-renewable energy sources.", method: "discuss", tip: "Wind/solar vs coal/oil." },
          { title: "Learn", content: "Sustainable development meets today's needs without harming future generations. Geography tracks land use, food, water, and carbon.", method: "read", tip: "UN Sustainable Development Goals give a framework." },
          { title: "Practice", content: "Audit one room: what could use less energy or plastic?", method: "practice", tip: "Small changes add up." },
          { title: "Review", content: "Geographers advise on planning, local actions have global links.", method: "discuss", tip: "Share one change your family could try." },
        ],
      },
    ],
    questions: [
      { prompt: "Map scale tells you…", options: ["Real distance", "Only colours", "Cooking time", "Animal names"], correctAnswer: "Real distance", explanation: "Scale converts map to ground distance.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Climate is…", options: ["Long term weather pattern", "Today's rain only", "A type of rock", "A map symbol"], correctAnswer: "Long term weather pattern", explanation: "Climate averages over decades.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Evaporation is when water…", options: ["Turns to vapour", "Freezes instantly", "Becomes rock", "Disappears forever"], correctAnswer: "Turns to vapour", explanation: "Liquid → gas in the water cycle.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Renewable energy includes…", options: ["Wind power", "Coal only", "Plastic waste", "None"], correctAnswer: "Wind power", explanation: "Wind and solar replenish.", difficulty: 3, ageBand: "14-16" },
    ],
  },
  {
    slug: "health-wellbeing",
    title: "Health & Wellbeing",
    description: "Nutrition, movement, sleep, and mental health basics.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Healthy bodies and minds support learning. These lessons are educational, talk to a trusted adult or GP about personal health concerns.",
      sections: [
        { title: "Balanced living", content: "Food, water, sleep, and movement work together. Routines help growing bodies and brains.", tips: ["Eat a rainbow of fruit/veg.", "Hydrate through the day."] },
        { title: "Physical activity", content: "Activity strengthens heart, bones, and mood. Mix aerobic, strength, and flexibility.", tips: ["60 active minutes daily for many children.", "Find activities you enjoy."] },
        { title: "Mental wellbeing", content: "Feelings are normal. Talk, breathe, rest, and ask for help early.", tips: ["Name emotions without shame.", "Childline/SHOUT exist in the UK if you need support."] },
        { title: "Digital balance", content: "Screens are tools, balance them with sleep, movement, and face to face time.", tips: ["Screen free hour before bed.", "Agree family media rules."] },
      ],
    },
    lessons: [
      {
        slug: "balanced-diet",
        title: "Balanced diet",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Name foods from different groups: fruit, veg, protein, dairy, grains.", method: "discuss", tip: "No single food has everything." },
          { title: "Learn", content: "Eatwell Guide: balance fruit/veg, protein, dairy/alternatives, and starchy carbs. Limit sugary snacks.", method: "read", tip: "Portions grow with age." },
          { title: "Practice", content: "Plan one balanced day of meals on paper.", method: "draw", tip: "Include water." },
          { title: "Review", content: "Good fuel helps focus in lessons.", method: "quiz", tip: "Cook a simple meal with a parent." },
        ],
      },
      {
        slug: "exercise-mood",
        title: "Exercise & mood",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 13,
        steps: [
          { title: "Warm up", content: "How do you feel after a walk or sport?", method: "listen", tip: "Movement releases endorphins." },
          { title: "Learn", content: "Regular activity improves sleep, stress, and concentration. Mix cardio and strength safely.", method: "read", tip: "Warm up and cool down." },
          { title: "Practice", content: "Try 10 minutes of movement: walk, dance, or stretches.", method: "practice", tip: "Notice mood before and after." },
          { title: "Review", content: "Exercise is brain care as well as body care.", method: "discuss", tip: "Schedule movement like study blocks." },
        ],
      },
      {
        slug: "sleep-hygiene",
        title: "Sleep & learning",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "How many hours did you sleep last night?", method: "discuss", tip: "Many teens need 8 to 10 hours." },
          { title: "Learn", content: "Sleep consolidates memory and regulates mood. Screens late at night can delay melatonin.", method: "read", tip: "Same bedtime helps circadian rhythm." },
          { title: "Practice", content: "Design a 30-minute wind-down routine without screens.", method: "practice", tip: "Reading, shower, calm music." },
          { title: "Review", content: "Better sleep = better recall in quizzes.", method: "quiz", tip: "Try your routine tonight." },
        ],
      },
      {
        slug: "mental-health-basics",
        title: "Mental health awareness",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "Name three emotions you felt this week.", method: "listen", tip: "All feelings are valid." },
          { title: "Learn", content: "Mental health exists on a spectrum. Stress, anxiety, and low mood are common, talking helps. Serious concerns need trusted adults or professionals.", method: "read", tip: "UK: Childline 0800 1111, SHOUT 85258." },
          { title: "Practice", content: "Write three coping strategies that work for you (walk, music, talk).", method: "practice", tip: "Avoid harmful coping." },
          { title: "Review", content: "Asking for help is strength, not weakness.", method: "discuss", tip: "Share strategies with a parent." },
        ],
      },
    ],
    questions: [
      { prompt: "A balanced diet includes…", options: ["Variety of food groups", "Only sweets", "Skipping water", "One food only"], correctAnswer: "Variety of food groups", explanation: "Balance fuels growth and focus.", difficulty: 1, ageBand: "8-10" },
      { prompt: "Exercise can improve…", options: ["Mood and focus", "Only shoe size", "Homework difficulty always", "Nothing"], correctAnswer: "Mood and focus", explanation: "Activity supports mental and physical health.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Sleep helps the brain…", options: ["Consolidate memories", "Delete all learning", "Avoid growth", "Skip emotions"], correctAnswer: "Consolidate memories", explanation: "Sleep supports memory.", difficulty: 2, ageBand: "11-13" },
      { prompt: "If worried about mental health, you should…", options: ["Talk to a trusted adult", "Keep silent always", "Ignore feelings", "Only use screens"], correctAnswer: "Talk to a trusted adult", explanation: "Early support helps.", difficulty: 2, ageBand: "14-16" },
    ],
  },
  {
    slug: "digital-skills",
    title: "Digital Skills",
    description: "Online safety, research, typing, and tools for school and work.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Digital skills blend reading, watching tutorials, practising safely, and discussing rules with parents.",
      sections: [
        { title: "Online safety", content: "Protect passwords, privacy, and wellbeing. Think before you post.", tips: ["Never share passwords.", "Tell an adult about uncomfortable messages."] },
        { title: "Research online", content: "Check who wrote it, when, and why. Compare multiple sites.", tips: ["Use .edu, .gov, and library databases.", "Avoid single anonymous posts."] },
        { title: "Productivity tools", content: "Documents, slides, and calendars organise school and work.", tips: ["Name files clearly.", "Back up important work."] },
        { title: "Digital citizenship", content: "Respect others, credit sources, and understand your digital footprint.", tips: ["Kindness applies online too.", "Future employers may check public posts."] },
      ],
    },
    lessons: [
      {
        slug: "online-safety",
        title: "Staying safe online",
        ageBand: "8-10",
        difficulty: 1,
        durationMinutes: 13,
        steps: [
          { title: "Warm up", content: "What should you never share online?", method: "discuss", tip: "Passwords, address, school uniform photos to strangers." },
          { title: "Learn", content: "Strong passwords, privacy settings, and telling a trusted adult about bullying or scary messages.", method: "read", tip: "Think: would I say this face to face?" },
          { title: "Practice", content: "With a parent, check privacy settings on one app or game.", method: "practice", tip: "Use nicknames where possible." },
          { title: "Review", content: "Digital safety is part of health.", method: "quiz", tip: "Agree family rules together." },
        ],
      },
      {
        slug: "digital-research",
        title: "Research on the web",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          { title: "Warm up", content: "How do you know if a website is trustworthy?", method: "discuss", tip: "Author, date, evidence." },
          { title: "Learn", content: "CRAAP: Currency, Relevance, Authority, Accuracy, Purpose. Triangulate facts across sources.", method: "read", tip: "Wikipedia can be a start, not the finish." },
          { title: "Practice", content: "Research one fact from three different sites. Do they agree?", method: "practice", tip: "Log URLs in a table." },
          { title: "Review", content: "Good research saves time and prevents misinformation.", method: "quiz", tip: "Use library databases when available." },
        ],
      },
      {
        slug: "documents-slides",
        title: "Documents & presentations",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          { title: "Warm up", content: "What makes a slide easy to read?", method: "discuss", tip: "Few words, clear images." },
          { title: "Learn", content: "Use headings, bullet points, consistent fonts, and accessible colours. Slides support your talk, they are not a script.", method: "read", tip: "Alt text helps screen readers." },
          { title: "Practice", content: "Make a 3-slide deck teaching one lesson topic.", method: "practice", tip: "One idea per slide." },
          { title: "Review", content: "Clear design respects your audience.", method: "discuss", tip: "Present to a parent." },
        ],
      },
      {
        slug: "typing-accessibility",
        title: "Typing & accessibility",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 12,
        steps: [
          { title: "Warm up", content: "Try typing without looking, which keys are hardest?", method: "practice", tip: "Home row: ASDF JKL;" },
          { title: "Learn", content: "Touch typing and keyboard shortcuts save time. Accessibility tools (speech-to-text, high contrast) help every learner.", method: "read", tip: "WiselyFox accessibility settings support dyslexia friendly modes." },
          { title: "Practice", content: "Type a short paragraph using proper posture and both hands.", method: "practice", tip: "Feet flat, screen at eye level." },
          { title: "Review", content: "Digital skills include inclusive design.", method: "quiz", tip: "Explore one accessibility setting." },
        ],
      },
    ],
    questions: [
      { prompt: "You should tell an adult if…", options: ["Someone online bullies you", "You ate lunch", "You finished homework", "The sun is out"], correctAnswer: "Someone online bullies you", explanation: "Adults can help keep you safe.", difficulty: 1, ageBand: "8-10" },
      { prompt: "CRAAP checks…", options: ["Source quality", "Cooking time", "Sports scores", "Video length"], correctAnswer: "Source quality", explanation: "Currency, Relevance, Authority, Accuracy, Purpose.", difficulty: 2, ageBand: "11-13" },
      { prompt: "Good slides have…", options: ["Clear headings", "Paragraphs of tiny text", "Fifty animations", "No structure"], correctAnswer: "Clear headings", explanation: "Clarity beats clutter.", difficulty: 2, ageBand: "14-16" },
      { prompt: "Accessibility tools help…", options: ["Different learning needs", "Only one person", "Hackers", "Nobody"], correctAnswer: "Different learning needs", explanation: "Inclusive tools support everyone.", difficulty: 2, ageBand: "11-13" },
    ],
  },
];
