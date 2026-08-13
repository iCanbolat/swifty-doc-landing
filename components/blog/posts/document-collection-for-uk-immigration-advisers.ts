import type { BlogPost } from "../types"

export const immigrationAdvisersPost: BlogPost = {
  slug: "document-collection-for-uk-immigration-advisers",
  title: "How UK immigration advisers collect evidence without the email thread",
  description:
    "A practical guide to collecting applicant evidence bundles: repeatable sections for dependants, conditional checklists, deadline reminders and a recipient-foldered export.",
  niche: "Immigration advice",
  publishedDate: "2026-08-13",
  readingMinutes: 9,
  answer:
    "Regulated UK immigration advisers collect evidence by sending each applicant a secure portal link instead of an email checklist. The applicant uploads at their own pace with autosave, dependants are captured as repeatable sections, and the adviser approves or rejects each document individually — so a missing payslip reopens one item, not the whole bundle.",

  sections: [
    {
      heading: "Why the email-and-checklist workflow breaks",
      paragraphs: [
        "Almost every immigration practice starts the same way: a Word checklist attached to an email, a shared drive folder per applicant, and a spreadsheet tracking who has sent what. It works for the first few applications and then quietly stops scaling.",
        "The failure is not the checklist. It is that the checklist and the evidence live in different places, and neither of them knows the state of the other.",
      ],
      bullets: [
        "Evidence arrives across five separate replies, three of them with the same filename, and the newest version is whichever one you happen to open last.",
        "An applicant with a partner and two children sends everything in one attachment dump, and someone has to work out by hand which passport belongs to whom.",
        "You ask for one more bank statement, and the applicant re-sends the entire bundle because they cannot tell which item was the problem.",
        "A caseworker goes on leave, and nobody else can tell from the folder whether the outstanding item was chased last Tuesday or never chased at all.",
        "Personal documents — passports, biometric cards, payslips, tenancy agreements — sit in inbox attachments indefinitely, which is precisely where you do not want them.",
      ],
    },

    {
      heading: "What a purpose-built request looks like instead",
      paragraphs: [
        "ClientGather replaces the checklist with a template you build once and reuse for every applicant on that route. The applicant gets a link, not an account, and the state of the bundle is the same thing your team looks at.",
      ],
      subsections: [
        {
          heading: "Dependants become repeatable sections, not guesswork",
          paragraphs: [
            "This is the single biggest structural difference for immigration work. A section can be marked repeatable, so the applicant adds one entry per dependant and fills in the same fields for each — name, date of birth, relationship, passport, and whatever else the route calls for.",
            "Field groups can nest, too, so a dependant entry can itself contain repeatable rows for previous addresses or prior travel. You define the shape once; the applicant decides how many of each there are.",
          ],
          bullets: [
            "No more working out which of eleven uploaded passports belongs to which family member.",
            "Every dependant is captured with the same fields, which makes the finished bundle uniform across cases.",
            "Adding a fourth child does not require you to edit the request or send a new one.",
          ],
        },
        {
          heading: "Conditional visibility keeps the checklist short",
          paragraphs: [
            "A comprehensive evidence checklist is intimidating, and most of it does not apply to any given applicant. Fields and sections can be shown conditionally based on earlier answers, so someone who answers that they are not relying on a partner's income never sees that block at all.",
            "The applicant experiences a short, relevant form. Your team still has one template covering every variation.",
          ],
        },
        {
          heading: "Per-item review, so one gap reopens one item",
          paragraphs: [
            "When a submission comes in, your team works through it item by item and approves, rejects, or requests changes on each one. Requesting changes opens a comment thread on that specific item that the applicant answers in the same portal.",
            "This is the part that removes the most email. Instead of composing a message explaining that the third bank statement is the wrong month, you reject that item with a one-line comment, and the applicant re-uploads it in place. Everything already approved stays approved.",
          ],
        },
        {
          heading: "Deadlines that chase themselves",
          paragraphs: [
            "Immigration work runs on hard external dates. Each request carries a due date and a reminder strategy — none, three days before, five days before, weekly, or every three days — and reminder emails go out on that schedule without anyone remembering to send them.",
            "For work that repeats on a known cycle, recurring request schedules create and send the next request automatically.",
          ],
        },
        {
          heading: "Handling personal documents properly",
          paragraphs: [
            "Immigration files are about as sensitive as client data gets. Uploaded files and sensitive answers are encrypted at rest. Every uploaded file is scanned for malware before it is stored, on our own infrastructure — files are never sent to an outside scanning service, and anything that fails is refused at upload.",
            "Your requests, answers and uploaded files are stored on our own servers in Erith, United Kingdom — not replicated to other regions and not handed to a third-party storage provider.",
            "Access inside your own practice is governed by four roles, and the audit log records who opened, changed and approved what. Two-factor authentication can be required across the whole organisation rather than left to each user.",
          ],
        },
      ],
    },

    {
      heading: "A five-adviser practice running forty applications a month",
      variant: "case-study",
      paragraphs: [
        "The situation: five advisers, a shared inbox, and a spreadsheet tracking outstanding evidence per applicant. Roughly a third of the working week goes on chasing. Nobody can answer 'where is the Patel file up to?' without opening three systems.",
        "What changes: one published template per route. The adviser picks the applicant, sets the due date to a fortnight before the filing deadline, and sends the portal link. Reminders go weekly without anyone touching them. Dependants come in as repeatable entries rather than an attachment dump.",
        "The outcome: chasing becomes a queue rather than a memory exercise. The review screen shows exactly which items are outstanding across every open case, so cover during annual leave stops depending on whoever was copied into the original thread. When an applicant sends the wrong month's statement, that one item is reopened with a comment instead of restarting the bundle.",
      ],
    },

    {
      heading: "Handing the finished bundle on",
      variant: "case-study",
      paragraphs: [
        "The situation: an application is ready to file, and the evidence needs to leave the system in a form somebody else can navigate — a colleague, a supervising adviser, or the practice's own archive.",
        "What changes: exporting a request produces a ZIP organised into a folder per recipient. Each folder contains the uploaded files plus a generated archive PDF of that recipient's completed form, so the answers and the evidence travel together.",
        "The outcome: the bundle is self-describing. Someone opening it in eighteen months can see what was asked, what was answered, and what was supplied, without needing access to the original request. Note that ClientGather collects and organises evidence — it is not an electronic signature service and does not certify, witness or notarise any document.",
      ],
    },

    {
      heading: "What it costs",
      paragraphs: [
        "Pricing is based on how much you have in flight at once, not how much you send. An active request is one that is out with a client — sent or in progress. Drafts do not count, and closing a request you have finished frees its slot again.",
        "For an immigration practice that suits the shape of the work: applications open for weeks, then close permanently. Clients, recipients, emails and reminders are unlimited on every plan, so a busy month does not cost more than a quiet one — only a larger number of simultaneously open cases does.",
        "Every plan includes the template builder, client portal, review queue, recurring schedules, ZIP and archive PDF export, Google Drive integration, UK hosting, encryption at rest, malware scanning and audit logs. See the pricing section on the home page for current figures.",
      ],
    },
  ],

  faqs: [
    {
      question: "Do applicants need to create an account?",
      answer:
        "No. Each recipient gets a secure, token-verified portal link that expires. They open it, complete the form with autosave, and upload files without registering, choosing a password or installing anything.",
    },
    {
      question: "How are dependants and family members handled?",
      answer:
        "As repeatable sections. You define the fields for one dependant, and the applicant adds an entry per person. Field groups can nest, so a dependant entry can contain its own repeatable rows for things like previous addresses.",
    },
    {
      question: "Can we ask for one missing document without resending everything?",
      answer:
        "Yes. Review is per item. You approve, reject, or request changes on each individual answer or file, and requesting changes opens a comment thread on that item only. Everything already approved stays approved.",
    },
    {
      question: "Where is applicant data stored?",
      answer:
        "On our own servers in Erith, United Kingdom. Requests, answers and uploaded files stay there — they are not replicated to other regions and not handed to a third-party storage provider. Uploads are scanned for malware on the same infrastructure.",
    },
    {
      question: "What file types and sizes can applicants upload?",
      answer:
        "Uploads are capped at 10 MB per file by default, and the accepted types are PDF, ZIP, XLSX, DOCX, JPEG, PNG, WebP, CSV and TXT. Every file is scanned before it is stored, and anything that fails the scan is refused at upload.",
    },
    {
      question: "Does ClientGather provide electronic signatures?",
      answer:
        "No. ClientGather is not an electronic signature service and does not certify, witness or notarise any document. It collects, reviews and organises the evidence; signing happens wherever you already do it.",
    },
    {
      question: "Can we prove who accessed a file and when?",
      answer:
        "Yes. The audit log records security and data-access events, retained for 180 days, alongside the per-item review history showing who approved or rejected each document. Access is governed by four roles, and two-factor authentication can be required organisation-wide.",
    },
    {
      question: "Can reminders be sent by text message?",
      answer:
        "No. Reminders are email only. You choose a strategy per request — none, three days before the due date, five days before, weekly, or every three days — and they send automatically.",
    },
  ],
}
