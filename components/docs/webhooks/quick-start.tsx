/**
 * Guidance mirrors first-party webhook setup. Source of truth:
 * client/src/features/webhooks/pages/webhooks-page.tsx and
 * api/src/infrastructure/webhooks/webhook.service.ts.
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

      <DocSubheading>2. Register the endpoint in SwiftyDoc</DocSubheading>
      <DocParagraph>
        Open <strong className="text-foreground">Organization → Webhooks</strong>,
        add your destination URL, and choose the event subscriptions your
        receiver needs.
      </DocParagraph>
      <DocParagraph>
        SwiftyDoc generates the signing <InlineCode>secret</InlineCode>, shows
        it once, and stores only a redacted value for future reads.
      </DocParagraph>
      <Callout variant="warning" title="Copy the secret immediately">
        Save the plaintext secret in a secure vault right away. If you lose it,
        rotate the endpoint secret from the same Webhooks page.
      </Callout>

      <DocSubheading>3. Verify delivery with a test ping</DocSubheading>
      <DocParagraph>
        Use the endpoint card&apos;s ping action to send a signed test delivery.
        Confirm your receiver verifies the signature and responds with{" "}
        <InlineCode>2xx</InlineCode>.
      </DocParagraph>
      <DocParagraph>
        Once ping succeeds, you are ready for production traffic. Live webhook
        deliveries use the same signing format and retry behavior.
      </DocParagraph>
    </DocSection>
  )
}
