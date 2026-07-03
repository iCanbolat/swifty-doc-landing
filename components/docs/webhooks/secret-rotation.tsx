/**
 * Rotation behavior is hand-copied from swiftydoc-api. Source of truth:
 * src/infrastructure/webhooks/webhook.service.ts (rotateEndpointSecret,
 * generateEndpointSecret) and runtime-env.ts (rotation grace default).
 */
import { Callout } from "@/components/docs/callout"
import { CodeBlock } from "@/components/docs/code-block"
import { DocParagraph, DocSection } from "@/components/docs/doc-section"
import { InlineCode } from "@/components/docs/docs-table"

const ROTATE_REQUEST = `curl -X POST \\
  https://api.swiftydoc.io/v1/webhooks/endpoints/c0f59570-b40a-47ba-b0a0-3ebd0cd54b70/rotate-secret \\
  -H "Authorization: Bearer $SWIFTYDOC_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{}'`

const ROTATE_RESPONSE = `{
  "data": {
    "endpoint": {
      "id": "c0f59570-b40a-47ba-b0a0-3ebd0cd54b70",
      "organizationId": "org_123",
      "url": "https://partner.example.com/hooks/swiftydoc",
      "secret": "[redacted]",
      "subscribedEvents": ["request.completed", "file.uploaded"],
      "enabled": true,
      "hasPreviousSecret": true,
      "previousSecretExpiresAt": "2026-07-04T10:00:00.000Z",
      "createdAt": "2026-07-03T09:15:00.000Z",
      "updatedAt": "2026-07-03T10:00:00.000Z"
    },
    "secret": "whsec_k3If1uN2xY9qZ4vB7cD0eF5gH8jL6mP1"
  }
}`

export function WebhooksSecretRotation() {
  return (
    <DocSection id="secret-rotation" title="Secret rotation">
      <DocParagraph>
        Rotate an endpoint&apos;s signing secret at any time — on a schedule,
        or immediately if it may have leaked. Pass a new{" "}
        <InlineCode>secret</InlineCode> in the body, or send an empty body to
        have SwiftyDoc generate a high-entropy{" "}
        <InlineCode>whsec_…</InlineCode> secret for you:
      </DocParagraph>
      <CodeBlock
        label="POST /v1/webhooks/endpoints/:id/rotate-secret"
        code={ROTATE_REQUEST}
      />
      <CodeBlock label="200 OK" code={ROTATE_RESPONSE} />
      <Callout variant="warning" title="The secret is shown exactly once">
        The plaintext <InlineCode>secret</InlineCode> in the rotate response
        is the only time SwiftyDoc returns it. Store it immediately — all
        subsequent reads show{" "}
        <InlineCode>&quot;[redacted]&quot;</InlineCode>.
      </Callout>
      <DocParagraph>
        Rotation is zero-downtime. For a grace window (24 hours by default),
        every delivery is signed twice:{" "}
        <InlineCode>X-SwiftyDoc-Signature</InlineCode> with the new secret and{" "}
        <InlineCode>X-SwiftyDoc-Signature-Previous</InlineCode> with the old
        one. The endpoint&apos;s <InlineCode>hasPreviousSecret</InlineCode>{" "}
        and <InlineCode>previousSecretExpiresAt</InlineCode> fields tell you
        whether a window is active.
      </DocParagraph>
      <DocParagraph>A safe rotation runbook:</DocParagraph>
      <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
        <li>
          Make sure your receiver accepts <em>either</em> signature header
          (see{" "}
          <a
            href="#verifying-signatures"
            className="text-primary underline underline-offset-4"
          >
            Verifying signatures
          </a>
          ).
        </li>
        <li>
          Call <InlineCode>rotate-secret</InlineCode> and store the new secret
          from the response.
        </li>
        <li>
          Deploy the new secret to your receiver — deliveries keep verifying
          via the previous signature until you do.
        </li>
        <li>
          After the grace window expires, the previous secret stops being used
          automatically. Nothing else to clean up.
        </li>
      </ol>
    </DocSection>
  )
}
