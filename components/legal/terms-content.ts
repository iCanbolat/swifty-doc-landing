import type { LegalDocument } from "./types";

/**
 * DRAFT — requires review by qualified counsel before launch. Placeholders in
 * square brackets must be filled with the operating entity's real details.
 */
export const TERMS_DOCUMENT: LegalDocument = {
  slug: "terms",
  title: "Terms & Conditions",
  version: "2026-08-09",
  effectiveDate: "9 August 2026",
  intro:
    "These terms govern your use of SwiftyDoc. Please read them before creating an account — by signing up you enter into a binding agreement with us.",
  sections: [
    {
      heading: "1. Who we are and what these terms cover",
      paragraphs: [
        "SwiftyDoc (“SwiftyDoc”, “we”, “us”) is operated by [LEGAL ENTITY NAME], registered at [REGISTERED ADDRESS], company number [COMPANY NUMBER].",
        "These Terms & Conditions, together with our Privacy Policy, form the agreement between you and us for the SwiftyDoc service. If you accept these terms on behalf of an organization, you confirm you are authorised to bind that organization, and “you” means that organization.",
      ],
    },
    {
      heading: "2. The service",
      paragraphs: [
        "SwiftyDoc is a document and information collection platform. You build request templates, send them to your clients, and collect their answers and files through a secure recipient portal. We also provide review, export, reminder, audit and integration features according to your plan.",
        "SwiftyDoc is not an electronic signature service and does not certify, witness or notarise any document. We do not verify the identity of recipients beyond delivering a secure link to the email address you supply.",
      ],
    },
    {
      heading: "3. Accounts, organizations and workspaces",
      paragraphs: [
        "To use SwiftyDoc you create an account and an organization. One user account may own one organization; you may additionally be invited as a member of other organizations.",
        "You are responsible for everything that happens under your account and under your organization, including the actions of the members you invite. Keep your credentials confidential and tell us promptly at [SECURITY CONTACT EMAIL] if you believe an account has been compromised.",
        "Access inside an organization is governed by roles and workspace membership. Assigning a role that grants access to client data is your decision and your responsibility.",
      ],
    },
    {
      heading: "4. Your content",
      paragraphs: [
        "Everything you and your recipients put into SwiftyDoc — templates, answers, uploaded files, comments and client records — remains yours. We claim no ownership over it.",
        "You grant us a limited licence to host, process, transmit, encrypt, back up and display that content strictly to provide the service to you, to keep it secure, and to comply with law.",
        "You are responsible for having the right to collect and share the information you request, and for the lawfulness of what you ask your recipients to provide.",
      ],
    },
    {
      heading: "5. Recipients and secure links",
      paragraphs: [
        "Recipients do not need a SwiftyDoc account. They access their form through a secure, unguessable link sent to the email address you provide. Anyone holding that link can open and complete the form until it expires or you revoke it.",
        "You choose who receives a link. If a link reaches the wrong person — for example because it was forwarded or an address was mistyped — revoke it from the request screen; revocation takes effect immediately across every open session.",
        "Where a request is collaborative, every participant you invite to the same form can see and edit every answer and file in it. Only invite people who are entitled to see each other's information.",
      ],
    },
    {
      heading: "6. Acceptable use",
      paragraphs: [
        "You must not use SwiftyDoc to break the law, to infringe anyone's rights, or to harm the service or its users.",
        "We scan uploaded files for malware and will refuse, or later remove, any file that fails that scan. Repeated attempts to upload malicious content are grounds for suspension under section 12.",
      ],
      bullets: [
        "No unlawful, fraudulent, deceptive, defamatory or harassing content, and no phishing or impersonation of any person or organization.",
        "No malware, and no attempt to probe, scan, overload, reverse engineer or bypass any security or access control of the service.",
        "No collection of information you have no lawful basis to collect, and no use of the recipient portal to send unsolicited bulk messages.",
        "No resale, sublicensing or white-label resupply of the service except where your plan expressly permits it.",
      ],
    },
    {
      heading: "7. Plans, limits and add-ons",
      paragraphs: [
        "Your plan determines your feature set and how many requests you may have open at one time. Additional capacity can be purchased as add-on packs. Some features — for example white-labelling, live collaborative presence and certain storage options — are only available on specific plans.",
        "If you exceed your active request limit, you will not lose data: you will be prevented from opening further requests until you close existing ones or add capacity.",
        "We may change plan contents and pricing. For changes that disadvantage you materially we will give at least 30 days' notice before they apply to your next renewal.",
      ],
    },
    {
      heading: "8. Trial",
      paragraphs: [
        "New organizations may receive a time-limited trial with access to trial-eligible features. We may withdraw or shorten a trial if it is being abused, for example through repeated sign-ups to obtain successive trials.",
        "When a trial ends without a paid subscription, your account moves to a restricted state. Your data is retained for the period described in section 13 so you can export it.",
      ],
    },
    {
      heading: "9. Fees, billing and refunds",
      paragraphs: [
        "Subscription fees are charged in advance for the billing period you select and, unless stated otherwise, are exclusive of VAT and other applicable taxes. Payments are processed by our payment provider; we do not store your full card details.",
        "Subscriptions renew automatically until cancelled. You may cancel at any time and will retain access until the end of the paid period.",
        "Except where required by law, fees already paid are non-refundable. Nothing here affects statutory rights that cannot be excluded.",
      ],
    },
    {
      heading: "10. Third-party services",
      paragraphs: [
        "SwiftyDoc can connect to third-party services such as cloud storage, automation platforms and your own systems through webhooks and our API. Those connections are made at your instruction and are governed by the third party's own terms.",
        "We are not responsible for third-party services, and enabling a connection may cause your content to leave SwiftyDoc. Review what you are authorising before you connect.",
      ],
    },
    {
      heading: "11. Availability, changes and support",
      paragraphs: [
        "We work to keep SwiftyDoc available and secure, but we do not promise uninterrupted service. Maintenance, upgrades and events beyond our reasonable control may cause downtime.",
        "We may add, change or withdraw features. Where a change materially reduces core functionality you rely on, we will give reasonable notice.",
        "Support is provided by email at [SUPPORT EMAIL] during business hours, with response targets depending on your plan.",
      ],
    },
    {
      heading: "12. Suspension and termination",
      paragraphs: [
        "You may stop using SwiftyDoc and close your organization at any time.",
        "We may suspend or terminate access if you materially breach these terms, if fees remain unpaid after notice, if we must do so by law, or if your use puts the service or other customers at risk. Where circumstances allow, we will warn you first and give you an opportunity to fix the problem.",
      ],
    },
    {
      heading: "13. Data export and deletion",
      paragraphs: [
        "You can export your requests, submissions and files at any time while your account is active.",
        "After termination we retain your organization's content for 30 days so you can export it, then delete it, except where we are required to keep records for legal, tax or security reasons. Details of what is kept and for how long are in our Privacy Policy.",
      ],
    },
    {
      heading: "14. Warranties and disclaimers",
      paragraphs: [
        "SwiftyDoc is provided “as is”. To the fullest extent permitted by law we exclude all implied warranties, including fitness for a particular purpose and non-infringement.",
        "We do not warrant that the service will meet any regulatory obligation that applies to you, or that the content you collect will be accurate, complete or legally sufficient for your purposes.",
      ],
    },
    {
      heading: "15. Limitation of liability",
      paragraphs: [
        "Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be limited.",
        "Subject to that, neither party is liable for indirect or consequential loss, loss of profit, revenue, goodwill or anticipated savings, and our total aggregate liability arising out of or in connection with the agreement is limited to the fees you paid us in the 12 months before the event giving rise to the claim.",
      ],
    },
    {
      heading: "16. Indemnity",
      paragraphs: [
        "You will indemnify us against claims, losses and reasonable costs arising from your content, from your use of the service in breach of these terms, or from your failure to hold the rights or lawful basis needed for the information you collect.",
      ],
    },
    {
      heading: "17. Changes to these terms",
      paragraphs: [
        "We may update these terms. When we make a material change we will publish the new version with a new version identifier and, where the change requires it, ask you to accept it the next time you sign in. Continuing to use the service after a non-material change means you accept it.",
      ],
    },
    {
      heading: "18. Governing law and disputes",
      paragraphs: [
        "This agreement is governed by the laws of [GOVERNING LAW JURISDICTION], and the courts of [COURTS / VENUE] have exclusive jurisdiction, without prejudice to any mandatory consumer protections available to you where you live.",
      ],
    },
    {
      heading: "19. Contact",
      paragraphs: [
        "Questions about these terms: [LEGAL CONTACT EMAIL]. Postal address: [REGISTERED ADDRESS].",
      ],
    },
  ],
}
