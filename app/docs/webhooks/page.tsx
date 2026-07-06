import type { Metadata } from "next"

import { DocsToc, MobileToc, type TocItem } from "@/components/docs/docs-toc"
import { WebhooksBestPractices } from "@/components/docs/webhooks/best-practices"
import { WebhooksDelivery } from "@/components/docs/webhooks/delivery"
import { WebhooksEvents } from "@/components/docs/webhooks/events"
import { WebhooksOverview } from "@/components/docs/webhooks/overview"
import { WebhooksQuickStart } from "@/components/docs/webhooks/quick-start"
import { WebhooksSecretRotation } from "@/components/docs/webhooks/secret-rotation"
import { WebhooksSignatures } from "@/components/docs/webhooks/signatures"
import { Footer } from "@/components/site/footer"
import { Navbar } from "@/components/site/navbar"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Webhooks — SwiftyDoc Documentation",
  description:
    "Receive signed, real-time HTTP callbacks when requests complete, files upload, and reviews change. Learn setup, signature verification, retries, and secret rotation.",
  openGraph: {
    title: "Webhooks — SwiftyDoc Documentation",
    description:
      "Receive signed, real-time HTTP callbacks when requests complete, files upload, and reviews change.",
    type: "article",
  },
}

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How delivery works" },
  { id: "quick-start", label: "Quick start" },
  { id: "verifying-signatures", label: "Verifying signatures" },
  { id: "events", label: "Event catalog" },
  { id: "delivery", label: "Delivery & retries" },
  { id: "secret-rotation", label: "Secret rotation" },
  { id: "best-practices", label: "Best practices & FAQ" },
]

export default function WebhooksDocsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-20 lg:px-8 lg:pt-36">
        <div className="max-w-3xl">
          <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
            Documentation
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Webhooks
            </h1>
            <Badge variant="outline">Enterprise plan</Badge>
          </div>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Get notified the moment something happens in SwiftyDoc. Webhooks
            deliver signed, real-time HTTP callbacks to your systems whenever
            requests are sent, files are uploaded, reviews are decided, and
            more — no polling required.
          </p>
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <DocsToc items={TOC} />
            </div>
          </aside>

          <article className="min-w-0">
            <MobileToc items={TOC} />
            <WebhooksOverview />
            <WebhooksQuickStart />
            <WebhooksSignatures />
            <WebhooksEvents />
            <WebhooksDelivery />
            <WebhooksSecretRotation />
            <WebhooksBestPractices />
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
