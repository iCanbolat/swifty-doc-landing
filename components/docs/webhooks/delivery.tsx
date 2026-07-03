/**
 * Retry defaults are hand-copied from swiftydoc-api. Source of truth:
 * src/common/config/runtime-env.ts (WEBHOOK_DELIVERY_* defaults) and
 * src/infrastructure/webhooks/webhook.service.ts (deliverWebhook, backoff).
 */
import { CodeBlock } from "@/components/docs/code-block"
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section"
import { DocsTable, InlineCode } from "@/components/docs/docs-table"
import { Badge } from "@/components/ui/badge"

const LIST_DELIVERIES_REQUEST = `curl "https://api.swiftydoc.io/v1/webhook-deliveries?status=failed" \\
  -H "Authorization: Bearer $SWIFTYDOC_TOKEN"`

const LIST_DELIVERIES_RESPONSE = `{
  "data": [
    {
      "id": "webhook_delivery_123",
      "organizationId": "org_123",
      "endpointId": "c0f59570-b40a-47ba-b0a0-3ebd0cd54b70",
      "endpointUrl": "https://partner.example.com/hooks/swiftydoc",
      "eventId": "evt_9f6f2c9a1a7b4c1e",
      "eventType": "request.completed",
      "requestBody": { "id": "evt_9f6f2c9a1a7b4c1e", "type": "request.completed", "…": "…" },
      "status": "failed",
      "attemptCount": 2,
      "responseCode": 500,
      "lastErrorMessage": "Webhook delivery failed with status 500.",
      "sourceDeliveryId": null,
      "nextAttemptAt": "2026-07-03T09:41:20.000Z",
      "lastAttemptedAt": "2026-07-03T09:41:10.000Z",
      "deliveredAt": null,
      "createdAt": "2026-07-03T09:41:00.000Z",
      "updatedAt": "2026-07-03T09:41:10.000Z"
    }
  ],
  "meta": { "page": 1, "perPage": 20, "total": 1 }
}`

const REPLAY_REQUEST = `curl -X POST \\
  https://api.swiftydoc.io/v1/webhook-deliveries/webhook_delivery_123/replay \\
  -H "Authorization: Bearer $SWIFTYDOC_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{}'`

export function WebhooksDelivery() {
  return (
    <DocSection id="delivery" title="Delivery & retries">
      <DocParagraph>
        A delivery succeeds when your endpoint responds with any{" "}
        <InlineCode>2xx</InlineCode> status within the request timeout (5
        seconds by default). Every delivery moves through one of three states:
      </DocParagraph>
      <DocsTable
        head={["Status", "Meaning"]}
        rows={[
          [
            <Badge key="s" variant="info">
              queued
            </Badge>,
            "Waiting for its first or next attempt.",
          ],
          [
            <Badge key="s" variant="success">
              delivered
            </Badge>,
            "Your endpoint acknowledged with a 2xx response.",
          ],
          [
            <Badge key="s" variant="danger">
              failed
            </Badge>,
            "All retry attempts were exhausted without a 2xx response.",
          ],
        ]}
      />
      <DocParagraph>
        Failed attempts are retried with exponential backoff. With the default
        configuration (5 attempts, 5-second base, doubling per attempt, capped
        at 1 hour):
      </DocParagraph>
      <DocsTable
        head={["Attempt", "Delay after previous failure"]}
        rows={[
          ["1", "immediate (when the event occurs)"],
          ["2", "+5 seconds"],
          ["3", "+10 seconds"],
          ["4", "+20 seconds"],
          ["5", "+40 seconds"],
        ]}
      />

      <DocSubheading id="inspecting-deliveries">
        Inspecting and replaying deliveries
      </DocSubheading>
      <DocParagraph>
        Every attempt is recorded and can be inspected in the app under{" "}
        <strong className="text-foreground">Organization → Webhooks</strong>{" "}
        or via the API. Filter by <InlineCode>endpointId</InlineCode> and{" "}
        <InlineCode>status</InlineCode>:
      </DocParagraph>
      <CodeBlock
        label="GET /v1/webhook-deliveries"
        code={LIST_DELIVERIES_REQUEST}
      />
      <CodeBlock label="200 OK" code={LIST_DELIVERIES_RESPONSE} />
      <DocParagraph>
        If your endpoint was down past the retry window, replay any delivery —
        the original event payload is re-sent as a fresh delivery:
      </DocParagraph>
      <CodeBlock
        label="POST /v1/webhook-deliveries/:id/replay"
        code={REPLAY_REQUEST}
      />
    </DocSection>
  )
}
