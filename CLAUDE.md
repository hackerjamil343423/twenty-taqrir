# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # Start dev server (Turbopack by default in Next.js 16)
npm run build      # Production build (also Turbopack by default)
npm run start      # Start production server
eslint .           # Lint (next lint was removed in Next.js 16 — use ESLint CLI directly)

npx prisma generate      # Regenerate Prisma client after schema changes
npx prisma migrate dev   # Create and apply a migration
npx prisma db push       # Push schema to DB without migration history
npx prisma studio        # Open database GUI
```

## Next.js 16 Breaking Changes

This project runs **Next.js 16.2.4**, which has significant breaking changes from 15:

- **`middleware` → `proxy`**: The middleware file convention is renamed. This project already uses `src/proxy.ts` with a `proxy` export. Do not create `middleware.ts`.
- **Async Request APIs are fully async** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` in layouts/pages/routes must be `await`ed. Synchronous access is removed.
- **`next lint` removed** — use `eslint` directly. `next build` no longer runs linting.
- **`revalidateTag` requires a second argument** — a `cacheLife` profile string (e.g. `'max'`).
- **`cacheLife` / `cacheTag`** — no longer need `unstable_` prefix; import directly from `next/cache`.
- **Parallel route slots** require explicit `default.js` files or builds fail.
- **`serverRuntimeConfig` / `publicRuntimeConfig` removed** — use `process.env` / `NEXT_PUBLIC_` env vars.
- **`next dev` outputs to `.next/dev`** (separate from `.next/` used by `next build`).

Always read `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Architecture

**Taqriri Twenty** is a Saudi Arabian SaaS platform for teachers to generate PDF reports compliant with Ministry of Education standards. UI is fully RTL Arabic.

### Route Groups

| Group | Path | Purpose |
|-------|------|---------|
| `(auth)` | `/signin`, `/signup` | Email/password + Google/Microsoft OAuth |
| `(dashboard)` | `/dashboard/*` | Protected: reports, templates, analytics, team, settings |
| `(public)` | `/store`, `/pricing`, etc. | Public-facing pages and shared report links |

### Auth

**NextAuth.js v5.0.0-beta.31** with PrismaAdapter. JWT session strategy. Providers: Credentials (bcryptjs), Google OAuth, Microsoft Entra ID (for `.edu` Saudi accounts). Rate-limited signup: 10 attempts per IP per 15 minutes.

- Config: [src/lib/auth.ts](src/lib/auth.ts)
- Route handler: [src/app/api/auth/[...nextauth]/route.ts](src/app/api/auth/[...nextauth]/route.ts)
- Auth guard proxy: [src/proxy.ts](src/proxy.ts) — redirects unauthenticated `/dashboard/*` to `/signin`

### Database

**Prisma v5** with **PostgreSQL** (Neon serverless). Key models: `User` (roles: FREE/PRO/SCHOOL_ADMIN/SUPER_ADMIN), `Report` (statuses: DRAFT/FINAL/ARCHIVED), `Template` (JSON schema for fields), `Evidence` (file attachments), `Team`/`TeamMember`.

- Prisma singleton: [src/lib/db.ts](src/lib/db.ts)
- Template catalog (18 templates, 16 categories): [src/lib/template-catalog.ts](src/lib/template-catalog.ts)

### UI Stack

- **Tailwind CSS v4** + **shadcn/ui** components in [src/components/ui/](src/components/ui/)
- Custom color tokens: `--color-midnight-ink`, `--color-canvas-white`, `--color-highlight-orange` (see [src/app/globals.css](src/app/globals.css))
- Arabic custom font: "The Year of Handicrafts" — root layout is `dir="rtl"`
- **Zustand v5** for client state, **TanStack Query v5** for server state, **Sonner** for toasts
- **@react-pdf/renderer** for PDF generation (uses Cairo font for Arabic); PDF components in [src/components/pdf/](src/components/pdf/)

### File Storage

Files (report evidence) are uploaded to **Cloudflare R2** via [src/app/api/evidence/upload/](src/app/api/evidence/).

## Required Environment Variables

```
DATABASE_URL                     # Neon PostgreSQL
NEXTAUTH_URL                     # e.g. http://localhost:3000
NEXTAUTH_SECRET

AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET
AUTH_MICROSOFT_ID / AUTH_MICROSOFT_SECRET

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME / NEXT_PUBLIC_R2_PUBLIC_URL

RESEND_API_KEY                           # Email (password reset, team invites, welcome)

STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET / NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```
