import { Check, Sparkles } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/tooltip";
import { buildBootstrapOwnerUrl, resolveBookDemoUrl } from "@/lib/app-links";
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
  ctaHref: string;
  featured?: boolean;
  features: PlanFeature[];
};

const BOOK_DEMO_URL = resolveBookDemoUrl();

const PLANS: Plan[] = [
  {
    name: "Foundation",
    price: 29,
    tagline: "For lean teams after the trial period",
    cta: "Start 14-day trial",
    ctaHref: buildBootstrapOwnerUrl("foundation"),
    features: [
      { label: "3 users", note: "+$10/mo per additional seat" },
      {
        label: "50 active requests",
        info: "Quota is consumed the moment a request is created. If a request gets no submission or update for 14 days, it's automatically closed and the quota is returned.",
      },
      { label: "5 GB cloud storage" },
      { label: "200 emails / month" },
      { label: "Google Drive, OneDrive & HubSpot CRM integrations" },
      { label: "Audit logs" },
    ],
  },
  {
    name: "Growth",
    price: 59,
    tagline: "For growing teams running requests at volume",
    cta: "Start 14-day trial",
    ctaHref: buildBootstrapOwnerUrl("growth"),
    featured: true,
    features: [
      { label: "5 users", note: "+$10/mo per additional seat" },
      { label: "250 active requests" },
      { label: "25 GB cloud storage" },
      { label: "1,000 emails / month" },
      {
        label: "Live collaboration: presence & cursors",
        info: "In collaborative requests, participants see who's online, which field each person is editing, and each other's live cursors in real time.",
      },
      { label: "Google Drive, OneDrive & HubSpot CRM integrations" },
      { label: "Team management" },
      { label: "Audit logs" },
    ],
  },
  {
    name: "Enterprise",
    price: 99,
    tagline: "For scaled operations that need control and integrations",
    cta: "Contact sales",
    ctaHref: BOOK_DEMO_URL,
    features: [
      { label: "10 users", note: "+$10/mo per additional seat" },
      { label: "500 active requests" },
      { label: "100 GB cloud storage" },
      { label: "2,500 emails / month" },
      {
        label: "Live collaboration: presence & cursors",
        info: "In collaborative requests, participants see who's online, which field each person is editing, and each other's live cursors in real time.",
      },
      { label: "Google Drive, OneDrive & HubSpot CRM integrations" },
      { label: "Team management" },
      { label: "API & webhook access" },
      { label: "Audit logs" },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 px-6 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
            Pricing
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Start with a 14-day trial, then scale by request volume
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            Every plan includes the template builder, customer portal, and
            review queue. Upgrade as your team and request volume grow.
          </p>
          <p className="mx-auto mt-5 inline-flex max-w-2xl items-center rounded-full border border-border/70 bg-background/80 px-4 py-2 text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
            14-day no-card trial: up to 3 users, 10 active requests, 1 GB
            storage, 50 emails / month
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
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
                      ${plan.price}
                    </span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <p className="mt-1 text-[0.65rem] text-muted-foreground">
                    per organization, billed monthly
                  </p>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    {plan.tagline}
                  </p>
                </CardHeader>

                <CardContent className="mt-2">
                  <ButtonLink
                    href={plan.ctaHref}
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
          ))}
        </Stagger>
      </div>
    </section>
  );
}
