import type { BlogPost } from "../types"

export const specialistFinanceBrokersPost: BlogPost = {
  slug: "document-collection-for-specialist-finance-brokers",
  title:
    "Packaging a lender-ready case: document collection for specialist finance brokers",
  description:
    "How bridging, development and commercial finance brokers collect KYC, SPV director details and asset schedules — and reopen a single item when the lender comes back.",
  niche: "Specialist finance",
  publishedDate: "2026-08-13",
  readingMinutes: 9,
  answer:
    "Specialist finance brokers package a case by sending each party a secure portal link rather than an email document list. SPV directors, shareholders and asset schedules are captured as repeatable rows, several parties can work on the same submission at once, and when a lender asks for one more statement the broker reopens that single item instead of restarting the thread.",

  sections: [
    {
      heading: "Why case packaging falls apart in an inbox",
      paragraphs: [
        "Bridging, development and commercial finance all run on the same underlying job: assemble a complete, coherent pack and get it in front of a lender before the deal moves. The document list is well understood. Getting it back from four different people is the hard part.",
        "The usual setup — a document request email, a shared folder, a spreadsheet of outstanding items — creates a specific set of failures that get worse as deal volume rises.",
      ],
      bullets: [
        "A deal has a borrower, one or more directors, a solicitor and sometimes an accountant. Each replies separately, and no one view shows what is still outstanding across all of them.",
        "An SPV with four directors means four sets of identity and address evidence, arriving in whatever order and format each director happens to use.",
        "Asset and portfolio schedules come back as spreadsheets with different column layouts every time, so someone re-keys them before the pack can go out.",
        "The lender comes back for one more bank statement. Reopening that request means a fresh email thread that nobody can reconcile against the original list a week later.",
        "When a case goes quiet, the only record of what was chased and when is in a broker's sent items.",
      ],
    },

    {
      heading: "What changes when the pack has structure",
      paragraphs: [
        "ClientGather turns the document list into a template you publish once per product and reuse for every case. Parties get portal links rather than accounts, and the state of the pack is a single screen your team and the borrower are both looking at.",
      ],
      subsections: [
        {
          heading: "Directors, shareholders and assets as repeatable rows",
          paragraphs: [
            "Sections and fields can be marked repeatable, so an SPV with four directors is four entries against the same field set rather than four improvised email exchanges. The same applies to shareholders, security properties and portfolio schedules.",
            "Field groups nest, so a security property entry can contain its own repeatable rows — existing charges, tenancy details — without you predicting the count in advance.",
            "The practical gain is uniformity. Every case comes back in the same shape, which is what makes a pack quick to check before it goes to a lender.",
          ],
        },
        {
          heading: "The changes-requested loop is built for lender questions",
          paragraphs: [
            "This is the capability that fits specialist finance most precisely. Review happens per item: your team approves, rejects, or requests changes on each individual answer or file, and requesting changes opens a comment thread on that item that the borrower answers in the same portal.",
            "So when a lender comes back mid-underwrite asking for one more month of statements, you reopen that single item with a comment. The borrower sees exactly which document is wanted and why. Everything already approved stays approved, and the original request stays the single record of the case.",
          ],
          bullets: [
            "No new email thread, no re-sending a list the borrower has already worked through.",
            "The comment thread sits against the document, so the reason for the request is still there when someone reviews the file later.",
            "Outstanding items across every open case appear in one filterable queue.",
          ],
        },
        {
          heading: "Several parties on one deal",
          paragraphs: [
            "A request can go to multiple recipients, and submissions can be individual or collaborative depending on how you want the deal handled. On Growth and Scale plans, collaborative submissions show live presence and cursors, so two parties working at the same time can see each other rather than overwriting each other's work.",
            "Progress is tracked per section, so you can tell at a glance whether the borrower has stalled on identity evidence or on the asset schedule.",
          ],
        },
        {
          heading: "A pack the lender can actually open",
          paragraphs: [
            "Exporting a request produces a ZIP organised into a folder per recipient, each containing that party's uploaded files plus a generated archive PDF of their completed form. The answers and the evidence travel together, foldered by who provided them.",
            "Google Drive integration is available on every plan. On Growth and Scale, webhooks and Zapier can push completed cases into whatever system you already run, with delivery logs so you can see what fired.",
          ],
        },
        {
          heading: "Handling identity and financial evidence",
          paragraphs: [
            "Identity documents and bank statements are the most sensitive things a broker holds. Uploaded files and sensitive answers are encrypted at rest, and every upload is scanned for malware on our own infrastructure before it is stored — files are never sent to an outside scanning service, and anything that fails is refused at upload.",
            "Your requests, answers and uploaded files are stored in the United Kingdom — account data on our own servers in Erith, uploaded files in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK.",
            "Internally, four roles control who can see and decide what, two-factor authentication can be required across the organisation, and the audit log records access and changes.",
          ],
        },
      ],
    },

    {
      heading: "A three-broker firm running bridging and development cases",
      variant: "case-study",
      paragraphs: [
        "The situation: three brokers, twenty or so live cases at any time, each with a borrower and between one and four directors. Document chasing happens over email; the tracking spreadsheet is updated when someone remembers.",
        "What changes: one published template per product — bridging, development, commercial term. The broker sends portal links to the borrower and each director, sets a due date, and picks a reminder cadence of every three days. Director evidence arrives as repeatable entries against a fixed field set rather than as loose attachments.",
        "The outcome: the outstanding-items queue replaces the spreadsheet, and it is accurate because it is generated from the submissions rather than maintained by hand. A broker picking up a colleague's case can see its exact state without reading a thread.",
      ],
    },

    {
      heading: "When the lender comes back for one more document",
      variant: "case-study",
      paragraphs: [
        "The situation: a case has been submitted and the lender's underwriter asks for an additional month of business bank statements for one of two directors. Under the old workflow this starts a fresh email chain that has no connection to the original document list.",
        "What changes: the reviewer finds that director's bank statement item, requests changes, and writes one line explaining what is needed. The director gets an email, opens the same portal link, and uploads against that item. Nothing else in the pack is disturbed.",
        "The outcome: the case file stays whole. Six months later the record still shows what the lender asked for, who supplied it, when, and who approved it — because the exchange happened against the document rather than around it.",
      ],
    },

    {
      heading: "What it costs",
      paragraphs: [
        "Pricing tracks how much you have in flight, not how much you send. An active request is one that is out with a client — sent or in progress. Drafts do not count, and closing a completed case frees its slot again.",
        "That maps closely to a broker's pipeline: cases are open while they are being packaged and underwritten, then they complete. Clients, recipients, emails and reminders are unlimited on every plan.",
        "White-labelling the portal, sending from your own verified domain, webhooks, Zapier and live collaboration require Growth or Scale. Pointing ClientGather at your own S3 bucket requires Scale. Everything else — template builder, portal, review queue, schedules, export, Drive, UK hosting, encryption, malware scanning, audit logs — is on every plan. Current figures are on the home page.",
      ],
    },
  ],

  faqs: [
    {
      question: "Can we collect from the borrower and their directors separately?",
      answer:
        "Yes. A request can go to multiple recipients, each with their own secure portal link, and the export folders the finished files by recipient. Submissions can be individual or collaborative depending on how the deal is being handled.",
    },
    {
      question: "How do we handle an SPV with several directors?",
      answer:
        "As a repeatable section. You define the fields for one director once, and the borrower adds an entry per person. Field groups nest, so each director entry can contain its own repeatable rows where needed.",
    },
    {
      question:
        "The lender wants one extra document after submission. Do we start again?",
      answer:
        "No. The reviewer requests changes on that single item and adds a comment explaining what is needed. The borrower uploads against that item in the same portal. Everything already approved is untouched.",
    },
    {
      question: "Can two people work on the same case at the same time?",
      answer:
        "Yes, in collaborative submission mode. On Growth and Scale plans, collaborative submissions also show live presence and cursors so the parties can see each other working rather than overwriting each other.",
    },
    {
      question: "Can the portal carry our own branding?",
      answer:
        "On Growth and Scale plans, yes — a white-labelled client portal and sending from your own verified email domain. You verify the domain once; we generate the DNS records and check them for you.",
    },
    {
      question: "Can completed cases be pushed into our existing systems?",
      answer:
        "Google Drive integration is available on every plan. Webhooks with delivery logs and Zapier require Growth or Scale. There is no Xero, QuickBooks or Sage integration.",
    },
    {
      question: "Where is the data held?",
      answer:
        "In the United Kingdom — requests and answers on our own servers in Erith, uploaded files in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK. On the Scale plan you can point ClientGather at your own S3 bucket instead.",
    },
    {
      question: "Does ClientGather handle signing the facility documents?",
      answer:
        "No. ClientGather is not an electronic signature service and does not certify, witness or notarise any document. It collects, reviews and packages the evidence; execution happens wherever you already do it.",
    },
  ],
}
