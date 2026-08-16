import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComparePage } from "@/components/compare/compare-page"
import { COMPETITORS, getCompetitorBySlug } from "@/components/compare/competitors"

type PageProps = { params: Promise<{ competitor: string }> }

export function generateStaticParams() {
  return COMPETITORS.map((competitor) => ({ competitor: competitor.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { competitor: slug } = await params
  const competitor = getCompetitorBySlug(slug)

  if (!competitor) return {}

  const title = `${competitor.headline} — ClientGather`

  return {
    title,
    description: competitor.description,
    alternates: { canonical: `/compare/${competitor.slug}` },
    openGraph: {
      title,
      description: competitor.description,
      type: "website",
    },
  }
}

export default async function CompareDetailPage({ params }: PageProps) {
  const { competitor: slug } = await params
  const competitor = getCompetitorBySlug(slug)

  if (!competitor) notFound()

  return <ComparePage competitor={competitor} />
}
