import { FileStack, Inbox, Link2, ShieldCheck } from "lucide-react"

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

const STEPS = [
  {
    icon: FileStack,
    title: "Build a template",
    body: "Draft sections and fields, then publish a version your team can send.",
  },
  {
    icon: Link2,
    title: "Send a portal link",
    body: "Pick a client and recipients, set a due date, and send a secure portal link by email.",
  },
  {
    icon: Inbox,
    title: "Recipient submits",
    body: "They fill out the secure portal with autosave — no login, no friction.",
  },
  {
    icon: ShieldCheck,
    title: "Review & store",
    body: "Approve answers, request changes, and every file is filed automatically.",
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-y border-border/60 bg-[radial-gradient(circle_at_top,rgba(70,50,229,0.06),transparent_45%)] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
            How it works
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Live in four steps
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <StaggerItem key={step.title}>
              <div className="group relative h-full border border-border/70 bg-card/80 p-5 ring-1 ring-foreground/10 transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center border border-border/70 bg-primary/10 text-primary">
                    <step.icon className="size-4" />
                  </span>
                  <span className="text-2xl font-semibold text-foreground/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
