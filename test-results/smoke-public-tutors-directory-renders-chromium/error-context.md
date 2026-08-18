# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> public tutors directory renders
- Location: tests\e2e\smoke.spec.ts:32:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Find a verified tutor/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Find a verified tutor/i })

```

```yaml
- banner:
  - link "WiselyFox":
    - /url: /
  - navigation "Main":
    - link "Features":
      - /url: /#features
    - link "Tutors":
      - /url: /tutors
    - link "Pricing":
      - /url: /#pricing
    - link "FAQ":
      - /url: /#faq
  - link "Sign in":
    - /url: /sign-in
  - link "Tutor":
    - /url: /tutor/sign-in
  - link "Teach":
    - /url: /tutor/sign-up
    - button "Teach"
  - link "Join free":
    - /url: /sign-up
    - button "Join free"
- main:
  - heading "Meet Our Tutors" [level=1]
  - paragraph: A team of dedicated and experienced educators ready to guide your learning journey.
  - heading "No Tutors Found" [level=2]
  - paragraph: We couldn't find any tutors matching your criteria. Please check back later.
- contentinfo:
  - text: WiselyFox
  - paragraph: Child safe, parent guided learning for every mind. Subjects, study skills, and future-ready skills in one calm adaptive experience.
  - heading "Product" [level=3]
  - link "Features":
    - /url: /#features
  - link "Pricing":
    - /url: /#pricing
  - link "Family pilot":
    - /url: /sign-up
  - heading "Safety" [level=3]
  - link "Privacy":
    - /url: /privacy
  - link "Terms":
    - /url: /terms
  - link "Support":
    - /url: /support
  - link "Inclusive learning":
    - /url: /#inclusive
  - heading "Account" [level=3]
  - link "Sign in":
    - /url: /sign-in
  - link "Create account":
    - /url: /sign-up
  - text: © 2026 WiselyFox. Built with care for families and learners.
- group "Display preferences":
  - group "Display preferences":
    - button "System theme (light). Click to change."
    - group
- alert
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
  27 |   await page.goto("/tutor/sign-in");
  28 |   await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();
  29 |   await expect(page.getByRole("button", { name: /Sign in as tutor/i })).toBeVisible();
  30 | });
  31 | 
  32 | test("public tutors directory renders", async ({ page }) => {
  33 |   await page.goto("/tutors");
> 34 |   await expect(page.getByRole("heading", { name: /Find a verified tutor/i })).toBeVisible();
     |                                                                               ^ Error: expect(locator).toBeVisible() failed
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