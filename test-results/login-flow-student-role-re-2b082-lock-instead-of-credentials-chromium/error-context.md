# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-flow.spec.ts >> student role reveals the picture PIN block instead of credentials
- Location: tests\e2e\login-flow.spec.ts:23:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Continue as Student/i })

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
  3  | test("login role buttons switch to the matching form without resetting layout", async ({
  4  |   page,
  5  | }) => {
  6  |   await page.goto("/sign-in");
  7  | 
  8  |   // Step 1: role selection heading
  9  |   await expect(page.getByRole("heading", { name: /Welcome to WiselyFox/i })).toBeVisible();
  10 | 
  11 |   // Click Parent role
  12 |   await page.getByRole("button", { name: /Continue as Parent/i }).click();
  13 | 
  14 |   // Step 2: parent credential form is shown
  15 |   await expect(page.getByText(/Logging in as Parent/i)).toBeVisible();
  16 |   await expect(page.getByLabel(/Email address/i)).toBeVisible();
  17 |   await expect(page.getByLabel(/Password/i)).toBeVisible();
  18 | 
  19 |   // Layout anchor (the open book / role pill) stays visible
  20 |   await expect(page.getByText(/Online learning platform/i)).toBeVisible();
  21 | });
  22 | 
  23 | test("student role reveals the picture PIN block instead of credentials", async ({
  24 |   page,
  25 | }) => {
  26 |   await page.goto("/sign-in");
  27 | 
> 28 |   await page.getByRole("button", { name: /Continue as Student/i }).click();
     |                                                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  29 | 
  30 |   await expect(page.getByText(/Logging in as Student/i)).toBeVisible();
  31 |   await expect(page.getByLabel(/Access code/i)).toBeVisible();
  32 |   await expect(page.getByText(/Your 4-digit picture PIN/i)).toBeVisible();
  33 | 
  34 |   // Credential inputs must not appear for the student role
  35 |   await expect(page.getByLabel(/Email address/i)).toHaveCount(0);
  36 | 
  37 |   // Layout anchor remains intact after the transition
  38 |   await expect(page.getByText(/Online learning platform/i)).toBeVisible();
  39 | });
  40 | 
  41 | test("tutor role shows tutor credential form", async ({ page }) => {
  42 |   await page.goto("/sign-in");
  43 | 
  44 |   await page.getByRole("button", { name: /Continue as Tutor/i }).click();
  45 | 
  46 |   await expect(page.getByText(/Logging in as Tutor/i)).toBeVisible();
  47 |   await expect(page.getByLabel(/Email address/i)).toBeVisible();
  48 |   await expect(page.getByText(/Forgot password\?/i)).toBeVisible();
  49 | });
  50 | 
  51 | 
```