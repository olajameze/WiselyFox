import { describe, expect, it } from "vitest";
import { shouldBlockCrossRoleMutation } from "@/shared/lib/rbac";

describe("shouldBlockCrossRoleMutation", () => {
  it("blocks a parent from mutating child lesson submission routes", () => {
    expect(shouldBlockCrossRoleMutation({ role: "PARENT", method: "POST", pathname: "/learn/lesson/math/fractions-intro" })).toBe(true);
  });

  it("allows a parent to read child analytics", () => {
    expect(shouldBlockCrossRoleMutation({ role: "PARENT", method: "GET", pathname: "/parent/children/child-123/progress" })).toBe(false);
  });

  it("allows a child to mutate their own lesson space", () => {
    expect(shouldBlockCrossRoleMutation({ role: "CHILD", method: "POST", pathname: "/learn/lesson/math/fractions-intro" })).toBe(false);
  });

  it("blocks a tutor from mutating parent routes", () => {
    expect(shouldBlockCrossRoleMutation({ role: "TUTOR", method: "POST", pathname: "/parent/children/child-123/progress" })).toBe(true);
  });

  it("allows a tutor to read parent-facing data", () => {
    expect(shouldBlockCrossRoleMutation({ role: "TUTOR", method: "GET", pathname: "/parent/children/child-123/progress" })).toBe(false);
  });

  it("allows a parent to read their own dashboard", () => {
    expect(shouldBlockCrossRoleMutation({ role: "PARENT", method: "GET", pathname: "/parent" })).toBe(false);
  });

  it("returns false when role/method/path is missing", () => {
    expect(shouldBlockCrossRoleMutation({})).toBe(false);
    expect(shouldBlockCrossRoleMutation({ role: "PARENT", method: "GET" })).toBe(false);
  });
});
