import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogPostPage } from "@/components/blog/blog-post-page"
import { BLOG_POSTS, getPostBySlug } from "@/components/blog/posts"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return {}

  const title = `${post.title} — ClientGather`

  return {
    title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedDate,
    },
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return <BlogPostPage post={post} />
}
