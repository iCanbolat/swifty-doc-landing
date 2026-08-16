import type { PricingPlanIntent } from "@/lib/app-links";

export type PlanKey = PricingPlanIntent;

export type Plan = {
  key: PlanKey;
  name: string;
  /** Monthly amount in EUR — the sum actually charged. Pounds are derived. */
  price: number;
  tagline: string;
  cta: string;
  featured?: boolean;
  /** Named when the plan is a superset of the one before it. */
  inherits?: string;
  highlights: string[];
};

export type BillingPeriod = "annual" | "monthly";

// Prices are the monthly rate; annual is billed as 10 months (2 months free)
// and displayed as its monthly equivalent. Deriving one from the other keeps
// the "2 months free" claim literally true instead of an approximate badge.
export const ANNUAL_MONTHS_PAID = 10;

/**
 * Creem bills in EUR — it has no GBP support — but the market this page is
 * written for is the UK, where buyers anchor in pounds and read a euro price as
 * "not for me". So EUR stays the charged amount and the pound figure is derived
 * from it at a fixed rate. Two hand-entered prices would drift apart and the
 * page would end up advertising a number nobody is charged, so this is the only
 * place a conversion happens, and every pound figure on the site is shown next
 * to the euro one that will actually leave the customer's account.
 *
 * The rate is fixed and published rather than tracked live, so a pound price
 * cannot move under someone mid-decision. That makes stating it mandatory: an
 * unexplained pound figure reads as a promise about what the bank will charge,
 * and the bank applies its own rate. Revisit when EUR/GBP has moved far enough
 * that the shown price misleads.
 *
 * EUR amounts are chosen so the derived pound price lands on a round number —
 * €245 / 1.17 = £209.4, not the other way round.
 */
export const EUR_PER_GBP = 1.17;

export const CONVERSION_NOTICE = `Pound prices are converted at a fixed £1 = €${EUR_PER_GBP}; your bank may apply its own rate.`;

export function gbp(eur: number): number {
  return Math.round(eur / EUR_PER_GBP);
}

export function annualMonthlyPrice(monthlyPrice: number): number {
  return Math.round((monthlyPrice * ANNUAL_MONTHS_PAID) / 12);
}

/**
 * The plans live here rather than in the pricing section because the niche
 * landing pages under /for each highlight one of them. A second hand-entered
 * copy of these figures would eventually advertise a price nobody is charged.
 */
export const PLANS: Plan[] = [
  {
    key: "starter",
    name: "Solo",
    price: 35,
    tagline:
      "For a solo adviser or broker, with an admin working alongside them",
    cta: "Start 14-day trial",
    highlights: [
      "20 active requests",
      "2 users",
      "10 GB cloud storage",
      "Unlimited clients & recipients",
    ],
  },
  {
    key: "foundation",
    name: "Foundation",
    price: 69,
    tagline: "For a small practice where more than one person chases documents",
    cta: "Start 14-day trial",
    inherits: "Solo",
    highlights: [
      "60 active requests",
      "4 users",
      "25 GB cloud storage",
      "Unlimited emails & reminders",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    price: 152,
    tagline:
      "For teams that need branding, integrations and more work in flight",
    cta: "Start 14-day trial",
    featured: true,
    inherits: "Foundation",
    highlights: [
      "200 active requests",
      "10 users",
      "100 GB cloud storage",
      "White-label portal & sender address",
      "Webhooks & Zapier",
    ],
  },
  {
    key: "enterprise",
    name: "Scale",
    price: 245,
    tagline:
      "For scaled operations that need control over where the data lives",
    cta: "Start 14-day trial",
    inherits: "Growth",
    highlights: [
      "500 active requests",
      "20 users",
      "200 GB cloud storage",
      "Bring your own S3 bucket",
      "Priority support",
    ],
  },
];

export function getPlanByKey(key: PlanKey): Plan {
  const plan = PLANS.find((candidate) => candidate.key === key);

  if (!plan) throw new Error(`Unknown plan key: ${key}`);

  return plan;
}
