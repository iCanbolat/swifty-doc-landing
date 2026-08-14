import { Link2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type Recipient = {
  name: string
  email: string
  state: "In progress" | "Opened" | "Not opened"
}

const MODES = ["Individual", "Collaborative"] as const
const SELECTED_MODE = "Collaborative"

const RECIPIENTS: Recipient[] = [
  { name: "Nadia Okafor", email: "nadia@acme.co", state: "In progress" },
  { name: "Liam Chen", email: "liam@acme.co", state: "Opened" },
  { name: "Priya Raman", email: "priya@ravenlaw.co.uk", state: "Not opened" },
]

const STATE_VARIANT = {
  "In progress": "info",
  Opened: "success",
  "Not opened": "outline",
} as const

export function RecipientsMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center border border-border/70 bg-primary/10 text-primary">
            <Users className="size-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-foreground">Recipients</p>
            <p className="text-[0.65rem] text-muted-foreground">
              DOC-2026-031 · 3 people
            </p>
          </div>
        </div>
        <Badge variant="info">Collaborative</Badge>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
            Submission mode
          </p>
          <div className="mt-2 flex gap-1.5">
            {MODES.map((mode) => (
              <span
                key={mode}
                className={`border px-2.5 py-1 text-[0.65rem] ${
                  mode === SELECTED_MODE
                    ? "border-primary/20 bg-primary/10 font-medium text-primary"
                    : "border-border/60 bg-background/60 text-muted-foreground"
                }`}
              >
                {mode}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          {RECIPIENTS.map((recipient, index) => (
            <div
              key={recipient.email}
              className="reveal-item flex items-center gap-3 border border-border/60 bg-background/60 px-3 py-2.5 [--reveal-from:translateY(12px)]"
              style={
                { "--reveal-delay": `${index * 0.09}s` } as React.CSSProperties
              }
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[0.6rem] font-semibold text-primary">
                {recipient.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.7rem] font-medium text-foreground">
                  {recipient.name}
                </p>
                <p className="flex items-center gap-1 truncate text-[0.65rem] text-muted-foreground">
                  <Link2 className="size-2.5 shrink-0" />
                  own portal link
                </p>
              </div>
              <Badge variant={STATE_VARIANT[recipient.state]}>
                {recipient.state}
              </Badge>
            </div>
          ))}
        </div>

        <p className="text-[0.65rem] leading-5 text-muted-foreground">
          Each person gets their own link. Live presence and cursors are
          available on Growth and Scale.
        </p>
      </div>
    </div>
  )
}
