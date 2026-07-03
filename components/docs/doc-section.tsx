import * as React from "react"

import { cn } from "@/lib/utils"

type DocSectionProps = {
  id: string
  eyebrow?: string
  title: string
  children: React.ReactNode
}

export function DocSection({ id, eyebrow, title, children }: DocSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-border/60 py-10 first:border-t-0 first:pt-0"
    >
      {eyebrow ? (
        <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
          eyebrow && "mt-3"
        )}
      >
        {title}
      </h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  )
}

export function DocSubheading({
  id,
  children,
}: {
  id?: string
  children: React.ReactNode
}) {
  return (
    <h3
      id={id}
      className="scroll-mt-28 pt-2 text-sm font-semibold tracking-tight text-foreground"
    >
      {children}
    </h3>
  )
}

export function DocParagraph({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-7 text-muted-foreground">{children}</p>
}
