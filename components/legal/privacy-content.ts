import type { LegalDocument } from "./types";

/**
 * DRAFT — requires review by qualified counsel before launch.
 *
 * The operator name and address here must stay identical to the business
 * details registered with Creem: a mismatch is a documented review rejection.
 * Update both sides in the same change, and bump `version` with the API's
 * CURRENT_LEGAL_VERSIONS when the wording changes materially.
 */
export const PRIVACY_DOCUMENT: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  version: "2026-08-14",
  effectiveDate: "14 August 2026",
  intro:
    "This policy explains what personal data ClientGather handles, why, for how long, and what rights you have. It covers both our customers and the recipients who complete forms through the portal.",
  sections: [
    {
      heading: "1. Who is responsible for your data",
      paragraphs: [
        "Your data is stored in the United Kingdom. ClientGather is operated by Fatih M. Canbolat, a sole trader based in Türkiye, at Soğanlık Yeni Mah., Kartal, İstanbul, Türkiye; section 10 sets out exactly which data crosses a border, where to, and on what safeguard.",
        "For privacy questions contact contact@clientgather.com. We are a small operation and are not required to appoint a statutory data protection officer; requests are handled directly by the owner, who answers within one month.",
        "We act as controller for the data we need to run the business: your account, your organization, billing, support correspondence and security logs.",
        "We act as processor for the information our customers collect from their own clients through ClientGather — form answers, uploaded files, recipient names and email addresses. The customer decides what to ask for and why; we process it on their instructions. If you are a recipient and want your information corrected or deleted, contact the organization that sent you the request; we will support them in responding.",
      ],
    },
    {
      heading: "2. What we collect",
      paragraphs: ["Depending on how you use ClientGather, this can include:"],
      bullets: [
        "Account data — name, email address, password hash or linked Google identity, locale, timezone, profile photo, and the record of your acceptance of our terms.",
        "Organization and billing data — organization and workspace names, legal name, phone, region, plan, subscription and payment status. Card details are handled by Creem, our payment provider and merchant of record, and never reach our servers.",
        "Client and recipient data — the client records you create and the recipient names and email addresses you enter in order to send a request.",
        "Submission content — the answers recipients give and the files they upload, together with comments, review decisions and the change history of each answer.",
        "Portal session data — records of secure links issued, when they were opened, when they expire and when they were revoked.",
        "Technical and audit data — request logs, security and audit events, the result of the malware scan run on each uploaded file, error diagnostics, and webhook or integration delivery records.",
        "Support data — the messages you send us and our replies.",
      ],
    },
    {
      heading: "3. Why we process it, and on what basis",
      paragraphs: [
        "To provide the service and perform our contract with you: creating and running your account, delivering requests, storing submissions, producing exports and archive documents, and taking payment.",
        "For our legitimate interests: keeping the service secure, preventing abuse and fraud, diagnosing faults, maintaining audit trails, and improving the product. We balance these against your rights and use the least intrusive option that works.",
        "To comply with legal obligations: tax and accounting records, and responding to lawful requests from authorities.",
        "With consent, where consent is the right basis — for example, optional product communications. You can withdraw consent at any time.",
        "As a processor for customer content, we act only on the instructing customer's documented instructions and on the terms of our agreement with them.",
      ],
    },
    {
      heading: "4. Recipients who do not have an account",
      paragraphs: [
        "Recipients complete forms without registering. Access is granted by a secure, unguessable link sent to the recipient's email address, exchanged on first use for a short-lived session that expires after a period of inactivity.",
        "We record when a link is issued, opened, expires and is revoked, so the sending organization has a reliable trail of who was given access and when. The organization can revoke a link at any moment, which ends every active session on it immediately.",
        "We do not use recipient data for our own marketing, and we do not build profiles of recipients.",
      ],
    },
    {
      heading: "5. Collaborative forms",
      paragraphs: [
        "Some requests are collaborative: several people fill in one shared form. Everyone listed as a participant on that form can see and edit every answer and file in it, and while live presence is enabled they can see who else is online and which field they are editing.",
        "This is by design. The organization sending the request decides who participates and is responsible for only inviting people who are entitled to see each other's information.",
      ],
    },
    {
      heading: "6. How we protect it",
      paragraphs: [
        "Data is encrypted in transit. Uploaded files and sensitive submission answers are additionally encrypted at rest under keys we manage and rotate.",
        "Every file uploaded to ClientGather is scanned for malware before it is stored, using an antivirus engine that runs on our own infrastructure — the file itself is never sent to a third-party scanning service. A file that fails the scan is rejected at upload and never reaches storage; we keep a record that it was blocked, with its name, size and the name of the signature that matched, but not its contents. Scanning detects known malware and is not a guarantee that a file is safe.",
        "Portal sessions are held in cookies that JavaScript cannot read, are bound to a server-side session record, and are invalidated the moment the underlying link is revoked or expires. Download links for stored files are individually signed and short-lived.",
        "Access inside our systems is limited to staff who need it, every organization's data is isolated by tenant on every query, and significant actions are written to an audit log.",
        "No system is perfectly secure. If a breach affects your personal data and is likely to present a risk to you, we will notify the relevant supervisory authority within 72 hours where required, and notify you without undue delay where the risk is high.",
      ],
    },
    {
      heading: "7. How long we keep it",
      paragraphs: [
        "Submission content and files are kept for as long as the sending organization keeps them, and are deleted when the organization deletes them or closes its account.",
        "Account and organization data is deleted 30 days after an account is closed, except where we must keep billing records for statutory periods.",
        "Security and business audit events are retained for 180 days; low-value operational events are retained for 60 days.",
        "Generated export archives are deleted 24 hours after they are produced; the record that an export happened is retained for the audit period.",
        "Portal links expire automatically after a period of inactivity, and their session records are retained with the request they belong to.",
      ],
    },
    {
      heading: "8. Who we share it with",
      paragraphs: [
        "We do not sell personal data and we do not share it for advertising.",
        "If you connect an integration — for example cloud storage, an automation platform, or your own systems via webhooks or our API — data leaves ClientGather at your instruction and is then governed by that provider's terms.",
        "We may disclose data where legally required, and we may transfer it as part of a merger, acquisition or asset sale, in which case we will tell you before it becomes subject to a different policy.",
        "Otherwise, the only third parties that touch your data are the service providers listed in the next section, each of which processes it on our behalf under contract.",
      ],
    },
    {
      heading: "9. Our service providers and where data is stored",
      paragraphs: [
        "ClientGather runs on servers in the United Kingdom. This is the complete list of providers involved:",
      ],
      bullets: [
        "OVHcloud — the servers and database that run ClientGather, hosted in the United Kingdom (Erith, London). Your account data, client records, submissions and audit logs live here.",
        "Bunny.net (BunnyWay d.o.o., Slovenia) — object storage and content delivery for uploaded files.",
        "Resend (United States) — delivery of transactional email, including the secure links sent to recipients. Receives recipient names, email addresses and message content.",
        "Creem (Armitage Labs OÜ, Telliskivi 57b/1, 10412 Tallinn, Estonia) — payment processing and merchant of record. Receives your name, email address, billing country and subscription details, and is an independent controller for the payment data it holds under its own privacy policy.",
      ],
    },
    {
      heading: "10. International transfers",
      paragraphs: [
        "Data is stored in the United Kingdom, but ClientGather is operated from Türkiye and two of our providers are outside the UK, so some transfers do take place. We set them out plainly rather than in general terms.",
        "Access from Türkiye: as the operator, we access the systems above from Türkiye in order to run and support the service. Türkiye is not covered by a UK or EU adequacy decision.",
        "Providers outside the UK: Bunny.net processes data in the EEA, which the UK recognises as adequate. Resend processes data in the United States.",
        "Where a transfer is not covered by an adequacy decision we rely on the UK International Data Transfer Addendum or the EU standard contractual clauses, together with supplementary measures — encryption in transit, encryption at rest for uploaded files and sensitive answers, access limited to the owner, and audit logging. Copies of the clauses we rely on are available on request at contact@clientgather.com.",
      ],
    },
    {
      heading: "11. Your rights",
      paragraphs: [
        "Subject to local law, you may request access to your personal data, correction of inaccurate data, deletion, restriction of processing, portability, and you may object to processing based on legitimate interests. Where processing is based on consent you can withdraw it at any time.",
        "Write to contact@clientgather.com. We respond within one month and may ask you to verify your identity. If you are a recipient, contact the organization that sent you the request first — they control that data.",
        "If you believe we have handled your data improperly you may complain to the data protection authority for the country where you live. In the United Kingdom this is the Information Commissioner's Office (ico.org.uk); in the EEA it is your national supervisory authority; in Türkiye it is the Kişisel Verileri Koruma Kurumu (kvkk.gov.tr).",
      ],
    },
    {
      heading: "12. Cookies",
      paragraphs: [
        "We use only cookies that are necessary to run the service. We do not use advertising or cross-site tracking cookies.",
      ],
      bullets: [
        "A session cookie that keeps you signed in to the application and lets you renew your session.",
        "A portal session cookie (swd_portal_token) that keeps a recipient signed in to their form; it is restricted to the portal endpoints, cannot be read by scripts, and expires with the session.",
        "Preference values stored in your browser, such as the plan you selected before signing up, which never leave your device unless you submit them.",
      ],
    },
    {
      heading: "13. Children",
      paragraphs: [
        "ClientGather is a business tool and is not directed at children. We do not knowingly collect data from anyone under 16 in a personal capacity. If you believe a child's data has reached us, contact contact@clientgather.com and we will remove it.",
      ],
    },
    {
      heading: "14. Changes to this policy",
      paragraphs: [
        "We may update this policy. Each version carries a version identifier and effective date. Where a change materially affects how we handle your data we will notify you and, where the law requires it, ask for your acceptance before it applies.",
      ],
    },
    {
      heading: "15. Contact",
      paragraphs: [
        "Privacy questions, data subject requests and security reports: contact@clientgather.com. Product support and billing: support@clientgather.com. Postal address: Fatih M. Canbolat, Soğanlık Yeni Mah., Kartal, İstanbul, Türkiye.",
      ],
    },
  ],
};
