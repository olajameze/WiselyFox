import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");
const SKIP = new Set(["node_modules", ".next", ".git"]);
const CORRUPT = /\u0000CODE\d+\u0000/;

const SERVICE_BY_EXPORT = {
  logAudit: "@/server/services/audit.service",
  scoreSignupFraud: "@/server/services/fraud-detection.service",
  shouldFlagForReview: "@/server/services/fraud-detection.service",
  createUserNotification: "@/server/services/notification-delivery.service",
  processTrialReminders: "@/server/services/trial-reminder.service",
  recordLessonCompletion: "@/features/learning/services/lesson-progress.service",
  maybeOfferReward: "@/features/gamification/services/reward-offers.service",
  maybeOfferQuizReward: "@/features/gamification/services/reward-offers.service",
  calculateMastery: "@/features/learning/services/learning-engine.service",
  nextReviewDate: "@/features/learning/services/learning-engine.service",
  pickQuestions: "@/features/learning/services/learning-engine.service",
  adjustDifficulty: "@/features/learning/services/learning-engine.service",
  getQuizAttemptForParent: "@/features/learning/services/quiz-results.service",
  getWorksheetQuestions: "@/features/parent/services/printable-content.service",
  groupLessonsForSubject: "@/features/learning/services/lesson-grouping.service",
  isLessonUnlocked: "@/features/learning/services/lesson-unlock.service",
  getLearnChildByUserId: "@/features/learning/services/child-session.service",
  getLearnChildWithRewards: "@/features/learning/services/child-session.service",
  getAccommodationRules: "@/features/inclusive/services/accommodation.service",
  getTodaySchedule: "@/features/parent/services/schedule.service",
  generateDailyObjectives: "@/server/services/daily-objectives.service",
  getAdaptiveRecommendations: "@/features/learning/services/learning-path.service",
  getParentProfile: "@/features/parent/services/parent-dashboard.service",
  getParentNotifications: "@/features/parent/services/parent-dashboard.service",
  completeQuiz: "@/features/learning/actions/learning.actions",
  signOutUser: "@/features/auth/actions/session.actions",
  saveChildSchedule: "@/features/parent/actions/household.actions",
  triggerInsightsExport: "@/features/admin/actions/admin.actions",
  handlers: "@/features/auth/auth",
  getDailyFact: "@/data/daily-facts",
  stripe: "@/server/services/stripe.service",
  constructWebhookEvent: "@/server/services/stripe.service",
  verifyStripeWebhook: "@/server/services/stripe.service",
};

const SYMBOL_MODULE = {
  Link: "next/link",
  redirect: "next/navigation",
  notFound: "next/navigation",
  useRouter: "next/navigation",
  usePathname: "next/navigation",
  revalidatePath: "next/cache",
  headers: "next/headers",
  NextResponse: "next/server",
  prisma: "@/shared/lib/prisma",
  getPrismaClient: "@/shared/lib/prisma",
  auth: "@/features/auth/auth",
  signIn: "@/features/auth/auth",
  handlers: "@/features/auth/auth",
  fail: "@/shared/lib/errors",
  ok: "@/shared/lib/errors",
  ActionResult: "@/shared/lib/errors",
  AppError: "@/shared/lib/errors",
  env: "@/shared/lib/env",
  requireParent: "@/shared/lib/permissions",
  requireChild: "@/shared/lib/permissions",
  requireSuperAdmin: "@/shared/lib/permissions",
  assertHouseholdAccess: "@/shared/lib/permissions",
  ConsentType: "@prisma/client",
  UserRole: "@prisma/client",
  PlanTier: "@prisma/client",
  Button: "@/shared/ui",
  Card: "@/shared/ui",
  Badge: "@/shared/ui",
  Alert: "@/shared/ui",
  Input: "@/shared/ui",
  Modal: "@/shared/ui",
  Tabs: "@/shared/ui",
  ProgressBar: "@/shared/ui",
  PwaProvider: "@/features/pwa/ui/PwaProvider",
  CurriculumSubject: "@/data/curriculum",
  LearningMethod: "@/data/learning-methods",
  StudyGuideSection: "@/data/study-guide-enrichment",
  StepCheck: "@/data/study-guide-enrichment",
  AccommodationRules: "@/features/inclusive/services/accommodation.service",
  buildLearnAccommodation: "@/features/inclusive/lib/accommodation-client",
  toAccommodationUiProps: "@/features/inclusive/lib/accommodation-client",
  ageBandLabel: "@/features/learning/services/age-content.service",
  filterContentForAge: "@/features/learning/services/age-content.service",
  countContentForAge: "@/features/learning/services/age-content.service",
  AGE_BAND_LABELS: "@/data/age-bands",
  isAgeBand: "@/data/age-bands",
  getDailyFact: "@/data/daily-facts",
  SUBJECT_OVERVIEW_VIDEO: "@/data/subject-media",
  playFocusCompletionAlert: "@/features/learning/lib/focus-completion-alert",
};

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(ent.name)) files.push(full);
  }
  return files;
}

function parseImportNames(clause) {
  const names = [];
  const trimmed = clause.trim();
  if (!trimmed.startsWith("{")) {
    const d = trimmed.match(/^(\w+)/);
    if (d) names.push(d[1]);
  }
  const named = trimmed.match(/\{([^}]+)\}/);
  if (named) {
    for (const part of named[1].split(",")) {
      const m = part.trim().match(/(?:type\s+)?(\w+)/);
      if (m) names.push(m[1]);
    }
  }
  return names;
}

function resolveModule(names, filePath) {
  for (const name of names) {
    if (SERVICE_BY_EXPORT[name]) return SERVICE_BY_EXPORT[name];
  }
  for (const name of names) {
    if (SYMBOL_MODULE[name]) return SYMBOL_MODULE[name];
  }
  if (filePath.includes(`${path.sep}app${path.sep}learn`) || filePath.includes("/app/learn")) {
    return "@/features/parent/ui/parent.module.css";
  }
  return null;
}

function repairImportsInFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const original = text;

  text = text.replace(/\.service\.service/g, ".service");
  text = text.replace(
    /import\s+\{\s*NextResponse\s*\}\s+from\s+"next\/navigation"/g,
    'import { NextResponse } from "next/server"',
  );

  const lines = text.split("\n");
  const out = lines.map((line) => {
    const isImport = line.includes("import ") && (CORRUPT.test(line) || /from\s+"@?CODE\d+/.test(line));
    if (!isImport) return line;

    const m = line.match(/^import\s+(.+?)\s+from\s+"([^"]+)";?\s*$/);
    if (!m) return line;

    const [, clause, specifier] = m;
    const names = parseImportNames(clause);

    if (specifier.endsWith(".module.css")) {
      const mod = resolveModule(names, filePath);
      if (mod?.endsWith(".module.css")) return `import ${clause.trim()} from "${mod}";`;
      if (filePath.includes("learn")) return `import ${clause.trim()} from "@/features/parent/ui/parent.module.css";`;
    }

    const mod = resolveModule(names, filePath);
    if (!mod) return line;
    return `import ${clause.trim()} from "${mod}";`;
  });

  text = out.join("\n");

  if (text !== original) fs.writeFileSync(filePath, text, "utf8");
  return text !== original;
}

let count = 0;
for (const file of walk(SRC)) {
  if (repairImportsInFile(file)) count += 1;
}

console.log(`Final repair updated ${count} files.`);
