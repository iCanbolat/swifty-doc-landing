"use client";

import { useState } from "react";
import { Check, Minus, Sparkles } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InfoTooltip } from "@/components/ui/tooltip";
import { buildBootstrapOwnerUrl, resolveBookDemoUrl } from "@/lib/app-links";
import {
  ANNUAL_MONTHS_PAID,
  annualMonthlyPrice,
  CONVERSION_NOTICE,
  EUR_PER_GBP,
  gbp,
  PLANS,
  type BillingPeriod,
  type Plan,
  type PlanKey,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

type FeatureRow = {
  label: string;
  info?: string;
  values: Record<PlanKey, string | boolean>;
};

const ACTIVE_REQUEST_INFO =
  "An active request is one that is out with a client — sent or in progress. Drafts don't count, and closing a request you've finished frees its slot again, so the limit is about how much you have in flight at once, not how much you send.";

const BOOK_DEMO_URL = resolveBookDemoUrl();

const SEAT_ADDON_EUR = 16;
const REQUEST_ADDON_EUR = 14;
const STORAGE_ADDON_EUR = 7;

/**
 * Everything here is identical on every plan, so it is a list rather than four
 * columns of the same tick. The comparison table below carries only the rows
 * that actually differ — a matrix where most rows match argues that the plans
 * are interchangeable and the cheapest one will do.
 */
const INCLUDED_EVERYWHERE: { label: string; info?: string }[] = [
  {
    label: "Template builder",
    info: "Reusable request templates with sections, conditional detail, repeatable rows and nested field groups.",
  },
  { label: "Client portal — no account needed" },
  { label: "Review queue: approve or request changes" },
  { label: "Recurring request schedules" },
  { label: "Archive PDF & bulk export" },
  { label: "Unlimited clients & recipients" },
  { label: "Unlimited emails & reminders" },
  {
    label: "Team management, roles & permissions",
    info: "Invite colleagues, assign them to workspaces and requests, and control what each role can see and do.",
  },
  {
    label: "Free read-only auditor seats",
    info: "Invite your compliance consultant, external examiner or principal firm as an Auditor. They read requests, files, templates and the full review history, see the audit log for the workspaces you put them in, and can pull an export — and they cannot approve, reject, comment, send or edit anything. Auditor seats are free and are not counted against your plan's users.",
  },
  { label: "Google Drive integration" },
  {
    label: "Data hosted in the UK",
    info: "Your requests, answers and uploaded files are stored in the United Kingdom — account data on our own servers in Erith, uploaded files in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK.",
  },
  { label: "Encryption at rest" },
  {
    label: "Malware scanning on uploads",
    info: "Every uploaded file is scanned before it is stored, on our own infrastructure — files are never sent to an outside scanning service. Anything that fails is refused at upload and never reaches your storage.",
  },
  { label: "Audit logs" },
];

const FEATURE_GROUPS: { title: string; rows: FeatureRow[] }[] = [
  {
    title: "Volume & limits",
    rows: [
      {
        label: "Active requests",
        info: ACTIVE_REQUEST_INFO,
        values: {
          starter: "20",
          foundation: "60",
          growth: "200",
          enterprise: "500",
        },
      },
      {
        label: "Users included",
        info: "A user is anyone on your team with a login — advisers, case handlers and the admin who does the chasing. Recipients never need an account and are never counted, and neither are read-only Auditors, who have their own free allowance below.",
        values: {
          starter: "2",
          foundation: "4",
          growth: "10",
          enterprise: "20",
        },
      },
      {
        label: "Free auditor seats",
        info: "Read-only logins for people who check the work but must not change it — a compliance consultant, an external examiner, or the principal firm supervising an appointed representative. They cost nothing and do not use one of the seats above. Capped per plan because an auditor can read every file in the workspaces they are added to.",
        values: {
          starter: "2",
          foundation: "2",
          growth: "4",
          enterprise: "8",
        },
      },
      {
        label: "Cloud storage",
        values: {
          starter: "10 GB",
          foundation: "25 GB",
          growth: "100 GB",
          enterprise: "200 GB",
        },
      },
    ],
  },
  {
    title: "Branding & integrations",
    rows: [
      {
        label: "White-labelled client portal",
        info: "Your logo and favicon on the portal, with the ClientGather footer removed — applied automatically, no toggle to find.",
        values: {
          starter: false,
          foundation: false,
          growth: true,
          enterprise: true,
        },
      },
      {
        label: "Send from your own address",
        info: "Pick the address clients see — info@yourfirm.com — and verify its domain once. We generate the DNS records and check them for you, and your existing inbox keeps working.",
        values: {
          starter: false,
          foundation: false,
          growth: true,
          enterprise: true,
        },
      },
      {
        label: "Zapier & connected apps",
        values: {
          starter: false,
          foundation: false,
          growth: true,
          enterprise: true,
        },
      },
      {
        label: "Webhooks & delivery logs",
        values: {
          starter: false,
          foundation: false,
          growth: true,
          enterprise: true,
        },
      },
      {
        label: "Live collaboration: presence & cursors",
        info: "In collaborative requests, participants see who's online, which field each person is editing, and each other's live cursors in real time.",
        values: {
          starter: false,
          foundation: false,
          growth: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    title: "Data & support",
    rows: [
      {
        label: "Bring your own S3 bucket",
        info: "Point ClientGather at your own S3 bucket: files are written to storage you control and are not counted against the plan's storage limit.",
        values: {
          starter: false,
          foundation: false,
          growth: false,
          enterprise: true,
        },
      },
      {
        label: "Priority support",
        values: {
          starter: false,
          foundation: false,
          growth: false,
          enterprise: true,
        },
      },
    ],
  },
];

const FAQ: { question: string; answer: string }[] = [
  {
    question: "What does the 14-day trial include?",
    answer:
      "The full product, with 5 active requests, 2 users and 1 GB of storage. That is enough to run several real requests end to end; it is not enough to run a practice on, which is the point. No card is needed to start.",
  },
  {
    question: "What happens if I hit the active-request limit?",
    answer:
      "You cannot send a new request until a slot frees up. Closing requests you have already finished frees them at no cost, which is the intended way out. If you genuinely need more in flight, add packs of 50 and drop them again when the peak passes.",
  },
  {
    question: "Can I change plan part-way through a billing period?",
    answer:
      "Yes. Upgrades take effect immediately and you are charged the prorated difference. Downgrades take effect at the end of the current period, and the unused amount is credited against your next invoice.",
  },
  {
    question: "Why are prices shown in pounds but charged in euros?",
    answer: `Our payment provider settles in euros, so the euro amount shown beside each price is what will appear on your statement. The pound figure is a fixed conversion at £1 = €${EUR_PER_GBP}, held steady so a price cannot move under you mid-decision. If you pay with a sterling card your bank applies its own rate on the day, so the exact pound amount debited will differ slightly.`,
  },
  {
    question: "Can our auditor or compliance consultant have access?",
    answer:
      "Yes, and it does not cost a seat. The Auditor role is read-only: it reads requests, files, templates and the whole review history, sees the audit log for the workspaces you add it to, and can download an export — and it cannot approve or reject an item, comment, send a request, or edit a client or template. That separation is the point: whoever checks the file should not be able to change it. Auditor seats are free on every plan and capped by plan (2 on Solo and Foundation, 4 on Growth, 8 on Scale), because an auditor can read every file in the workspaces they are added to.",
  },
  {
    question: "Where is our data stored?",
    answer:
      "In the United Kingdom. Your requests, answers and audit logs live on our own servers in Erith; uploaded files are stored in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK. Uploads are scanned for malware on our own infrastructure before they are stored, so files are never sent to an outside scanning service.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your account stays readable to the end of the period you have paid for, and you can bulk-export every request and file as a ZIP at any point before then. After closure the organization and its files are permanently deleted 30 days later.",
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

  /** EUR — the charged amount. Everything shown in pounds derives from this. */
  const eurFor = (plan: Plan) =>
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
            Built for immigration advisers, brokers and practices that collect
            the same bundle of documents over and over. Every plan includes the
            template builder, client portal and review queue, with unlimited
            clients, emails and reminders — plans differ by how much you have
            open at once and how many people work on it.
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

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                      £{gbp(eurFor(plan))}
                    </span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  {/* The euro amount is what is actually taken, so it sits with
                      the price rather than in a footnote — it is the figure that
                      lands on the customer's statement. */}
                  <p className="mt-1 text-[0.75rem] text-muted-foreground">
                    {billing === "annual"
                      ? `Billed yearly as €${plan.price * ANNUAL_MONTHS_PAID}, ex VAT`
                      : `Billed monthly as €${plan.price}, ex VAT`}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
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

                  <div className="mt-6 border-t border-border/60 pt-6">
                    {plan.inherits ? (
                      <p className="mb-3 text-[0.75rem] font-medium text-foreground/80">
                        Everything in {plan.inherits}, plus:
                      </p>
                    ) : null}
                    <ul className="space-y-2.5">
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
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Both stated here rather than only in the FAQ: finding the trial
            ceiling by hitting it mid-evaluation reads as a broken product
            rather than a limit, and an unexplained pound price reads as a
            promise about what the bank will charge. */}
        <Reveal className="mt-8 space-y-1 text-center">
          <p className="text-sm text-muted-foreground">
            The 14-day trial runs the full product with 5 active requests, 2
            users and 1 GB of storage. No card needed to start.
          </p>
          <p className="text-sm text-muted-foreground">{CONVERSION_NOTICE}</p>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="text-center text-md font-semibold tracking-tight text-foreground">
            In every plan
          </h3>
          <ul className="mx-auto mt-6 grid max-w-4xl gap-x-2 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED_EVERYWHERE.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-2.5 text-sm text-foreground/90"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700">
                  <Check className="size-2.5" />
                </span>
                <span className="flex-1">
                  {item.label}
                  {item.info ? (
                    <>
                      {" "}
                      <InfoTooltip label={item.info} />
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Full comparison. Hidden on small screens, where the cards above
            already carry each plan's headline numbers — a five-column matrix at
            that width is unreadable however you scroll it. */}
        <Reveal className="mt-16 hidden md:block">
          <h3 className="text-center text-sm font-semibold tracking-tight text-foreground">
            What changes by plan
          </h3>

          <table className="mt-6 w-full border-collapse text-left">
            <caption className="sr-only">
              Feature comparison across the Solo, Foundation, Growth and Scale
              plans
            </caption>
            <thead>
              {/* Sticks under the fixed navbar so the plan and its price stay
                  visible while reading down the feature rows. */}
              <tr className="sticky top-16 z-30">
                <th
                  scope="col"
                  className="w-[28%] border-b border-border/70 bg-background p-0"
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
                      <span className="text-sm font-semibold text-foreground">
                        {plan.name}
                      </span>
                      <span className="flex items-baseline gap-1">
                        <span className="text-lg font-semibold tracking-tight text-foreground">
                          £{gbp(eurFor(plan))}
                        </span>
                        <span className="text-sm font-normal text-muted-foreground">
                          /mo
                        </span>
                      </span>
                      <span className="text-[0.65rem] text-muted-foreground">
                        €{eurFor(plan)} charged
                      </span>
                      <ButtonLink
                        href={ctaHref(plan)}
                        size="sm"
                        variant={plan.featured ? "default" : "outline"}
                        className="mt-1 rounded-full px-3 text-[0.75rem]"
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
                    className="pt-8 pb-2 text-[0.75rem] font-semibold tracking-[0.24em] text-muted-foreground uppercase"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label} className="border-t border-border/50">
                    <th
                      scope="row"
                      className="py-3 pr-4 text-sm font-normal text-foreground/90"
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

        {/* One strip instead of three table rows: the add-ons are priced the
            same on every plan, so columns of the identical figure said nothing. */}
        <Reveal className="mt-12">
          <h3 className="text-center text-md font-semibold tracking-tight text-foreground">
            Add-ons, on any plan
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-6 text-muted-foreground">
            Added and dropped whenever you need them — during a filing peak, for
            example. Reductions are credited to your next invoice. The seat
            add-on is for people who do the work; read-only Auditors are free.
          </p>
          <dl className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              {
                term: "50 active requests",
                eur: REQUEST_ADDON_EUR,
              },
              { term: "Extra user seat", eur: SEAT_ADDON_EUR },
              { term: "25 GB storage", eur: STORAGE_ADDON_EUR },
            ].map((addon) => (
              <div
                key={addon.term}
                className="rounded-xl border border-border/60 px-4 py-3 text-center"
              >
                <dt className="text-sm text-muted-foreground">{addon.term}</dt>
                <dd className="mt-1 text-md font-semibold text-foreground">
                  £{gbp(addon.eur)}
                  <span className="font-normal text-muted-foreground">/mo</span>
                  <span className="ml-1 text-[0.75rem] font-normal text-muted-foreground">
                    (€{addon.eur})
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-16">
          <h3 className="text-center text-md font-semibold tracking-tight text-foreground">
            Before you buy
          </h3>
          <div className="mx-auto mt-6 max-w-2xl divide-y divide-border/60 border-y border-border/60">
            {FAQ.map((item) => (
              <details key={item.question} className="group py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground marker:hidden">
                  <span className="inline-flex w-full items-center justify-between gap-4">
                    {item.question}
                    <span
                      aria-hidden
                      className="text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-2 pr-8 text-sm leading-6 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <p className="mx-auto max-w-2xl text-md leading-6 text-muted-foreground">
            Charged in EUR, excluding VAT, which is added at checkout.{" "}
            {CONVERSION_NOTICE} Hit your active-request limit in a busy month?
            Close the requests you have already finished to free slots at no
            cost, or add packs and drop them again when the peak passes.
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
