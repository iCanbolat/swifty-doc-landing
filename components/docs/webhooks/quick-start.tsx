/**
 * Guidance mirrors first-party webhook setup. Source of truth:
 * client/src/features/webhooks/pages/webhooks-page.tsx and
 * api/src/infrastructure/webhooks/webhook.service.ts.
 */
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section";
import { InlineCode } from "@/components/docs/docs-table";

const RECEIVER_EXAMPLE = `import { createHmac, timingSafeEqual } from "node:crypto"
import express from "express"

const SECRET = process.env.CLIENTGATHER_WEBHOOK_SECRET

const app = express()

// Keep the raw body — you need it for signature verification.
app.post(
  "/hooks/clientgather",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const rawBody = req.body.toString("utf8")
    const timestamp = req.header("X-ClientGather-Timestamp") ?? ""
    const expected = createHmac("sha256", SECRET)
      .update(\`\${timestamp}.\${rawBody}\`)
      .digest("hex")
    const received = Buffer.from(
      req.header("X-ClientGather-Signature") ?? "", "hex"
    )
    const a = Buffer.from(expected, "hex")

    if (a.length !== received.length || !timingSafeEqual(a, received)) {
      return res.sendStatus(401)
    }

    const event = JSON.parse(rawBody)
    console.log(\`Received \${event.type}\`, event.data)
    res.sendStatus(200)
  }
)

app.listen(3000)`;

export function WebhooksQuickStart() {
  return (
    <DocSection id="quick-start" title="Quick start">
      <DocSubheading>1. Create an HTTPS receiver</DocSubheading>
      <DocParagraph>
        Your endpoint must be a publicly reachable HTTPS URL that accepts{" "}
        <InlineCode>POST</InlineCode> requests and responds with a{" "}
        <InlineCode>2xx</InlineCode> status quickly. A minimal Express receiver
        — verifying the signature, because an endpoint that skips that step
        will act on anything anyone posts to it:
      </DocParagraph>
      <CodeBlock label="server.mjs" code={RECEIVER_EXAMPLE} />

      <DocSubheading>2. Register the endpoint in ClientGather</DocSubheading>
      <DocParagraph>
        Open <strong className="text-foreground">Developers → Webhooks</strong>,
        add your destination URL, and choose the event subscriptions your
        receiver needs.
      </DocParagraph>
      <DocParagraph>
        ClientGather generates the signing <InlineCode>secret</InlineCode> and
        shows it once. It is stored encrypted at rest, and every later read of
        the endpoint returns <InlineCode>&quot;[redacted]&quot;</InlineCode> —
        there is no way to retrieve it again afterwards.
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
  );
}
