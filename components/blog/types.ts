/**
 * Blog copy is plain data, not markdown — same rule as the legal documents
 * (see components/legal/types.ts): the site ships no markdown parser, and
 * structured data means nothing can inject markup.
 *
 * The shape is deliberately small. `answer` and `faqs` exist for answer
 * engines: `answer` is the block they quote, and `faqs` feeds both the visible
 * FAQ section and the FAQPage JSON-LD from one source, so the two can never
 * disagree.
 */
export type BlogSubsection = {
  /** Rendered as an h3. */
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export type BlogSection = {
  /** Rendered as an h2, and slugified into the anchor id. */
  heading: string
  paragraphs?: string[]
  bullets?: string[]
  subsections?: BlogSubsection[]
  /** Case studies render inside a card so they read as illustrative, not prose. */
  variant?: "case-study"
}

export type BlogFaq = {
  question: string
  answer: string
}

export type BlogPost = {
  slug: string
  title: string
  /** Meta description. Keep to roughly 150-160 characters. */
  description: string
  /** Eyebrow and badge label, e.g. "Immigration advice". */
  niche: string
  /** ISO date, used for <time> and JSON-LD datePublished. */
  publishedDate: string
  readingMinutes: number
  /**
   * The "In short" block. One paragraph, 40-60 words, written to stand on its
   * own if an answer engine quotes it with no surrounding context.
   */
  answer: string
  sections: BlogSection[]
  faqs: BlogFaq[]
}
