import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollSpy } from "@/shared/hooks/useScrollSpy";

describe("useScrollSpy", () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns null initially when no element is intersecting", () => {
    const { result } = renderHook(() =>
      useScrollSpy(["features", "pricing", "faq"]),
    );
    expect(result.current).toBeNull();
  });
});
