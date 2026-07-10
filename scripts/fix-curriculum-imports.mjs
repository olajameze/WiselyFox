import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "src");

const STYLE_MAP = [
  ["features/marketing/ui", "../styles/marketing.module.css"],
  ["features/parent/ui", "./parent.module.css"],
  ["features/admin/ui", "./admin.module.css"],
  ["features/pwa/ui/PushNotificationSettings.tsx", "./pwa.module.css"],
  ["features/pwa/ui/PwaProvider.tsx", "./pwa.module.css"],
  ["features/pwa/ui/ParentAccessibilityToolbar.tsx", "./accessibility-toolbar.module.css"],
];

for (const [relDir, cssPath] of STYLE_MAP) {
  const fullDir = path.join(ROOT, relDir);
  if (relDir.endsWith(".tsx")) {
    const text = fs.readFileSync(fullDir, "utf8");
    const next = text.replace(/import styles from "\.\/curriculum";/, `import styles from "${cssPath}";`);
    if (next !== text) fs.writeFileSync(fullDir, next);
    continue;
  }
  for (const file of fs.readdirSync(fullDir)) {
    if (!file.endsWith(".tsx")) continue;
    const filePath = path.join(fullDir, file);
    const text = fs.readFileSync(filePath, "utf8");
    const next = text.replace(/import styles from "\.\/curriculum";/, `import styles from "${cssPath}";`);
    if (next !== text) fs.writeFileSync(filePath, next);
  }
}

const curriculumTs = path.join(ROOT, "data/curriculum.ts");
let curriculum = fs.readFileSync(curriculumTs, "utf8");
curriculum = curriculum
  .replace(
    'import { enrichStudyGuideSections } from "./curriculum";\nimport { CAREER_SKILLS_SUBJECT } from "./curriculum";\nimport { ADDITIONAL_SUBJECTS } from "./curriculum";',
    'import { enrichStudyGuideSections } from "./study-guide-enrichment";\nimport { CAREER_SKILLS_SUBJECT } from "./curriculum-career";\nimport { ADDITIONAL_SUBJECTS } from "./curriculum-subjects";',
  );
fs.writeFileSync(curriculumTs, curriculum);

const middleware = path.join(ROOT, "middleware.ts");
let mw = fs.readFileSync(middleware, "utf8");
mw = mw.replace(
  'import { NextResponse } from "next/server";\nimport type { NextRequest } from "next/navigation";',
  'import { NextResponse, type NextRequest } from "next/server";',
);
fs.writeFileSync(middleware, mw);

console.log("Fixed broken style and middleware imports.");
