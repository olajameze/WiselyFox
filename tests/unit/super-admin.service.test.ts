import { describe, it, expect } from "vitest";
import { parseEmailList } from "@/shared/lib/env";

describe("parseEmailList", () => {
  it("parses comma-separated emails", () => {
    expect(parseEmailList("a@x.com, B@Y.com ,")).toEqual(["a@x.com", "b@y.com"]);
  });

  it("returns empty array for undefined", () => {
    expect(parseEmailList(undefined)).toEqual([]);
  });
});
