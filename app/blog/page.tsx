import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { BLOG_POSTS } from "@/components/blog/posts"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Blog — ClientGather",
  description:
    "Practical guides to collecting client documents in UK professional services — immigration advice, specialist finance, R&D tax relief and company formation.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — ClientGather",
    description:
      "Practical guides to collecting client documents in UK professional services.",
    type: "website",
  },
}

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-4 lg:px-8 lg:pt-36">
        <Reveal>
          <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
            Blog
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Document collection, by profession
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            Every practice chases the same bundle of documents over and over, and
            every profession chases a different bundle. These guides work through
            what that looks like in practice — the workflow that breaks, and what
            replaces it.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <a href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full transition-colors hover:ring-foreground/25">
                  <CardHeader>
                    <Badge variant="outline">{post.niche}</Badge>
                    <h2 className="mt-2 text-base font-semibold tracking-tight text-foreground">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4">
                    <p className="text-sm leading-7 text-muted-foreground">
                      {post.description}
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      {post.readingMinutes} min read
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </CardContent>
                </Card>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </main>
      <CTA />
      <Footer />
    </>
  )
}
