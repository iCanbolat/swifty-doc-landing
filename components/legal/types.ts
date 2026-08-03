/**
 * Legal copy is plain data, not markdown: both the marketing site and this app
 * render it, and neither ships a markdown parser. A section is a heading with
 * paragraphs and an optional bullet list — enough structure for a policy, and
 * nothing that could inject markup.
 *
 * `version` is what the API records when a user accepts. Bump it whenever the
 * wording changes in a way a signed-up user would need to re-accept, and keep
 * it in sync with CURRENT_LEGAL_VERSIONS on the API side — a mismatch fails
 * sign-up loudly instead of recording consent to the wrong text.
 */
export type LegalSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type LegalDocumentSlug = "terms" | "privacy"

export type LegalDocument = {
  slug: LegalDocumentSlug
  title: string
  version: string
  effectiveDate: string
  intro: string
  sections: LegalSection[]
}
