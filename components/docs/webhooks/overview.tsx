/**
 * Payload literals are hand-copied from swiftydoc-api. Source of truth:
 * src/common/webhooks/webhook-events.ts (event names) and
 * src/infrastructure/webhooks/webhook.service.ts (envelope, headers).
 */
import { Callout } from "@/components/docs/callout"
import { CodeBlock } from "@/components/docs/code-block"
import { DocParagraph, DocSection } from "@/components/docs/doc-section"
import { DocsTable, InlineCode } from "@/components/docs/docs-table"

const ENVELOPE_EXAMPLE = `{
  "id": "evt_9f6f2c9a1a7b4c1e",
  "type": "request.completed",
  "occurred_at": "2026-07-03T09:41:00.000Z",
  "organization_id": "org_123",
  "data": {
    "requestId": "req_123",
    "requestCode": "RQ-2041",
    "status": "completed",
    "workspaceId": "ws_123",
    "totalSubmissions": 3,
    "completedSubmissions": 3
  }
}`

export function WebhooksOverview() {
  return (
    <>
      <DocSection id="overview" title="Overview">
        <DocParagraph>
          A webhook is an HTTP <InlineCode>POST</InlineCode> request that
          SwiftyDoc sends to a URL you control whenever an event you subscribed
          to occurs in your organization. Instead of polling the API for
          changes, your integration reacts the moment a request completes, a
          file is uploaded, or a reviewer approves an item.
        </DocParagraph>
        <Callout title="Availability">
          Webhooks are available on the <strong>Enterprise</strong> plan.
          Managing endpoints requires the{" "}
          <InlineCode>webhooks.read</InlineCode> /{" "}
          <InlineCode>webhooks.write</InlineCode> permissions in your
          organization.
        </Callout>
        <DocParagraph>
          Manage endpoints directly in the app:
        </DocParagraph>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
          <li>
            <strong className="text-foreground">In the app</strong> — go to{" "}
            <strong className="text-foreground">
              Organization&nbsp;→&nbsp;Webhooks
            </strong>{" "}
            to register endpoints, pick event subscriptions, send test pings,
            rotate secrets, and inspect deliveries without writing any code.
          </li>
        </ul>
      </DocSection>

      <DocSection id="how-it-works" title="How delivery works">
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
          <li>An event occurs in your organization (for example, a recipient completes a request).</li>
          <li>
            SwiftyDoc queues one delivery per enabled endpoint whose
            subscriptions match the event type (or that subscribed to{" "}
            <InlineCode>*</InlineCode>).
          </li>
          <li>
            Each delivery is a signed <InlineCode>POST</InlineCode> with a JSON
            envelope to your endpoint URL.
          </li>
          <li>
            Any <InlineCode>2xx</InlineCode> response acknowledges the
            delivery. Anything else — or a timeout — schedules a retry with
            exponential backoff (see{" "}
            <a
              href="#delivery"
              className="text-primary underline underline-offset-4"
            >
              Delivery &amp; retries
            </a>
            ).
          </li>
        </ol>
        <DocParagraph>
          Every delivery wraps the event in the same envelope. The{" "}
          <InlineCode>data</InlineCode> object is event-specific — see the{" "}
          <a
            href="#events"
            className="text-primary underline underline-offset-4"
          >
            event catalog
          </a>{" "}
          for each shape.
        </DocParagraph>
        <CodeBlock label="Event envelope" code={ENVELOPE_EXAMPLE} />
        <DocParagraph>
          Each request carries the following headers:
        </DocParagraph>
        <DocsTable
          head={["Header", "Description"]}
          rows={[
            [
              <InlineCode key="h">Content-Type</InlineCode>,
              <>
                Always <InlineCode>application/json</InlineCode>.
              </>,
            ],
            [
              <InlineCode key="h">X-SwiftyDoc-Delivery-Id</InlineCode>,
              <>
                Unique per delivery attempt — use it for idempotency. Test
                pings are prefixed with <InlineCode>ping_</InlineCode>.
              </>,
            ],
            [
              <InlineCode key="h">X-SwiftyDoc-Event</InlineCode>,
              <>
                The event type, e.g.{" "}
                <InlineCode>request.completed</InlineCode>.
              </>,
            ],
            [
              <InlineCode key="h">X-SwiftyDoc-Timestamp</InlineCode>,
              "ISO-8601 timestamp of the delivery; part of the signed message.",
            ],
            [
              <InlineCode key="h">X-SwiftyDoc-Signature</InlineCode>,
              "Hex-encoded HMAC-SHA256 signature computed with your endpoint's current secret.",
            ],
            [
              <InlineCode key="h">X-SwiftyDoc-Signature-Previous</InlineCode>,
              "Only present during a secret-rotation grace window; signed with the previous secret.",
            ],
          ]}
        />
      </DocSection>
    </>
  )
}
