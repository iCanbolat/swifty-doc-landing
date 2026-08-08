/**
 * Retry defaults are hand-copied from swiftydoc-api. Source of truth:
 * src/common/config/runtime-env.ts (WEBHOOK_DELIVERY_* defaults) and
 * src/infrastructure/webhooks/webhook.service.ts (deliverWebhook, backoff).
 */
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section"
import { DocsTable, InlineCode } from "@/components/docs/docs-table"
import { Badge } from "@/components/ui/badge"

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
        Every attempt is recorded. Open{" "}
        <strong className="text-foreground">Developers → Recent logs</strong> to
        see them across all of your endpoints — event type, destination, HTTP
        response, attempt count and the error message on failures. Filter by
        status to isolate what broke.
      </DocParagraph>
      <DocParagraph>
        If your endpoint was down past the retry window, hit{" "}
        <strong className="text-foreground">Replay</strong> on any failed
        delivery: the original event payload is re-sent as a fresh delivery,
        signed with your current secret.
      </DocParagraph>
    </DocSection>
  )
}
