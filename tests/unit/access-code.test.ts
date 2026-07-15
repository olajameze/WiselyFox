import { describe, it, expect } from "vitest";
import {
  accessCodeCompactKey,
  normalizeAccessCodeInput,
} from "@/shared/lib/access-code";

describe("access-code helpers", () => {
  it("normalizes spaces and underscores to hyphens", () => {
    expect(normalizeAccessCodeInput("wfox demo alex")).toBe("wfox-demo-alex");
    expect(normalizeAccessCodeInput(" WFOX_DEMO_ALEX ")).toBe("wfox-demo-alex");
    expect(normalizeAccessCodeInput("wfox-demo-alex")).toBe("wfox-demo-alex");
  });

  it("builds a compact key without separators", () => {
    expect(accessCodeCompactKey("wfox-demo-alex")).toBe("wfoxdemoalex");
    expect(accessCodeCompactKey("wfox demo alex")).toBe("wfoxdemoalex");
    expect(accessCodeCompactKey("wfoxdemoalex")).toBe("wfoxdemoalex");
  });
});
