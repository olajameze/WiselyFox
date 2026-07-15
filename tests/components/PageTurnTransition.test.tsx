import { describe, it, expect, afterEach, vi } from "vitest";
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
    expect(isAppRoute("/sign-in")).toBe(true);
    expect(isAppRoute("/parent/settings")).toBe(true);
  });

  it("ignores marketing routes", () => {
    expect(isAppRoute("/")).toBe(false);
    expect(isAppRoute("/privacy")).toBe(false);
  });
});

describe("PageTurnTransition", () => {
  it("passes children through without a transition wrapper", () => {
    const { container } = render(
      <PageTurnTransition>
        <p>Lesson content</p>
      </PageTurnTransition>,
    );
    expect(screen.getByText("Lesson content")).toBeInTheDocument();
    expect(container.querySelector('[class*="viewport"]')).toBeNull();
  });
});
