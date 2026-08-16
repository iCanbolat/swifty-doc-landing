import { ArrowRight, Check, FileText } from "lucide-react"

import { sectionId } from "@/components/blog/blog-post-page"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { CTA } from "@/components/sections/cta"
import { FeatureSection } from "@/components/sections/feature-section"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { ButtonLink } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { buildBootstrapOwnerUrl } from "@/lib/app-links"
import {
  annualMonthlyPrice,
  CONVERSION_NOTICE,
  gbp,
  getPlanByKey,
} from "@/lib/pricing"
import { SITE_URL } from "@/lib/site"

import type { Niche } from "./niches"

function StructuredData({ niche }: { niche: Niche }) {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: niche.headline,
    description: niche.description,
    abstract: niche.answer,
    inLanguage: "en-GB",
    dateModified: niche.lastReviewed,
    url: `${SITE_URL}/for/${niche.slug}`,
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: niche.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}

/**
 * The plan this audience is sold, priced monthly because that is the figure the
 * cold email quotes. The numbers come from the same PLANS the pricing section
 * renders, so this card cannot drift away from the table it links to.
 */
function PlanHighlight({ niche }: { niche: Niche }) {
  const plan = getPlanByKey(niche.plan.key)
  const monthly = gbp(plan.price)
  const annual = gbp(annualMonthlyPrice(plan.price))

  return (
    <section className="px-6 py-16 lg:px-8 lg:py-24">
      <Reveal className="mx-auto max-w-2xl">
        <Card className="overflow-visible">
          <CardHeader>
            <p className="text-[0.6rem] tracking-[0.28em] text-primary uppercase">
              Recommended plan
            </p>
            <p className="mt-3 text-sm font-semibold text-foreground">
              {plan.name}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                £{monthly}
              </span>
              <span className="text-xs text-muted-foreground">/mo</span>
            </div>
            <p className="mt-1 text-[0.75rem] text-muted-foreground">
              Billed monthly as €{plan.price}, ex VAT — or £{annual}/mo paying
              yearly.
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {niche.plan.why}
            </p>
          </CardHeader>

          <CardContent className="mt-2">
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

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={buildBootstrapOwnerUrl(plan.key, "monthly")}
                size="lg"
                className="rounded-full"
              >
                {plan.cta}
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/#pricing"
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                Compare all plans
              </ButtonLink>
            </div>

            <p className="mt-4 text-[0.7rem] text-muted-foreground">
              14-day trial, no card needed. {CONVERSION_NOTICE}
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  )
}

export function NichePage({ niche }: { niche: Niche }) {
  return (
    <>
      <Navbar />
      {/* Navbar is fixed — pages clear it themselves. */}
      <main className="pt-32 lg:pt-36">
        <StructuredData niche={niche} />

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1.5 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
              For {niche.label}
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {niche.headline}
            </h1>
            <p className="mt-5 max-w-lg text-md leading-7 text-muted-foreground">
              {niche.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={buildBootstrapOwnerUrl(niche.plan.key, "monthly")}
                size="hero"
                className="rounded-full"
              >
                Start 14-day trial
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="#templates"
                size="hero"
                variant="outline"
                className="rounded-full"
              >
                See the templates
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>{niche.heroMock}</Reveal>
        </div>

        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* The block answer engines quote. Keep it directly under the h1. */}
          <Reveal className="mt-16 border-l-2 border-primary bg-muted/40 px-5 py-4">
            <p className="text-[0.6rem] tracking-[0.28em] text-primary uppercase">
              In short
            </p>
            <p className="mt-2 text-sm leading-7 text-foreground">
              {niche.answer}
            </p>
          </Reveal>

          <Reveal className="mt-8 space-y-4">
            {niche.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <section id="templates" className="scroll-mt-24 px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="text-center">
              <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
                Ready to use
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Templates built for this work, in the app from day one
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                Apply one as a starting point and edit it — the sections, fields
                and upload rules are already laid out. Nothing here is a PDF to
                fill in; each one publishes as a request you send.
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {niche.templates.map((template) => (
                <StaggerItem key={template.name} className="h-full">
                  <Card className="flex h-full flex-col">
                    <CardHeader>
                      <span className="inline-flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
                        <FileText className="size-4" />
                      </span>
                      <p className="mt-3 text-sm font-semibold text-foreground">
                        {template.name}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs leading-6 text-muted-foreground">
                        {template.bestFor}
                      </p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {niche.features.map((feature, index) => (
          <FeatureSection
            key={feature.title}
            eyebrow={feature.eyebrow}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            bullets={feature.bullets}
            mock={feature.mock}
            reverse={index % 2 === 1}
          />
        ))}

        <PlanHighlight niche={niche} />

        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Reveal className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {niche.faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <h3
                    id={sectionId(faq.question)}
                    className="scroll-mt-28 text-sm font-semibold tracking-tight text-foreground"
                  >
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <ButtonLink
              href={`/blog/${niche.blogSlug}`}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              Read the full guide
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </main>
      <CTA plan={niche.plan.key} />
      <Footer />
    </>
  )
}
