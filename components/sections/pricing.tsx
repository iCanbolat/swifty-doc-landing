"use client";

import { useState } from "react";
import { Check, Minus, Sparkles } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/tooltip";
import {
  buildBootstrapOwnerUrl,
  resolveBookDemoUrl,
  type PricingPlanIntent,
} from "@/lib/app-links";
import { cn } from "@/lib/utils";

type PlanKey = PricingPlanIntent;

type Plan = {
  key: PlanKey;
  name: string;
  /** Monthly rate in GBP, excluding VAT. Annual is derived from it. */
  price: number;
  tagline: string;
  cta: string;
  featured?: boolean;
  highlights: string[];
};

type BillingPeriod = "annual" | "monthly";

type FeatureRow = {
  label: string;
  info?: string;
  values: Record<PlanKey, string | boolean>;
};

// Prices are the monthly rate; annual is billed as 10 months (2 months free)
// and displayed as its monthly equivalent. Deriving one from the other keeps
// the "2 months free" claim literally true instead of an approximate badge.
const ANNUAL_MONTHS_PAID = 10;

const ACTIVE_REQUEST_INFO =
  "An active request is one that is out with a client — sent or in progress. Drafts don't count, and closing a request you've finished frees its slot again, so the limit is about how much you have in flight at once, not how much you send.";

const BOOK_DEMO_URL = resolveBookDemoUrl();

function annualMonthlyPrice(monthlyPrice: number): number {
  return Math.round((monthlyPrice * ANNUAL_MONTHS_PAID) / 12);
}

const PLANS: Plan[] = [
  {
    key: "foundation",
    name: "Foundation",
    price: 35,
    tagline:
      "For solo practices and small teams collecting from a steady book of clients",
    cta: "Start 14-day trial",
    highlights: [
      "50 active requests",
      "3 users",
      "25 GB cloud storage",
      "Unlimited emails & reminders",
    ],
  },
  {
    key: "growth",
    name: "Growth",
    price: 83,
    tagline:
      "For growing teams that need branding, integrations and more in flight",
    cta: "Start 14-day trial",
    featured: true,
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
    name: "Enterprise",
    price: 155,
    tagline:
      "For scaled operations that need control over where the data lives",
    cta: "Start 14-day trial",
    highlights: [
      "500 active requests",
      "20 users",
      "200 GB cloud storage",
      "Bring your own S3 bucket",
      "Priority support",
    ],
  },
];

const FEATURE_GROUPS: { title: string; rows: FeatureRow[] }[] = [
  {
    title: "Volume & limits",
    rows: [
      {
        label: "Active requests",
        info: ACTIVE_REQUEST_INFO,
        values: { foundation: "50", growth: "200", enterprise: "500" },
      },
      {
        label: "Extra active requests",
        info: "Buy in packs of 50 whenever you need more in flight — during a filing peak, for example — and drop them again afterwards. Reductions are credited to your next invoice.",
        values: {
          foundation: "+£10/mo per 50",
          growth: "+£10/mo per 50",
          enterprise: "+£10/mo per 50",
        },
      },
      {
        label: "Emails & reminders",
        values: {
          foundation: "Unlimited",
          growth: "Unlimited",
          enterprise: "Unlimited",
        },
      },
      {
        label: "Users included",
        values: { foundation: "3", growth: "10", enterprise: "20" },
      },
      {
        label: "Extra users",
        values: {
          foundation: "+£10/mo each",
          growth: "+£10/mo each",
          enterprise: "+£10/mo each",
        },
      },
      {
        label: "Cloud storage",
        values: {
          foundation: "25 GB",
          growth: "100 GB",
          enterprise: "200 GB",
        },
      },
    ],
  },
  {
    title: "Collecting & reviewing",
    rows: [
      {
        label: "Template builder",
        info: "Reusable request templates with sections, conditional detail, repeatable rows and nested field groups.",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Client portal (no account needed)",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Review queue: approve or request changes",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Recurring request schedules",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Archive PDF & bulk export",
        values: { foundation: true, growth: true, enterprise: true },
      },
    ],
  },
  {
    title: "Team & collaboration",
    rows: [
      {
        label: "Team management",
        info: "Invite colleagues, assign them to workspaces and requests, and control what each role can see and do.",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Roles & permissions",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Live collaboration: presence & cursors",
        info: "In collaborative requests, participants see who's online, which field each person is editing, and each other's live cursors in real time.",
        values: { foundation: false, growth: true, enterprise: true },
      },
    ],
  },
  {
    title: "Branding & integrations",
    rows: [
      {
        label: "Google Drive integration",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "White-labelled client portal",
        info: "Your logo and favicon on the portal, with the SwiftyDoc footer removed — applied automatically, no toggle to find.",
        values: { foundation: false, growth: true, enterprise: true },
      },
      {
        label: "Send from your own address",
        info: "Pick the address clients see — info@yourfirm.com — and verify its domain once. We generate the DNS records and check them for you, and your existing inbox keeps working.",
        values: { foundation: false, growth: true, enterprise: true },
      },
      {
        label: "Zapier & connected apps",
        values: { foundation: false, growth: true, enterprise: true },
      },
      {
        label: "Webhooks & delivery logs",
        values: { foundation: false, growth: true, enterprise: true },
      },
    ],
  },
  {
    title: "Security & data",
    rows: [
      {
        label: "Encryption at rest",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Audit logs",
        values: { foundation: true, growth: true, enterprise: true },
      },
      {
        label: "Bring your own S3 bucket",
        info: "Point SwiftyDoc at your own S3 bucket: files are written to storage you control and are not counted against the plan's storage limit.",
        values: { foundation: false, growth: false, enterprise: true },
      },
      {
        label: "Priority support",
        values: { foundation: false, growth: false, enterprise: true },
      },
    ],
  },
];

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <>
        <Check className="mx-auto size-4 text-emerald-600" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  }

  if (value === false) {
    return (
      <>
        <Minus
          className="mx-auto size-3.5 text-muted-foreground/40"
          aria-hidden
        />
        <span className="sr-only">Not included</span>
      </>
    );
  }

  return <span className="text-xs font-medium text-foreground">{value}</span>;
}

export function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>("annual");

  const priceFor = (plan: Plan) =>
    billing === "annual" ? annualMonthlyPrice(plan.price) : plan.price;

  const ctaHref = (plan: Plan) => buildBootstrapOwnerUrl(plan.key, billing);

  return (
    <section id="pricing" className="scroll-mt-24 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
            Pricing
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start with a 14-day trial, then pay for what you have in flight
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Every plan includes the template builder, client portal and review
            queue, with unlimited emails and reminders. Plans differ by how many
            requests you can have open at once, how many people work on them,
            and how much you store.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Billing period"
            className="inline-flex items-center rounded-full border border-border/70 bg-background/80 p-1 text-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-4 py-1.5 font-medium transition-colors",
                billing === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={billing === "annual"}
              onClick={() => setBilling("annual")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-medium transition-colors",
                billing === "annual"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Annual
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[0.6rem] font-semibold tracking-wide",
                  billing === "annual"
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-emerald-500/10 text-emerald-700",
                )}
              >
                2 months free
              </span>
            </button>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <StaggerItem key={plan.key} className="h-full">
              <Card
                className={cn(
                  "relative flex h-full flex-col overflow-visible",
                  plan.featured &&
                    "ring-2 ring-primary/50 shadow-[0_30px_100px_-50px_rgba(70,50,229,0.45)]",
                )}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-[0.6rem] font-medium tracking-[0.2em] text-primary-foreground uppercase">
                    <Sparkles className="size-3" />
                    Most popular
                  </span>
                ) : null}

                <CardHeader>
                  <p className="text-sm font-semibold text-foreground">
                    {plan.name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      £{priceFor(plan)}
                    </span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <p className="mt-1 text-[0.65rem] text-muted-foreground">
                    {billing === "annual"
                      ? `£${plan.price * ANNUAL_MONTHS_PAID} billed yearly, ex VAT`
                      : "per organisation, billed monthly, ex VAT"}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    {plan.tagline}
                  </p>
                </CardHeader>

                <CardContent className="mt-2">
                  <ButtonLink
                    href={ctaHref(plan)}
                    size="lg"
                    variant={plan.featured ? "default" : "outline"}
                    className="w-full justify-center rounded-full"
                  >
                    {plan.cta}
                  </ButtonLink>

                  <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-6">
                    {plan.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-xs text-foreground/90"
                      >
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700">
                          <Check className="size-2.5" />
                        </span>
                        <span className="flex-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Full comparison. Hidden on small screens, where the cards above
            already carry each plan's headline numbers — a four-column matrix at
            that width is unreadable however you scroll it. */}
        <Reveal className="mt-16 hidden md:block">
          <h3 className="text-center text-sm font-semibold tracking-tight text-foreground">
            Compare plans
          </h3>

          <table className="mt-6 w-full border-collapse text-left">
            <caption className="sr-only">
              Feature comparison across the Foundation, Growth and Enterprise
              plans
            </caption>
            <thead>
              {/* Sticks under the fixed navbar so the plan and its price stay
                  visible while reading down the feature rows. */}
              <tr className="sticky top-16 z-30">
                <th
                  scope="col"
                  className="w-[34%] border-b border-border/70 bg-background p-0"
                >
                  <span className="sr-only">Feature</span>
                </th>
                {PLANS.map((plan) => (
                  // The opaque `bg-background` has to stay on the cell itself:
                  // the featured tint is 5% alpha, so rows would scroll visibly
                  // through the pinned header if it were the only background.
                  <th
                    key={plan.key}
                    scope="col"
                    className="border-b border-border/70 bg-background p-0 align-top"
                  >
                    <div
                      className={cn(
                        "flex flex-col items-center gap-1 px-3 py-3 text-center",
                        plan.featured && "bg-primary/5",
                      )}
                    >
                      <span className="text-xs font-semibold text-foreground">
                        {plan.name}
                      </span>
                      <span className="flex items-baseline gap-1">
                        <span className="text-lg font-semibold tracking-tight text-foreground">
                          £{priceFor(plan)}
                        </span>
                        <span className="text-[0.6rem] font-normal text-muted-foreground">
                          /mo
                        </span>
                      </span>
                      <ButtonLink
                        href={ctaHref(plan)}
                        size="sm"
                        variant={plan.featured ? "default" : "outline"}
                        className="mt-1 rounded-full px-3 text-[0.65rem]"
                      >
                        {plan.cta}
                      </ButtonLink>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {FEATURE_GROUPS.map((group) => (
              <tbody key={group.title}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={PLANS.length + 1}
                    className="pt-8 pb-2 text-[0.6rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label} className="border-t border-border/50">
                    <th
                      scope="row"
                      className="py-3 pr-4 text-xs font-normal text-foreground/90"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {row.label}
                        {row.info ? <InfoTooltip label={row.info} /> : null}
                      </span>
                    </th>
                    {PLANS.map((plan) => (
                      <td
                        key={plan.key}
                        className={cn(
                          "px-3 py-3 text-center",
                          plan.featured && "bg-primary/5",
                        )}
                      >
                        <FeatureValue value={row.values[plan.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-6 text-muted-foreground">
            Prices in GBP, excluding VAT, which is added at checkout. Hit your
            active-request limit in a busy month? Close the requests you have
            already finished to free slots at no cost, or add packs of 50 for
            £10/month and drop them again when the peak passes.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Need something larger, or a procurement review?{" "}
            <a
              href={BOOK_DEMO_URL}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Talk to us
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
