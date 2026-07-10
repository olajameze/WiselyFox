import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import {
  PageTurnTransition,
  isAppRoute,
} from "@/shared/ui/PageTurn/PageTurnTransition";

const usePathname = vi.fn(() => "/learn");

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

afterEach(() => {
  cleanup();
  usePathname.mockReturnValue("/learn");
  vi.clearAllMocks();
});

describe("isAppRoute", () => {
  it("matches in-app sections", () => {
    expect(isAppRoute("/learn")).toBe(true);
    expect(isAppRoute("/learn/subjects")).toBe(true);
    expect(isAppRoute("/parent/settings")).toBe(true);
    expect(isAppRoute("/admin/users")).toBe(true);
    expect(isAppRoute("/sign-in")).toBe(true);
  });

  it("ignores marketing routes", () => {
    expect(isAppRoute("/")).toBe(false);
    expect(isAppRoute("/privacy")).toBe(false);
  });
});

describe("PageTurnTransition", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    document.documentElement.dataset.parentReducedMotion = "false";
  });

  it("renders children on app routes", () => {
    render(
      <PageTurnTransition>
        <p>Lesson content</p>
      </PageTurnTransition>,
    );
    expect(screen.getByText("Lesson content")).toBeInTheDocument();
  });

  it("passes through marketing routes without the page wrapper", () => {
    usePathname.mockReturnValue("/");
    const { container } = render(
      <PageTurnTransition>
        <p>Marketing</p>
      </PageTurnTransition>,
    );
    expect(screen.getByText("Marketing")).toBeInTheDocument();
    expect(container.querySelector('[class*="viewport"]')).toBeNull();
  });
});
