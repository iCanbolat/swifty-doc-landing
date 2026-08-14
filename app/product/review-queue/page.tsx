import type { Metadata } from "next"
import { ClipboardCheck, ListFilter, MessageSquare, ShieldCheck } from "lucide-react"

import { AuditLogMock } from "@/components/mocks/audit-log-mock"
import { CommentThreadMock } from "@/components/mocks/comment-thread-mock"
import { ReviewFiltersMock } from "@/components/mocks/review-filters-mock"
import { ReviewMock } from "@/components/mocks/review-mock"
import { ProductPageShell } from "@/components/product/product-page-shell"
import { FeatureSection } from "@/components/sections/feature-section"

export const metadata: Metadata = {
  title: "Review queue — ClientGather",
  description:
    "Approve or reject each answer individually, and request changes with a comment thread the recipient answers in the same portal — so one missing document reopens one item, not the whole bundle.",
  alternates: { canonical: "/product/review-queue" },
  openGraph: {
    title: "Review queue — ClientGather",
    description:
      "Per-item approve and reject decisions, with threaded comments between reviewer and recipient.",
    type: "website",
  },
}

export default function ReviewQueuePage() {
  return (
    <ProductPageShell
      eyebrow="Review queue"
      icon={ClipboardCheck}
      title="Approve, reject, and resolve in one place"
      description="The expensive part of document collection is not receiving the files — it is the round trip when something is wrong. Review each answer on its own, and ask for exactly the one thing that is missing."
    >
      <FeatureSection
        eyebrow="Per-item decisions"
        icon={ClipboardCheck}
        title="One gap reopens one item"
        description="Every answer and file carries its own status. Approve what's right, reject what isn't, and request changes on the single item that needs another pass. Everything already approved stays approved."
        bullets={[
          "Approve, reject, or request changes per item",
          "Statuses: pending, provided, approved, rejected, changes requested",
          "Recipients re-upload against that item in the same portal, using the same link",
          "No re-sending a checklist the client has already worked through",
        ]}
        mock={<ReviewMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Threaded comments"
        icon={MessageSquare}
        title="The question sits next to the document"
        description="Requesting changes opens a comment thread on that item. The recipient sees what's being asked and why, right beside their own answer, and replies in place — so the exchange is still there when someone reads the file back months later."
        bullets={[
          "Threads between reviewer and recipient on a single item",
          "The reason for a rejection stays attached to the document",
          "System entries record status changes alongside the conversation",
        ]}
        mock={<CommentThreadMock />}
      />

      <FeatureSection
        eyebrow="The queue"
        icon={ListFilter}
        title="Everything outstanding, across every request"
        description="Outstanding work is a filterable queue generated from the submissions themselves, not a spreadsheet somebody maintains by hand. Anyone covering a colleague can see the exact state of a case without reading an email thread."
        bullets={[
          "Filter by status, client, and open questions",
          "Cover for annual leave without being copied into the original thread",
          "Roles decide who can review and who can only see",
        ]}
        mock={<ReviewFiltersMock />}
      />

      <FeatureSection
        reverse
        eyebrow="Accountability"
        icon={ShieldCheck}
        title="A record of who decided what, and when"
        description="Each item keeps its own review history — who supplied it, when, who approved or rejected it, and the thread that resolved any question. Alongside it, the audit log records security and data-access events."
        bullets={[
          "Per-item history retained with the submission",
          "Audit log covering security, data access, webhook, queue, and system events",
          "Four roles: organization owner, organization admin, workspace manager, workspace reviewer",
          "Two-factor authentication can be required across the whole organization",
        ]}
        mock={<AuditLogMock />}
        href="/product/storage"
        linkLabel="See where the files end up"
      />
    </ProductPageShell>
  )
}
