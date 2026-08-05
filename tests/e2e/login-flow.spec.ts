import { test, expect } from "@playwright/test";

test("login role buttons switch to the matching form without resetting layout", async ({
  page,
}) => {
  await page.goto("/sign-in");

  // Step 1: role selection heading
  await expect(page.getByRole("heading", { name: /Welcome to WiselyFox/i })).toBeVisible();

  // Click Parent role
  await page.getByRole("button", { name: /Continue as Parent/i }).click();

  // Step 2: parent credential form is shown
  await expect(page.getByText(/Logging in as Parent/i)).toBeVisible();
  await expect(page.getByLabel(/Email address/i)).toBeVisible();
  await expect(page.getByLabel(/Password/i)).toBeVisible();

  // Layout anchor (the open book / role pill) stays visible
  await expect(page.getByText(/Online learning platform/i)).toBeVisible();
});

test("student role reveals the picture PIN block instead of credentials", async ({
  page,
}) => {
  await page.goto("/sign-in");

  await page.getByRole("button", { name: /Continue as Student/i }).click();

  await expect(page.getByText(/Logging in as Student/i)).toBeVisible();
  await expect(page.getByLabel(/Access code/i)).toBeVisible();
  await expect(page.getByText(/Your 4-digit picture PIN/i)).toBeVisible();

  // Credential inputs must not appear for the student role
  await expect(page.getByLabel(/Email address/i)).toHaveCount(0);

  // Layout anchor remains intact after the transition
  await expect(page.getByText(/Online learning platform/i)).toBeVisible();
});

test("tutor role shows tutor credential form", async ({ page }) => {
  await page.goto("/sign-in");

  await page.getByRole("button", { name: /Continue as Tutor/i }).click();

  await expect(page.getByText(/Logging in as Tutor/i)).toBeVisible();
  await expect(page.getByLabel(/Email address/i)).toBeVisible();
  await expect(page.getByText(/Forgot password\?/i)).toBeVisible();
});

