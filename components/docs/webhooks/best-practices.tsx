/**
 * Guidance summarizes swiftydoc-api behavior. Source of truth:
 * src/infrastructure/webhooks/webhook.service.ts (delivery semantics).
 */
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section"
import { InlineCode } from "@/components/docs/docs-table"

export function WebhooksBestPractices() {
  return (
    <DocSection id="best-practices" title="Best practices & FAQ">
      <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
        <li>
          <strong className="text-foreground">Be idempotent.</strong> Retries
          and replays mean you can receive the same event more than once.
          Deduplicate on <InlineCode>X-SwiftyDoc-Delivery-Id</InlineCode> (or
          the envelope <InlineCode>id</InlineCode> for event-level dedupe).
        </li>
        <li>
          <strong className="text-foreground">
            Acknowledge fast, process async.
          </strong>{" "}
          Return <InlineCode>2xx</InlineCode> within the 5-second timeout and
          hand the payload to a queue or background job — don&apos;t do heavy
          work inline.
        </li>
        <li>
          <strong className="text-foreground">
            Verify before you parse.
          </strong>{" "}
          Check the signature against the raw body and reject stale timestamps
          before acting on any payload.
        </li>
        <li>
          <strong className="text-foreground">
            Don&apos;t assume ordering.
          </strong>{" "}
          Deliveries are queued and retried independently, so events can
          arrive out of order. Use <InlineCode>occurred_at</InlineCode> when
          sequence matters.
        </li>
        <li>
          <strong className="text-foreground">Protect your secret.</strong>{" "}
          Store it in a secret manager, never in code, and rotate it on a
          schedule.
        </li>
        <li>
          <strong className="text-foreground">Subscribe narrowly.</strong>{" "}
          Prefer explicit event subscriptions over{" "}
          <InlineCode>*</InlineCode> so your receiver only handles what it
          actually uses.
        </li>
      </ul>

      <DocSubheading id="faq-plan">Which plan includes webhooks?</DocSubheading>
      <DocParagraph>
        Webhooks are an Enterprise-plan feature. On other plans, the{" "}
        <strong className="text-foreground">Organization → Webhooks</strong>{" "}
        page shows an upgrade prompt and the API returns a plan-restriction
        error.
      </DocParagraph>

      <DocSubheading id="faq-test">
        Can I test without writing code?
      </DocSubheading>
      <DocParagraph>
        Yes — register an endpoint in the app and use the built-in ping
        action, or point it at a request-inspection service while you develop.
        For end-to-end pipeline tests, use{" "}
        <InlineCode>POST /v1/webhooks/events</InlineCode>.
      </DocParagraph>

      <DocSubheading id="faq-downtime">
        My endpoint was down. Did I lose events?
      </DocSubheading>
      <DocParagraph>
        Deliveries are retried automatically (5 attempts by default). If the
        outage outlasted the retry window, list the failed deliveries and
        replay them — the original payloads are stored and re-sent as fresh
        deliveries.
      </DocParagraph>

      <DocSubheading id="faq-authenticity">
        How do I know a request really came from SwiftyDoc?
      </DocSubheading>
      <DocParagraph>
        Verify the <InlineCode>X-SwiftyDoc-Signature</InlineCode> HMAC against
        the raw body with your endpoint secret, and reject deliveries whose{" "}
        <InlineCode>X-SwiftyDoc-Timestamp</InlineCode> is more than a few
        minutes old. Unsigned or mis-signed requests should be dropped with a{" "}
        <InlineCode>401</InlineCode>.
      </DocParagraph>
    </DocSection>
  )
}
