import type { LearningMethod } from "./curriculum";

export const LEARNING_METHOD_LABELS: Record<LearningMethod, string> = {
  read: "Read & learn",
  watch: "Watch video",
  practice: "Hands on practice",
  quiz: "Quick check",
  discuss: "Discuss with someone",
  draw: "Draw or map",
  listen: "Listen & reflect",
};

export const LEARNING_METHOD_HINTS: Record<LearningMethod, string> = {
  read: "Read carefully, tap key facts when you understand them.",
  watch: "Watch the video, then explain one idea in your own words.",
  practice: "Try the activity, doing beats only reading.",
  quiz: "Answer to check understanding before moving on.",
  discuss: "Tell a parent or friend what you learned.",
  draw: "Sketch, label, or map ideas to remember them.",
  listen: "Read aloud or listen, great for auditory learners.",
};
