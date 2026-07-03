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
}

const ITEMS: Item[] = [
  { field: "Legal entity name", answer: "Acme Holdings Ltd.", state: "approved" },
  { field: "Incorporation date", answer: "12 Mar 2019", state: "approved" },
  { field: "Bank statement", answer: "statement-q1.pdf", state: "rejected" },
]

export function ReviewMock() {
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
      {/* Header with counts */}
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-5 py-4">
        <div>
          <p className="text-xs font-semibold text-foreground">DOC-2024-014</p>
          <p className="text-[0.65rem] text-muted-foreground">
            Client onboarding · nadia@acme.co
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="success">3 approved</Badge>
          <Badge variant="danger">1 rejected</Badge>
          <Badge variant="warning">1 pending</Badge>
        </div>
      </div>

      <div className="space-y-2.5 p-5">
        {ITEMS.map((item, index) => (
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

            {item.state === "rejected" ? (
              <div className="mt-2.5 flex items-start gap-2 border-l-2 border-rose-400/50 bg-rose-500/5 px-2.5 py-1.5">
                <MessageSquare className="mt-0.5 size-3 text-rose-600" />
                <p className="text-[0.65rem] text-muted-foreground">
                  Reviewer: statement is older than 3 months — please re-upload.
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
                Proof of address
              </p>
              <p className="text-xs font-medium text-foreground">
                utility-bill.pdf
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
