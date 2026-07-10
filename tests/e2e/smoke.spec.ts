import { test, expect } from "@playwright/test";

test("homepage loads with hero and pricing", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Learning that understands/i })).toBeVisible();
  await expect(page.locator("#pricing")).toBeVisible();
});

test("sign-in page renders", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();
});

test("health API returns ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.status).toBe("ok");
});

test("tutor sign-up page renders", async ({ page }) => {
  await page.goto("/tutor/sign-up");
  await expect(page.getByRole("heading", { name: /Become a WiselyFox tutor/i })).toBeVisible();
});

test("tutor sign-in page renders", async ({ page }) => {
  await page.goto("/tutor/sign-in");
  await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Sign in as tutor/i })).toBeVisible();
});

test("public tutors directory renders", async ({ page }) => {
  await page.goto("/tutors");
  await expect(page.getByRole("heading", { name: /Find a verified tutor/i })).toBeVisible();
});

test("tutor routes redirect unauthenticated users", async ({ page }) => {
  await page.goto("/tutor");
  await expect(page).toHaveURL(/sign-in/);
});

test("parent tutors route redirects unauthenticated users", async ({ page }) => {
  await page.goto("/parent/tutors");
  await expect(page).toHaveURL(/sign-in/);
});
