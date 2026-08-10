import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("should display demo login details", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Demo Account Details" }),
    ).toBeVisible();
    await expect(page.getByText("parent@demo.wiselyfox.test")).toBeVisible();
    await expect(page.getByText("wfox-demo-alex")).toBeVisible();
  });

  test.describe("Parent Login", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("tab", { name: "Parent" }).click();
    });

    test("should allow a parent to log in successfully", async ({ page }) => {
      await page
        .getByLabel("Email address")
        .fill("parent@demo.wiselyfox.test");
      await page.getByLabel("Password").fill("demo123456");
      await page.getByRole("button", { name: "Sign in with Email" }).click();

      await expect(page).toHaveURL(/\/parent/);
      await expect(
        page.getByRole("heading", { name: /dashboard/i }),
      ).toBeVisible();
    });

    test("should show an error for invalid parent credentials", async ({
      page,
    }) => {
      await page.getByLabel("Email address").fill("parent@demo.wiselyfox.test");
      await page.getByLabel("Password").fill("wrongpassword");
      await page.getByRole("button", { name: "Sign in with Email" }).click();

      await expect(page.getByText(/Sign in failed/i)).toBeVisible();
      await expect(page).toHaveURL("/sign-in");
    });
  });

  test.describe("Child Login", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("tab", { name: "Child" }).click();
    });

    test("should allow a child to log in successfully", async ({ page }) => {
      await page.getByLabel("Access Code").fill("wfox-demo-alex");
      await page.getByRole("button", { name: "Continue" }).click();

      await expect(page.getByText("Welcome back, Alex!")).toBeVisible();

      await page.getByLabel("PIN").fill("1234");
      await page.getByRole("button", { name: "Enter" }).click();

      await expect(page).toHaveURL(/\/child/);
      await expect(page.getByRole("heading", { name: /home/i })).toBeVisible();
    });

    test("should show an error for an invalid access code", async ({
      page,
    }) => {
      await page.getByLabel("Access Code").fill("wfox-demo-wrong");
      await page.getByRole("button", { name: "Continue" }).click();

      await expect(page.getByText(/Invalid access code/i)).toBeVisible();
    });

    test("should show an error for an invalid PIN", async ({ page }) => {
      await page.getByLabel("Access Code").fill("wfox-demo-alex");
      await page.getByRole("button", { name: "Continue" }).click();

      await page.getByLabel("PIN").fill("4321");
      await page.getByRole("button", { name: "Enter" }).click();

      await expect(page.getByText(/Invalid PIN/i)).toBeVisible();
    });
  });
});