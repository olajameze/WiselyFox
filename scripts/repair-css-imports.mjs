import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve(import.meta.dirname, "..", "src");
const SKIP = new Set(["node_modules", ".next"]);

function cssFor(file) {
  const f = file.replace(/\\/g, "/");
  if (f.includes("/admin/")) return "@/features/admin/ui/admin.module.css";
  if (f.includes("/parent/") || f.includes("/privacy/")) return "@/features/parent/ui/parent.module.css";
  if (f.includes("/learn/")) return "@/features/parent/ui/parent.module.css";
  if (f.includes("/auth/") || f.includes("SignIn") || f.includes("SignUp") || f.includes("ChildSignIn")) {
    return "@/features/auth/ui/auth.module.css";
  }
  return "@/features/parent/ui/parent.module.css";
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (/\.tsx?$/.test(ent.name)) fixCssImports(full);
  }
}

function fixCssImports(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  const original = text;

  text = text.replace(/import\s+(styles|printStyles)\s+from\s+"[^"]+\.module\.css"/g, (line, varName) => {
    if (!line.includes("CODE") && !line.includes("\u0000CODE")) return line;
    const mod =
      varName === "printStyles" ? "@/features/parent/ui/print.module.css" : cssFor(filePath);
    return `import ${varName} from "${mod}"`;
  });

  if (text !== original) {
    fs.writeFileSync(filePath, text, "utf8");
    console.log("css", filePath);
  }
}

walk(SRC);
