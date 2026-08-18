# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> homepage loads with hero and pricing
- Location: tests\e2e\smoke.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('heading', { name: /Learning that understands/i })
Expected: visible
Received: undefined

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Learning that understands/i })

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
    - generic "Loading" [ref=e20]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]: p. 1
          - generic [ref=e27]: Loading
        - paragraph [ref=e28]: Just a moment…
  - contentinfo [ref=e29]:
    - generic [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]: WiselyFox
          - paragraph [ref=e34]: Child safe, parent guided learning for every mind. Subjects, study skills, and future-ready skills in one calm adaptive experience.
        - generic [ref=e35]:
          - heading "Product" [level=3] [ref=e36]
          - generic [ref=e37]:
            - link "Features" [ref=e38] [cursor=pointer]:
              - /url: /#features
            - link "Pricing" [ref=e39] [cursor=pointer]:
              - /url: /#pricing
            - link "Family pilot" [ref=e40] [cursor=pointer]:
              - /url: /sign-up
        - generic [ref=e41]:
          - heading "Safety" [level=3] [ref=e42]
          - generic [ref=e43]:
            - link "Privacy" [ref=e44] [cursor=pointer]:
              - /url: /privacy
            - link "Terms" [ref=e45] [cursor=pointer]:
              - /url: /terms
            - link "Support" [ref=e46] [cursor=pointer]:
              - /url: /support
            - link "Inclusive learning" [ref=e47] [cursor=pointer]:
              - /url: /#inclusive
        - generic [ref=e48]:
          - heading "Account" [level=3] [ref=e49]
          - generic [ref=e50]:
            - link "Sign in" [ref=e51] [cursor=pointer]:
              - /url: /sign-in
            - link "Create account" [ref=e52] [cursor=pointer]:
              - /url: /sign-up
      - generic [ref=e53]: © 2026 WiselyFox. Built with care for families and learners.
  - group "Display preferences" [ref=e54]:
    - group "Display preferences" [ref=e55]:
      - button "System theme (light). Click to change." [ref=e56] [cursor=pointer]:
        - generic [ref=e57]: 💻
      - group [ref=e58]:
        - generic "Accessibility options" [ref=e59] [cursor=pointer]:
          - generic [ref=e60]: ♿
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("homepage loads with hero and pricing", async ({ page }) => {
  4  |   await page.goto("/");
> 5  |   await expect(page.getByRole("heading", { name: /Learning that understands/i })).toBeVisible();
     |                                                                                   ^ Error: expect(locator).toBeVisible() failed
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