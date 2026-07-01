import { CTA } from "@/components/sections/cta"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Pricing } from "@/components/sections/pricing"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"

export default function HomePage() {
  return (
    <>
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
