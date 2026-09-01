# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login-flow.spec.ts >> login role buttons switch to the matching form without resetting layout
- Location: tests\e2e\login-flow.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByLabel(/Password/i)
Expected: visible
Error: strict mode violation: getByLabel(/Password/i) resolved to 2 elements:
    1) <input id="_r_1_" required="" type="password" name="password" aria-invalid="false" autocomplete="current-password" class="Input_input__H3gb4 PasswordField_input__rVcR5"/> aka getByRole('textbox', { name: 'Password' })
    2) <button type="button" aria-pressed="false" aria-label="Show password" class="PasswordField_toggle__vE_pC">Show</button> aka getByRole('button', { name: 'Show password' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByLabel(/Password/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - dialog "Install WiselyFox app" [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]: 🦊
        - generic [ref=e6]:
          - strong [ref=e7]: Install WiselyFox
          - generic [ref=e8]: Instant app • Fast access
      - button "Close install prompt" [ref=e9] [cursor=pointer]: ✕
    - paragraph [ref=e11]: Install WiselyFox on your phone or tablet for a fast full-screen app experience, study streaks, and offline practice.
    - generic [ref=e12]:
      - button "Install App" [ref=e13] [cursor=pointer]
      - button "Not now" [ref=e14] [cursor=pointer]
  - banner [ref=e15]:
    - generic [ref=e16]:
      - link "WiselyFox" [ref=e17] [cursor=pointer]:
        - /url: /
        - generic [ref=e18]: 🦊
        - generic [ref=e19]: WiselyFox
      - navigation "Main" [ref=e20]:
        - link "Features" [ref=e21] [cursor=pointer]:
          - /url: /#features
        - link "Tutors" [ref=e22] [cursor=pointer]:
          - /url: /tutors
        - link "Pricing" [ref=e23] [cursor=pointer]:
          - /url: /#pricing
        - link "FAQ" [ref=e24] [cursor=pointer]:
          - /url: /#faq
      - generic [ref=e25]:
        - button "Show display tools" [ref=e27] [cursor=pointer]: ☼
        - generic [ref=e28]:
          - link "Sign in" [ref=e29] [cursor=pointer]:
            - /url: /sign-in
          - generic [ref=e30]: "|"
          - link "Tutor" [ref=e31] [cursor=pointer]:
            - /url: /tutor/sign-in
        - link "Join free" [ref=e32] [cursor=pointer]:
          - /url: /sign-up
          - button "Join free" [ref=e33]
  - main [ref=e34]:
    - tabpanel [ref=e38]:
      - generic [ref=e40]:
        - button "Back to role selection" [ref=e41] [cursor=pointer]: ← Back
        - generic [ref=e42]:
          - generic [ref=e43]: 🦊
          - generic [ref=e44]:
            - generic [ref=e45]: WiselyFox
            - generic [ref=e46]: Online learning platform
        - generic [ref=e47]:
          - text: Logging in as
          - strong [ref=e49]: Parent
        - status [ref=e50]:
          - generic [ref=e51]: Demo Parent & Super Admin
          - generic [ref=e52]:
            - strong [ref=e53]: "Parent:"
            - text: "Email: parent@example.com, Password: password123"
          - separator [ref=e54]
          - generic [ref=e55]:
            - strong [ref=e56]: "Super Admin:"
            - text: "Email: admin@wiselyfox.com, Password: password123"
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]:
              - generic [ref=e60]: Email address
              - textbox "Email address" [ref=e61]
            - generic [ref=e63]:
              - generic [ref=e64]:
                - generic [ref=e65]: Password
                - textbox "Password" [ref=e66]
              - button "Show password" [ref=e67] [cursor=pointer]: Show
            - generic [ref=e68]:
              - button "Continue with Google" [ref=e69] [cursor=pointer]:
                - img [ref=e70]
                - text: Google
              - button "Continue with Facebook" [ref=e75] [cursor=pointer]:
                - img [ref=e76]
                - text: Facebook
          - button "Sign in" [ref=e79] [cursor=pointer]
        - generic [ref=e80]:
          - link "Forgot password?" [ref=e81] [cursor=pointer]:
            - /url: /forgot-password
          - paragraph [ref=e82]:
            - text: By continuing you agree to the
            - link "Terms" [ref=e83] [cursor=pointer]:
              - /url: /terms
            - text: and
            - link "Privacy Policy" [ref=e84] [cursor=pointer]:
              - /url: /privacy
            - text: .
  - contentinfo "Site footer" [ref=e85]:
    - generic [ref=e86]:
      - generic [ref=e87]:
        - generic [ref=e88]:
          - link "WiselyFox" [ref=e89] [cursor=pointer]:
            - /url: /
            - generic [ref=e90]: 🦊
            - generic [ref=e91]: WiselyFox
          - paragraph [ref=e92]: Child-safe, parent-guided adaptive learning for every mind. Subjects, study skills, and future-ready coding in one calm, inclusive notebook.
        - generic [ref=e93]:
          - heading "Learning Tracks" [level=4] [ref=e94]
          - generic [ref=e95]:
            - link "Mathematics" [ref=e96] [cursor=pointer]:
              - /url: /#features
            - link "Coding & STEM" [ref=e97] [cursor=pointer]:
              - /url: /#features
            - link "Reading & Literacy" [ref=e98] [cursor=pointer]:
              - /url: /#features
            - link "Logic & Reasoning" [ref=e99] [cursor=pointer]:
              - /url: /#features
            - link "Study Skills" [ref=e100] [cursor=pointer]:
              - /url: /#features
        - generic [ref=e101]:
          - heading "Features & Safety" [level=4] [ref=e102]
          - generic [ref=e103]:
            - link "Inclusive Calm Mode" [ref=e104] [cursor=pointer]:
              - /url: /#inclusive
            - link "Visual Schedules" [ref=e105] [cursor=pointer]:
              - /url: /#inclusive
            - link "Verified Tutors" [ref=e106] [cursor=pointer]:
              - /url: /tutors
            - link "Pricing Plans" [ref=e107] [cursor=pointer]:
              - /url: /#pricing
            - link "Frequently Asked" [ref=e108] [cursor=pointer]:
              - /url: /#faq
        - generic [ref=e109]:
          - heading "Account & Legal" [level=4] [ref=e110]
          - generic [ref=e111]:
            - link "Parent Sign In" [ref=e112] [cursor=pointer]:
              - /url: /sign-in
            - link "Child PIN Sign In" [ref=e113] [cursor=pointer]:
              - /url: /child-sign-in
            - link "Tutor Sign In" [ref=e114] [cursor=pointer]:
              - /url: /tutor/sign-in
            - link "Privacy Policy" [ref=e115] [cursor=pointer]:
              - /url: /privacy
            - link "Terms of Service" [ref=e116] [cursor=pointer]:
              - /url: /terms
            - link "Support & GDPR" [ref=e117] [cursor=pointer]:
              - /url: /support
      - generic [ref=e118]:
        - generic "Site Language" [ref=e119]:
          - generic [ref=e120]: 🇬🇧
          - generic [ref=e121]: English (UK)
        - generic [ref=e122]: © 2026 WiselyFox. Built with care for families and learners worldwide.
  - button "Open Next.js Dev Tools" [ref=e128] [cursor=pointer]:
    - img [ref=e129]
  - alert [ref=e132]
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
> 17 |   await expect(page.getByLabel(/Password/i)).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
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
  28 |   await page.getByRole("button", { name: /Continue as Student/i }).click();
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