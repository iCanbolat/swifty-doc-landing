import { ListFilter, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type Filter = { label: string; count: number; active?: boolean }
type QueueRow = {
  request: string
  client: string
  outstanding: string
  state: "Pending" | "Changes requested"
}

const STATUS_FILTERS: Filter[] = [
  { label: "All", count: 24 },
  { label: "Pending", count: 9, active: true },
  { label: "Approved", count: 11 },
  { label: "Rejected", count: 4 },
]

const CLIENT_FILTERS: Filter[] = [
  { label: "Acme Holdings", count: 6, active: true },
  { label: "Northwind Ltd", count: 3 },
  { label: "Orbit Group", count: 5 },
]

const ROWS: QueueRow[] = [
  {
    request: "DOC-2024-014",
    client: "Acme Holdings",
    outstanding: "2 open questions",
    state: "Changes requested",
  },
  {
    request: "DOC-2024-018",
    client: "Acme Holdings",
    outstanding: "4 items awaiting review",
    state: "Pending",
  },
  {
    request: "DOC-2024-021",
    client: "Acme Holdings",
    outstanding: "1 item awaiting review",
    state: "Pending",
  },
]

const STATE_VARIANT = {
  Pending: "info",
  "Changes requested": "warning",
} as const

function FilterRow({ label, filters }: { label: string; filters: Filter[] }) {
  return (
    <div>
      <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {filters.map((filter) => (
          <span
            key={filter.label}
            className={`inline-flex items-center gap-1.5 border px-2 py-1 text-[0.65rem] ${
              filter.active
                ? "border-primary/20 bg-primary/10 font-medium text-primary"
                : "border-border/60 bg-background/60 text-muted-foreground"
            }`}
          >
            {filter.label}
            <span
              className={`text-[0.6rem] ${
                filter.active ? "text-primary/70" : "text-muted-foreground/70"
              }`}
            >
              {filter.count}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function ReviewFiltersMock() {
  return (
    <div className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.6rem] tracking-[0.28em] text-muted-foreground uppercase">
          <ListFilter className="size-3" />
          Review queue
        </div>
        <Badge variant="info">3 results</Badge>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2 border border-border/60 bg-background/60 px-3 py-2 text-[0.7rem] text-muted-foreground">
          <Search className="size-3.5 shrink-0" />
          Open questions only
        </div>

        <FilterRow label="Status" filters={STATUS_FILTERS} />
        <FilterRow label="Client" filters={CLIENT_FILTERS} />

        <div className="space-y-1.5">
          {ROWS.map((row, index) => (
            <div
              key={row.request}
              className="reveal-item flex items-center justify-between gap-3 border border-border/60 bg-background/60 px-3 py-2.5 [--reveal-from:translateY(10px)]"
              style={
                {
                  "--reveal-delay": `${0.2 + index * 0.08}s`,
                } as React.CSSProperties
              }
            >
              <div className="min-w-0">
                <p className="truncate text-[0.7rem] font-medium text-foreground">
                  {row.request}
                </p>
                <p className="truncate text-[0.65rem] text-muted-foreground">
                  {row.outstanding}
                </p>
              </div>
              <Badge variant={STATE_VARIANT[row.state]}>{row.state}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
