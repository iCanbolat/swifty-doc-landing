/**
 * Signature scheme is hand-copied from swiftydoc-api. Source of truth:
 * src/infrastructure/webhooks/webhook.service.ts (generateSignature):
 * HMAC-SHA256 hex over `${timestamp}.${rawBody}` keyed by the endpoint secret.
 */
import { Callout } from "@/components/docs/callout"
import { CodeBlock } from "@/components/docs/code-block"
import { DocParagraph, DocSection } from "@/components/docs/doc-section"
import { InlineCode } from "@/components/docs/docs-table"

const NODE_EXAMPLE = `import { createHmac, timingSafeEqual } from "node:crypto"
import express from "express"

const SECRET = process.env.SWIFTYDOC_WEBHOOK_SECRET

function matchesSignature(rawBody, timestamp, signatureHeader, secret) {
  if (!signatureHeader) return false
  const expected = createHmac("sha256", secret)
    .update(\`\${timestamp}.\${rawBody}\`)
    .digest("hex")
  const a = Buffer.from(expected, "hex")
  const b = Buffer.from(signatureHeader, "hex")
  return a.length === b.length && timingSafeEqual(a, b)
}

const app = express()

app.post(
  "/hooks/swiftydoc",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const rawBody = req.body.toString("utf8")
    const timestamp = req.header("X-SwiftyDoc-Timestamp") ?? ""

    // Reject stale deliveries to guard against replay attacks.
    const ageMs = Date.now() - new Date(timestamp).getTime()
    if (!timestamp || Number.isNaN(ageMs) || ageMs > 5 * 60 * 1000) {
      return res.sendStatus(400)
    }

    // Accept the current signature, or — during a secret-rotation
    // grace window — the previous one.
    const valid =
      matchesSignature(
        rawBody, timestamp, req.header("X-SwiftyDoc-Signature"), SECRET
      ) ||
      matchesSignature(
        rawBody, timestamp, req.header("X-SwiftyDoc-Signature-Previous"), SECRET
      )

    if (!valid) return res.sendStatus(401)

    const event = JSON.parse(rawBody)
    // ... handle event asynchronously ...
    res.sendStatus(200)
  }
)

app.listen(3000)`

const PYTHON_EXAMPLE = `import hashlib
import hmac

def is_valid_signature(raw_body: bytes, timestamp: str,
                       signature: str, secret: str) -> bool:
    message = f"{timestamp}.".encode() + raw_body
    expected = hmac.new(secret.encode(), message, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)`

export function WebhooksSignatures() {
  return (
    <DocSection id="verifying-signatures" title="Verifying signatures">
      <DocParagraph>
        Every delivery is signed so you can prove it came from SwiftyDoc and
        was not tampered with. The signature is computed as:
      </DocParagraph>
      <CodeBlock
        label="Signature scheme"
        code={`signature = hex( HMAC-SHA256( key = endpoint secret,
                          message = "<X-SwiftyDoc-Timestamp>.<raw request body>" ) )`}
      />
      <DocParagraph>
        Concatenate the <InlineCode>X-SwiftyDoc-Timestamp</InlineCode> header
        value, a literal dot, and the raw request body; compute an HMAC-SHA256
        over it with your endpoint secret; and compare the hex digest against{" "}
        <InlineCode>X-SwiftyDoc-Signature</InlineCode> using a constant-time
        comparison.
      </DocParagraph>
      <Callout variant="warning" title="Verify against the raw body">
        Compute the HMAC over the raw request bytes exactly as received.
        Parsing the JSON and re-serializing it will change whitespace and key
        ordering and break the signature. In Express, use{" "}
        <InlineCode>express.raw()</InlineCode> for the webhook route instead
        of <InlineCode>express.json()</InlineCode>.
      </Callout>
      <CodeBlock label="verify.mjs — Node.js" code={NODE_EXAMPLE} />
      <CodeBlock label="verify.py — Python" code={PYTHON_EXAMPLE} />
      <DocParagraph>
        During a secret-rotation grace window, deliveries also carry{" "}
        <InlineCode>X-SwiftyDoc-Signature-Previous</InlineCode>, signed with
        the previous secret. Accepting either header (as in the Node example
        above) lets you roll out a new secret with zero missed deliveries —
        see{" "}
        <a
          href="#secret-rotation"
          className="text-primary underline underline-offset-4"
        >
          Secret rotation
        </a>
        . As a replay guard, reject deliveries whose timestamp is older than a
        few minutes.
      </DocParagraph>
    </DocSection>
  )
}
