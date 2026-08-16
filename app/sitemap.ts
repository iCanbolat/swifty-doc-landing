import type { MetadataRoute } from "next"

import { BLOG_POSTS } from "@/components/blog/posts"
import { COMPETITORS } from "@/components/compare/competitors"
import { NICHES } from "@/components/for/niches"
import { SITE_URL } from "@/lib/site"

const STATIC_PATHS = [
  "/",
  "/blog",
  "/product/template-builder",
  "/product/customer-portal",
  "/product/review-queue",
  "/product/storage",
  "/docs/webhooks",
  "/legal/terms",
  "/legal/privacy",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedDate),
    })),
    // `checkedOn` is the day the competitor's own pages were last read, so
    // lastmod moves when the claims are re-verified rather than when the file
    // is touched.
    ...COMPETITORS.map((competitor) => ({
      url: `${SITE_URL}/compare/${competitor.slug}`,
      lastModified: new Date(competitor.checkedOn),
    })),
    // Same idea as the comparison pages: lastmod moves when the claims and the
    // template list were last checked against the app, not when the file moved.
    ...NICHES.map((niche) => ({
      url: `${SITE_URL}/for/${niche.slug}`,
      lastModified: new Date(niche.lastReviewed),
    })),
  ]
}
