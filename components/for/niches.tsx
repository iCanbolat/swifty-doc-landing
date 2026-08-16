import type { LucideIcon } from "lucide-react"
import { CalendarClock, ClipboardCheck, GitBranch, Users } from "lucide-react"

import { ConditionalLogicMock } from "@/components/mocks/conditional-logic-mock"
import { RepeatableGroupMock } from "@/components/mocks/repeatable-group-mock"
import { ReviewMock } from "@/components/mocks/review-mock"
import { ScheduleReuseMock } from "@/components/mocks/schedule-reuse-mock"
import { TemplateBuilderMock } from "@/components/mocks/template-builder-mock"
import type { PlanKey } from "@/lib/pricing"

/**
 * One entry per audience we send cold email to. Each page is a landing point
 * for a list, so the headline, the visual, the template list and the plan it
 * points at are all the ones that audience recognises — a generic home page
 * makes every reader do that translation themselves.
 *
 * The template names mirror the sample templates shipped in the app
 * (client/src/features/templates/data/sample-templates). They are copied rather
 * than imported: the landing site is a separate install with no path to the
 * client's source. If a preset is renamed, this list has to be renamed with it.
 */
export type Niche = {
  slug: string
  /** "Immigration advisers" — the footer link, and the "For …" eyebrow. */
  label: string
  headline: string
  /** Meta description and the paragraph under the h1. */
  description: string
  /** The block answer engines quote. Sits directly under the hero. */
  answer: string
  intro: string[]
  heroMock: React.ReactNode
  templates: { name: string; bestFor: string }[]
  features: {
    icon: LucideIcon
    eyebrow: string
    title: string
    description: string
    bullets: string[]
    mock: React.ReactNode
  }[]
  /** The one plan this audience is pointed at, and why it is that one. */
  plan: { key: PlanKey; why: string }
  faqs: { question: string; answer: string }[]
  blogSlug: string
  /** Day the claims and the template list were last checked against the app. */
  lastReviewed: string
}

const immigrationAdvisers: Niche = {
  slug: "immigration-advisers",
  label: "Immigration advisers",
  headline: "Collect applicant evidence without the email thread",
  description:
    "Send each applicant one secure link instead of a Word checklist. Dependants arrive one entry per person, every document is approved or rejected on its own, and reminders chase the deadline for you.",
  answer:
    "An immigration adviser using ClientGather sends the applicant a portal link rather than an evidence checklist by email. The applicant uploads at their own pace with everything autosaved, each dependant is captured as a repeatable entry against the same fields, and the adviser accepts or rejects each document individually — so a bank statement from the wrong month reopens that one item while the rest of the bundle stays approved.",
  intro: [
    "Most practices start with a Word checklist, a folder per applicant and a spreadsheet tracking who has sent what. It holds for the first few cases and then quietly stops scaling: evidence arrives across five replies, three files share a name, and the newest version is whichever one you opened last.",
    "The checklist is not the problem. The problem is that the checklist and the evidence live in different places, and neither one knows the state of the other — so a caseworker coming back from leave cannot tell whether the outstanding item was chased on Tuesday or never chased at all.",
  ],
  heroMock: (
    <TemplateBuilderMock
      title="Skilled Worker visa — evidence bundle"
      sections={[
        {
          title: "Certificate of Sponsorship",
          meta: "4 fields",
          fields: [
            { label: "CoS reference number", type: "Text" },
            { label: "Gross annual salary (£)", type: "Number" },
            { label: "Employment start date", type: "Date" },
            { label: "Signed contract or employer letter", type: "File" },
          ],
        },
        {
          title: "Dependants",
          meta: "Repeatable · 3 fields",
          fields: [
            { label: "Full name", type: "Text" },
            { label: "Relationship to applicant", type: "Select" },
            { label: "Passport", type: "File" },
          ],
        },
      ]}
    />
  ),
  templates: [
    {
      name: "Skilled Worker visa",
      bestFor: "Sponsored applications made against a Certificate of Sponsorship",
    },
    {
      name: "Partner or spouse visa (Appendix FM)",
      bestFor: "Five-year partner route applications and extensions",
    },
    {
      name: "Indefinite leave to remain",
      bestFor: "Settlement after five years on a qualifying route",
    },
    {
      name: "British citizenship (Form AN)",
      bestFor: "Naturalisation as a British citizen",
    },
  ],
  features: [
    {
      icon: Users,
      eyebrow: "Dependants",
      title: "One entry per dependant, not eleven loose passports",
      description:
        "Mark a section repeatable and the applicant adds an entry per dependant, filling in the same fields each time. Field groups nest, so a dependant entry can carry its own repeating rows for previous addresses or prior travel.",
      bullets: [
        "No working out by hand which passport belongs to which family member.",
        "Every dependant is captured against identical fields, so finished bundles look the same across cases.",
        "A fourth child does not mean editing the request or sending a new one.",
      ],
      mock: <RepeatableGroupMock />,
    },
    {
      icon: ClipboardCheck,
      eyebrow: "Review",
      title: "One gap reopens one item",
      description:
        "Work through a submission item by item: approve, reject, or request changes on each one. Rejecting opens a comment thread on that document alone, which the applicant answers in the same portal.",
      bullets: [
        "The applicant re-uploads the single document you asked about, in place.",
        "Everything already approved stays approved — no re-sending the bundle.",
        "Due dates carry a reminder schedule, so chasing happens whether or not anyone remembers.",
      ],
      mock: (
        <ReviewMock
          reference="IMM-2026-118"
          subtitle="Skilled Worker · a.okafor@example.com"
          counts={{ approved: 9, rejected: 1, pending: 2 }}
          items={[
            {
              field: "Passport (applicant)",
              answer: "passport-okafor.pdf",
              state: "approved",
            },
            {
              field: "Certificate of Sponsorship",
              answer: "CoS 4B7X92QK1180",
              state: "approved",
            },
            {
              field: "Bank statement — month 3",
              answer: "statement-may.pdf",
              state: "rejected",
              note: "Reviewer: this is May — the third month before the application date is June. Please re-upload.",
            },
          ]}
          pending={{
            field: "Dependant 2 — birth certificate",
            answer: "birth-certificate.pdf",
          }}
        />
      ),
    },
  ],
  plan: {
    key: "starter",
    why: "A single adviser and the admin who does the chasing — two logins, twenty applications open at once, and nothing to configure before your first request goes out.",
  },
  faqs: [
    {
      question: "Do applicants need to create an account?",
      answer:
        "No. Each applicant gets a secure link that opens their portal directly. Work is autosaved as they go, so they can stop and come back later on a phone without losing anything, and there is no password for them to forget while a deadline runs.",
    },
    {
      question: "How are dependants handled?",
      answer:
        "As repeatable sections. You define the fields once — name, date of birth, relationship, passport — and the applicant adds one entry per dependant. Groups can nest, so a dependant entry can itself hold repeating rows for previous addresses.",
    },
    {
      question: "Where are passports and biometric documents stored?",
      answer:
        "On our own servers in Erith, United Kingdom. Files are encrypted at rest, scanned for malware on the same infrastructure before they are stored, and are not replicated to other regions or handed to a third-party storage provider. Nothing sits in an inbox attachment.",
    },
    {
      question: "Can my supervising body or compliance consultant see the file?",
      answer:
        "Yes, on a free read-only Auditor seat. An Auditor reads requests, files and the full review history for the workspaces you add them to, and cannot approve, reject, comment, send or edit anything. Auditor seats do not count against your plan's users.",
    },
  ],
  blogSlug: "document-collection-for-uk-immigration-advisers",
  lastReviewed: "2026-08-16",
}

const financeBrokers: Niche = {
  slug: "finance-brokers",
  label: "Specialist finance brokers",
  headline: "Package a lender-ready case without chasing four people",
  description:
    "Borrower, directors, solicitor and accountant work from one request. SPV directors and asset schedules come back as structured rows, and when the lender asks for one more statement you reopen that item alone.",
  answer:
    "A specialist finance broker using ClientGather packages a case by sending each party a portal link rather than a document list by email. SPV directors, shareholders and asset schedules are captured as repeatable rows against fixed fields, several parties can work on the same submission at once, and when a lender comes back for one more statement the broker reopens that single item instead of starting a fresh thread.",
  intro: [
    "Bridging, development and commercial cases all run the same underlying job: assemble a coherent pack and get it in front of a lender before the deal moves. The document list is well understood. Getting it back from a borrower, two directors, a solicitor and an accountant is the hard part.",
    "An SPV with four directors means four sets of identity and address evidence arriving in whatever order each person happens to use, asset schedules come back with different columns every time, and when a case goes quiet the only record of what was chased is in someone's sent items.",
  ],
  heroMock: (
    <TemplateBuilderMock
      title="Bridging loan — case pack"
      sections={[
        {
          title: "Security property",
          meta: "4 fields",
          fields: [
            { label: "Property address", type: "Text" },
            { label: "Purchase price (£)", type: "Number" },
            { label: "Exit strategy", type: "Select" },
            { label: "Valuation report", type: "File" },
          ],
        },
        {
          title: "SPV directors",
          meta: "Repeatable · 3 fields",
          fields: [
            { label: "Full name", type: "Text" },
            { label: "Date of birth", type: "Date" },
            { label: "Proof of ID", type: "File" },
          ],
        },
      ]}
    />
  ),
  templates: [
    {
      name: "Bridging loan",
      bestFor: "Regulated and unregulated bridging, auction and refurbishment cases",
    },
    {
      name: "Buy-to-let mortgage (SPV)",
      bestFor: "Limited company purchases and remortgages, including HMOs",
    },
    {
      name: "Development finance",
      bestFor: "Ground-up development and heavy refurbishment schemes",
    },
    {
      name: "Commercial mortgage",
      bestFor: "Commercial and semi-commercial term loans",
    },
  ],
  features: [
    {
      icon: GitBranch,
      eyebrow: "Conditional detail",
      title: "SPV or personal name — the pack asks only what applies",
      description:
        "Fields and whole sections appear based on earlier answers, so one template covers every variation of a product without handing the borrower a form that is mostly irrelevant to them.",
      bullets: [
        "Answer 'limited company' and the SPV blocks open; answer 'personal name' and they never appear.",
        "One published template per product instead of a folder of near-identical Word files.",
        "Publishing a new version leaves cases already in flight on the version they started on.",
      ],
      mock: <ConditionalLogicMock />,
    },
    {
      icon: ClipboardCheck,
      eyebrow: "Review",
      title: "The lender comes back — you reopen one item",
      description:
        "Every document is accepted or rejected on its own, with a comment thread on the item itself. Reopening a case for one more statement does not restart the pack or the thread.",
      bullets: [
        "The borrower re-uploads the item you rejected, in place, with your note attached to it.",
        "On Growth the portal carries your branding and the email comes from your own address.",
        "Webhooks and Zapier push a completed pack into your case system without a re-key.",
      ],
      mock: (
        <ReviewMock
          reference="BRG-2026-042"
          subtitle="Bridging loan · Harbour Row SPV Ltd"
          counts={{ approved: 14, rejected: 1, pending: 3 }}
          items={[
            {
              field: "Director 1 — proof of ID",
              answer: "passport-tan.pdf",
              state: "approved",
            },
            {
              field: "Security property — valuation",
              answer: "valuation-harbour-row.pdf",
              state: "approved",
            },
            {
              field: "Exit — agreement in principle",
              answer: "aip-letter.pdf",
              state: "rejected",
              note: "Reviewer: the AIP expired in June — please upload the current one.",
            },
          ]}
          pending={{
            field: "Director 3 — proof of address",
            answer: "council-tax-2026.pdf",
          }}
        />
      ),
    },
  ],
  plan: {
    key: "growth",
    why: "A broking team with cases open across several lenders: ten logins, two hundred cases in flight, a portal and sender address carrying your own brand, and webhooks into the case system you already run.",
  },
  faqs: [
    {
      question: "Can several parties fill in the same case?",
      answer:
        "Yes. A request can go to more than one recipient — borrower, directors, solicitor, accountant — and they work in the same submission. On Growth and above you also see who is online and which field each person is editing, live.",
    },
    {
      question: "Can the portal carry our own branding?",
      answer:
        "On Growth and Scale. Your logo and favicon appear on the portal with the ClientGather footer removed, and you can send from your own address — verify the domain once and we generate and check the DNS records for you.",
    },
    {
      question: "How do finished packs reach our case system?",
      answer:
        "Growth and Scale include webhooks with delivery logs, plus Zapier and connected apps. Every plan includes Google Drive and a bulk export that folders files by recipient, so a completed case can be filed without re-keying anything.",
    },
    {
      question: "What counts as an active request?",
      answer:
        "One that is out with a client — sent or in progress. Drafts do not count, and closing a case you have finished frees its slot again at no cost, so the limit is about how much you have in flight at once rather than how much you send in a year.",
    },
  ],
  blogSlug: "document-collection-for-specialist-finance-brokers",
  lastReviewed: "2026-08-16",
}

const companyFormationAgents: Niche = {
  slug: "company-formation-agents",
  label: "Company formation agents",
  headline: "Onboard formation clients at volume, without the re-typing",
  description:
    "One published intake template, sent as many times as you like. Directors, shareholders and PSCs come back as structured rows against fixed fields, and the yearly confirmation statement sends itself.",
  answer:
    "A UK company formation agent using ClientGather publishes one reusable intake template and sends each customer a portal link. Directors, shareholders and PSCs are captured as repeatable groups against fixed fields and SIC codes as a select list, so details arrive in the shape your filing process expects — and recurring schedules send the yearly confirmation statement request without anyone raising it.",
  intro: [
    "Formation work is the opposite of advisory work. Each customer is low-touch and the document list barely varies, but there are a great many of them, and the margin depends entirely on how little human handling each one needs.",
    "So the failures are different: nothing is complicated, everything is repetitive, and every manual step is multiplied by volume. Details arrive in free text and someone re-types them, roles get conflated because the email asked for 'the people involved', and SIC codes come back as a description that somebody has to look up.",
  ],
  heroMock: (
    <TemplateBuilderMock
      title="New company incorporation"
      sections={[
        {
          title: "Proposed company",
          meta: "4 fields",
          fields: [
            { label: "Proposed company name", type: "Text" },
            { label: "SIC code", type: "Select" },
            { label: "Registered office address", type: "Text" },
            { label: "Share capital (£)", type: "Number" },
          ],
        },
        {
          title: "Directors & PSCs",
          meta: "Repeatable · 3 fields",
          fields: [
            { label: "Full name", type: "Text" },
            { label: "Date of birth", type: "Date" },
            { label: "Proof of identity", type: "File" },
          ],
        },
      ]}
    />
  ),
  templates: [
    {
      name: "New company incorporation",
      bestFor: "Forming a limited company or LLP for a new client",
    },
    {
      name: "Client onboarding & ID evidence",
      bestFor: "Taking on a new client before you file anything for them",
    },
    {
      name: "Confirmation statement review",
      bestFor: "The yearly confirmation statement for an existing client",
    },
  ],
  features: [
    {
      icon: CalendarClock,
      eyebrow: "Repeat work",
      title: "The yearly request that raises itself",
      description:
        "A recurring schedule creates and sends the next request from the same template on the cycle you set, so confirmation statement chasing stops being a diary job someone owns.",
      bullets: [
        "One template, published once and versioned, behind every order.",
        "Reminder schedules chase the customer without an email from you.",
        "Bulk export folders every file by recipient, so a completed pack files cleanly.",
      ],
      mock: <ScheduleReuseMock />,
    },
    {
      icon: ClipboardCheck,
      eyebrow: "Review",
      title: "An unreadable ID photo is one rejected item",
      description:
        "Each answer and file is approved or rejected on its own, with the reason attached to that item. The customer re-uploads it in the same portal without anyone composing an explanation.",
      bullets: [
        "Structured fields mean director and PSC details arrive ready to file, not as free text.",
        "SIC codes come back as a code from a select list rather than a description to look up.",
        "The audit log shows what was collected, when, and who checked it.",
      ],
      mock: (
        <ReviewMock
          reference="INC-2026-901"
          subtitle="New incorporation · Bramley Coffee Ltd"
          counts={{ approved: 7, rejected: 1, pending: 1 }}
          items={[
            {
              field: "Proposed company name",
              answer: "Bramley Coffee Ltd",
              state: "approved",
            },
            {
              field: "SIC code",
              answer: "56102 — Unlicensed restaurants and cafes",
              state: "approved",
            },
            {
              field: "PSC 2 — proof of identity",
              answer: "driving-licence.jpg",
              state: "rejected",
              note: "Reviewer: the photo is cropped at the edge — please re-upload the whole document.",
            },
          ]}
          pending={{
            field: "Registered office — proof of address",
            answer: "office-lease.pdf",
          }}
        />
      ),
    },
  ],
  plan: {
    key: "foundation",
    why: "A formation office where more than one person is chasing paperwork: four logins, sixty orders open at once, and unlimited emails and reminders behind them.",
  },
  faqs: [
    {
      question: "Does ClientGather verify identities for ACSP purposes?",
      answer:
        "No. ClientGather collects, structures and stores the evidence your customer sends you, and records who checked it and when. The identity verification decision — and any check against a register — stays with you or with the IDV provider you use.",
    },
    {
      question: "Can resellers and accountants onboard clients through it?",
      answer:
        "Yes. Send the same published template to whoever is providing the details, and the answers come back in the same structure every time rather than as each firm's own spreadsheet layout.",
    },
    {
      question: "Can the portal look like ours?",
      answer:
        "On Growth and Scale the portal carries your logo and favicon with the ClientGather footer removed, and emails can come from your own verified address. On Solo and Foundation the portal is ClientGather-branded.",
    },
    {
      question: "What happens to the paperwork after filing?",
      answer:
        "Every request can be exported as a ZIP with files foldered by recipient, and an archive PDF captures the answers as submitted. Data is stored on our own UK servers, encrypted at rest, with an audit log of who did what.",
    },
  ],
  blogSlug: "document-collection-for-uk-company-formation-agents",
  lastReviewed: "2026-08-16",
}

/** Order drives the footer column and the sitemap. */
export const NICHES: Niche[] = [
  immigrationAdvisers,
  financeBrokers,
  companyFormationAgents,
]

export function getNicheBySlug(slug: string): Niche | undefined {
  return NICHES.find((niche) => niche.slug === slug)
}
