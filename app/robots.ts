import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"

/**
 * A missing robots.txt already means "crawl everything", so this exists for the
 * sitemap line: it is how a crawler that has never seen Search Console finds
 * the URL list.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
