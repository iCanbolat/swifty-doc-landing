"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

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

type PlanFeature = {
  label: string;
  info?: string;
  note?: string;
};

type Plan = {
  name: string;
  price: number;
  tagline: string;
  cta: string;
  planIntent?: PricingPlanIntent;
  contactSales?: boolean;
  featured?: boolean;
  features: PlanFeature[];
};

type BillingPeriod = "annual" | "monthly";

// Listed plan prices are the annual (billed-yearly) monthly-equivalent rate.
// Paying monthly costs 20% more.
const MONTHLY_MULTIPLIER = 1.2;

const BOOK_DEMO_URL = resolveBookDemoUrl();

const PLANS: Plan[] = [
  {
    name: "Foundation",
    price: 29,
    tagline: "For lean teams after the trial period",
    cta: "Start 14-day trial",
    planIntent: "foundation",
    features: [
      { label: "2 users", note: "+$10/mo per additional seat" },
      { label: "Unlimited requests" },
      { label: "10 GB cloud storage" },
      { label: "200 emails / month" },
      { label: "Google Drive integration" },
      { label: "Audit logs" },
    ],
  },
  {
    name: "Growth",
    price: 59,
    tagline: "For growing teams that need more seats and storage",
    cta: "Start 14-day trial",
    planIntent: "growth",
    featured: true,
    features: [
      { label: "5 users", note: "+$10/mo per additional seat" },
      { label: "Unlimited requests" },
      { label: "50 GB cloud storage" },
      { label: "1,000 emails / month" },
      {
        label: "Live collaboration: presence & cursors",
        info: "In collaborative requests, participants see who's online, which field each person is editing, and each other's live cursors in real time.",
      },
      { label: "Google Drive & Zapier integrations" },
      { label: "API & webhook access" },
      { label: "Team management" },
      { label: "Audit logs" },
    ],
  },
  {
    name: "Enterprise",
    price: 99,
    tagline: "For scaled operations that need control and integrations",
    cta: "Contact sales",
    contactSales: true,
    features: [
      { label: "15 users", note: "+$10/mo per additional seat" },
      { label: "Unlimited requests" },
      { label: "200 GB cloud storage" },
      { label: "2,500 emails / month" },
      {
        label: "Live collaboration: presence & cursors",
        info: "In collaborative requests, participants see who's online, which field each person is editing, and each other's live cursors in real time.",
      },
      { label: "Google Drive & Zapier integrations" },
      { label: "Team management" },
      { label: "API & webhook access" },
      { label: "Audit logs" },
    ],
  },
];

export function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>("annual");

  return (
    <section id="pricing" className="scroll-mt-24 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
            Pricing
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start with a 14-day trial, then scale by team and storage
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Every plan includes the template builder, customer portal, and
            review queue, with unlimited requests on every plan. Upgrade as your
            team and storage needs grow.
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
                Save 20%
              </span>
            </button>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const ctaHref = plan.contactSales
              ? BOOK_DEMO_URL
              : buildBootstrapOwnerUrl(plan.planIntent ?? "foundation", billing);

            return (
            <StaggerItem key={plan.name} className="h-full">
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
                      $
                      {billing === "annual"
                        ? plan.price
                        : Math.round(plan.price * MONTHLY_MULTIPLIER)}
                    </span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <p className="mt-1 text-[0.65rem] text-muted-foreground">
                    {billing === "annual"
                      ? "per organization, billed annually"
                      : "per organization, billed monthly"}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    {plan.tagline}
                  </p>
                </CardHeader>

                <CardContent className="mt-2">
                  <ButtonLink
                    href={ctaHref}
                    size="lg"
                    variant={plan.featured ? "default" : "outline"}
                    className="w-full justify-center rounded-full"
                  >
                    {plan.cta}
                  </ButtonLink>

                  <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-6">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.label}
                        className="flex items-start gap-2.5 text-xs text-foreground/90"
                      >
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700">
                          <Check className="size-2.5" />
                        </span>
                        <span className="flex-1">
                          <span className="inline-flex items-center gap-1.5">
                            {feature.label}
                            {feature.info ? (
                              <InfoTooltip label={feature.info} />
                            ) : null}
                          </span>
                          {feature.note ? (
                            <span className="block text-[0.65rem] text-muted-foreground">
                              {feature.note}
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
