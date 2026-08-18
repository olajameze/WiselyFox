# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> tutor sign-in page renders
- Location: tests\e2e\smoke.spec.ts:26:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/tutor/sign-in", waiting until "load"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "WiselyFox" [ref=e4] [cursor=pointer]:
        - /url: /
      - navigation "Main" [ref=e5]:
        - link "Features" [ref=e6] [cursor=pointer]:
          - /url: /#features
        - link "Tutors" [ref=e7] [cursor=pointer]:
          - /url: /tutors
        - link "Pricing" [ref=e8] [cursor=pointer]:
          - /url: /#pricing
        - link "FAQ" [ref=e9] [cursor=pointer]:
          - /url: /#faq
      - generic [ref=e10]:
        - generic [ref=e11]:
          - link "Sign in" [ref=e12] [cursor=pointer]:
            - /url: /sign-in
          - generic [ref=e13]: "|"
          - link "Tutor" [ref=e14] [cursor=pointer]:
            - /url: /tutor/sign-in
        - link "Teach" [ref=e15] [cursor=pointer]:
          - /url: /tutor/sign-up
          - button "Teach" [ref=e16]
        - link "Join free" [ref=e17] [cursor=pointer]:
          - /url: /sign-up
          - button "Join free" [ref=e18]
  - main [ref=e19]:
    - tabpanel [ref=e23]:
      - generic [ref=e25]:
        - img [ref=e27]
        - heading "Welcome to WiselyFox" [level=1] [ref=e51]
        - paragraph [ref=e52]: Login as a
        - generic [ref=e53]:
          - button "Continue as Student" [ref=e54] [cursor=pointer]:
            - generic [ref=e55]: Student
            - generic [ref=e56]: I'm here to learn
          - button "Continue as Parent" [ref=e57] [cursor=pointer]:
            - generic [ref=e58]: Parent
            - generic [ref=e59]: I guide a learner
          - button "Continue as Tutor" [ref=e60] [cursor=pointer]:
            - generic [ref=e61]: Tutor
            - generic [ref=e62]: I teach on WiselyFox
  - contentinfo [ref=e63]:
    - generic [ref=e64]:
      - generic [ref=e65]:
        - generic [ref=e66]:
          - generic [ref=e67]: WiselyFox
          - paragraph [ref=e68]: Child safe, parent guided learning for every mind. Subjects, study skills, and future-ready skills in one calm adaptive experience.
        - generic [ref=e69]:
          - heading "Product" [level=3] [ref=e70]
          - generic [ref=e71]:
            - link "Features" [ref=e72] [cursor=pointer]:
              - /url: /#features
            - link "Pricing" [ref=e73] [cursor=pointer]:
              - /url: /#pricing
            - link "Family pilot" [ref=e74] [cursor=pointer]:
              - /url: /sign-up
        - generic [ref=e75]:
          - heading "Safety" [level=3] [ref=e76]
          - generic [ref=e77]:
            - link "Privacy" [ref=e78] [cursor=pointer]:
              - /url: /privacy
            - link "Terms" [ref=e79] [cursor=pointer]:
              - /url: /terms
            - link "Support" [ref=e80] [cursor=pointer]:
              - /url: /support
            - link "Inclusive learning" [ref=e81] [cursor=pointer]:
              - /url: /#inclusive
        - generic [ref=e82]:
          - heading "Account" [level=3] [ref=e83]
          - generic [ref=e84]:
            - link "Sign in" [ref=e85] [cursor=pointer]:
              - /url: /sign-in
            - link "Create account" [ref=e86] [cursor=pointer]:
              - /url: /sign-up
      - generic [ref=e87]: © 2026 WiselyFox. Built with care for families and learners.
  - group "Display preferences" [ref=e88]:
    - group "Display preferences" [ref=e89]:
      - button "System theme (light). Click to change." [ref=e90] [cursor=pointer]:
        - generic [ref=e91]: 💻
      - group [ref=e92]:
        - generic "Accessibility options" [ref=e93] [cursor=pointer]:
          - generic [ref=e94]: ♿
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("homepage loads with hero and pricing", async ({ page }) => {
  4  |   await page.goto("/");
  5  |   await expect(page.getByRole("heading", { name: /Learning that understands/i })).toBeVisible();
  6  |   await expect(page.locator("#pricing")).toBeVisible();
  7  | });
  8  | 
  9  | test("sign-in page renders", async ({ page }) => {
  10 |   await page.goto("/sign-in");
  11 |   await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();
  12 | });
  13 | 
  14 | test("health API returns ok", async ({ request }) => {
  15 |   const res = await request.get("/api/health");
  16 |   expect(res.ok()).toBeTruthy();
  17 |   const body = await res.json();
  18 |   expect(body.status).toBe("ok");
  19 | });
  20 | 
  21 | test("tutor sign-up page renders", async ({ page }) => {
  22 |   await page.goto("/tutor/sign-up");
  23 |   await expect(page.getByRole("heading", { name: /Become a WiselyFox tutor/i })).toBeVisible();
  24 | });
  25 | 
  26 | test("tutor sign-in page renders", async ({ page }) => {
> 27 |   await page.goto("/tutor/sign-in");
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  28 |   await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();
  29 |   await expect(page.getByRole("button", { name: /Sign in as tutor/i })).toBeVisible();
  30 | });
  31 | 
  32 | test("public tutors directory renders", async ({ page }) => {
  33 |   await page.goto("/tutors");
  34 |   await expect(page.getByRole("heading", { name: /Find a verified tutor/i })).toBeVisible();
  35 | });
  36 | 
  37 | test("tutor routes redirect unauthenticated users", async ({ page }) => {
  38 |   await page.goto("/tutor");
  39 |   await expect(page).toHaveURL(/sign-in/);
  40 | });
  41 | 
  42 | test("parent tutors route redirects unauthenticated users", async ({ page }) => {
  43 |   await page.goto("/parent/tutors");
  44 |   await expect(page).toHaveURL(/sign-in/);
  45 | });
  46 | 
```