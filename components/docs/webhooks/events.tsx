/**
 * Event names and `data` payload fields are hand-copied from swiftydoc-api.
 * Source of truth: src/common/webhooks/webhook-events.ts (names), the
 * emitEvent() call sites in src/modules (per-event payload fields), and
 * WebhookService.enrichEventData (the shared context blocks below).
 */
import { CodeBlock } from "@/components/docs/code-block";
import {
  DocParagraph,
  DocSection,
  DocSubheading,
} from "@/components/docs/doc-section";
import { DocsTable, InlineCode } from "@/components/docs/docs-table";
import { Badge } from "@/components/ui/badge";

const REQUEST_COMPLETED_EXAMPLE = `{
  "id": "evt_9f6f2c9a1a7b4c1e",
  "type": "request.completed",
  "occurred_at": "2026-07-03T09:41:00.000Z",
  "organization_id": "org_123",
  "data": {
    "requestId": "req_123",
    "requestCode": "RQ-2041",
    "requestTitle": "2026 onboarding documents",
    "requestStatus": "completed",
    "requestDueAt": "2026-07-05T23:59:59.000Z",
    "requestUrl": "https://app.example.com/w/ws_123/requests/req_123",
    "status": "completed",
    "workspaceId": "ws_123",
    "workspaceName": "Client Onboarding",
    "clientId": "cli_123",
    "clientName": "Acme Holdings Ltd.",
    "templateId": "tpl_123",
    "templateName": "Client onboarding pack",
    "ownerName": "Ada Lovelace",
    "ownerEmail": "ada@example.com",
    "assignees": [
      { "userId": "usr_123", "name": "Grace Hopper", "email": "grace@example.com" }
    ],
    "totalSubmissions": 3,
    "completedSubmissions": 3
  }
}`;

const FILE_UPLOADED_EXAMPLE = `{
  "id": "evt_5b2d8e4a6c7d9f1a",
  "type": "file.uploaded",
  "occurred_at": "2026-07-03T09:38:12.000Z",
  "organization_id": "org_123",
  "data": {
    "fileId": "file_123",
    "requestId": "req_123",
    "requestTitle": "2026 onboarding documents",
    "requestUrl": "https://app.example.com/w/ws_123/requests/req_123",
    "clientName": "Acme Holdings Ltd.",
    "recipientName": "John Carter",
    "recipientEmail": "john.carter@acme.example.com",
    "fieldLabel": "Passport copy",
    "sectionTitle": "Identity documents",
    "submissionId": "sub_123",
    "submissionItemId": "item_123",
    "storageKey": "org_123/req_123/passport.pdf",
    "contentType": "application/pdf",
    "sizeBytes": 482133
  }
}`;

/**
 * Resolved server-side on delivery, so they appear on every event carrying the
 * matching id — no emit site passes them.
 */
const CONTEXT_BLOCKS: Array<{
  fields: string[];
  present: string;
  title: string;
}> = [
  {
    title: "Request context",
    present: "every event with a requestId",
    fields: [
      "workspaceId",
      "workspaceName",
      "requestTitle",
      "requestCode",
      "requestStatus",
      "requestDueAt",
      "requestUrl",
      "clientId",
      "clientName",
      "templateId",
      "templateName",
      "ownerName",
      "ownerEmail",
      "assignees",
    ],
  },
  {
    title: "Recipient context",
    present: "every event with a submissionId",
    fields: ["recipientId", "recipientName", "recipientEmail"],
  },
  {
    title: "Field context",
    present: "every event with a submissionItemId",
    fields: ["fieldLabel", "fieldKey", "sectionTitle"],
  },
];

const EVENT_CATALOG: Array<{
  event: string;
  group: string;
  description: string;
}> = [
  {
    event: "request.created",
    group: "Requests",
    description: "A document request was created (in draft).",
  },
  {
    event: "request.sent",
    group: "Requests",
    description: "A request was sent to its recipients.",
  },
  {
    event: "request.viewed",
    group: "Requests",
    description: "A recipient opened a request through their portal link.",
  },
  {
    event: "request.reminder_sent",
    group: "Requests",
    description: "A reminder was delivered to a recipient.",
  },
  {
    event: "request.completed",
    group: "Requests",
    description: "All submissions on a request were completed.",
  },
  {
    event: "request.overdue",
    group: "Requests",
    description: "A request passed its due date without completion.",
  },
  {
    event: "request.closed",
    group: "Requests",
    description: "A request was manually closed as a terminal state.",
  },
  {
    event: "request.cancelled",
    group: "Requests",
    description: "A request was cancelled and marked terminal.",
  },
  {
    event: "submission.updated",
    group: "Submissions",
    description: "A submission's progress or status changed (incl. reopen).",
  },
  {
    event: "submission.submitted",
    group: "Submissions",
    description: "A submission was explicitly finalized/submitted.",
  },
  {
    event: "submission.changes_requested",
    group: "Submissions",
    description: "A review batch rejected one or more items.",
  },
  {
    event: "file.uploaded",
    group: "Files",
    description: "A recipient uploaded a file to a submission item.",
  },
  {
    event: "item.approved",
    group: "Reviews",
    description: "A reviewer approved a submission item.",
  },
  {
    event: "item.rejected",
    group: "Reviews",
    description: "A reviewer rejected a submission item.",
  },
  {
    event: "comment.created",
    group: "Comments",
    description: "A recipient left a comment on a submission item.",
  },
  {
    event: "integration.sync.completed",
    group: "Integrations",
    description: "An integration sync job finished successfully.",
  },
  {
    event: "integration.sync.failed",
    group: "Integrations",
    description: "An integration sync job failed.",
  },
  {
    event: "template.published",
    group: "Templates",
    description: "A template draft was published as a version.",
  },
  {
    event: "workspace.created",
    group: "Workspaces",
    description: "A workspace was created for the organization.",
  },
  {
    event: "user.invited",
    group: "Users",
    description: "An internal user invite was dispatched.",
  },
  {
    event: "user.joined",
    group: "Users",
    description: "An invited internal user completed onboarding.",
  },
  {
    event: "webhook.delivery_failed",
    group: "Webhooks",
    description: "A delivery reached terminal failure state.",
  },
];

/** Event-specific fields, on top of the context blocks above. */
const EVENT_FIELDS: Array<{ event: string; fields: string[] }> = [
  {
    event: "request.created",
    fields: ["requestId", "mode", "status"],
  },
  {
    event: "request.sent",
    fields: ["requestId", "status"],
  },
  {
    event: "request.viewed",
    fields: ["requestId", "submissionId", "portalLinkId"],
  },
  {
    event: "request.reminder_sent",
    fields: [
      "requestId",
      "status",
      "channel",
      "provider",
      "recipient",
      "externalMessageId",
    ],
  },
  {
    event: "request.completed",
    fields: ["requestId", "status", "totalSubmissions", "completedSubmissions"],
  },
  {
    event: "request.overdue",
    fields: ["requestId", "status", "dueAt"],
  },
  {
    event: "request.closed",
    fields: ["requestId", "status", "closedAt"],
  },
  {
    event: "request.cancelled",
    fields: ["requestId", "status", "cancelledAt"],
  },
  {
    event: "submission.updated",
    fields: ["submissionId", "requestId", "progressPercent", "status"],
  },
  {
    event: "submission.submitted",
    fields: [
      "submissionId",
      "requestId",
      "status",
      "progressPercent",
      "submittedAt",
    ],
  },
  {
    event: "submission.changes_requested",
    fields: [
      "requestId",
      "submissionId",
      "rejectedItemCount",
      "reviewedItemCount",
      "submissionStatus",
      "progressPercent",
    ],
  },
  {
    event: "file.uploaded",
    fields: [
      "fileId",
      "requestId",
      "submissionId",
      "submissionItemId",
      "storageKey",
      "contentType",
      "sizeBytes",
    ],
  },
  {
    event: "item.approved / item.rejected",
    fields: [
      "reviewDecisionId",
      "requestId",
      "submissionId",
      "submissionItemId",
      "status",
      "submissionStatus",
      "progressPercent",
    ],
  },
  {
    event: "comment.created",
    fields: [
      "commentId",
      "requestId",
      "submissionId",
      "submissionItemId",
      "authorType",
    ],
  },
  {
    event: "integration.sync.completed",
    fields: [
      "connectionId",
      "externalId",
      "externalObjectType",
      "providerKey",
      "syncJobId",
      "status",
      "mode",
    ],
  },
  {
    event: "integration.sync.failed",
    fields: ["connectionId", "providerKey", "syncJobId", "status", "error"],
  },
  {
    event: "template.published",
    fields: [
      "templateId",
      "workspaceId",
      "status",
      "versionId",
      "versionNumber",
      "fieldCount",
      "changeSummary",
      "schemaChecksum",
    ],
  },
  {
    event: "workspace.created",
    fields: ["workspaceId", "code", "name", "status"],
  },
  {
    event: "user.invited",
    fields: [
      "userId",
      "email",
      "fullName",
      "status",
      "expiresAt",
      "invitedByUserId",
      "membershipCount",
    ],
  },
  {
    event: "user.joined",
    fields: ["userId", "email", "fullName", "status", "joinedAt"],
  },
  {
    event: "webhook.delivery_failed",
    fields: [
      "deliveryId",
      "eventId",
      "eventType",
      "endpointId",
      "endpointUrl",
      "attemptCount",
      "maxAttempts",
      "responseCode",
      "error",
      "reason",
    ],
  },
];

export function WebhooksEvents() {
  return (
    <DocSection id="events" title="Event catalog">
      <DocParagraph>
        Endpoints receive only the events they subscribe to. Subscribe to the
        wildcard <InlineCode>*</InlineCode> to receive everything — that is also
        the default when <InlineCode>subscribedEvents</InlineCode> is omitted at
        registration.
      </DocParagraph>
      <DocsTable
        head={["Event", "Group", "Fired when"]}
        rows={EVENT_CATALOG.map((item) => [
          <InlineCode key="event">{item.event}</InlineCode>,
          <Badge key="group" variant="outline">
            {item.group}
          </Badge>,
          item.description,
        ])}
      />

      <DocSubheading id="event-payloads">Example payloads</DocSubheading>
      <DocParagraph>
        The envelope is identical for every event; only{" "}
        <InlineCode>data</InlineCode> changes. Two complete examples:
      </DocParagraph>
      <CodeBlock label="request.completed" code={REQUEST_COMPLETED_EXAMPLE} />
      <CodeBlock label="file.uploaded" code={FILE_UPLOADED_EXAMPLE} />

      <DocSubheading id="event-context">Shared context fields</DocSubheading>
      <DocParagraph>
        Events carry the IDs of what changed, and we resolve the names behind
        those IDs before delivery — so an automation can title a card or name a
        client without calling the API back. These blocks are added to every
        matching event, on top of the event-specific fields below.
      </DocParagraph>
      <DocsTable
        head={["Block", "Present on", "Fields"]}
        rows={CONTEXT_BLOCKS.map((block) => [
          block.title,
          block.present,
          <span
            key="fields"
            className="inline-flex flex-wrap gap-x-1.5 gap-y-1"
          >
            {block.fields.map((field) => (
              <InlineCode key={field}>{field}</InlineCode>
            ))}
          </span>,
        ])}
      />

      <DocSubheading id="event-fields">
        <InlineCode className="text-sm">data</InlineCode> fields by event
      </DocSubheading>
      <DocsTable
        head={["Event", "data fields"]}
        rows={EVENT_FIELDS.map((item) => [
          <InlineCode key="event">{item.event}</InlineCode>,
          <span
            key="fields"
            className="inline-flex flex-wrap gap-x-1.5 gap-y-1"
          >
            {item.fields.map((field) => (
              <InlineCode key={field}>{field}</InlineCode>
            ))}
          </span>,
        ])}
      />
    </DocSection>
  );
}
