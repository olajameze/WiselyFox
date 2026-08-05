import { describe, it, expect } from "vitest";
import {
  BILLING_PLANS,
  getCheckoutPriceId,
} from "@/server/services/billing.service";
import { PlanTier, BillingInterval } from "@prisma/client";

describe("billing price catalog", () => {
  it("lists Essential and Family plans with monthly/annual pricing", () => {
    expect(BILLING_PLANS[PlanTier.ESSENTIAL]).toBeDefined();
    expect(BILLING_PLANS[PlanTier.FAMILY]).toBeDefined();

    expect(BILLING_PLANS[PlanTier.ESSENTIAL][BillingInterval.MONTHLY].price).toBe(500);
    expect(BILLING_PLANS[PlanTier.ESSENTIAL][BillingInterval.ANNUAL].price).toBe(3600);
    expect(BILLING_PLANS[PlanTier.FAMILY][BillingInterval.MONTHLY].price).toBe(1000);
    expect(BILLING_PLANS[PlanTier.FAMILY][BillingInterval.ANNUAL].price).toBe(7200);
  });

  it("resolves price ids for every supported plan/interval", () => {
    expect(getCheckoutPriceId(PlanTier.ESSENTIAL, BillingInterval.MONTHLY)).toBe(
      "price_essential_monthly_test",
    );
    expect(getCheckoutPriceId(PlanTier.ESSENTIAL, BillingInterval.ANNUAL)).toBe(
      "price_essential_annual_test",
    );
    expect(getCheckoutPriceId(PlanTier.FAMILY, BillingInterval.MONTHLY)).toBe(
      "price_family_monthly_test",
    );
    expect(getCheckoutPriceId(PlanTier.FAMILY, BillingInterval.ANNUAL)).toBe(
      "price_family_annual_test",
    );
  });
});

