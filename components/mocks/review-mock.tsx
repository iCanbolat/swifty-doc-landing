"use client"

import * as React from "react"
import {
  Check,
  CheckCircle2,
  MessageSquare,
  X,
} from "lucide-react"

import { useInViewOnce } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Item = {
  field: string
  answer: string
  state: "approved" | "rejected" | "pending"
  /** Shown as the reviewer's comment under a rejected item. */
  note?: string
}

export type ReviewMockProps = {
  reference?: string
  subtitle?: string
  /** The whole request's tally — the rows below are only the ones on screen. */
  counts?: { approved: number; rejected: number; pending: number }
  items?: Item[]
  /** The row that flips to approved while you watch. */
  pending?: { field: string; answer: string }
}

const DEFAULT_ITEMS: Item[] = [
  { field: "Legal entity name", answer: "Acme Holdings Ltd.", state: "approved" },
  { field: "Incorporation date", answer: "12 Mar 2019", state: "approved" },
  {
    field: "Bank statement",
    answer: "statement-q1.pdf",
    state: "rejected",
    note: "Reviewer: statement is older than 3 months — please re-upload.",
  },
]

/**
 * Defaults to the generic request the home page shows. The /for pages pass
 * their own items so each niche sees its own documents in the queue.
 */
export function ReviewMock({
  reference = "DOC-2024-014",
  subtitle = "Client onboarding · nadia@acme.co",
  counts = { approved: 3, rejected: 1, pending: 1 },
  items = DEFAULT_ITEMS,
  pending = { field: "Proof of address", answer: "utility-bill.pdf" },
}: ReviewMockProps = {}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const [lastApproved, setLastApproved] = React.useState(false)

  React.useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setLastApproved(true), 1100)
    return () => clearTimeout(timer)
  }, [inView])

  return (
    <div
      ref={ref}
      className="overflow-hidden border border-border/70 bg-card/90 shadow-[0_30px_100px_-50px_rgba(15,23,42,0.55)] ring-1 ring-foreground/10"
    >
      {/* Header with counts. Wraps and truncates so a long reference or address
          cannot widen the mock's min-content and blow out the page grid. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground">
            {reference}
          </p>
          <p className="truncate text-[0.65rem] text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="success">{counts.approved} approved</Badge>
          <Badge variant="danger">{counts.rejected} rejected</Badge>
          <Badge variant="warning">{counts.pending} pending</Badge>
        </div>
      </div>

      <div className="space-y-2.5 p-5">
        {items.map((item, index) => (
          <div
            key={item.field}
            className="reveal-item border border-border/60 bg-background/60 p-3"
            style={
              { "--reveal-delay": `${index * 0.1}s` } as React.CSSProperties
            }
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.7rem] text-muted-foreground">
                  {item.field}
                </p>
                <p className="text-xs font-medium text-foreground">
                  {item.answer}
                </p>
              </div>
              <StateBadge state={item.state} />
            </div>

            {item.note ? (
              <div className="mt-2.5 flex items-start gap-2 border-l-2 border-rose-400/50 bg-rose-500/5 px-2.5 py-1.5">
                <MessageSquare className="mt-0.5 size-3 text-rose-600" />
                <p className="text-[0.65rem] text-muted-foreground">
                  {item.note}
                </p>
              </div>
            ) : null}
          </div>
        ))}

        {/* Pending item with live decision */}
        <div className="reveal-item border border-border/60 bg-background/60 p-3 [--reveal-delay:0.32s]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.7rem] text-muted-foreground">
                {pending.field}
              </p>
              <p className="text-xs font-medium text-foreground">
                {pending.answer}
              </p>
            </div>
            {lastApproved ? (
              <StateBadge key="approved" state="approved" />
            ) : (
              <StateBadge key="pending" state="pending" />
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              data-pause-offscreen
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 border border-emerald-500/20 bg-emerald-500/10 py-1.5 text-[0.7rem] font-medium text-emerald-700",
                !lastApproved &&
                  "animate-pulse-ring [--pulse-color:rgba(16,185,129,0.12)] motion-reduce:animate-none"
              )}
            >
              <Check className="size-3" />
              Approve
            </button>
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-1.5 border border-rose-500/20 bg-rose-500/10 py-1.5 text-[0.7rem] font-medium text-rose-700"
            >
              <X className="size-3" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StateBadge({ state }: { state: Item["state"] }) {
  if (state === "approved") {
    return (
      <span className="inline-flex animate-pop">
        <Badge variant="success">
          <CheckCircle2 className="size-3" />
          Approved
        </Badge>
      </span>
    )
  }
  if (state === "rejected") {
    return (
      <Badge variant="danger">
        <X className="size-3" />
        Rejected
      </Badge>
    )
  }
  return (
    <span className="inline-flex animate-pop">
      <Badge variant="warning">Pending</Badge>
    </span>
  )
}
