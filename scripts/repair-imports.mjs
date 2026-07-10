import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const CORRUPT = /\u0000CODE\d+\u0000/;

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(ent.name)) files.push(full);
  }
  return files;
}

function toAlias(absPath) {
  const rel = path.relative(SRC, absPath).replace(/\\/g, "/");
  return `@/${rel.replace(/\.tsx?$/, "")}`;
}

function findComponentModule(name) {
  const matches = [];
  function scan(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (SKIP_DIRS.has(ent.name)) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) scan(full);
      else if (ent.name === `${name}.tsx`) matches.push(full);
    }
  }
  scan(SRC);
  if (matches.length === 0) return null;
  matches.sort((a, b) => a.length - b.length);
  return toAlias(matches[0]);
}

function findCssModule(suffix, fileDir) {
  const candidates = [
    path.join(fileDir, `${suffix}.module.css`),
    path.join(fileDir, `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}.module.css`),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return `./${path.basename(c)}`;
  }

  let found = null;
  function scan(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      if (SKIP_DIRS.has(ent.name)) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) scan(full);
      else if (ent.name.toLowerCase().includes(suffix.toLowerCase()) && ent.name.endsWith(".module.css")) {
        found = full;
      }
    }
  }
  scan(SRC);
  if (!found) return null;
  return path.relative(fileDir, found).replace(/\\/g, "/").replace(/^(?!\.)/, "./");
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

function resolveBySymbols(names) {
  const set = new Set(names);
  const has = (...n) => n.some((x) => set.has(x));

  if (has("Link")) return "next/link";
  if (has("redirect", "notFound", "useRouter", "usePathname")) return "next/navigation";
  if (has("revalidatePath")) return "next/cache";
  if (has("headers")) return "next/headers";
  if (has("prisma", "getPrismaClient")) return "@/shared/lib/prisma";
  if (has("auth", "signIn")) return "@/features/auth/auth";
  if (has("fail", "ok", "ActionResult", "AppError")) return "@/shared/lib/errors";
  if (has("env")) return "@/shared/lib/env";
  if (has("requireParent", "requireChild", "requireSuperAdmin", "assertHouseholdAccess"))
    return "@/shared/lib/permissions";
  if (has("ConsentType", "UserRole", "PlanTier")) return "@prisma/client";
  if (has("logAudit")) return "@/server/services/audit.service";
  if (has("scoreSignupFraud", "shouldFlagForReview")) return "@/server/services/fraud-detection.service";
  if (has("createUserNotification")) return "@/server/services/notification-delivery.service";
  if (has("processTrialReminders")) return "@/server/services/trial-reminder.service";
  if (has("getResend")) return "@/shared/lib/resend";
  if (has("Button", "Card", "Badge", "Alert", "Input", "Modal", "Tabs", "ProgressBar"))
    return "@/shared/ui";
  if (has("PwaProvider")) return "@/features/pwa/ui/PwaProvider";
  if (has("CurriculumSubject")) return "@/data/curriculum";
  if (has("LearningMethod")) return "@/data/learning-methods";
  if (has("StudyGuideSection", "StepCheck")) return "@/data/study-guide-enrichment";
  if (has("ageBandProximity", "isAgeBand", "AGE_BAND_LABELS", "AgeBand")) return "@/data/age-bands";
  if (has("AccommodationRules")) return "@/features/inclusive/services/accommodation.service";
  if (has("buildLearnAccommodation", "toAccommodationUiProps"))
    return "@/features/inclusive/lib/accommodation-client";
  if (has("getLearnChildByUserId")) return "@/features/learning/services/child-session.service";
  if (has("ageBandLabel", "filterContentForAge", "countContentForAge"))
    return "@/features/learning/services/age-content.service";
  if (has("pickQuestions", "calculateMastery", "nextReviewDate"))
    return "@/features/learning/services/learning-engine.service";
  if (has("completeQuiz")) return "@/features/learning/actions/learning.actions";
  if (has("signOutUser")) return "@/features/auth/actions/session.actions";
  if (has("getParentProfile", "getParentNotifications"))
    return "@/features/parent/services/parent-dashboard.service";
  if (has("saveChildSchedule")) return "@/features/parent/actions/household.actions";
  if (has("triggerInsightsExport")) return "@/features/admin/actions/admin.actions";
  if (has("QuizPlayer")) return "@/features/learning/ui/QuizPlayer";
  if (has("LessonPlayer")) return "@/features/learning/ui/LessonPlayer";
  if (has("StudyGuideViewer")) return "@/features/learning/ui/StudyGuideViewer";
  if (has("FocusTimer")) return "@/features/learning/ui/FocusTimer";
  if (has("LandingPage")) return "@/features/marketing/ui/LandingPage";
  if (has("Header")) return "@/shared/ui/Header/Header";
  if (has("Footer")) return "@/shared/ui/Footer/Footer";
  if (has("auth")) return "@/features/auth/auth";
  if (has("SUBJECT_OVERVIEW_VIDEO")) return "@/data/subject-media";
  if (has("playFocusCompleteAlert")) return "@/features/learning/lib/focus-completion-alert";
  if (has("WritingText")) return "@/features/marketing/ui/WritingText";
  if (has("LiveAppSlideshow")) return "@/features/marketing/ui/LiveAppSlideshow";
  if (has("AppDemoPreview")) return "@/features/marketing/ui/AppDemoPreview";
  if (has("PricingSection")) return "@/features/marketing/ui/PricingSection";
  if (has("RewardApprovalActions")) return "@/features/parent/ui/RewardApprovalActions";
  if (has("FraudReviewActions")) return "@/features/admin/ui/FraudReviewActions";
  if (has("AccessibilityForm")) return "@/features/parent/ui/AccessibilityForm";
  if (has("ScheduleEditor")) return "@/features/parent/ui/ScheduleEditor";
  if (has("ParentShell")) return "@/features/parent/ui/ParentShell";
  if (has("AdminShell")) return "@/features/admin/ui/AdminShell";
  if (has("ChildSignInForm", "SignInForm", "SignUpForm")) return `@/features/auth/ui/${names.find((n) => n.endsWith("Form"))}`;
  if (has("getWorksheetQuestions")) return "@/features/parent/services/printable-content.service";
  if (has("getQuizAttemptForParent")) return "@/features/learning/services/quiz-results.service";
  if (has("recordLessonCompletion")) return "@/features/learning/services/lesson-progress.service";
  if (has("maybeOfferReward", "maybeOfferQuizReward"))
    return "@/features/gamification/services/reward-offers.service";
  if (has("UNLOCK_TRACKS_AT", "groupLessonsForSubject"))
    return "@/features/learning/services/lesson-grouping.service";
  if (has("isLessonUnlocked")) return "@/features/learning/services/lesson-unlock.service";
  if (has("adjustDifficulty")) return "@/features/learning/services/learning-engine.service";
  if (has("quizBandPriority")) return "@/data/age-bands";
  if (has("enhanceStudyGuideWithMedia")) return "@/data/lesson-hands-on";
  if (has("getSuperAdminEmails")) return "@/shared/lib/env";
  if (has("stripe")) return "@/server/services/stripe.service";

  return null;
}

function resolveServiceImport(names) {
  if (names.includes("scoreSignupFraud")) return "@/server/services/fraud-detection.service";
  if (names.includes("logAudit")) return "@/server/services/audit.service";
  if (names.includes("createUserNotification")) return "@/server/services/notification-delivery.service";
  if (names.includes("processTrialReminders")) return "@/server/services/trial-reminder.service";
  if (names.includes("recordLessonCompletion")) return "@/features/learning/services/lesson-progress.service";
  if (names.includes("maybeOfferReward") || names.includes("maybeOfferQuizReward"))
    return "@/features/gamification/services/reward-offers.service";
  if (names.includes("calculateMastery") || names.includes("nextReviewDate"))
    return "@/features/learning/services/learning-engine.service";
  if (names.includes("getQuizAttemptForParent")) return "@/features/learning/services/quiz-results.service";
  if (names.includes("getWorksheetQuestions")) return "@/features/parent/services/printable-content.service";
  if (names.includes("UNLOCK_TRACKS_AT") || names.includes("groupLessonsForSubject"))
    return "@/features/learning/services/lesson-grouping.service";
  if (names.includes("isLessonUnlocked")) return "@/features/learning/services/lesson-unlock.service";
  if (names.includes("pickQuestions")) return "@/features/learning/services/learning-engine.service";
  if (names.includes("completeQuiz")) return "@/features/learning/actions/learning.actions";
  if (names.includes("signOutUser")) return "@/features/auth/actions/session.actions";
  if (names.includes("saveChildSchedule")) return "@/features/parent/actions/household.actions";
  if (names.includes("triggerInsightsExport")) return "@/features/admin/actions/admin.actions";
  return null;
}

function isCorruptImport(line) {
  return CORRUPT.test(line) || /from\s+"[^"]*CODE\d+[^"]*"/.test(line);
}

function repairFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const original = text;
  const fileDir = path.dirname(filePath);
  const lines = text.split("\n");
  const out = lines.map((line) => {
    if (!line.includes("import ") || !isCorruptImport(line)) return line;

    const m = line.match(/^import\s+(.+?)\s+from\s+"([^"]+)";?\s*$/);
    if (!m) return line;

    const [, clause, specifier] = m;
    const names = parseImportNames(clause);
    const suffix = specifier.includes(".service") ? ".service" : specifier.includes(".actions") ? ".actions" : "";
    const cssSuffix = specifier.match(/([A-Za-z]+)\.module\.css$/);

    if (cssSuffix) {
      const css = findCssModule(cssSuffix[1], fileDir);
      if (css) return `import ${clause.trim()} from "${css}";`;
    }

    if (names.some((n) => ["ConsentType", "UserRole", "PlanTier"].includes(n)) || CORRUPT.test(specifier)) {
      if (names.some((n) => ["ConsentType", "UserRole", "PlanTier"].includes(n))) {
        return `import ${clause.trim()} from "@prisma/client";`;
      }
    }

    let mod = suffix ? resolveServiceImport(names) : null;
    if (!mod) mod = resolveBySymbols(names);
    if (!mod && (specifier.startsWith("next") || specifier.includes("next"))) mod = resolveBySymbols(names) ?? "next/navigation";
    if (!mod && specifier.startsWith(".")) mod = resolveBySymbols(names) ?? "./curriculum";

    if (!mod) {
      const component = names.find((n) => /^[A-Z]/.test(n));
      if (component) mod = findComponentModule(component);
    }

    if (!mod) return line;
    return `import ${clause.trim()} from "${mod}${suffix}";`;
  });

  text = out.join("\n");

  text = text.replace(/@\u0000CODE\d+\u0000([A-Z][a-zA-Z0-9]+)/g, (_, component) => {
    return findComponentModule(component) ?? `@/features/learning/ui/${component}`;
  });

  if (text !== original) fs.writeFileSync(filePath, text, "utf8");
  return text !== original;
}

let count = 0;
for (const file of walk(SRC)) {
  if (repairFile(file)) count += 1;
}
console.log(`Repaired ${count} files.`);
