import { describe, it, expect } from "vitest";
import { ConsentType } from "@prisma/client";
import { getLatestConsent, isConsentGranted } from "@/features/parent/services/consent.service";

describe("consent.service", () => {
  const now = new Date();
  const earlier = new Date(now.getTime() - 60_000);

  it("returns the most recent consent record", () => {
    const latest = getLatestConsent(
      [
        {
          id: "1",
          parentId: "p1",
          type: ConsentType.MARKETING,
          granted: false,
          version: "1.0",
          createdAt: now,
        },
        {
          id: "2",
          parentId: "p1",
          type: ConsentType.MARKETING,
          granted: true,
          version: "1.0",
          createdAt: earlier,
        },
      ],
      ConsentType.MARKETING,
    );

    expect(latest?.granted).toBe(false);
  });

  it("reports granted status from latest record", () => {
    expect(
      isConsentGranted(
        [
          {
            id: "1",
            parentId: "p1",
            type: ConsentType.CHILD_DATA,
            granted: true,
            version: "1.0",
            createdAt: earlier,
          },
          {
            id: "2",
            parentId: "p1",
            type: ConsentType.CHILD_DATA,
            granted: false,
            version: "1.0",
            createdAt: now,
          },
        ],
        ConsentType.CHILD_DATA,
      ),
    ).toBe(false);
  });
});
