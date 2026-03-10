# CSV Imports

## Batch model
- `manifest.json` defines file order and batch metadata.
- Each file import creates `import_rows` audit records with status.

## Idempotency
- upsert key: `(organization_id, external_id)`

## customers.csv schema
Required:
- `external_id`, `type`, `name`

Optional:
- `email`, `phone`, `billing_address_line1`, `billing_address_line2`, `billing_city`, `billing_state`, `billing_postal_code`, `billing_country`, `notes`

## Dry-run
- validates all rows, records rejects, skips persistence.

## Rejects
- generated as row-level objects containing `line`, `external_id`, and `errors[]`.
