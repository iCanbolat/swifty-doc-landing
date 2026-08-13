import { ArrowLeft } from "lucide-react"

import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SITE_NAME, SITE_URL } from "@/lib/site"

import type { BlogPost, BlogSection } from "./types"

/** Same slugifier the legal pages use, so headings are linkable anchors. */
export function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function Paragraphs({ items }: { items?: string[] }) {
  if (!items?.length) return null

  return (
    <>
      {items.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </>
  )
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null

  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
      {items.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  )
}

function SectionBody({ section }: { section: BlogSection }) {
  return (
    <>
      <Paragraphs items={section.paragraphs} />
      <Bullets items={section.bullets} />
      {section.subsections?.map((subsection) => (
        <div key={subsection.heading} className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            {subsection.heading}
          </h3>
          <Paragraphs items={subsection.paragraphs} />
          <Bullets items={subsection.bullets} />
        </div>
      ))}
    </>
  )
}

function ArticleSection({ section }: { section: BlogSection }) {
  const id = sectionId(section.heading)

  if (section.variant === "case-study") {
    return (
      <section id={id} className="scroll-mt-28">
        <Card className="py-6">
          <CardHeader className="px-6">
            <p className="text-[0.6rem] tracking-[0.28em] text-primary uppercase">
              Illustrative scenario
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              {section.heading}
            </h2>
          </CardHeader>
          <CardContent className="space-y-3 px-6">
            <SectionBody section={section} />
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {section.heading}
      </h2>
      <SectionBody section={section} />
    </section>
  )
}

function StructuredData({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const publisher = { "@type": "Organization", name: SITE_NAME, url: SITE_URL }

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    abstract: post.answer,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    inLanguage: "en-GB",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: publisher,
    publisher,
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-4 lg:px-8 lg:pt-36">
        <StructuredData post={post} />

        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          All articles
        </a>

        <p className="mt-8 text-[0.65rem] tracking-[0.32em] text-primary uppercase">
          {post.niche}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-xs text-muted-foreground">
          <time dateTime={post.publishedDate}>
            {formatDate(post.publishedDate)}
          </time>
          {" · "}
          {post.readingMinutes} min read
        </p>

        {/* The block answer engines quote. Keep it directly under the h1. */}
        <div className="mt-8 border-l-2 border-primary bg-muted/40 px-5 py-4">
          <p className="text-[0.6rem] tracking-[0.28em] text-primary uppercase">
            In short
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground">{post.answer}</p>
        </div>

        <div className="mt-12 space-y-12">
          {post.sections.map((section) => (
            <ArticleSection key={section.heading} section={section} />
          ))}

          <section id="frequently-asked-questions" className="scroll-mt-28 space-y-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {post.faqs.map((faq) => (
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
      </main>
      <CTA />
      <Footer />
    </>
  )
}
