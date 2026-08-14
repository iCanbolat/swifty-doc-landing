import { ScrollText } from "lucide-react"

import { Badge } from "@/components/ui/badge"

/** Categories mirror the API's audit log: security, data access, webhook, queue, system. */
type Category = "Security" | "Data access" | "Webhook" | "System"

type Entry = {
  actor: string
  action: string
  category: Category
  time: string
}

const ENTRIES: Entry[] = [
  {
    actor: "Priya Raman",
    action: "Approved 4 items on DOC-2026-031",
    category: "Data access",
    time: "11:20",
  },
  {
    actor: "Sam Idris",
    action: "Passed two-factor challenge",
    category: "Security",
    time: "09:02",
  },
  {
    actor: "Nadia Okafor",
    action: "Downloaded export DOC-2026-024.zip",
    category: "Data access",
    time: "Yesterday",
  },
  {
    actor: "Sam Idris",
    action: "Changed Liam Chen to workspace reviewer",
    category: "Security",
    time: "Yesterday",
  },
  {
    actor: "System",
    action: "Delivered request.completed to 1 endpoint",
    category: "Webhook",
    time: "2 days ago",
  },
]

const CATEGORY_VARIANT = {
  Security: "warning",
  "Data access": "info",
  Webhook: "secondary",
  System: "outline",
} as const

export function AuditLogMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <ScrollText className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Audit log</p>
            <p className="text-[0.65rem] text-muted-foreground">
              Acme Holdings workspace
            </p>
          </div>
        </div>
        <Badge variant="outline">180-day retention</Badge>
      </div>

      <div className="space-y-1.5 p-5">
        {ENTRIES.map((entry, index) => (
          <div
            key={entry.action}
            className="reveal-item flex items-start gap-3 border border-border/60 bg-background/60 px-3 py-2.5 [--reveal-from:translateY(10px)]"
            style={
              { "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties
            }
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.55rem] font-semibold text-primary">
              {entry.actor === "System"
                ? "·"
                : entry.actor
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.7rem] leading-5 text-foreground">
                {entry.action}
              </p>
              <p className="text-[0.6rem] text-muted-foreground">
                {entry.actor} · {entry.time}
              </p>
            </div>
            <Badge variant={CATEGORY_VARIANT[entry.category]}>
              {entry.category}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
