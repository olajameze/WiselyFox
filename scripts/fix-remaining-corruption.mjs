import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "src");
const SKIP = new Set(["node_modules", ".next"]);

const GLOBAL = [
  [/from "CODE\d+CODE\d+"/g, 'from "@prisma/client"'],
  [/from "BROKENBROKEN"/g, 'from "@prisma/client"'],
  [/import { PrismaClient } from "CODE\d+CODE\d+"/g, 'import { PrismaClient } from "@prisma/client"'],
  [/from "\.BROKEN"/g, 'from "./subject-media"'],
  [/slug: "career-CODE0"/g, 'slug: "career-data-spreadsheets"'],
  [/slug: "CODE0",\n        title: "Data privacy at work"/g, 'slug: "workplace-data-privacy",\n        title: "Data privacy at work"'],
  [/pathname === "CODE10"/g, 'pathname === "/learn"'],
  [/ ,  /g, ", "],
];

const FILE_FIXES = {
  "src/app/api/webhooks/stripe/route.ts": [
    ['import { getStripe } from "@BROKEN.service";', 'import { getStripe } from "@/server/services/stripe.service";'],
  ],
  "src/app/learn/quiz/page.tsx": [
    ['} from "@BROKEN.service";', '} from "@/features/learning/services/age-content.service";'],
  ],
  "src/app/learn/subjects/page.tsx": [
    ['import { getPublishedSubjects } from "@/features/parent/ui/parent.module.css";', 'import { getPublishedSubjects } from "@/features/learning/services/curriculum-cache.service";'],
    ['} from "@BROKEN.service";', '} from "@/features/learning/services/age-content.service";'],
  ],
  "src/app/learn/subjects/[subjectSlug]/page.tsx": [
    ['import { getSubjectWithLessons } from "@/features/parent/ui/parent.module.css";', 'import { getSubjectWithLessons } from "@/features/learning/services/curriculum-cache.service";'],
    ['} from "@BROKEN.service";', '} from "@/features/learning/services/lesson-progress.service";'],
    ['} from "@BROKEN.service";', '} from "@/features/learning/services/age-content.service";'],
    ['} from "@BROKEN.service";', '} from "@/features/learning/services/lesson-unlock.service";'],
    ['import { buildLessonSections } from "@/features/parent/ui/parent.module.css";', 'import { buildLessonSections } from "@/features/learning/services/lesson-grouping.service";'],
  ],
  "src/app/learn/lesson/[subjectSlug]/[lessonSlug]/page.tsx": [
    ['import { getSubjectCompletionCount, isLessonCompleted } from "@/features/parent/ui/parent.module.css";', 'import { getSubjectCompletionCount, isLessonCompleted } from "@/features/learning/services/lesson-progress.service";'],
  ],
  "src/app/learn/guide/[subjectSlug]/page.tsx": [
    ['import { getSubject } from "@/features/parent/ui/parent.module.css";', 'import { getSubject } from "@/data/curriculum";'],
  ],
  "src/app/parent/assessment/[childId]/page.tsx": [
    ['import { ASSESSMENT_QUESTIONS } from "@BROKEN.service";', 'import { ASSESSMENT_QUESTIONS } from "@/features/assessment/services/assessment.service";'],
    ['import { submitAssessment } from "@BROKEN.actions";', 'import { submitAssessment } from "@/features/onboarding/actions/onboarding.actions";'],
  ],
  "src/app/parent/children/[childId]/certificates/page.tsx": [
    ['import { getChildQuizAttempts } from "@BROKEN.service";', 'import { getChildQuizAttempts } from "@/features/learning/services/quiz-results.service";'],
  ],
  "src/app/parent/children/[childId]/results/page.tsx": [
    ['import { getChildResultsSummary } from "@BROKEN.service";', 'import { getChildResultsSummary } from "@/features/parent/services/printable-content.service";'],
  ],
  "src/app/parent/onboarding/page.tsx": [
    ['import { createChildProfile, completeOnboarding } from "@BROKEN.actions";', 'import { createChildProfile, completeOnboarding } from "@/features/onboarding/actions/onboarding.actions";'],
  ],
  "src/app/parent/page.tsx": [
    ['} from "@BROKEN.service";', '} from "@/features/parent/services/parent-dashboard.service";'],
  ],
  "src/app/parent/progress/page.tsx": [
    ['} from "@BROKEN.service";', '} from "@/features/parent/services/parent-dashboard.service";'],
  ],
  "src/app/parent/schedule/[childId]/page.tsx": [
    ['import { getWeekSchedule } from "@BROKEN.service";', 'import { getWeekSchedule } from "@/features/parent/services/schedule.service";'],
  ],
  "src/features/admin/actions/admin.actions.ts": [
    ['import { FraudStatus } from "CODE10CODE5";', 'import { FraudStatus } from "@prisma/client";'],
  ],
  "src/features/admin/ui/AdminAccountMenu.tsx": [
    ['import { signOutToSignIn } from "@BROKEN.actions";', 'import { signOutToSignIn } from "@/features/auth/actions/session.actions";'],
  ],
  "src/features/admin/ui/FraudReviewActions.tsx": [
    ['import { reviewFraudSignal } from "@BROKEN.actions";', 'import { reviewFraudSignal } from "@/features/admin/actions/admin.actions";'],
  ],
  "src/features/auth/actions/session.actions.ts": [
    ['import { signOut } from "@BROKEN";', 'import { signOut } from "@/features/auth/auth";'],
  ],
  "src/features/auth/ui/ChildSignInForm.tsx": [
    ['import { signInChild } from "@BROKEN.actions";', 'import { signInChild } from "@/features/auth/actions/auth.actions";'],
    ['import styles from "./curriculum";', 'import styles from "./auth.module.css";'],
  ],
  "src/features/auth/ui/SignInForm.tsx": [
    ['import { signInParent } from "@BROKEN.actions";', 'import { signInParent } from "@/features/auth/actions/auth.actions";'],
    ['import styles from "./curriculum";', 'import styles from "./auth.module.css";'],
  ],
  "src/features/auth/ui/SignUpForm.tsx": [
    ['import { signUpParent } from "@BROKEN.actions";', 'import { signUpParent } from "@/features/auth/actions/auth.actions";'],
    ['import styles from "./curriculum";', 'import styles from "./auth.module.css";'],
  ],
  "src/features/inclusive/lib/accommodation-client.ts": [
    ['import type { LearningProfile } from "CODE2CODE0";', 'import type { LearningProfile } from "@prisma/client";'],
    ['} from "@BROKEN.service";', '} from "@/features/inclusive/services/accommodation.service";'],
  ],
  "src/features/inclusive/services/accommodation.service.ts": [
    ['import type { LearningProfile, EngagementStyle } from "CODE1CODE0";', 'import type { LearningProfile, EngagementStyle } from "@prisma/client";'],
  ],
  "src/features/learning/actions/learning.actions.ts": [
    ['} from "@BROKEN.service";', '} from "@/features/learning/services/quiz-results.service";'],
  ],
  "src/features/learning/services/lesson-grouping.service.ts": [
    ['} from "@BROKEN";', '} from "@/data/curriculum-tracks";'],
    ['} from "@BROKEN.service";', '} from "@/features/learning/services/lesson-unlock.service";'],
  ],
  "src/features/learning/ui/DailyFactCard.tsx": [
    ['import type { DailyFact } from "@BROKEN";', 'import type { DailyFact } from "@/data/daily-facts";'],
  ],
  "src/features/learning/ui/FocusTimer.tsx": [
    ['import { completeFocusSession } from "@BROKEN.actions";', 'import { completeFocusSession } from "@/features/learning/actions/learning.actions";'],
  ],
  "src/features/learning/ui/LessonPlayer.tsx": [
    ['import { completeLesson } from "@BROKEN.actions";', 'import { completeLesson } from "@/features/learning/actions/learning.actions";'],
    ['import { LEARNING_METHOD_LABELS, LEARNING_METHOD_HINTS } from "@BROKEN";', 'import { LEARNING_METHOD_LABELS, LEARNING_METHOD_HINTS } from "@/data/learning-methods";'],
  ],
  "src/features/parent/actions/account.actions.ts": [
    ['import { signOut } from "@BROKEN";', 'import { signOut } from "@/features/auth/auth";'],
    ['import { cancelStripeSubscription } from "@BROKEN.service";', 'import { cancelStripeSubscription } from "@/server/services/stripe.service";'],
  ],
  "src/features/parent/ui/AccessibilityForm.tsx": [
    ['import { updateChildAccessibility } from "@BROKEN.actions";', 'import { updateChildAccessibility } from "@/features/parent/actions/household.actions";'],
  ],
  "src/features/parent/ui/AccountMenu.tsx": [
    ['} from "@BROKEN.actions";', '} from "@/features/auth/actions/session.actions";'],
  ],
  "src/features/parent/ui/DataExportButton.tsx": [
    ['import { exportHouseholdData } from "@BROKEN.actions";', 'import { exportHouseholdData } from "@/features/parent/actions/household.actions";'],
  ],
  "src/features/parent/ui/DeleteAccountSection.tsx": [
    ['import { deleteParentAccount } from "@BROKEN.actions";', 'import { deleteParentAccount } from "@/features/parent/actions/account.actions";'],
  ],
  "src/features/parent/ui/PlanUpgradeSection.tsx": [
    ['} from "@BROKEN.actions";', '} from "@/features/parent/actions/household.actions";'],
    ['import styles from "./curriculum";', 'import styles from "./parent.module.css";'],
  ],
  "src/features/parent/ui/RewardApprovalActions.tsx": [
    ['import { approveReward, rejectReward } from "@BROKEN.actions";', 'import { approveReward, rejectReward } from "@/features/parent/actions/household.actions";'],
  ],
  "src/server/jobs/anonymized-aggregation.job.ts": [
    ['import { applyKAnonymity } from "@BROKEN.service";', 'import { applyKAnonymity } from "@/server/services/trial-reminder.service";'],
  ],
  "src/server/services/notification-delivery.service.ts": [
    ['import type { NotificationType } from "CODE3CODE0";', 'import type { NotificationType } from "@prisma/client";'],
  ],
  "src/server/services/trial-reminder.service.ts": [
    ['import { sendTrialReminderEmail } from "@BROKEN.service";', 'import { sendTrialReminderEmail } from "@/server/services/email.service";'],
    ['import { NotificationType } from "CODE6CODE4";', 'import { NotificationType } from "@prisma/client";'],
  ],
  "src/shared/lib/prisma.ts": [
    ['import { PrismaClient } from "CODE1CODE0";', 'import { PrismaClient } from "@prisma/client";'],
  ],
  "public/offline.html": [
    ["Offline — WiselyFox", "Offline | WiselyFox"],
  ],
  "public/sw.js": [
    ["/* WiselyFox service worker — offline shell + push notifications */", "/* WiselyFox service worker: offline shell + push notifications */"],
  ],
  "src/app/globals.css": [
    ["/* Warm, confident palette — sapphire trust + tangerine energy */", "/* Warm, confident palette: sapphire trust + tangerine energy */"],
  ],
};

function walk(dir, files = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, files);
    else if (/\.(tsx?|html|js|css|md)$/.test(ent.name)) files.push(full);
  }
  return files;
}

function applyGlobal(text) {
  let out = text
    .replace(/@\u0000CODE\d+\u0000/g, "@BROKEN")
    .replace(/\.\u0000CODE\d+\u0000/g, ".BROKEN")
    .replace(/\u0000CODE\d+\u0000/g, "BROKEN");
  for (const [pattern, replacement] of GLOBAL) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

let count = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  let text = fs.readFileSync(file, "utf8");
  const original = text;
  text = applyGlobal(text);

  const fixes = FILE_FIXES[rel];
  if (fixes) {
    for (const [from, to] of fixes) {
      text = text.split(from).join(to);
    }
  }

  if (text !== original) {
    fs.writeFileSync(file, text, "utf8");
    count += 1;
    console.log(rel);
  }
}

console.log(`Fixed ${count} files.`);
