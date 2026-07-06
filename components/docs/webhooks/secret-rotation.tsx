/**
 * Rotation behavior is hand-copied from swiftydoc-api. Source of truth:
 * src/infrastructure/webhooks/webhook.service.ts (rotateEndpointSecret,
 * generateEndpointSecret) and runtime-env.ts (rotation grace default).
 */
import { Callout } from "@/components/docs/callout";
import { DocParagraph, DocSection } from "@/components/docs/doc-section";
import { InlineCode } from "@/components/docs/docs-table";

export function WebhooksSecretRotation() {
  return (
    <DocSection id="secret-rotation" title="Secret rotation">
      <DocParagraph>
        Rotate an endpoint&apos;s signing secret at any time — on a schedule, or
        immediately if it may have leaked. SwiftyDoc always generates a new
        high-entropy <InlineCode>whsec_…</InlineCode> secret for each rotate
        action.
      </DocParagraph>
      <Callout variant="warning" title="The secret is shown exactly once">
        The plaintext <InlineCode>secret</InlineCode> is only shown right after
        rotation. Store it immediately — all subsequent reads show{" "}
        <InlineCode>&quot;[redacted]&quot;</InlineCode>.
      </Callout>
      <DocParagraph>
        Rotation is zero-downtime. For a grace window (24 hours by default),
        every delivery is signed twice:{" "}
        <InlineCode>X-SwiftyDoc-Signature</InlineCode> with the new secret and{" "}
        <InlineCode>X-SwiftyDoc-Signature-Previous</InlineCode> with the old
        one. The endpoint&apos;s <InlineCode>hasPreviousSecret</InlineCode> and{" "}
        <InlineCode>previousSecretExpiresAt</InlineCode> fields tell you whether
        a window is active.
      </DocParagraph>
      <DocParagraph>A safe rotation runbook:</DocParagraph>
      <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
        <li>
          Make sure your receiver accepts <em>either</em> signature header (see{" "}
          <a
            href="#verifying-signatures"
            className="text-primary underline underline-offset-4"
          >
            Verifying signatures
          </a>
          ).
        </li>
        <li>
          Rotate the endpoint from the Webhooks page and copy the newly shown
          secret.
        </li>
        <li>
          Deploy the new secret to your receiver — deliveries keep verifying via
          the previous signature until you do.
        </li>
        <li>
          After the grace window expires, the previous secret stops being used
          automatically. Nothing else to clean up.
        </li>
      </ol>
    </DocSection>
  );
}
