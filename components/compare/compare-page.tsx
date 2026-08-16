import { ArrowRight } from "lucide-react"

import { sectionId } from "@/components/blog/blog-post-page"
import { Callout } from "@/components/docs/callout"
import { DocsTable } from "@/components/docs/docs-table"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { ButtonLink } from "@/components/ui/button"
import { buildBootstrapOwnerUrl } from "@/lib/app-links"
import { SITE_URL } from "@/lib/site"

import type { Competitor } from "./competitors"

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function StructuredData({ competitor }: { competitor: Competitor }) {
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: competitor.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: competitor.headline,
    description: competitor.description,
    abstract: competitor.answer,
    inLanguage: "en-GB",
    dateModified: competitor.checkedOn,
    url: `${SITE_URL}/compare/${competitor.slug}`,
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

export function ComparePage({ competitor }: { competitor: Competitor }) {
  const checked = formatDate(competitor.checkedOn)

  const rows = competitor.rows.map((row) => [
    <span key="capability" className="font-medium text-foreground">
      {row.capability}
    </span>,
    <span key="ours">{row.ours}</span>,
    <span key="theirs">
      {row.theirs}{" "}
      <a
        href={row.source.url}
        target="_blank"
        rel="nofollow noopener"
        className="whitespace-nowrap text-primary underline-offset-4 hover:underline"
      >
        source
      </a>
    </span>,
  ])

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-4 lg:px-8 lg:pt-36">
        <StructuredData competitor={competitor} />

        <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
          Comparison
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {competitor.headline}
        </h1>
        <p className="mt-3 text-xs text-muted-foreground">
          {competitor.name}&rsquo;s published pages last checked on{" "}
          <time dateTime={competitor.checkedOn}>{checked}</time>
        </p>

        {/* The block answer engines quote. Keep it directly under the h1. */}
        <div className="mt-8 border-l-2 border-primary bg-muted/40 px-5 py-4">
          <p className="text-[0.6rem] tracking-[0.28em] text-primary uppercase">
            In short
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground">
            {competitor.answer}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {competitor.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-7 text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10">
          {/* Three columns of prose squeeze to ~110px on a phone. A floor on
              the cells makes the wrapper scroll instead, which it is already
              set up to do. */}
          <DocsTable
            head={["", "ClientGather", competitor.name]}
            rows={rows}
            className="[&_td]:min-w-40 [&_th]:min-w-40"
          />
          <Callout className="mt-4">
            Every {competitor.name} cell above comes from their own public
            pages, linked on the row, read on {checked}. We compare the points
            listed here and no others &mdash; read their site alongside this
            page. Prices are as published and exclude VAT.
          </Callout>
        </div>

        <div className="mt-12 space-y-12">
          {competitor.sections.map((section) => (
            <section
              key={section.heading}
              id={sectionId(section.heading)}
              className="scroll-mt-28 space-y-4"
            >
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground marker:text-primary">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section
            id="frequently-asked-questions"
            className="scroll-mt-28 space-y-4"
          >
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {competitor.faqs.map((faq) => (
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
          </section>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <ButtonLink
            href={buildBootstrapOwnerUrl("foundation")}
            size="lg"
            className="rounded-full"
          >
            Start 14-day trial
            <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink
            href="/#pricing"
            size="lg"
            variant="outline"
            className="rounded-full"
          >
            See pricing
          </ButtonLink>
        </div>
      </main>
      <CTA />
      <Footer />
    </>
  )
}
