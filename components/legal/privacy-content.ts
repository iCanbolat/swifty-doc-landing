import type { LegalDocument } from "./types";

/**
 * DRAFT — requires review by qualified counsel before launch. Placeholders in
 * square brackets must be filled with the operating entity's real details.
 */
export const PRIVACY_DOCUMENT: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  version: "2026-08-03",
  effectiveDate: "3 August 2026",
  intro:
    "This policy explains what personal data SwiftyDoc handles, why, for how long, and what rights you have. It covers both our customers and the recipients who complete forms through the portal.",
  sections: [
    {
      heading: "1. Who is responsible for your data",
      paragraphs: [
        "SwiftyDoc is operated by [LEGAL ENTITY NAME], [REGISTERED ADDRESS]. For privacy questions contact [PRIVACY CONTACT EMAIL]. Our data protection contact is [DPO OR RESPONSIBLE PERSON].",
        "We act as controller for the data we need to run the business: your account, your organization, billing, support correspondence and security logs.",
        "We act as processor for the information our customers collect from their own clients through SwiftyDoc — form answers, uploaded files, recipient names and email addresses. The customer decides what to ask for and why; we process it on their instructions. If you are a recipient and want your information corrected or deleted, contact the organization that sent you the request; we will support them in responding.",
      ],
    },
    {
      heading: "2. What we collect",
      paragraphs: ["Depending on how you use SwiftyDoc, this can include:"],
      bullets: [
        "Account data — name, email address, password hash or linked Google identity, locale, timezone, profile photo, and the record of your acceptance of our terms.",
        "Organization and billing data — organization and workspace names, legal name, phone, region, plan, subscription and payment status. Card details are handled by our payment provider and never reach our servers.",
        "Client and recipient data — the client records you create and the recipient names and email addresses you enter in order to send a request.",
        "Submission content — the answers recipients give and the files they upload, together with comments, review decisions and the change history of each answer.",
        "Portal session data — records of secure links issued, when they were opened, when they expire and when they were revoked.",
        "Technical and audit data — request logs, security and audit events, error diagnostics, and webhook or integration delivery records.",
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
        "We use a small number of service providers who process data on our behalf under contract, currently covering email delivery, file storage and content delivery, payment processing, and cloud hosting and infrastructure. The current list is published at [SUBPROCESSOR LIST URL] and we give notice before adding a new one.",
        "If you connect an integration — for example cloud storage, an automation platform, or your own systems via webhooks or our API — data leaves SwiftyDoc at your instruction and is then governed by that provider's terms.",
        "We may disclose data where legally required, and we may transfer it as part of a merger, acquisition or asset sale, in which case we will tell you before it becomes subject to a different policy.",
      ],
    },
    {
      heading: "9. International transfers",
      paragraphs: [
        "Our infrastructure and some of our providers are located in [PRIMARY HOSTING REGION] and other countries. Where personal data leaves your region we rely on an adequacy decision or on standard contractual clauses with appropriate supplementary measures, and we can supply details on request.",
      ],
    },
    {
      heading: "10. Your rights",
      paragraphs: [
        "Subject to local law, you may request access to your personal data, correction of inaccurate data, deletion, restriction of processing, portability, and you may object to processing based on legitimate interests. Where processing is based on consent you can withdraw it at any time.",
        "Write to [PRIVACY CONTACT EMAIL]. We respond within one month and may ask you to verify your identity. If you are a recipient, contact the organization that sent you the request first — they control that data.",
        "If you believe we have handled your data improperly you may complain to your local supervisory authority. In [SUPERVISORY AUTHORITY JURISDICTION] this is [SUPERVISORY AUTHORITY NAME].",
      ],
    },
    {
      heading: "11. Cookies",
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
      heading: "12. Children",
      paragraphs: [
        "SwiftyDoc is a business tool and is not directed at children. We do not knowingly collect data from anyone under 16 in a personal capacity. If you believe a child's data has reached us, contact [PRIVACY CONTACT EMAIL] and we will remove it.",
      ],
    },
    {
      heading: "13. Changes to this policy",
      paragraphs: [
        "We may update this policy. Each version carries a version identifier and effective date. Where a change materially affects how we handle your data we will notify you and, where the law requires it, ask for your acceptance before it applies.",
      ],
    },
    {
      heading: "14. Contact",
      paragraphs: [
        "Privacy questions: [PRIVACY CONTACT EMAIL]. Security reports: [SECURITY CONTACT EMAIL]. Postal address: [REGISTERED ADDRESS].",
      ],
    },
  ],
}
