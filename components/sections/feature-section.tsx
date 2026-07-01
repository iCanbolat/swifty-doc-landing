import type { LucideIcon } from "lucide-react"
import { Check } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"

export type FeatureSectionProps = {
  id?: string
  eyebrow: string
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
  mock: React.ReactNode
  /** Place the mock on the left (desktop) for an alternating rhythm. */
  reverse?: boolean
}

export function FeatureSection({
  id,
  eyebrow,
  icon: Icon,
  title,
  description,
  bullets,
  mock,
  reverse = false,
}: FeatureSectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className={cn(reverse && "lg:order-2")}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
            <Icon className="size-3.5 text-primary" />
            {eyebrow}
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
            {description}
          </p>
          <ul className="mt-6 space-y-2.5">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-xs text-foreground/90"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700">
                  <Check className="size-2.5" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
          {mock}
        </Reveal>
      </div>
    </section>
  )
}
