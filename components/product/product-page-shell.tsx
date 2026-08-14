import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { ButtonLink } from "@/components/ui/button"
import { buildBootstrapOwnerUrl } from "@/lib/app-links"

type ProductPageShellProps = {
  eyebrow: string
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}

/**
 * Intro band only — no hero visual. The first FeatureSection below already
 * carries this feature's mock, so a hero mock rendered it twice in a row.
 * Centered to match the Features section intro on the home page.
 */
export function ProductPageShell({
  eyebrow,
  icon: Icon,
  title,
  description,
  children,
}: ProductPageShellProps) {
  return (
    <>
      <Navbar />
      {/* Navbar is fixed — pages clear it themselves. */}
      <main className="pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl px-6 text-center lg:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white px-3 py-1.5 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
              <Icon className="size-3.5 text-primary" />
              {eyebrow}
            </div>
            <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-md leading-7 text-muted-foreground">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink
                href={buildBootstrapOwnerUrl("foundation")}
                size="hero"
                className="rounded-full"
              >
                Start 14-day trial
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href="/#pricing"
                size="hero"
                variant="outline"
                className="rounded-full"
              >
                See pricing
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {children}
      </main>
      <CTA />
      <Footer />
    </>
  )
}
