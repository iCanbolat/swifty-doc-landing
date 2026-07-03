/**
 * Endpoint list is hand-copied from swiftydoc-api. Source of truth:
 * src/infrastructure/webhooks/webhooks.controller.ts and
 * oauth-webhooks.controller.ts (OAuth mirror), plus dto/*.
 */
import { Callout } from "@/components/docs/callout"
import { CodeBlock } from "@/components/docs/code-block"
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section"
import { DocsTable, InlineCode } from "@/components/docs/docs-table"
import { Badge } from "@/components/ui/badge"

type Method = "GET" | "POST" | "PATCH" | "DELETE"

const METHOD_VARIANT: Record<
  Method,
  "info" | "default" | "warning" | "danger"
> = {
  GET: "info",
  POST: "default",
  PATCH: "warning",
  DELETE: "danger",
}

const ENDPOINTS: Array<{
  method: Method
  path: string
  scope: "webhooks.read" | "webhooks.write"
  description: string
}> = [
  {
    method: "GET",
    path: "/v1/webhooks/endpoints",
    scope: "webhooks.read",
    description: "List registered endpoints (paginated, searchable).",
  },
  {
    method: "POST",
    path: "/v1/webhooks/endpoints",
    scope: "webhooks.write",
    description:
      "Register an endpoint: url, secret (8–255 chars), optional subscribedEvents.",
  },
  {
    method: "PATCH",
    path: "/v1/webhooks/endpoints/:id",
    scope: "webhooks.write",
    description: "Update url, enabled, or subscribedEvents.",
  },
  {
    method: "DELETE",
    path: "/v1/webhooks/endpoints/:id",
    scope: "webhooks.write",
    description: "Disable an endpoint (soft delete — sets enabled to false).",
  },
  {
    method: "POST",
    path: "/v1/webhooks/endpoints/:id/ping",
    scope: "webhooks.write",
    description:
      "Send a signed test delivery; optional eventType and payload in the body.",
  },
  {
    method: "POST",
    path: "/v1/webhooks/endpoints/:id/rotate-secret",
    scope: "webhooks.write",
    description:
      "Rotate the signing secret; optional secret in the body, otherwise server-generated.",
  },
  {
    method: "POST",
    path: "/v1/webhooks/events",
    scope: "webhooks.write",
    description:
      "Emit a typed event to all matching endpoints (useful for integration testing).",
  },
  {
    method: "GET",
    path: "/v1/webhook-deliveries",
    scope: "webhooks.read",
    description:
      "List delivery attempts; filter by endpointId and status (queued | delivered | failed).",
  },
  {
    method: "POST",
    path: "/v1/webhook-deliveries/:id/replay",
    scope: "webhooks.write",
    description: "Re-send a historical delivery's payload as a new delivery.",
  },
]

const EMIT_EVENT_REQUEST = `curl -X POST https://api.swiftydoc.io/v1/webhooks/events \\
  -H "Authorization: Bearer $SWIFTYDOC_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "eventType": "request.completed",
    "payload": { "requestId": "req_test", "status": "completed" }
  }'`

export function WebhooksApiReference() {
  return (
    <DocSection id="api-reference" title="API reference">
      <DocParagraph>
        All routes require a bearer token, the{" "}
        <strong className="text-foreground">Enterprise</strong> plan, and the
        listed permission scope. OAuth partner applications use the identical
        surface mirrored under <InlineCode>/v1/oauth/webhooks</InlineCode> and{" "}
        <InlineCode>/v1/oauth/webhook-deliveries</InlineCode>.
      </DocParagraph>
      <DocsTable
        head={["Method", "Path", "Scope", "Description"]}
        rows={ENDPOINTS.map((endpoint) => [
          <Badge key="m" variant={METHOD_VARIANT[endpoint.method]}>
            {endpoint.method}
          </Badge>,
          <InlineCode key="p">{endpoint.path}</InlineCode>,
          <InlineCode key="s">{endpoint.scope}</InlineCode>,
          endpoint.description,
        ])}
      />
      <Callout>
        Endpoint responses are wrapped in a{" "}
        <InlineCode>{`{ "data": … }`}</InlineCode> envelope; list responses
        add a <InlineCode>meta</InlineCode> pagination object. See{" "}
        <a
          href="#quick-start"
          className="text-primary underline underline-offset-4"
        >
          Quick start
        </a>{" "}
        for a full register example,{" "}
        <a
          href="#secret-rotation"
          className="text-primary underline underline-offset-4"
        >
          Secret rotation
        </a>{" "}
        for rotate, and{" "}
        <a
          href="#delivery"
          className="text-primary underline underline-offset-4"
        >
          Delivery &amp; retries
        </a>{" "}
        for listing and replaying deliveries.
      </Callout>

      <DocSubheading id="emit-test-event">Emitting a test event</DocSubheading>
      <DocParagraph>
        Unlike a ping (which targets one endpoint),{" "}
        <InlineCode>POST /v1/webhooks/events</InlineCode> runs the full fan-out
        pipeline: the event is delivered to every enabled endpoint whose
        subscriptions match.
      </DocParagraph>
      <CodeBlock label="POST /v1/webhooks/events" code={EMIT_EVENT_REQUEST} />
    </DocSection>
  )
}
