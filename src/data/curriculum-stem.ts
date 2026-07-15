import type { CurriculumLesson, CurriculumQuestion, CurriculumSubject, LessonStep } from "@/data/curriculum";

function lesson(
  slug: string,
  title: string,
  ageBand: string,
  difficulty: number,
  durationMinutes: number,
  warm: string,
  learn: string,
  practice: string,
  review: string,
  tips: { warm?: string; learn?: string; practice?: string; review?: string } = {},
): CurriculumLesson {
  const steps: LessonStep[] = [
    { title: "Warm up", content: warm, tip: tips.warm ?? "Take a calm breath and begin." },
    { title: "Learn", content: learn, tip: tips.learn ?? "Watch carefully, then pause and note one idea.", method: "watch" },
    { title: "Practice", content: practice, tip: tips.practice ?? "Show your work or thinking.", method: "practice" },
    { title: "Review", content: review, tip: tips.review ?? "Share one takeaway with a parent.", method: "discuss" },
  ];
  return { slug, title, ageBand, difficulty, durationMinutes, steps };
}

function q(
  prompt: string,
  correctAnswer: string,
  options: string[],
  explanation: string,
  difficulty: number,
  ageBand: string,
): CurriculumQuestion {
  return { prompt, options, correctAnswer, explanation, difficulty, ageBand };
}

/**
 * STEM and language subjects commonly learned online:
 * AI, robotics, English, geometry, statistics, biology, chemistry, physics,
 * computing, and cybersecurity.
 */
export const STEM_SUBJECTS: CurriculumSubject[] = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "How AI works, how to use it helpfully, and how to stay safe and honest with AI tools.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "AI systems learn patterns from data to make predictions or generate text and images. Use AI as a helper, check its answers, and never share private details.",
      sections: [
        {
          title: "What AI is",
          content:
            "Artificial intelligence means software that can perform tasks that usually need human judgment, such as recognising images, suggesting words, or classifying spam. Most modern AI uses machine learning from examples.",
          tips: ["Ask what the system was trained to do.", "Separate sci-fi from real tools."],
        },
        {
          title: "How machine learning works",
          content:
            "Supervised learning uses labelled examples. Neural networks stack simple units to find patterns. Models can be wrong, biased, or outdated, so humans must check important results.",
          tips: ["More data is not always better data.", "Test with examples you know."],
        },
        {
          title: "Using AI well",
          content:
            "Clear prompts, short goals, and verification help. Use AI to brainstorm, explain, or practise, then rewrite in your own words. Credit help when school rules require it.",
          tips: ["Never paste passwords or personal data.", "Compare AI output with a trusted source."],
        },
        {
          title: "Ethics and safety",
          content:
            "AI can copy bias, invent facts, or misuse images. Ask permission before uploading photos of people. Choose tools with a parent when unsure.",
          tips: ["If it sounds too confident, double-check.", "Ask who benefits from the tool."],
        },
      ],
    },
    lessons: [
      lesson(
        "what-is-ai",
        "What is artificial intelligence?",
        "11-13",
        2,
        14,
        "Name one app that suggests videos, words, or photos.",
        "AI software uses data and algorithms to pursue goals like classifying images or predicting the next word. It is powerful, but not magic and not always correct.",
        "List three AI tools you have seen and what each tries to do.",
        "AI is pattern-based software that still needs human judgment.",
        { learn: "Note one thing AI can and cannot do." },
      ),
      lesson(
        "machine-learning-basics",
        "Machine learning basics",
        "14-16",
        3,
        15,
        "How does a spam filter improve over time?",
        "Machine learning improves from examples. Supervised learning uses labelled data. Neural networks combine many simple units to model complex patterns.",
        "Write a tiny labelled dataset: three emails marked spam or not spam.",
        "Learning from data is powerful when labels and checks are careful.",
      ),
      lesson(
        "using-ai-tools",
        "Using AI tools helpfully",
        "14-16",
        2,
        14,
        "When might AI help with homework without replacing your thinking?",
        "Good use of AI includes clarifying a topic, generating practice questions, or outlining ideas. Always rewrite, verify facts, and follow family or school rules.",
        "Write one clear prompt asking AI to explain fractions for a younger learner.",
        "Clear prompts plus checking equals responsible use.",
        { practice: "Keep the prompt specific and kind." },
      ),
      lesson(
        "ai-ethics-safety",
        "AI ethics and safety",
        "17-19",
        3,
        15,
        "Why might an AI answer sound confident but still be wrong?",
        "AI can invent details, reflect biased data, or misuse personal images. Protect privacy, ask consent, and treat AI output as a draft to verify.",
        "List two privacy rules for using AI with a parent.",
        "Safe AI use protects people and truth.",
      ),
    ],
    questions: [
      q("AI systems mainly learn from…", "Patterns in data", ["Patterns in data", "Magic spells", "Guessing only", "Ignoring examples"], "Machine learning uses data patterns.", 2, "11-13"),
      q("Supervised learning uses…", "Labelled examples", ["Labelled examples", "No data", "Only rumours", "Random passwords"], "Labels guide training.", 3, "14-16"),
      q("A responsible AI habit is…", "Checking facts and protecting privacy", ["Checking facts and protecting privacy", "Sharing PINs with bots", "Trusting every answer", "Uploading private photos freely"], "Verify and protect data.", 2, "14-16"),
      q("Confident AI answers…", "Can still be wrong", ["Can still be wrong", "Are always perfect", "Never need checking", "Replace all teachers"], "Humans must verify important claims.", 3, "17-19"),
    ],
  },
  {
    slug: "robotics",
    title: "Robotics",
    description: "Robots, sensors, control, and how machines sense and act in the physical world.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Robotics combines mechanics, electronics, and software so machines can sense, decide, and act. Safety and clear goals come first.",
      sections: [
        {
          title: "What robots are",
          content:
            "A robot is a machine that can sense its environment and act with some autonomy or remote control. Robots range from factory arms to vacuum cleaners and exploration vehicles.",
          tips: ["Not every automatic machine is a robot.", "Look for sense, decide, act."],
        },
        {
          title: "Sensors and actuators",
          content:
            "Sensors gather input such as distance or light. Actuators move parts such as motors and grippers. Controllers run the program that links sensing to action.",
          tips: ["Name the sensor in a toy robot.", "Trace input to output."],
        },
        {
          title: "Control and programming",
          content:
            "Robots follow instructions: loops, conditions, and sometimes learning. Clear steps reduce mistakes. Test in safe spaces with a parent for real hardware.",
          tips: ["Start with simple sequences.", "Change one thing at a time when debugging."],
        },
        {
          title: "Robots and people",
          content:
            "Robots assist in medicine, farming, and exploration. Humans set goals and safety rules. Ethics asks who is responsible when a robot errs.",
          tips: ["Ask who controls the robot.", "Keep people in the decision loop for high-risk tasks."],
        },
      ],
    },
    lessons: [
      lesson(
        "what-is-a-robot",
        "What is a robot?",
        "11-13",
        2,
        13,
        "Is a microwave a robot? Why or why not?",
        "Robots sense, decide, and act. Stories about ancient automatons show people have long imagined helpful machines, but modern robots rely on real sensors and code.",
        "Draw a simple robot and label sense, decide, and act.",
        "Sense, decide, act is the core robotics idea.",
      ),
      lesson(
        "sensors-actuators",
        "Sensors and actuators",
        "11-13",
        2,
        14,
        "Name one sensor in a phone.",
        "Sensors measure the world. Actuators create movement or force. Together with a controller, they let robots respond.",
        "Match three sensors to what they measure (light, distance, sound).",
        "Good robots need good sensing and careful action.",
      ),
      lesson(
        "robot-control",
        "Controlling a robot",
        "14-16",
        3,
        14,
        "What happens if a robot program misses a stop condition?",
        "Control programs use sequences, loops, and conditions. Safe testing, emergency stops, and clear goals protect people and machines.",
        "Write 5 steps for a robot to tidy a desk safely.",
        "Clear control steps prevent confusion.",
      ),
      lesson(
        "robots-and-society",
        "Robots and society",
        "14-16",
        3,
        14,
        "Where have you seen robots helping people?",
        "Robots can assist with dangerous or repetitive work. People remain responsible for goals, maintenance, and ethical use.",
        "List one benefit and one risk of a home robot.",
        "Human values should guide robot design.",
      ),
    ],
    questions: [
      q("A robot typically…", "Senses, decides, and acts", ["Senses, decides, and acts", "Only prints paper", "Never uses sensors", "Is always human"], "Sense-decide-act defines robotics.", 2, "11-13"),
      q("An actuator…", "Creates movement or force", ["Creates movement or force", "Only stores photos", "Blocks all sensors", "Deletes programs"], "Actuators move parts.", 2, "11-13"),
      q("Safe robot testing needs…", "Clear steps and supervision", ["Clear steps and supervision", "No rules", "Ignoring parents", "Skipping stop conditions"], "Safety first.", 3, "14-16"),
      q("People stay responsible for…", "Goals and ethical use of robots", ["Goals and ethical use of robots", "Nothing at all", "Only paint colour", "Ignoring errors"], "Humans set purpose and limits.", 3, "14-16"),
    ],
  },
  {
    slug: "english",
    title: "English",
    description: "Reading, grammar, clear writing, and confident speaking for school and life.",
    ageBands: ["5-7", "8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "English skills help you understand texts, write clearly, and speak with respect. Practise a little every day.",
      sections: [
        {
          title: "Reading for meaning",
          content:
            "Find the main idea, supporting details, and the writer's purpose. Ask what evidence supports a claim.",
          tips: ["Underline key sentences.", "Summarise in your own words."],
        },
        {
          title: "Grammar and sentences",
          content:
            "Subjects, verbs, and punctuation make meaning clear. Vary sentence length for flow.",
          tips: ["Read sentences aloud.", "Fix one grammar habit at a time."],
        },
        {
          title: "Writing structure",
          content:
            "Plan with a beginning, middle, and end. Use paragraphs for one idea each. Edit after drafting.",
          tips: ["Outline before writing.", "Cut words that do not help."],
        },
        {
          title: "Speaking and listening",
          content:
            "Clear speaking uses short points and eye contact when appropriate. Listening means waiting and responding to the idea.",
          tips: ["Practise with a parent.", "Note one question while listening."],
        },
      ],
    },
    lessons: [
      lesson(
        "reading-main-idea",
        "Reading for the main idea",
        "8-10",
        1,
        12,
        "What is this paragraph mostly about?",
        "The main idea is the big point. Details support it. Titles and topic sentences often help.",
        "Read a short paragraph and write the main idea in one sentence.",
        "Main idea plus details equals understanding.",
      ),
      lesson(
        "sentence-clarity",
        "Clear sentences",
        "11-13",
        2,
        13,
        "Rewrite a confusing sentence you wrote recently.",
        "Clear sentences need a subject and a verb, and they say one main thing. Punctuation guides the reader.",
        "Write three clear sentences about your day.",
        "Clarity helps readers trust your writing.",
      ),
      lesson(
        "paragraph-writing",
        "Building paragraphs",
        "11-13",
        2,
        14,
        "How many main ideas belong in one paragraph?",
        "A paragraph usually holds one idea: topic sentence, support, and a closing link. Planning prevents muddle.",
        "Write a paragraph with a topic sentence and two supporting details.",
        "Structure makes writing easier to follow.",
      ),
      lesson(
        "speaking-with-purpose",
        "Speaking with purpose",
        "14-16",
        2,
        13,
        "What is the purpose of your next short talk?",
        "Good speaking states a purpose, uses short points, and checks that listeners follow. Listening is half the skill.",
        "Prepare a 30-second explanation of a hobby.",
        "Purpose and practice build confidence.",
      ),
    ],
    questions: [
      q("The main idea is…", "The big point of a text", ["The big point of a text", "Only the last word", "A random detail", "The author's birthday"], "Main idea is the core message.", 1, "8-10"),
      q("A clear sentence usually needs…", "A subject and a verb", ["A subject and a verb", "Only emojis", "No punctuation ever", "Twenty clauses"], "Subject + verb builds clarity.", 2, "11-13"),
      q("One paragraph should usually…", "Develop one idea", ["Develop one idea", "Cover ten unrelated topics", "Avoid evidence", "Skip a topic sentence always"], "One idea per paragraph.", 2, "11-13"),
      q("Purposeful speaking starts with…", "Knowing your goal", ["Knowing your goal", "Speaking as fast as possible", "Ignoring listeners", "Never practising"], "Purpose guides the talk.", 2, "14-16"),
    ],
  },
  {
    slug: "geometry",
    title: "Geometry",
    description: "Shapes, perimeter, area, and spatial reasoning with clear visual methods.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Geometry studies shapes and space. Draw, measure, and check units carefully.",
      sections: [
        {
          title: "Shapes and properties",
          content: "Polygons have straight sides. Know triangles, rectangles, and circles by their properties.",
          tips: ["Sketch before calculating.", "Label side lengths."],
        },
        {
          title: "Perimeter",
          content: "Perimeter is the distance around a shape. Add side lengths carefully.",
          tips: ["Check you counted every side.", "Use the same units."],
        },
        {
          title: "Area",
          content: "Area measures surface in square units. Rectangles use length × width. Triangles use ½ base × height.",
          tips: ["Draw the height.", "State square units."],
        },
        {
          title: "Circles",
          content: "Circumference uses π × diameter. Area uses π × radius². Keep π clear in working.",
          tips: ["Know radius vs diameter.", "Estimate before exact calc."],
        },
      ],
    },
    lessons: [
      lesson("shapes-basics", "Shapes and properties", "8-10", 1, 12, "Name three shapes in the room.", "Shapes have sides, corners, and sometimes curved edges. Naming properties helps you compare them.", "List properties of a square and a triangle.", "Properties help you classify shapes."),
      lesson("perimeter-practice", "Perimeter", "8-10", 2, 13, "What does perimeter measure?", "Perimeter is the path around a polygon. Add all outer sides.", "Find the perimeter of a 3 by 5 rectangle.", "Add every side once."),
      lesson("area-rectangles", "Area of rectangles and triangles", "11-13", 2, 14, "Why do we use square units for area?", "Area of a rectangle is length × width. Area of a triangle is ½ base × height.", "Calculate area of a triangle with base 8 and height 5.", "State the formula before numbers."),
      lesson("circles-intro", "Circles: circumference and area", "11-13", 3, 14, "How are radius and diameter related?", "Circumference ≈ πd. Area ≈ πr². Keep track of diameter versus radius.", "If radius is 3, write expressions for circumference and area.", "Do not mix radius and diameter."),
    ],
    questions: [
      q("Perimeter measures…", "Distance around a shape", ["Distance around a shape", "Space inside only", "Temperature", "Speed"], "Perimeter goes around.", 1, "8-10"),
      q("Area of a rectangle is…", "Length times width", ["Length times width", "Length plus width", "Only the diagonal", "Perimeter squared"], "A = l × w.", 2, "11-13"),
      q("Area of a triangle is…", "Half base times height", ["Half base times height", "Base plus height", "Base times height times 2", "Perimeter only"], "A = ½bh.", 2, "11-13"),
      q("Diameter is…", "Twice the radius", ["Twice the radius", "Half the radius", "Equal to area", "Always π"], "d = 2r.", 3, "11-13"),
    ],
  },
  {
    slug: "statistics",
    title: "Statistics",
    description: "Mean, median, mode, and reading data carefully without jumping to unfair claims.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Statistics helps summarise data. Always ask how data was collected and what it can fairly show.",
      sections: [
        {
          title: "Collecting data",
          content: "Good questions and fair samples matter. Biased samples mislead.",
          tips: ["Ask who was surveyed.", "Note sample size."],
        },
        {
          title: "Mean, median, mode",
          content: "Mean is the average. Median is the middle value. Mode is the most common value.",
          tips: ["Order data for median.", "Outliers pull the mean."],
        },
        {
          title: "Charts and graphs",
          content: "Bar charts, line graphs, and pie charts show different stories. Check axes and units.",
          tips: ["Read the scale.", "Watch for truncated axes."],
        },
        {
          title: "Fair conclusions",
          content: "Correlation is not always causation. State uncertainty honestly.",
          tips: ["Avoid overclaiming.", "Look for other explanations."],
        },
      ],
    },
    lessons: [
      lesson("data-basics", "Collecting fair data", "11-13", 2, 13, "Why might asking only your friends bias a survey?", "Fair data needs clear questions and a sample that matches the group you care about.", "Write one fair and one biased survey question about favourite snacks.", "Fair samples support fair conclusions."),
      lesson("mean-median-mode", "Mean, median, and mode", "11-13", 2, 14, "Which measure is middle value?", "Mean averages values. Median is middle when ordered. Mode appears most often.", "Find mean, median, and mode of 2, 3, 3, 7.", "Show ordering for the median."),
      lesson("reading-charts", "Reading charts", "14-16", 2, 13, "What should you check first on a graph?", "Read titles, axes, units, and scales before interpreting a chart.", "Describe what a sample bar chart would need to compare two sports clubs.", "Scales can change the story."),
      lesson("careful-claims", "Careful claims from data", "14-16", 3, 14, "Can two things rising together prove one caused the other?", "Data can suggest patterns, but causation needs stronger evidence. State limits clearly.", "Rewrite an overconfident claim into a careful one.", "Honest limits build trust."),
    ],
    questions: [
      q("The median is…", "The middle value when ordered", ["The middle value when ordered", "Always the largest", "Never useful", "Only for words"], "Order then pick middle.", 2, "11-13"),
      q("The mean is…", "The average of the values", ["The average of the values", "The most common value", "The middle always", "A chart title"], "Add and divide for mean.", 2, "11-13"),
      q("A fair sample…", "Represents the group studied", ["Represents the group studied", "Only includes friends", "Ignores the question", "Has zero people"], "Representation matters.", 2, "11-13"),
      q("Correlation…", "Does not always mean causation", ["Does not always mean causation", "Always proves cause", "Means data is fake", "Removes all charts"], "Be careful with cause claims.", 3, "14-16"),
    ],
  },
  {
    slug: "biology",
    title: "Biology",
    description: "Living systems, cells, energy, and how organisms grow and interact.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Biology studies living things. Use evidence, careful observation, and strengths-based curiosity.",
      sections: [
        { title: "Life and cells", content: "Living things are made of cells. Cells need materials and energy to function.", tips: ["Compare plant and animal cells.", "Use diagrams."]},
        { title: "Energy for life", content: "Photosynthesis and respiration move energy through ecosystems.", tips: ["Link sunlight to food chains.", "Name producers and consumers."]},
        { title: "Body systems", content: "Systems work together. Keep language respectful when discussing bodies.", tips: ["Focus on function.", "Ask a trusted adult about health questions."]},
        { title: "Ecosystems", content: "Organisms interact with environments. Changes ripple through food webs.", tips: ["Draw a local food chain.", "Note human impacts carefully."]},
      ],
    },
    lessons: [
      lesson("cells-intro", "Cells and living things", "11-13", 2, 14, "What makes something living?", "Cells are the basic units of life. Biology studies how organisms grow, respond, and reproduce.", "List three characteristics of living things.", "Cells underpin living systems."),
      lesson("photosynthesis-energy", "Energy and photosynthesis", "11-13", 2, 14, "Where do plants get energy?", "Photosynthesis uses light to make sugars. Food chains pass energy to consumers.", "Draw a three-step food chain starting with a plant.", "Sunlight powers most food webs."),
      lesson("respiration-basics", "Respiration and ATP", "14-16", 3, 14, "Why do cells need energy carriers?", "Respiration releases energy from food into usable forms such as ATP for cell work.", "Explain in one sentence why activity increases breathing rate.", "Energy transfer keeps cells working."),
      lesson("ecosystems-intro", "Ecosystems", "14-16", 2, 13, "Name a local habitat.", "Ecosystems include living and non-living parts. Changes to one part can affect others.", "List two living and two non-living factors in a park.", "Connections matter in ecosystems."),
    ],
    questions: [
      q("Cells are…", "Basic units of life", ["Basic units of life", "Only rocks", "Never in plants", "Only computers"], "Life is cellular.", 2, "11-13"),
      q("Photosynthesis mainly happens in…", "Plants and some other producers", ["Plants and some other producers", "Only metals", "Only clouds", "Never with light"], "Producers capture light energy.", 2, "11-13"),
      q("ATP is important because…", "It carries usable energy in cells", ["It carries usable energy in cells", "It replaces food forever", "It is a type of rock", "It stops respiration"], "ATP fuels cell work.", 3, "14-16"),
      q("An ecosystem includes…", "Living and non-living parts", ["Living and non-living parts", "Only one animal", "Only weather apps", "No interactions"], "Ecosystems are connected systems.", 2, "14-16"),
    ],
  },
  {
    slug: "chemistry",
    title: "Chemistry",
    description: "Atoms, elements, reactions, and safe ways to think about matter.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Chemistry studies matter and how it changes. Safety and precise language matter.",
      sections: [
        { title: "Atoms and elements", content: "Atoms make elements. The periodic table organises elements by properties.", tips: ["Learn a few common elements.", "Use models, not guesses."]},
        { title: "Compounds and mixtures", content: "Compounds have fixed ratios. Mixtures can be separated by physical means.", tips: ["Give everyday examples.", "Contrast salt and salad."]},
        { title: "Reactions", content: "Reactions rearrange atoms. Mass is conserved in closed systems.", tips: ["Balance ideas conceptually first.", "Never mix chemicals at home without supervision."]},
        { title: "Safety", content: "Wear protection in labs, follow adult instructions, and respect hazards.", tips: ["Ask before touching chemicals.", "Know emergency steps."]},
      ],
    },
    lessons: [
      lesson("atoms-elements", "Atoms and elements", "11-13", 2, 14, "Name two elements you have heard of.", "Elements are pure substances made of one type of atom. The periodic table helps organise them.", "List five element symbols you can find with a parent.", "Elements are chemistry's alphabet."),
      lesson("compounds-mixtures", "Compounds and mixtures", "11-13", 2, 13, "Is air an element?", "Compounds form when elements bond in fixed ratios. Mixtures keep components that can often be separated.", "Classify water, salad, and oxygen as element, compound, or mixture.", "Classification clarifies matter."),
      lesson("chemical-reactions", "Chemical reactions", "14-16", 3, 14, "What stays the same in a reaction?", "Reactions rearrange atoms into new substances. Mass is conserved when nothing escapes.", "Describe reactants and products for burning wood in everyday language.", "Atoms rearrange; they do not vanish."),
      lesson("lab-safety", "Chemistry safety habits", "14-16", 2, 12, "Why do labs use eye protection?", "Safe chemistry means adult supervision, correct protective gear, and never tasting chemicals.", "Write three lab safety rules for home science demos.", "Safety protects curiosity."),
    ],
    questions: [
      q("An element contains…", "One type of atom", ["One type of atom", "Any random mixture", "Only light", "No atoms"], "Elements are pure atom types.", 2, "11-13"),
      q("A mixture…", "Can often be separated physically", ["Can often be separated physically", "Always explodes", "Has no substances", "Is always one atom"], "Mixtures keep separable parts.", 2, "11-13"),
      q("In a closed chemical reaction, mass…", "Is conserved", ["Is conserved", "Always doubles", "Disappears", "Becomes energy only with no matter"], "Atoms rearrange; mass holds.", 3, "14-16"),
      q("In a lab you should…", "Follow safety rules with supervision", ["Follow safety rules with supervision", "Taste unknown chemicals", "Ignore eye protection", "Mix everything quickly"], "Safety first.", 2, "14-16"),
    ],
  },
  {
    slug: "physics",
    title: "Physics",
    description: "Motion, forces, energy, and how the physical world behaves.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Physics explains motion and energy with models and maths. Start with clear definitions.",
      sections: [
        { title: "Motion", content: "Position, speed, velocity, and acceleration describe movement.", tips: ["Distinguish speed and velocity.", "Use units."]},
        { title: "Forces", content: "Forces push or pull. Net force changes motion.", tips: ["Draw force arrows.", "Name contact vs non-contact forces."]},
        { title: "Energy", content: "Energy transfers and transforms but total energy is conserved in closed systems.", tips: ["Track energy forms.", "Avoid inventing energy from nowhere."]},
        { title: "Models", content: "Graphs and equations summarise patterns. Check if the model fits the situation.", tips: ["Sketch graphs.", "State assumptions."]},
      ],
    },
    lessons: [
      lesson("motion-basics", "Motion basics", "11-13", 2, 14, "How is speed different from staying still?", "Motion is change in position over time. Speed is distance over time; acceleration is change in velocity.", "Calculate speed if you travel 100 m in 20 s.", "Include units in every answer."),
      lesson("forces-intro", "Forces and motion", "11-13", 2, 14, "What force pulls objects toward Earth?", "Forces change motion. Balanced forces keep steady velocity; unbalanced forces accelerate objects.", "List two forces acting on a book on a table.", "Name forces with direction."),
      lesson("energy-transfers", "Energy transfers", "14-16", 3, 14, "Name two energy stores.", "Energy can be kinetic, gravitational, thermal, and more. Transfers happen through work and heating.", "Describe energy transfers when a ball falls and bounces.", "Track energy, do not invent it."),
      lesson("graphs-motion", "Motion graphs", "14-16", 3, 13, "What does a flat line on a distance-time graph mean?", "Distance-time and velocity-time graphs show motion patterns. Slope and shape carry meaning.", "Sketch a distance-time graph for walking then resting.", "Label axes clearly."),
    ],
    questions: [
      q("Speed is…", "Distance divided by time", ["Distance divided by time", "Only direction", "Force times mass always", "A type of energy store"], "s = d/t.", 2, "11-13"),
      q("An unbalanced force…", "Changes an object's motion", ["Changes an object's motion", "Does nothing ever", "Removes gravity forever", "Stops time"], "Net force accelerates.", 2, "11-13"),
      q("Energy in a closed system…", "Is conserved", ["Is conserved", "Appears from nowhere", "Vanishes completely", "Is only light"], "Energy transforms and transfers.", 3, "14-16"),
      q("A flat distance-time graph means…", "No change in position", ["No change in position", "Maximum acceleration", "Infinite speed", "Negative mass"], "Flat means stationary.", 3, "14-16"),
    ],
  },
  {
    slug: "computing",
    title: "Computing",
    description: "How computers work: hardware, software, networks, data, and problem-solving.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro: "Computing covers how computers store data, run programs, and connect. Clear thinking beats guessing.",
      sections: [
        { title: "Hardware and software", content: "Hardware is physical. Software is instructions. Both are needed for useful systems.", tips: ["Give examples of each.", "Do not install unknown apps."]},
        { title: "Algorithms and data", content: "Algorithms are step-by-step methods. Data structures organise information for efficiency.", tips: ["Write steps before code.", "Test with small examples."]},
        { title: "Networks", content: "Networks connect devices. The internet is a network of networks needing careful trust choices.", tips: ["Know local vs internet.", "Ask who operates a service."]},
        { title: "Systems thinking", content: "Inputs, processes, outputs, and feedback describe computing systems.", tips: ["Draw a system diagram.", "Find one failure point."]},
      ],
    },
    lessons: [
      lesson("hardware-software", "Hardware and software", "11-13", 2, 13, "Is an app hardware or software?", "Hardware you can touch. Software is code that runs on hardware to perform tasks.", "Sort six examples into hardware or software.", "Both layers work together."),
      lesson("algorithms-data", "Algorithms and data", "11-13", 2, 14, "Write steps to find the largest number in a list.", "Algorithms solve problems step by step. Organising data well makes algorithms faster and clearer.", "Write an algorithm to sort three named scores high to low.", "Clear steps beat vague ideas."),
      lesson("networks-intro", "Networks and the internet", "14-16", 2, 14, "What is the difference between Wi-Fi and the internet?", "Networks link devices. The internet connects many networks so information can travel with addresses and protocols.", "Draw home device → router → internet.", "Know what you are connecting to."),
      lesson("databases-intro", "Storing data", "14-16", 3, 14, "Why do apps store data in tables?", "Databases organise records so programs can search and update reliably. Protect personal data carefully.", "Design a simple table for a book list (title, author, read?).", "Structure makes data useful."),
    ],
    questions: [
      q("Software is…", "Instructions programs run", ["Instructions programs run", "Only the keyboard", "Always a cable", "Never code"], "Software is code.", 2, "11-13"),
      q("An algorithm is…", "A step-by-step method", ["A step-by-step method", "A random guess", "Only a photo", "A type of battery"], "Algorithms are procedures.", 2, "11-13"),
      q("The internet is…", "A network of networks", ["A network of networks", "One single cable in one house", "Only social apps", "Never about addresses"], "Many networks interconnect.", 2, "14-16"),
      q("Databases help by…", "Organising records for search and update", ["Organising records for search and update", "Deleting all files randomly", "Replacing electricity", "Blocking learning"], "Structured data is searchable.", 3, "14-16"),
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    description: "Protecting accounts, data, and devices with practical habits and clear thinking.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Cybersecurity protects people and information. Strong habits beat fear. Work with a parent on accounts and settings.",
      sections: [
        { title: "Threats basics", content: "Phishing, malware, and weak passwords are common risks. Spotting odd requests helps.", tips: ["Pause before clicking.", "Verify senders."]},
        { title: "Passwords and MFA", content: "Long unique passwords and multi-factor authentication protect accounts.", tips: ["Use a password manager with a parent.", "Never share codes."]},
        { title: "Privacy", content: "Share less by default. Check app permissions and profile visibility.", tips: ["Review settings together.", "Think before posting."]},
        { title: "Safe response", content: "If something feels wrong, stop, tell a trusted adult, and change passwords from a safe device.", tips: ["Do not blame yourself for reporting.", "Keep evidence if safe."]},
      ],
    },
    lessons: [
      lesson("cyber-threats", "Common cyber threats", "11-13", 2, 13, "What is phishing?", "Attackers trick people into sharing secrets or installing malware. Urgency and odd links are warning signs.", "List three red flags in a fake message.", "Pause and verify before acting."),
      lesson("passwords-mfa", "Passwords and multi-factor security", "11-13", 2, 14, "Why is one password for every site risky?", "Unique passwords and multi-factor authentication make account takeovers much harder.", "With a parent, check that one important account has MFA on.", "Layered security works."),
      lesson("privacy-hygiene", "Privacy hygiene", "14-16", 2, 13, "What personal details should stay private online?", "Limit what you share. Review permissions and digital footprints with a trusted adult.", "Write a personal privacy checklist of five items.", "Less sharing can mean more safety."),
      lesson("incident-response", "If something goes wrong", "14-16", 3, 14, "Who should you tell first if an account is hacked?", "Stop using the device if needed, tell a trusted adult, change passwords from a safe device, and report the incident.", "Write the first three steps you would take after a suspicious login alert.", "Calm steps beat panic."),
    ],
    questions: [
      q("Phishing tries to…", "Trick you into sharing secrets", ["Trick you into sharing secrets", "Improve your sleep", "Fix grammar", "Water plants"], "Phishing is social engineering.", 2, "11-13"),
      q("MFA means…", "An extra login check beyond a password", ["An extra login check beyond a password", "Sharing passwords widely", "Turning off updates", "Posting PINs publicly"], "Multiple factors protect accounts.", 2, "11-13"),
      q("A good privacy habit is…", "Reviewing what you share and app permissions", ["Reviewing what you share and app permissions", "Posting home addresses often", "Ignoring settings", "Using the same password everywhere"], "Minimise and review.", 2, "14-16"),
      q("After a suspected hack…", "Tell a trusted adult and secure accounts", ["Tell a trusted adult and secure accounts", "Ignore it forever", "Share recovery codes online", "Delete evidence always without help"], "Report and secure.", 3, "14-16"),
    ],
  },
];
