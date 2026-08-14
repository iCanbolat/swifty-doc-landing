import { CalendarSync, FileStack, Repeat2, Send } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type SentRequest = { code: string; client: string; sent: string }

/** Frequency values mirror the API enum: weekly | monthly, with a day-of-month. */
const SCHEDULE = {
  template: "Client onboarding pack",
  version: "v2",
  frequency: "Monthly, on day 1",
  nextRun: "1 Sep 2026",
}

const SENT: SentRequest[] = [
  { code: "DOC-2026-031", client: "Acme Holdings", sent: "1 Aug" },
  { code: "DOC-2026-024", client: "Northwind Ltd", sent: "1 Jul" },
  { code: "DOC-2026-017", client: "Orbit Group", sent: "1 Jun" },
]

export function ScheduleReuseMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
          <Repeat2 className="size-3" />
          Recurring schedule
        </div>
        <Badge variant="success">Active</Badge>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 border border-border/60 bg-background/60 px-3 py-2.5">
            <span className="flex size-7 shrink-0 items-center justify-center border border-border/70 bg-primary/10 text-primary">
              <FileStack className="size-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.7rem] font-medium text-foreground">
                {SCHEDULE.template}
              </p>
              <p className="text-[0.65rem] text-muted-foreground">
                Published {SCHEDULE.version}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border border-border/60 bg-background/60 px-3 py-2">
            <span className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
              <CalendarSync className="size-3.5" />
              Repeats
            </span>
            <span className="text-[0.7rem] font-medium text-foreground">
              {SCHEDULE.frequency}
            </span>
          </div>

          <div className="flex items-center justify-between border border-border/60 bg-background/60 px-3 py-2">
            <span className="text-[0.7rem] text-muted-foreground">Next run</span>
            <span className="text-[0.7rem] font-medium text-foreground">
              {SCHEDULE.nextRun}
            </span>
          </div>
        </div>

        <div>
          <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
            Sent from this template
          </p>
          <div className="mt-2 space-y-1.5">
            {SENT.map((request, index) => (
              <div
                key={request.code}
                className="reveal-item flex items-center gap-3 border border-border/60 bg-background/60 px-3 py-2 [--reveal-from:translateY(10px)]"
                style={
                  { "--reveal-delay": `${index * 0.09}s` } as React.CSSProperties
                }
              >
                <span className="flex size-5 shrink-0 items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-700">
                  <Send className="size-2.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-[0.65rem] text-foreground">
                    {request.code}
                  </span>
                  <span className="block truncate text-[0.65rem] text-muted-foreground">
                    {request.client}
                  </span>
                </span>
                <span className="shrink-0 text-[0.65rem] text-muted-foreground">
                  {request.sent}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
