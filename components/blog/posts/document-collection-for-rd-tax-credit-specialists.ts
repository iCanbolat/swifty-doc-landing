import type { BlogPost } from "../types"

export const rdTaxCreditSpecialistsPost: BlogPost = {
  slug: "document-collection-for-rd-tax-credit-specialists",
  title:
    "Collecting R&D claim evidence from people who are not accountants",
  description:
    "How R&D tax relief specialists gather cost breakdowns and technical narratives from client engineers — with repeatable rows, recurring annual requests and an audit trail.",
  niche: "R&D tax relief",
  publishedDate: "2026-08-13",
  readingMinutes: 8,
  answer:
    "R&D tax relief specialists collect claim evidence by sending the client a structured portal link rather than a spreadsheet template. Staff and subcontractor costs are captured as repeatable rows in a fixed format, technical narratives are written directly in the form with autosave, and the annual cycle repeats itself through a recurring schedule.",

  sections: [
    {
      heading: "The problem is who you are collecting from",
      paragraphs: [
        "R&D claim preparation has an unusual property: the people who hold the evidence are usually not the people who understand the claim. Cost data sits with finance, but the technical substance sits with engineers and developers who have never read a tax document and are doing this on top of their actual job.",
        "That mismatch is what makes the standard workflow — a spreadsheet template emailed out, a Word document for the narrative, a reminder every fortnight — so expensive to run.",
      ],
      bullets: [
        "The cost spreadsheet comes back with columns renamed, rows inserted, and totals that no longer reconcile, because a well-meaning client tried to make it clearer.",
        "Technical narratives arrive as a paragraph in an email body, which then has to be chased for the specifics that make it usable.",
        "Half the staff cost breakdown is missing because the client did not realise apportionment was needed per person rather than in total.",
        "Nobody can tell whether the client is halfway through or has not started, because the only signal is whether they have replied.",
        "A year later, during an enquiry, reconstructing who supplied which figure and when means reading back through an email archive.",
      ],
    },

    {
      heading: "What a structured claim request looks like",
      paragraphs: [
        "ClientGather replaces the spreadsheet-and-Word-document pairing with one request built from a template you publish once and reuse for every claim. The client works through it in a portal with no account, and the structure holds.",
      ],
      subsections: [
        {
          heading: "Cost breakdowns as repeatable rows, not a spreadsheet",
          paragraphs: [
            "Staff, subcontractors, consumables and software each become a repeatable section: you define the fields once — name, role, gross cost, apportionment percentage, and whatever else you need — and the client adds one entry per person or supplier.",
            "Because the fields are fixed, the data comes back in the same shape every time. Nobody renames a column, nobody inserts a row that breaks a formula, and nothing needs re-keying before it is usable.",
            "Field types cover the range this work needs: text and long text, numbers, dates, single and multi-select, yes/no, and file upload.",
          ],
        },
        {
          heading: "Technical narratives written where you can see them",
          paragraphs: [
            "Long-form narrative fields sit inside the same request as the costs, with autosave, so a competent professional can write a section, close the tab, and come back to it. Progress is tracked per section, so you can see they have started the technical write-up rather than only knowing they have not submitted.",
            "Conditional visibility keeps the form proportionate: a client with no subcontracted work never sees the subcontractor blocks at all.",
          ],
        },
        {
          heading: "Per-item review, so vague answers get sharpened in place",
          paragraphs: [
            "Narrative evidence almost always needs a second pass. Review is per item — you approve, reject, or request changes on each individual answer, and requesting changes opens a comment thread on that answer that the client responds to in the same portal.",
            "So instead of an email saying the uncertainty section needs more detail, you leave that comment against the uncertainty field itself. The client sees the question next to their own words. The rest of the claim stays approved and untouched.",
          ],
        },
        {
          heading: "The annual cycle runs itself",
          paragraphs: [
            "Claim work is calendar-driven and repeats. Recurring request schedules create and send the next request on a set frequency, so next year's collection starts without anyone diarising it.",
            "Each request carries a due date and a reminder strategy — none, three days before, five days before, weekly, or every three days — and reminder emails go out automatically. Reminders are email only.",
          ],
        },
        {
          heading: "An audit trail that survives an enquiry",
          paragraphs: [
            "This is the part that matters most for claim work and is the hardest to reconstruct after the fact. Every item carries its own review history: who supplied it, when, who approved or rejected it, and the comment thread that resolved any question about it.",
            "Alongside that, the audit log records security and data-access events, retained for 180 days. Access inside your practice is governed by four roles, and two-factor authentication can be required across the whole organisation.",
            "Exporting the claim produces a ZIP foldered by recipient, each folder containing the uploaded files plus a generated archive PDF of the completed form — so the answers and the supporting documents stay together as one self-describing record.",
          ],
        },
      ],
    },

    {
      heading: "A specialist firm preparing eighty claims a year",
      variant: "case-study",
      paragraphs: [
        "The situation: a boutique R&D practice with a spreadsheet template and a narrative questionnaire, both emailed. Roughly one claim in three comes back with a broken cost sheet, and every claim needs at least two rounds of narrative clarification over email.",
        "What changes: one published template with repeatable staff and subcontractor sections and long-form narrative fields. The costs arrive in a fixed shape. The clarification rounds happen as change requests against individual answers rather than as email.",
        "The outcome: the re-keying disappears because the structure cannot be edited by the client. The clarification rounds still happen — that is the nature of the work — but they happen against the specific answer, so neither side has to explain which paragraph is under discussion.",
      ],
    },

    {
      heading: "Coming back to a claim two years later",
      variant: "case-study",
      paragraphs: [
        "The situation: a claim from an earlier period is queried, and the practice needs to show what was supplied, by whom, and on what basis. The original correspondence is spread across two mailboxes and a shared drive.",
        "What changes: the claim exists as a single completed request. The per-item history shows each figure and narrative, who provided it, when it was approved, and any comment thread that refined it. The archive PDF captures the completed form as it stood.",
        "The outcome: the reconstruction is a lookup rather than an investigation. Note that ClientGather organises and evidences what the client told you — it does not assess the claim, and it is not a substitute for your own professional judgement about what qualifies.",
      ],
    },

    {
      heading: "What it costs",
      paragraphs: [
        "Pricing follows how much you have in flight at once. An active request is one that is out with a client — sent or in progress. Drafts do not count, and closing a finished claim frees its slot.",
        "Claim work is seasonal, which fits this model: a peak of simultaneously open claims costs more than a quiet month, and packs of fifty additional active requests can be added and dropped again when the peak passes. Clients, recipients, emails and reminders are unlimited on every plan.",
        "Every plan includes the template builder, portal, review queue, recurring schedules, ZIP and archive PDF export, Google Drive integration, UK hosting, encryption at rest, malware scanning and audit logs. Current figures are on the home page.",
      ],
    },
  ],

  faqs: [
    {
      question: "Can clients still work in a spreadsheet if they prefer?",
      answer:
        "They can upload one as a file — XLSX and CSV are both accepted, up to 10 MB. But the cost breakdown itself is better captured as repeatable rows in the form, because those come back in a fixed shape that needs no re-keying.",
    },
    {
      question: "How do we collect costs per employee without a spreadsheet?",
      answer:
        "As a repeatable section. You define the fields for one person — name, role, cost, apportionment — and the client adds an entry per employee. The same pattern covers subcontractors, consumables and software.",
    },
    {
      question: "Can technical staff and finance staff fill in different parts?",
      answer:
        "Yes. A request can go to multiple recipients with their own portal links, and submissions can be individual or collaborative. Progress is tracked per section, so you can see which parts are moving.",
    },
    {
      question: "Does the annual claim cycle have to be set up each year?",
      answer:
        "No. A recurring request schedule creates and sends the next request on a set frequency. Reminders then run on the strategy you pick per request — none, three or five days before the due date, weekly, or every three days.",
    },
    {
      question: "What record exists if a claim is later queried?",
      answer:
        "Each item keeps its own history: who supplied it, when, who approved or rejected it, and any comment thread. The audit log covers security and data-access events for 180 days, and the export bundles the files with an archive PDF of the completed form.",
    },
    {
      question: "Does ClientGather calculate or assess the claim?",
      answer:
        "No. It collects, structures, reviews and evidences what the client provides. Assessing what qualifies and preparing the claim remains your professional work — there is no calculation engine and no accounting integration.",
    },
    {
      question: "Is there a Xero or QuickBooks integration?",
      answer:
        "No. The available integrations are Google Drive on every plan, and webhooks with delivery logs plus Zapier on Growth and Scale. There is no Xero, QuickBooks or Sage connector.",
    },
    {
      question: "Where is claim data stored?",
      answer:
        "In the United Kingdom — requests and answers on our own servers in Erith, uploaded files in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK. Uploads are scanned for malware on our own infrastructure before they are stored.",
    },
  ],
}
