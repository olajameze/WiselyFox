import type { CurriculumSubject } from "@/data/curriculum";

/**
 * Extra subjects commonly studied online: psychology, philosophy, sociology,
 * economics, and astronomy. Strengths-based language; no diagnostic claims.
 */
export const EXTENDED_SUBJECTS: CurriculumSubject[] = [
  {
    slug: "psychology",
    title: "Psychology",
    description: "How people think, learn, remember, and relate, with calm, evidence-based ideas.",
    ageBands: ["11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Psychology studies mind and behaviour with careful methods. Use ideas to understand yourself and others kindly, not to label people.",
      sections: [
        {
          title: "What psychologists study",
          content:
            "Topics include attention, memory, emotion, development, and social behaviour. Evidence comes from observation, experiments, and careful measurement.",
          tips: ["Ask what evidence supports a claim.", "Be curious, not judgmental."],
        },
        {
          title: "Learning and memory",
          content:
            "Practice, sleep, and retrieval strengthen memory. Attention is limited, so short focus blocks help many learners.",
          tips: ["Test yourself instead of only re-reading.", "Link new ideas to examples you know."],
        },
        {
          title: "Emotion and wellbeing",
          content:
            "Emotions give information. Naming feelings and using calm strategies can support learning. Seek trusted adults when overwhelmed.",
          tips: ["Breathing and breaks are valid tools.", "Support is a strength."],
        },
        {
          title: "Thinking carefully",
          content:
            "Biases affect judgment. Slow down for important decisions and check more than one source.",
          tips: ["Write reasons before deciding.", "Invite another viewpoint."],
        },
      ],
    },
    lessons: [
      {
        slug: "intro-psychology",
        title: "What is psychology?",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          {
            title: "Warm up",
            content: "Psychology asks how people think, feel, and act, using evidence.",
            tip: "Stay curious about yourself and others.",
          },
          {
            title: "Learn",
            content:
              "Psychology is a science of mind and behaviour. It studies learning, memory, emotion, development, and social life without reducing people to a single label.",
            tip: "Watch for examples that match your experience.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "List three everyday questions a psychologist might study.",
            tip: "Example: How does sleep affect focus?",
            method: "practice",
          },
          {
            title: "Review",
            content: "Psychology uses evidence to understand people kindly and carefully.",
            tip: "Share one insight with a parent.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "memory-learning",
        title: "Memory and learning",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "When did you last remember something better after practising?",
            tip: "Practice beats cramming for many people.",
          },
          {
            title: "Learn",
            content:
              "Encoding, storage, and retrieval describe memory stages. Active recall and spaced practice strengthen learning more than highlighting alone.",
            tip: "Quiz yourself in short bursts.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Choose one topic and write three self-test questions.",
            tip: "Answer without looking first.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Memory grows with retrieval, sleep, and meaningful connections.",
            tip: "Plan tomorrow's short review.",
            method: "quiz",
          },
        ],
      },
      {
        slug: "attention-focus",
        title: "Attention and focus",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 13,
        steps: [
          {
            title: "Warm up",
            content: "Name one distraction that pulls you off task.",
            tip: "Noticing is the first step.",
          },
          {
            title: "Learn",
            content:
              "Attention is limited. Reducing distractions, using timers, and taking breaks can support focus for many learners.",
            tip: "Try one change at a time.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Set a 10-minute focus block and remove one distraction.",
            tip: "Phone in another room if safe.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Focus skills improve with practice and kind self-talk.",
            tip: "Note what helped.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "social-thinking",
        title: "Thinking with others",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "How do groups influence choices at school or work?",
            tip: "Peer influence can be helpful or unhelpful.",
          },
          {
            title: "Learn",
            content:
              "Social psychology explores how people influence each other. Clear communication and respectful disagreement support healthy groups.",
            tip: "Listen before responding.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Write one respectful way to disagree in a team chat.",
            tip: "Focus on the idea, not the person.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Understanding social influence helps you choose thoughtfully.",
            tip: "Reflect with a trusted adult if unsure.",
            method: "quiz",
          },
        ],
      },
    ],
    questions: [
      {
        prompt: "Psychology studies…",
        options: ["Mind and behaviour with evidence", "Only fortune telling", "Only sports scores", "Only weather"],
        correctAnswer: "Mind and behaviour with evidence",
        explanation: "It is an evidence-based social science.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Active recall means…",
        options: ["Testing yourself from memory", "Only highlighting", "Skipping sleep", "Avoiding practice"],
        correctAnswer: "Testing yourself from memory",
        explanation: "Retrieval strengthens learning.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Attention is often…",
        options: ["Limited and trainable with habits", "Unlimited forever", "Useless", "Only for adults"],
        correctAnswer: "Limited and trainable with habits",
        explanation: "Focus strategies help many learners.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Respectful disagreement focuses on…",
        options: ["Ideas and evidence", "Personal attacks", "Ignoring others", "Shouting"],
        correctAnswer: "Ideas and evidence",
        explanation: "Clear, kind challenge improves teams.",
        difficulty: 3,
        ageBand: "17-19",
      },
    ],
  },
  {
    slug: "philosophy",
    title: "Philosophy",
    description: "Clear thinking about knowledge, ethics, and meaning using careful questions and reasons.",
    ageBands: ["11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Philosophy trains careful questioning. Good arguments use clear terms, reasons, and openness to better evidence.",
      sections: [
        {
          title: "Asking good questions",
          content: "Clarify terms before debating. Separate claims from feelings. Ask what would change your mind.",
          tips: ["Define key words early.", "Steelman the other view."],
        },
        {
          title: "Logic basics",
          content: "Valid arguments preserve truth from premises to conclusion. Spot hidden assumptions.",
          tips: ["List premises.", "Check if the conclusion must follow."],
        },
        {
          title: "Ethics",
          content: "Ethics explores right action and good character. Consider consequences, duties, and care for others.",
          tips: ["Use real dilemmas carefully.", "Listen to different perspectives."],
        },
        {
          title: "Knowledge",
          content: "Epistemology asks how we know. Evidence, reliability, and humility matter.",
          tips: ["Cite sources.", "Update beliefs when evidence improves."],
        },
      ],
    },
    lessons: [
      {
        slug: "intro-philosophy",
        title: "What is philosophy?",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 15,
        steps: [
          {
            title: "Warm up",
            content: "Philosophy means loving wisdom by asking careful questions.",
            tip: "Wonder is welcome.",
          },
          {
            title: "Learn",
            content:
              "Philosophy explores knowledge, reality, ethics, and reasoning. Its branches include metaphysics, epistemology, and value theory, supported by logic.",
            tip: "Note the three main divisions.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Write one philosophical question about fairness at school or work.",
            tip: "Start with why or what if.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Philosophy builds clearer thinking for life decisions.",
            tip: "Discuss your question with someone.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "logic-arguments",
        title: "Arguments and logic",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "An argument gives reasons for a conclusion.",
            tip: "Reasons are not the same as volume.",
          },
          {
            title: "Learn",
            content:
              "Premises support a conclusion. Check definitions, evidence, and whether the conclusion follows. Avoid attacking the person instead of the claim.",
            tip: "Write claims as short sentences.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Turn this into premises and a conclusion: We should recycle because it reduces waste.",
            tip: "Label each part.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Clear arguments help you learn and persuade fairly.",
            tip: "Revise one weak reason.",
            method: "quiz",
          },
        ],
      },
      {
        slug: "ethics-intro",
        title: "Ethics introduction",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 15,
        steps: [
          {
            title: "Warm up",
            content: "Ethics asks what we ought to do and why.",
            tip: "Real cases need care and respect.",
          },
          {
            title: "Learn",
            content:
              "Ethical thinking may weigh consequences, duties, rights, and care for others. Good discussion listens and gives reasons.",
            tip: "Name the values in play.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "List two values that matter when borrowing a friend's item.",
            tip: "Honesty and trust are common.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Ethics helps you act with reasons you can explain.",
            tip: "Talk through a small dilemma with a parent.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "knowledge-belief",
        title: "Knowledge and belief",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Belief can be strong or weak. Knowledge aims at justified true belief.",
            tip: "Ask how you know.",
          },
          {
            title: "Learn",
            content:
              "Epistemology studies knowledge. Reliable methods, evidence, and willingness to revise beliefs reduce error.",
            tip: "Prefer primary sources when possible.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Pick a claim you believe and write one piece of evidence for it.",
            tip: "If evidence is weak, note that too.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Intellectual humility is a strength in learning.",
            tip: "Update when better evidence arrives.",
            method: "quiz",
          },
        ],
      },
    ],
    questions: [
      {
        prompt: "Philosophy mainly trains…",
        options: ["Careful questioning and reasoning", "Only memorising dates", "Avoiding questions", "Guessing randomly"],
        correctAnswer: "Careful questioning and reasoning",
        explanation: "Clear thinking is central.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Premises in an argument…",
        options: ["Support a conclusion", "Are always insults", "Are never checked", "Replace evidence"],
        correctAnswer: "Support a conclusion",
        explanation: "Reasons lead to a claim.",
        difficulty: 3,
        ageBand: "14-16",
      },
      {
        prompt: "Ethics explores…",
        options: ["Right action and good reasons", "Only fashion", "Only maths proofs", "Weather forecasts"],
        correctAnswer: "Right action and good reasons",
        explanation: "Value theory includes ethics.",
        difficulty: 3,
        ageBand: "17-19",
      },
      {
        prompt: "Updating beliefs with better evidence shows…",
        options: ["Intellectual humility", "Giving up forever", "Ignoring facts", "Never learning"],
        correctAnswer: "Intellectual humility",
        explanation: "Good thinkers revise carefully.",
        difficulty: 3,
        ageBand: "17-19",
      },
    ],
  },
  {
    slug: "sociology",
    title: "Sociology",
    description: "How societies, groups, and institutions shape everyday life, and how people shape them back.",
    ageBands: ["11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Sociology looks for patterns in society. It helps you see the general in particular stories and the unfamiliar in everyday habits.",
      sections: [
        {
          title: "The sociological perspective",
          content: "See how personal experiences connect to wider structures like family, school, media, and work.",
          tips: ["Ask who benefits from a rule.", "Compare two communities carefully."],
        },
        {
          title: "Groups and norms",
          content: "Norms guide expected behaviour. They can include or exclude. Cultures change over time.",
          tips: ["Notice spoken and unspoken rules.", "Be respectful when comparing cultures."],
        },
        {
          title: "Institutions",
          content: "Schools, governments, and media organise social life. Study how they work and who they serve.",
          tips: ["Use reliable data.", "Avoid stereotypes."],
        },
        {
          title: "Inequality and fairness",
          content: "Sociology examines unequal outcomes and opportunities. Evidence helps design fairer systems.",
          tips: ["Separate anecdote from pattern.", "Listen to lived experience with care."],
        },
      ],
    },
    lessons: [
      {
        slug: "intro-sociology",
        title: "What is sociology?",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Sociology studies society and human behaviour in groups.",
            tip: "Think about school as a small society.",
          },
          {
            title: "Learn",
            content:
              "Sociology is broad. The sociological perspective sees the general in the particular and the strange in the familiar, looking for social patterns.",
            tip: "Note the two parts of the perspective.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Name one personal habit that is also shaped by school rules.",
            tip: "Uniforms or phone policies are examples.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Sociology connects personal stories to wider patterns.",
            tip: "Share one example at home.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "norms-culture",
        title: "Norms and culture",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 13,
        steps: [
          {
            title: "Warm up",
            content: "Norms are expected ways of acting in a group.",
            tip: "Some norms are written, some are not.",
          },
          {
            title: "Learn",
            content:
              "Culture includes shared meanings, practices, and symbols. Norms can support belonging, but they can also exclude. Cultures change.",
            tip: "Compare two settings you know.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "List two norms at home and two at school.",
            tip: "Are any different?",
            method: "practice",
          },
          {
            title: "Review",
            content: "Understanding norms helps you navigate groups respectfully.",
            tip: "Ask before judging unfamiliar practices.",
            method: "quiz",
          },
        ],
      },
      {
        slug: "institutions",
        title: "Social institutions",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Institutions are organised ways societies meet needs, such as education or media.",
            tip: "Think beyond buildings.",
          },
          {
            title: "Learn",
            content:
              "Institutions shape opportunities and expectations. Studying them means looking at roles, rules, and outcomes with evidence.",
            tip: "Ask who sets the rules.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Choose one institution and write its main purpose in one sentence.",
            tip: "Keep it clear and fair.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Institutions can be redesigned when evidence shows unfair outcomes.",
            tip: "Discuss a fair change with a parent.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "media-society",
        title: "Media and society",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Media messages influence what people notice and discuss.",
            tip: "Check who made the content.",
          },
          {
            title: "Learn",
            content:
              "Media literacy asks who produced a message, for whom, with what purpose, and what is missing. Compare sources before sharing.",
            tip: "Slow down on viral claims.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Find one news headline and rewrite it more precisely.",
            tip: "Remove exaggeration.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Careful media habits protect you and your community.",
            tip: "Share the clearer headline with someone.",
            method: "quiz",
          },
        ],
      },
    ],
    questions: [
      {
        prompt: "Sociology studies…",
        options: ["Society and human behaviour in groups", "Only atoms", "Only personal diaries as science", "Only weather"],
        correctAnswer: "Society and human behaviour in groups",
        explanation: "It looks for social patterns.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Norms are…",
        options: ["Expected ways of acting in a group", "Always illegal", "Never changing", "Only online"],
        correctAnswer: "Expected ways of acting in a group",
        explanation: "They guide social behaviour.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Institutions help societies…",
        options: ["Organise roles and needs", "Avoid all rules", "Stop learning", "Ignore evidence"],
        correctAnswer: "Organise roles and needs",
        explanation: "They structure social life.",
        difficulty: 3,
        ageBand: "17-19",
      },
      {
        prompt: "Media literacy asks…",
        options: ["Who made a message and why", "Only how viral it is", "Never to check sources", "To trust every post"],
        correctAnswer: "Who made a message and why",
        explanation: "Purpose and source matter.",
        difficulty: 3,
        ageBand: "17-19",
      },
    ],
  },
  {
    slug: "economics",
    title: "Economics",
    description: "Choices, trade-offs, markets, and how people allocate scarce resources.",
    ageBands: ["11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Economics studies people and choices under scarcity. It is not only money or stock tips, it is trade-offs and incentives.",
      sections: [
        {
          title: "Scarcity and choice",
          content: "Resources are limited. Every choice has an opportunity cost: the next best option you give up.",
          tips: ["Name the trade-off out loud.", "Compare benefits and costs."],
        },
        {
          title: "Supply and demand",
          content: "Prices help coordinate buyers and sellers. Shifts in supply or demand change market outcomes.",
          tips: ["Draw simple curves.", "Ask what changed."],
        },
        {
          title: "Incentives",
          content: "People respond to incentives. Good policy anticipates side effects.",
          tips: ["Ask who gains and who loses.", "Check unintended consequences."],
        },
        {
          title: "Everyday economics",
          content: "Budgets, wages, taxes, and saving are applied economics. Clear numbers support fair decisions.",
          tips: ["Use real examples with a parent.", "Keep receipts for practice."],
        },
      ],
    },
    lessons: [
      {
        slug: "intro-economics",
        title: "What is economics?",
        ageBand: "14-16",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Economics is about people and choices, not only money.",
            tip: "You chose to start this lesson.",
          },
          {
            title: "Learn",
            content:
              "Economics studies how people decide under scarcity. Opportunity cost is the next best alternative you forgo when you choose.",
            tip: "Listen for opportunity cost examples.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Write the opportunity cost of watching one more video tonight.",
            tip: "What else could you do?",
            method: "practice",
          },
          {
            title: "Review",
            content: "Seeing trade-offs makes choices clearer.",
            tip: "Share one trade-off with a parent.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "supply-demand",
        title: "Supply and demand basics",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 15,
        steps: [
          {
            title: "Warm up",
            content: "When more people want a limited item, prices often rise.",
            tip: "Think of concert tickets.",
          },
          {
            title: "Learn",
            content:
              "Demand is willingness to buy at prices. Supply is willingness to sell. Markets tend to move toward balance, though real life has frictions.",
            tip: "Sketch price on the vertical axis.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "If a popular game console is scarce, what happens to price, other things equal?",
            tip: "Demand high, supply limited.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Supply and demand is a starting map, not the whole story.",
            tip: "Note one real exception with a parent.",
            method: "quiz",
          },
        ],
      },
      {
        slug: "incentives",
        title: "Incentives and decisions",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Incentives reward or discourage actions.",
            tip: "Grades, pay, and praise are incentives.",
          },
          {
            title: "Learn",
            content:
              "People respond to incentives. Good policy designs ask what behaviour will change, including unintended effects.",
            tip: "Ask who responds and how.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Design one positive incentive to encourage recycling at home.",
            tip: "Keep it simple and fair.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Incentive thinking improves plans at school and work.",
            tip: "Test your idea for a week.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "personal-finance-econ",
        title: "Personal finance choices",
        ageBand: "17-19",
        difficulty: 3,
        durationMinutes: 15,
        steps: [
          {
            title: "Warm up",
            content: "Budgets turn goals into numbers.",
            tip: "Income minus planned spending.",
          },
          {
            title: "Learn",
            content:
              "Saving, borrowing, and interest are economic decisions. Compare APR, fees, and opportunity cost before you commit.",
            tip: "Read the small print with a parent.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "List income, three expenses, and one saving goal for a sample month.",
            tip: "Keep totals honest.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Clear numbers support freer long-term choices.",
            tip: "Review the plan monthly.",
            method: "quiz",
          },
        ],
      },
    ],
    questions: [
      {
        prompt: "Opportunity cost is…",
        options: ["The next best option you give up", "Always zero", "Only money spent", "A free lunch"],
        correctAnswer: "The next best option you give up",
        explanation: "Every choice has a trade-off.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Economics mainly studies…",
        options: ["People and choices under scarcity", "Only celebrity news", "Only fashion trends", "Only sports scores"],
        correctAnswer: "People and choices under scarcity",
        explanation: "Trade-offs are central.",
        difficulty: 2,
        ageBand: "14-16",
      },
      {
        prompt: "Incentives…",
        options: ["Encourage or discourage actions", "Never matter", "Only confuse people", "Remove all choices"],
        correctAnswer: "Encourage or discourage actions",
        explanation: "People respond to incentives.",
        difficulty: 3,
        ageBand: "17-19",
      },
      {
        prompt: "Before borrowing, compare…",
        options: ["APR, fees, and opportunity cost", "Only the logo", "Only the colour of the card", "Nothing"],
        correctAnswer: "APR, fees, and opportunity cost",
        explanation: "Costs and trade-offs matter.",
        difficulty: 3,
        ageBand: "17-19",
      },
    ],
  },
  {
    slug: "astronomy",
    title: "Astronomy",
    description: "Stars, planets, galaxies, and how we observe the universe carefully.",
    ageBands: ["8-10", "11-13", "14-16", "17-19", "20-23"],
    studyGuide: {
      intro:
        "Astronomy studies objects beyond Earth. Observation, measurement, and models help us understand a vast universe.",
      sections: [
        {
          title: "What astronomy is",
          content: "Astronomy explores planets, stars, galaxies, and cosmic history using telescopes and physics.",
          tips: ["Separate astronomy from astrology.", "Ask what evidence supports a claim."],
        },
        {
          title: "Earth in space",
          content: "Earth orbits the Sun. Day and night come from rotation. Seasons relate to tilt.",
          tips: ["Use a ball and lamp model.", "Track moon phases for a month."],
        },
        {
          title: "Stars and light",
          content: "Starlight carries information. Distance and brightness can trick intuition, so scientists measure carefully.",
          tips: ["Learn that light takes time to travel.", "Compare photos of the same object."],
        },
        {
          title: "Scale of the cosmos",
          content: "Powers of ten help grasp huge distances. Models and analogies keep scale understandable.",
          tips: ["Watch a scale video with a parent.", "Write one distance in words and numbers."],
        },
      ],
    },
    lessons: [
      {
        slug: "intro-astronomy",
        title: "What is astronomy?",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Astronomy studies objects in space using science and observation.",
            tip: "Curiosity about the sky is welcome.",
          },
          {
            title: "Learn",
            content:
              "Astronomy explores planets, stars, galaxies, and the history of the universe. It relies on evidence from light and other measurements, not fortune telling.",
            tip: "Note how astronomy differs from astrology.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "List three things an astronomer might observe.",
            tip: "Planets, stars, galaxies.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Astronomy turns wonder into careful questions.",
            tip: "Look at the night sky safely with a parent.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "earth-sun-moon",
        title: "Earth, Sun, and Moon",
        ageBand: "11-13",
        difficulty: 2,
        durationMinutes: 14,
        steps: [
          {
            title: "Warm up",
            content: "Day and night happen because Earth rotates.",
            tip: "Try a lamp and ball model.",
          },
          {
            title: "Learn",
            content:
              "Earth orbits the Sun. The Moon orbits Earth and reflects sunlight. Phases depend on geometry, not Earth's shadow on the Moon each night.",
            tip: "Sketch new, quarter, and full moon.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Explain why we have day and night in one sentence.",
            tip: "Rotation is the key word.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Models make space motions easier to understand.",
            tip: "Teach someone your model.",
            method: "quiz",
          },
        ],
      },
      {
        slug: "stars-galaxies",
        title: "Stars and galaxies",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 15,
        steps: [
          {
            title: "Warm up",
            content: "Stars are distant suns. Galaxies are huge collections of stars.",
            tip: "Light from stars is old news.",
          },
          {
            title: "Learn",
            content:
              "Starlight carries information about temperature and composition. Our Sun is one star in the Milky Way galaxy among many others.",
            tip: "Remember: light travel time matters.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Why can looking at distant galaxies be like looking into the past?",
            tip: "Light takes time to arrive.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Scale and light travel make the cosmos feel different from everyday life.",
            tip: "Write one mind-blowing fact you learned.",
            method: "discuss",
          },
        ],
      },
      {
        slug: "cosmic-scale",
        title: "Cosmic scale",
        ageBand: "14-16",
        difficulty: 3,
        durationMinutes: 13,
        steps: [
          {
            title: "Warm up",
            content: "Powers of ten help compare tiny and enormous sizes.",
            tip: "Think atoms to galaxies.",
          },
          {
            title: "Learn",
            content:
              "Scientific notation and scale models help us grasp distances that are hard to imagine. Careful measurement beats guesswork.",
            tip: "Watch for jumps of ten times larger.",
            method: "watch",
          },
          {
            title: "Practice",
            content: "Order from smallest to largest: Earth, solar system, Milky Way.",
            tip: "Earth is smallest here.",
            method: "practice",
          },
          {
            title: "Review",
            content: "Scale thinking is a core astronomy skill.",
            tip: "Explain the order to someone.",
            method: "quiz",
          },
        ],
      },
    ],
    questions: [
      {
        prompt: "Astronomy is…",
        options: ["Science of objects beyond Earth", "Fortune telling", "Only weather on Earth", "Only fashion"],
        correctAnswer: "Science of objects beyond Earth",
        explanation: "It uses observation and evidence.",
        difficulty: 2,
        ageBand: "11-13",
      },
      {
        prompt: "Day and night are caused mainly by…",
        options: ["Earth's rotation", "The Moon disappearing", "Clouds only", "Ocean tides alone"],
        correctAnswer: "Earth's rotation",
        explanation: "Earth spins once per day.",
        difficulty: 2,
        ageBand: "11-13",
      },
      {
        prompt: "Light from a distant galaxy…",
        options: ["Took time to reach us", "Is always brand new", "Cannot be studied", "Is not real"],
        correctAnswer: "Took time to reach us",
        explanation: "Looking far is looking back in time.",
        difficulty: 3,
        ageBand: "14-16",
      },
      {
        prompt: "Powers of ten help us…",
        options: ["Compare huge and tiny scales", "Avoid measurement", "Ignore maths", "Skip models"],
        correctAnswer: "Compare huge and tiny scales",
        explanation: "Scale models clarify the cosmos.",
        difficulty: 3,
        ageBand: "14-16",
      },
    ],
  },
];
