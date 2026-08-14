import { BellRing, CalendarClock, Check, Mail } from "lucide-react"

import { Badge } from "@/components/ui/badge"

/** The five strategies the product actually offers. */
const STRATEGIES = [
  "None",
  "3 days before",
  "5 days before",
  "Weekly",
  "Every 3 days",
] as const

const SELECTED = "Weekly"

type SentReminder = { date: string; label: string; sent: boolean }

const TIMELINE: SentReminder[] = [
  { date: "Jun 20", label: "Reminder sent to 2 recipients", sent: true },
  { date: "Jun 27", label: "Reminder sent to 1 recipient", sent: true },
  { date: "Jul 4", label: "Next reminder scheduled", sent: false },
]

export function ReminderScheduleMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <BellRing className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Reminders</p>
            <p className="text-[0.65rem] text-muted-foreground">
              DOC-2024-014
            </p>
          </div>
        </div>
        <Badge variant="outline">
          <Mail className="size-3" />
          Email
        </Badge>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between border border-border/60 bg-background/60 px-3 py-2.5">
          <span className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
            <CalendarClock className="size-3.5" />
            Due date
          </span>
          <span className="text-[0.7rem] font-medium text-foreground">
            11 July 2026
          </span>
        </div>

        <div>
          <p className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
            Reminder strategy
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {STRATEGIES.map((strategy, index) => (
              <span
                key={strategy}
                className={`reveal-item border px-2 py-1 text-[0.65rem] [--reveal-from:scale(0.94)] ${
                  strategy === SELECTED
                    ? "border-primary/20 bg-primary/10 font-medium text-primary"
                    : "border-border/60 bg-background/60 text-muted-foreground"
                }`}
                style={
                  { "--reveal-delay": `${index * 0.06}s` } as React.CSSProperties
                }
              >
                {strategy}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          {TIMELINE.map((entry, index) => (
            <div
              key={entry.date}
              className="reveal-item flex items-center gap-3 border border-border/60 bg-background/60 px-3 py-2 [--reveal-from:translateY(10px)]"
              style={
                {
                  "--reveal-delay": `${0.3 + index * 0.08}s`,
                } as React.CSSProperties
              }
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center border ${
                  entry.sent
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
                    : "border-border/60 bg-card text-muted-foreground"
                }`}
              >
                {entry.sent ? (
                  <Check className="size-3" />
                ) : (
                  <CalendarClock className="size-3" />
                )}
              </span>
              <span className="flex-1 text-[0.7rem] text-foreground">
                {entry.label}
              </span>
              <span className="shrink-0 text-[0.65rem] text-muted-foreground">
                {entry.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
