import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { NichePage } from "@/components/for/niche-page"
import { getNicheBySlug, NICHES } from "@/components/for/niches"

type PageProps = { params: Promise<{ niche: string }> }

export function generateStaticParams() {
  return NICHES.map((niche) => ({ niche: niche.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { niche: slug } = await params
  const niche = getNicheBySlug(slug)

  if (!niche) return {}

  const title = `${niche.headline} — ClientGather`

  return {
    title,
    description: niche.description,
    alternates: { canonical: `/for/${niche.slug}` },
    openGraph: {
      title,
      description: niche.description,
      type: "website",
    },
  }
}

export default async function NicheLandingPage({ params }: PageProps) {
  const { niche: slug } = await params
  const niche = getNicheBySlug(slug)

  if (!niche) notFound()

  return <NichePage niche={niche} />
}
