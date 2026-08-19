import type { BlogPost } from "../types"

export const companyFormationAgentsPost: BlogPost = {
  slug: "document-collection-for-uk-company-formation-agents",
  title:
    "High-volume onboarding for UK company formation agents",
  description:
    "How formation agents collect director, shareholder and PSC details at volume — one reusable template, repeatable groups, a white-labelled portal and automated handoff.",
  niche: "Company formation",
  publishedDate: "2026-08-13",
  readingMinutes: 8,
  answer:
    "UK company formation agents collect incorporation details by publishing one reusable template and sending each customer a portal link. Directors, shareholders and PSCs are captured as repeatable groups against fixed fields, SIC codes as a select list, and completed packs hand off automatically — so the volume rises without the admin rising with it.",

  sections: [
    {
      heading: "Volume is the whole problem",
      paragraphs: [
        "Formation work is the opposite of advisory work. Each customer is low-touch and the document list barely varies, but there are a great many of them, and the margin depends entirely on how little human handling each one needs.",
        "That means the failure modes are different from a professional practice. Nothing is complicated; everything is repetitive, and every manual step is multiplied by the volume.",
      ],
      bullets: [
        "Director and shareholder details arrive in free text, so someone re-types them into the actual filing system — the single largest hidden cost in the workflow.",
        "A company with three shareholders and two PSCs comes back with the roles conflated, because the email asked for 'the people involved'.",
        "SIC codes arrive as a description rather than a code, and someone looks each one up.",
        "Identity evidence is missing or unreadable, and the chase is a manual email per customer.",
        "Accountants and resellers who onboard clients on your behalf send a spreadsheet in their own format, which someone normalises by hand.",
      ],
    },

    {
      heading: "What a reusable incorporation request looks like",
      paragraphs: [
        "ClientGather is built around publishing a template once and sending it many times. For formation work that is the core of the fit: the intake form is standardised, the customer completes it in a portal with no account, and the structure is the same on every single order.",
      ],
      subsections: [
        {
          heading: "One published template, versioned",
          paragraphs: [
            "You compose the template from sections and fields, then publish a version. Changes are drafted against a new version with a change summary and full history, so adjusting the intake form does not disturb orders already in flight.",
            "When you do publish a change, existing requests keep working. You are not maintaining a folder of near-identical Word documents that drift apart.",
          ],
        },
        {
          heading: "Directors, shareholders and PSCs as repeatable groups",
          paragraphs: [
            "Each role becomes its own repeatable section with the exact fields you need to capture — full name, date of birth, service address, nationality, nature of control, shareholding, and so on. The customer adds one entry per person.",
            "Because the roles are separate sections rather than one free-text question, they cannot be conflated. A person who is both a director and a PSC is entered in both places, which is what the filing actually requires.",
            "Field groups nest, so a shareholder entry can carry its own repeatable rows for share classes or allotments.",
          ],
        },
        {
          heading: "Structured fields instead of free text",
          paragraphs: [
            "SIC codes belong in a select field, not a text box. Select options carry a separate label and value, so the customer picks a readable description while the stored answer is the code you actually need downstream.",
            "Dates are date fields, yes/no questions are boolean fields, and conditional visibility hides blocks that do not apply — so a single-director company with one shareholder sees a short form.",
            "The cumulative effect is that the data comes out ready to use rather than ready to interpret.",
          ],
        },
        {
          heading: "Your brand, not ours",
          paragraphs: [
            "On Growth and Scale plans, the client portal is white-labelled and you can send from your own verified email domain — you pick the address customers see, verify its domain once, and we generate the DNS records and check them for you. Your existing inbox keeps working.",
            "For agents who serve accountants and resellers, this is what makes the intake form usable as part of someone else's onboarding rather than an obviously third-party detour.",
          ],
        },
        {
          heading: "Handing off without touching it",
          paragraphs: [
            "On Growth and Scale, webhooks deliver signed callbacks with delivery logs when a request completes, and Zapier connects to whatever else you run. That is the route to pushing a finished pack into your filing workflow without a person copying anything.",
            "Google Drive integration is available on every plan, and exporting produces a ZIP foldered by recipient containing the uploaded files plus a generated archive PDF of the completed form.",
            "One boundary worth stating plainly: ClientGather collects and organises the information. It does not file anything with Companies House, and it is not an electronic signature service — it does not certify, witness or notarise any document.",
          ],
        },
        {
          heading: "Identity documents, handled properly",
          paragraphs: [
            "Formation work means holding identity evidence for a large number of people. Uploaded files and sensitive answers are encrypted at rest, and every upload is scanned for malware on our own infrastructure before it is stored — files are never sent to an outside scanning service, and anything that fails is refused at upload.",
            "Your requests, answers and uploaded files are stored in the United Kingdom — account data on our own servers in Erith, uploaded files in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK.",
            "Internally, four roles control access, two-factor authentication can be required organisation-wide, and the audit log records access and changes. A consent statement can be attached to the template so the customer's acceptance is captured with the submission itself.",
          ],
        },
      ],
    },

    {
      heading: "An agent processing several hundred incorporations a month",
      variant: "case-study",
      paragraphs: [
        "The situation: a high-volume formation agent with a web order form that captures the basics, followed by an email exchange for anything the form did not cover — usually PSC detail, identity evidence and the occasional shareholding structure.",
        "What changes: one published template covers the full intake. Directors, shareholders and PSCs are repeatable sections, SIC codes are a select field storing the code, and conditional visibility keeps the simple single-director orders short. The follow-up email exchange stops being the default.",
        "The outcome: the re-keying step disappears, because the answers arrive in the structure the downstream process expects. The orders that do need a human are visible in the review queue rather than buried in a shared inbox alongside the ones that do not.",
      ],
    },

    {
      heading: "Onboarding through accountants and resellers",
      variant: "case-study",
      paragraphs: [
        "The situation: a share of orders arrive via accountants who onboard their own clients and forward the details, each in their own format. Normalising those is manual and error-prone.",
        "What changes: on a Growth or Scale plan the portal is white-labelled and email comes from your own verified domain, so the accountant can pass the link to their client directly. The details arrive in the same structure as a direct order.",
        "The outcome: one intake path instead of two. The reseller channel stops being the exception that needs hand-finishing, and webhooks push completed packs onward without anyone re-entering them.",
      ],
    },

    {
      heading: "What it costs",
      paragraphs: [
        "Pricing is based on how much you have in flight at once, not how much you send. An active request is one that is out with a client — sent or in progress. Drafts do not count, and closing a completed order frees its slot again.",
        "For formation work this is the favourable shape: orders complete quickly, so a high monthly volume with short turnaround occupies far fewer simultaneous slots than the raw order count suggests. Clients, recipients, emails and reminders are unlimited on every plan, and packs of fifty additional active requests can be added and dropped as volume moves.",
        "The white-labelled portal, your own sending domain, webhooks and Zapier require Growth or Scale — for an agent working through resellers, those are usually the deciding features. Current figures are on the home page.",
      ],
    },
  ],

  faqs: [
    {
      question: "Can we use one intake form for every incorporation?",
      answer:
        "Yes — that is the intended pattern. You publish one template and send it for every order. Conditional visibility keeps simple orders short, and changes are drafted against a new version with a change summary so requests already in flight are undisturbed.",
    },
    {
      question: "How do we capture directors, shareholders and PSCs separately?",
      answer:
        "Each role is its own repeatable section with its own fields, so the customer adds an entry per person and the roles cannot be conflated. Field groups nest, so a shareholder entry can carry repeatable rows for share classes.",
    },
    {
      question: "Can SIC codes be a dropdown rather than free text?",
      answer:
        "Yes. Select options carry a separate label and value, so the customer picks a readable description while the stored answer is the code itself. That is what removes the manual lookup step.",
    },
    {
      question: "Can the portal use our branding instead of yours?",
      answer:
        "On Growth and Scale plans, yes — a white-labelled portal and sending from your own verified email domain. You verify the domain once; we generate the DNS records and check them for you, and your existing inbox keeps working.",
    },
    {
      question: "Does ClientGather file with Companies House?",
      answer:
        "No. It collects, structures and reviews the information, then hands the completed pack off via export, Google Drive, or webhooks and Zapier on Growth and Scale. Filing happens in whatever system you already use.",
    },
    {
      question: "Can customers sign documents in the portal?",
      answer:
        "No. ClientGather is not an electronic signature service and does not certify, witness or notarise any document. It can, however, attach a consent statement to the template so the customer's acceptance is recorded with the submission.",
    },
    {
      question: "Can completed orders be pushed into our system automatically?",
      answer:
        "On Growth and Scale, yes — webhooks deliver signed callbacks with delivery logs when a request completes, and Zapier connects to other applications. Google Drive integration is available on every plan.",
    },
    {
      question: "Where is customer identity evidence stored?",
      answer:
        "In the United Kingdom — requests and answers on our own servers in Erith, uploaded files in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK. Every upload is scanned for malware on our own infrastructure before it is stored.",
    },
  ],
}
