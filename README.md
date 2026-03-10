# BEAST Restoration CRM

Production-oriented monorepo scaffold for a restoration and mitigation CRM.

## Stack
- API: NestJS + Prisma + PostgreSQL
- Web: Next.js (App Router) + Tailwind-ready scaffold
- Queue: BullMQ + Redis (scaffolded in infra)
- Storage: S3-compatible (MinIO in local infra)

## Run locally
1. `cp .env.example .env`
2. `docker compose -f infra/docker-compose.yml up -d`
3. `pnpm install`
4. `pnpm --filter @beast/api prisma migrate dev --name init`
5. `pnpm --filter @beast/api prisma db seed`
6. `pnpm dev`

## CSV import demo (`customers.csv`)
- Drop files under `imports/sample_batch/`
- Run API endpoint `POST /imports/customers` with `{ "path": "imports/sample_batch/customers.csv", "dryRun": true }`
- Response includes summary and reject entries.

## Repo layout
- `apps/api` NestJS API
- `apps/web` Next.js app
- `packages/shared` shared types
- `prisma` schema
- `docs` ADR/API/IMPORT docs
- `infra` local dependencies and DB bootstrap
