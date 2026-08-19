/**
 * Comparison copy is plain data, same rule as the blog posts and the legal
 * documents: no markdown parser ships with the site, and structured data means
 * nothing can inject markup.
 *
 * One rule is enforced by the types rather than by review: every claim about
 * someone else's product carries the page it came from. `source` is required,
 * so an unsourced competitor cell will not compile. Cells say what the vendor's
 * own pages say — where a page is silent, the cell says that and links the page
 * checked, because "not mentioned" is something we can stand behind and
 * "they don't have it" is not.
 *
 * `checkedOn` is a promise to the reader. Re-read the linked pages before
 * moving it.
 */

export type ComparisonRow = {
  /** Neutral capability name — never phrased as the competitor's shortcoming. */
  capability: string
  ours: string
  /** What their own published pages say, or that they are silent on it. */
  theirs: string
  /** Required. The page the `theirs` cell was read from. */
  source: { label: string; url: string }
}

export type Competitor = {
  slug: string
  /** Their product name, used verbatim. Never a logo, never altered. */
  name: string
  /** H1 and the meta title. */
  headline: string
  /** Meta description, roughly 150-160 characters. */
  description: string
  /**
   * The "In short" block. One paragraph, 40-60 words, written to stand on its
   * own if an answer engine quotes it with no surrounding context.
   */
  answer: string
  /** ISO date the linked pages were last read. Rendered on the page. */
  checkedOn: string
  intro: string[]
  rows: ComparisonRow[]
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  faqs: { question: string; answer: string }[]
}

const OUR_STORAGE =
  "Our own servers in Erith, United Kingdom; uploaded files in Bunny.net's London storage region, encrypted with our own key. Nothing is replicated outside the UK."

const OUR_SCANNING =
  "Every upload is scanned on our own infrastructure before it is stored. Anything that fails is refused at upload and never reaches your storage."

const OUR_AUDITOR =
  "Free read-only Auditor logins — 2 to 8 depending on plan — that do not count against your users."

const OUR_TEMPLATES =
  "Eleven UK starter packs built in: Home Office evidence bundles, specialist finance packaging, and Companies House incorporation, onboarding and confirmation statements."

const contentSnare: Competitor = {
  slug: "content-snare",
  name: "Content Snare",
  headline: "ClientGather vs Content Snare",
  description:
    "A like-for-like look at document collection for UK regulated practices: where files are stored, who can review them, and what the entry plan costs.",
  answer:
    "Both tools replace the email thread with a client portal, reusable request templates and automatic reminders. ClientGather is the UK-hosted option: requests and answers sit on our own servers in Erith and uploaded files in Bunny.net's London storage region, uploads are scanned before storage, and read-only Auditor logins are free — which matters if a compliance consultant or regulator reads your files.",
  checkedOn: "2026-08-16",
  intro: [
    "Content Snare is a well-established document collection tool with a broad customer base across accounting, legal and agency work. If you are comparing it with ClientGather, you are almost certainly weighing the same two or three things: where your clients' documents physically live, who in your practice — and outside it — is allowed to read them, and what the whole thing costs at the size you actually are.",
    "This page covers those points only. Content Snare publishes plenty we have not reproduced here, so read their pages as well as ours.",
  ],
  rows: [
    {
      capability: "Where your files are stored",
      ours: OUR_STORAGE,
      theirs:
        "Amazon Web Services. The region is not stated on their security page.",
      source: {
        label: "Content Snare security page",
        url: "https://contentsnare.com/security/",
      },
    },
    {
      capability: "Malware scanning on upload",
      ours: OUR_SCANNING,
      theirs: "Not mentioned on their security page.",
      source: {
        label: "Content Snare security page",
        url: "https://contentsnare.com/security/",
      },
    },
    {
      capability: "Read-only seats for a compliance reviewer",
      ours: OUR_AUDITOR,
      theirs:
        "Plans are counted in team members: 2 on Basic, 5 on Plus, 10 on Pro.",
      source: {
        label: "Content Snare pricing page",
        url: "https://contentsnare.com/pricing/",
      },
    },
    {
      capability: "Entry plan",
      ours: "£25/month billed annually (€29 charged) — 20 active requests, 2 users, 10 GB, 14-day trial with no card.",
      theirs:
        "US$35/month billed annually — 20 active requests, 2 users, 20 GB, 14-day trial with no card.",
      source: {
        label: "Content Snare pricing page",
        url: "https://contentsnare.com/pricing/",
      },
    },
    {
      capability: "Starter templates for UK regulated work",
      ours: OUR_TEMPLATES,
      theirs:
        "Industry pages for accounting, legal, mortgage and finance, digital agencies and education.",
      source: {
        label: "Content Snare features page",
        url: "https://contentsnare.com/features/",
      },
    },
  ],
  sections: [
    {
      heading: "Where the documents actually sit",
      paragraphs: [
        "For most software this is a detail. For a practice collecting passports, bank statements and proof of address it is the question the client asks, the question a compliance consultant asks, and the one you have to be able to answer in a sentence.",
        "ClientGather runs on our own servers in Erith, United Kingdom — your requests, answers and audit logs live there. Uploaded files are stored in Bunny.net's London storage region, encrypted with our own key before they leave our servers. Nothing is replicated outside the UK. The malware scan on every upload runs on our own infrastructure before the file is stored, so files are never sent to an outside scanning service either.",
      ],
      bullets: [
        "One answer to “where is my passport scan stored”, and it names a town.",
        "Uploads are scanned before they are stored, not after.",
        "On the Scale plan you can point us at your own S3 bucket instead, if the answer needs to be your infrastructure rather than ours.",
      ],
    },
    {
      heading: "Built for the person who checks the file, not just the person who sends it",
      paragraphs: [
        "In a regulated practice the document collection tool has a second audience: whoever reviews the work. A compliance consultant, an external examiner, a principal firm supervising an appointed representative, or the partner who signs it off.",
        "That is why the Auditor role exists and why it is free. It reads requests, files, templates and the whole review history, sees the audit log for the workspaces you add it to, and can pull an export — and it cannot approve an item, reject one, comment, send a request or edit anything. Whoever checks the file cannot change it, and inviting them does not cost you a seat.",
      ],
    },
    {
      heading: "Templates that already know the job",
      paragraphs: [
        "Both tools let you build a request template once and reuse it. The difference is what you start from. ClientGather ships eleven UK packs you can apply and edit: Skilled Worker, Appendix FM, ILR and Form AN for immigration advisers; bridging, buy-to-let SPV, development and commercial packaging for specialist finance brokers; and incorporation, client onboarding and confirmation statement packs for company formation agents and ACSPs.",
        "They are starting points rather than advice — routes, lender criteria and Companies House requirements all change — but they mean the first request you send is an edit rather than a blank page.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I move my existing requests across?",
      answer:
        "There is no automated import. In practice most practices rebuild their two or three most-used checklists as templates, which takes an afternoon, and run new work through ClientGather while existing requests finish where they are.",
    },
    {
      question: "Do my clients need an account?",
      answer:
        "No. Recipients open a secure portal link, fill in what you asked for with autosave as they go, and never create a login or a password. Clients and recipients are unlimited on every plan.",
    },
    {
      question: "Is ClientGather cheaper than Content Snare?",
      answer:
        "At the entry level they are close: £25 a month billed annually against US$35, both for 20 active requests and 2 users, with Content Snare including more storage. The reason to choose on price alone is weak — choose on where the files sit and who needs to read them.",
    },
    {
      question: "What happens when I hit the active-request limit?",
      answer:
        "You cannot send a new request until a slot frees up. Closing requests you have finished frees them at no cost, and you can add packs of 50 during a busy month and drop them again afterwards.",
    },
  ],
}

const fileInvite: Competitor = {
  slug: "fileinvite",
  name: "FileInvite",
  headline: "ClientGather vs FileInvite",
  description:
    "FileInvite is priced and built for lending operations. A look at what changes when the practice collecting the documents has two to twenty people.",
  answer:
    "FileInvite is aimed at lenders, with a Standard plan starting at US$9,900 a year. ClientGather is built for UK practices of two to twenty people — immigration advisers, brokers, formation agents and accountants — starting at £25 a month, with data stored in the UK — our own servers in Erith, uploaded files in Bunny.net's London zone — and free read-only seats for whoever reviews the work.",
  checkedOn: "2026-08-16",
  intro: [
    "FileInvite and ClientGather solve the same surface problem — clients send documents late, in the wrong format, across too many emails — but they are pointed at different buyers. FileInvite's published Standard plan is sized for lenders processing up to a hundred commercial loans a year. If that is you, it is a serious tool and this page will not talk you out of it.",
    "If you are a two to twenty person UK practice, the gap is mostly one of scale and price, and that is what this page covers.",
  ],
  rows: [
    {
      capability: "Entry price",
      ours: "£25/month billed annually (€29 charged), 14-day trial with no card.",
      theirs:
        "Standard plan from US$9,900 a year. Enterprise pricing is quote-only.",
      source: {
        label: "FileInvite pricing page",
        url: "https://www.fileinvite.com/pricing",
      },
    },
    {
      capability: "Who it is sized for",
      ours: "Practices of 2 to 20 people: immigration advisers, brokers, formation agents and accountants.",
      theirs:
        "The Standard plan is described as being for lenders processing up to 100 typical commercial loans a year.",
      source: {
        label: "FileInvite pricing page",
        url: "https://www.fileinvite.com/pricing",
      },
    },
    {
      capability: "Where your files are stored",
      ours: OUR_STORAGE,
      theirs:
        "Amazon S3. Enterprise customers may optionally select a geographic data region.",
      source: {
        label: "FileInvite security page",
        url: "https://www.fileinvite.com/security",
      },
    },
    {
      capability: "Malware scanning on upload",
      ours: OUR_SCANNING,
      theirs: "Not mentioned on their security page.",
      source: {
        label: "FileInvite security page",
        url: "https://www.fileinvite.com/security",
      },
    },
    {
      capability: "Read-only seats for a compliance reviewer",
      ours: OUR_AUDITOR,
      theirs: "Read-only or auditor roles are not mentioned on their security page.",
      source: {
        label: "FileInvite security page",
        url: "https://www.fileinvite.com/security",
      },
    },
    {
      capability: "Starter templates for UK regulated work",
      ours: OUR_TEMPLATES,
      theirs:
        "Reusable templates are offered; UK route-specific or Companies House packs are not described on the pricing page.",
      source: {
        label: "FileInvite pricing page",
        url: "https://www.fileinvite.com/pricing",
      },
    },
  ],
  sections: [
    {
      heading: "The price is the honest headline",
      paragraphs: [
        "FileInvite publishes a Standard plan starting at US$9,900 a year, sized for lenders processing up to a hundred commercial loans annually. That is a rational price for a lending operation where a single delayed file costs more than the software.",
        "ClientGather starts at £25 a month billed annually and tops out at £209 for the Scale plan. The plans differ by how much work you have in flight and how many people work on it, and every one of them includes the template builder, the client portal, the review queue, unlimited clients, and unlimited emails and reminders.",
      ],
    },
    {
      heading: "What a small practice actually needs",
      paragraphs: [
        "At two to twenty people the bottleneck is not throughput, it is chasing. One person sends the request, the client half-fills it, and a fortnight goes by before anyone notices the third bank statement is the wrong month.",
        "ClientGather is built around that: per-item approve and reject with a comment thread the client answers in the same portal, so one gap reopens one item rather than the whole bundle; repeating blocks for dependants, directors and security properties; recurring schedules for the work that comes round every year; and an archive PDF plus a bulk ZIP export when the file needs to leave.",
      ],
      bullets: [
        "Free read-only Auditor logins for the person who checks the work.",
        "Files stored in the UK, scanned before they are stored.",
        "Eleven UK starter packs, so the first request is an edit rather than a blank page.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does ClientGather do e-signatures?",
      answer:
        "No. ClientGather collects documents and information; it is not an electronic signature service. Practices that need signatures run them in a dedicated tool alongside, and connect the two through Zapier or the API.",
    },
    {
      question: "Do my clients need an account?",
      answer:
        "No. Recipients open a secure portal link, fill in what you asked for with autosave as they go, and never create a login. Clients and recipients are unlimited on every plan.",
    },
    {
      question: "Can I bring my own storage?",
      answer:
        "Yes, on the Scale plan. Point ClientGather at your own S3 bucket and files are written to storage you control, without counting against the plan's storage limit.",
    },
    {
      question: "What does the trial include?",
      answer:
        "The full product for 14 days, with 5 active requests, 2 users and 1 GB of storage, and no card needed to start. That runs several real requests end to end.",
    },
  ],
}

export const COMPETITORS: Competitor[] = [contentSnare, fileInvite]

export function getCompetitorBySlug(slug: string): Competitor | undefined {
  return COMPETITORS.find((competitor) => competitor.slug === slug)
}
