import type { Metadata } from "next"

import { CTA } from "@/components/sections/cta"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Pricing } from "@/components/sections/pricing"
import { Footer } from "@/components/site/footer"
import { HomeStructuredData } from "@/components/site/home-structured-data"
import { Navbar } from "@/components/site/navbar"

// Title and description are inherited from the root layout; the canonical is
// not, and without it the home page is the one route that can be indexed under
// a query string or a Cloudflare preview hostname as a separate URL.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
