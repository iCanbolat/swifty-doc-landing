/**
 * Payload literals are hand-copied from swiftydoc-api. Source of truth:
 * src/infrastructure/webhooks/dto/register-webhook-endpoint.dto.ts and
 * src/infrastructure/webhooks/webhooks.controller.ts.
 */
import { Callout } from "@/components/docs/callout"
import { CodeBlock } from "@/components/docs/code-block"
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section"
import { InlineCode } from "@/components/docs/docs-table"

const RECEIVER_EXAMPLE = `import express from "express"

const app = express()

// Keep the raw body — you need it for signature verification.
app.post(
  "/hooks/swiftydoc",
  express.raw({ type: "application/json" }),
  (req, res) => {
    // TODO: verify X-SwiftyDoc-Signature before trusting the payload
    const event = JSON.parse(req.body.toString("utf8"))
    console.log(\`Received \${event.type}\`, event.data)
    res.sendStatus(200)
  }
)

app.listen(3000)`

const REGISTER_REQUEST = `curl -X POST https://api.swiftydoc.io/v1/webhooks/endpoints \\
  -H "Authorization: Bearer $SWIFTYDOC_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://partner.example.com/hooks/swiftydoc",
    "secret": "your-high-entropy-secret",
    "subscribedEvents": ["request.completed", "file.uploaded"]
  }'`

const REGISTER_RESPONSE = `{
  "data": {
    "id": "c0f59570-b40a-47ba-b0a0-3ebd0cd54b70",
    "organizationId": "org_123",
    "url": "https://partner.example.com/hooks/swiftydoc",
    "secret": "[redacted]",
    "subscribedEvents": ["request.completed", "file.uploaded"],
    "enabled": true,
    "hasPreviousSecret": false,
    "previousSecretExpiresAt": null,
    "createdAt": "2026-07-03T09:15:00.000Z",
    "updatedAt": "2026-07-03T09:15:00.000Z"
  }
}`

const PING_REQUEST = `curl -X POST \\
  https://api.swiftydoc.io/v1/webhooks/endpoints/c0f59570-b40a-47ba-b0a0-3ebd0cd54b70/ping \\
  -H "Authorization: Bearer $SWIFTYDOC_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{}'`

export function WebhooksQuickStart() {
  return (
    <DocSection id="quick-start" title="Quick start">
      <DocSubheading>1. Create an HTTPS receiver</DocSubheading>
      <DocParagraph>
        Your endpoint must be a publicly reachable HTTPS URL that accepts{" "}
        <InlineCode>POST</InlineCode> requests and responds with a{" "}
        <InlineCode>2xx</InlineCode> status quickly. A minimal Express receiver:
      </DocParagraph>
      <CodeBlock label="server.mjs" code={RECEIVER_EXAMPLE} />

      <DocSubheading>2. Register the endpoint</DocSubheading>
      <DocParagraph>
        In the app, open{" "}
        <strong className="text-foreground">Organization → Webhooks</strong>{" "}
        and add your URL, secret, and event subscriptions. Or register via the
        API:
      </DocParagraph>
      <CodeBlock label="POST /v1/webhooks/endpoints" code={REGISTER_REQUEST} />
      <DocParagraph>
        You choose the signing <InlineCode>secret</InlineCode> at registration
        (8–255 characters — use a high-entropy random string and store it in a
        secret manager). If you omit{" "}
        <InlineCode>subscribedEvents</InlineCode>, the endpoint defaults to{" "}
        <InlineCode>[&quot;*&quot;]</InlineCode> and receives every event.
      </DocParagraph>
      <CodeBlock label="201 Created" code={REGISTER_RESPONSE} />
      <Callout>
        The secret is never returned by read endpoints — responses always show{" "}
        <InlineCode>&quot;[redacted]&quot;</InlineCode>. If you lose it, rotate
        it (see{" "}
        <a
          href="#secret-rotation"
          className="text-primary underline underline-offset-4"
        >
          Secret rotation
        </a>
        ).
      </Callout>

      <DocSubheading>3. Send a test ping</DocSubheading>
      <DocParagraph>
        Verify the wiring end to end — the ping is signed exactly like a real
        delivery, so you can use it to test signature verification too:
      </DocParagraph>
      <CodeBlock
        label="POST /v1/webhooks/endpoints/:id/ping"
        code={PING_REQUEST}
      />
      <Callout>
        OAuth partner applications use the identical API under{" "}
        <InlineCode>/v1/oauth/webhooks/…</InlineCode> and{" "}
        <InlineCode>/v1/oauth/webhook-deliveries</InlineCode> with the{" "}
        <InlineCode>webhooks.read</InlineCode> /{" "}
        <InlineCode>webhooks.write</InlineCode> OAuth scopes.
      </Callout>
    </DocSection>
  )
}
