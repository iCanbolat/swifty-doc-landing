import { PLANS } from "@/lib/pricing"
import { SITE_NAME, SITE_URL } from "@/lib/site"

/**
 * Entity graph for the home page. The three types answer three different
 * questions a crawler asks and none of them substitutes for another: who
 * publishes this site (Organization), what the site itself is (WebSite), and
 * what the thing being sold is (SoftwareApplication). They are emitted as one
 * @graph so the nodes can reference each other by @id instead of repeating the
 * publisher inline three times.
 *
 * Offers mirror `PLANS` rather than restating prices, so a price change in one
 * place cannot leave the markup advertising a number nobody is charged — the
 * same reason `lib/pricing.ts` derives pounds from euros.
 */
export function HomeStructuredData() {
  const organizationId = `${SITE_URL}/#organization`
  const websiteId = `${SITE_URL}/#website`

  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description:
        "Document collection software for professional services firms: request templates, secure client portal links, a review queue, and organized storage.",
      areaServed: "GB",
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en-GB",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      description:
        "Build request templates, share secure portal links, review submissions, and keep every file in one place.",
      publisher: { "@id": organizationId },
      // Creem charges in EUR, so the markup states EUR — quoting the derived
      // pound figure here would advertise a currency no card is debited in.
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price,
        priceCurrency: "EUR",
        category: "SubscriptionService",
        url: `${SITE_URL}/#pricing`,
      })),
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  )
}
