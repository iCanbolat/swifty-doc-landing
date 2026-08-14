import type { MetadataRoute } from "next"

import { BLOG_POSTS } from "@/components/blog/posts"
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
  ]
}
