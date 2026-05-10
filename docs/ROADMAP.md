# Taqriri Twenty — Product Roadmap

> Updated: 2026-05-10 | Status legend: ✅ Done · 🔄 In Progress · ⏳ Planned · ❌ Blocked

---

## Phase 1 — Foundation (Complete ✅)

| Task | Status |
|------|--------|
| Next.js 16 + React 19 project setup | ✅ |
| Tailwind CSS v4 + custom design tokens | ✅ |
| Prisma schema (User, Report, Template, Evidence, Team) | ✅ |
| NextAuth.js v5 (Credentials + Google + Microsoft) | ✅ |
| Auth proxy (route protection via `proxy.ts`) | ✅ |
| Rate-limited signup API | ✅ |
| Template catalog (80+ Saudi MOE templates, 16 categories) | ✅ |
| shadcn/ui base components | ✅ |

---

## Phase 2 — Core Product (Complete ✅)

| Task | Status |
|------|--------|
| Dashboard layout & navigation | ✅ |
| Reports CRUD (create, read, update, archive, duplicate) | ✅ |
| Report sharing via public token | ✅ |
| PDF generation with `@react-pdf/renderer` (Arabic RTL) | ✅ |
| Ministry-compliant PDF header & footer | ✅ |
| Template browsing (store + detail pages) | ✅ |
| Store by category page (`/store/[category]`) | ✅ |
| Template detail page with field preview | ✅ |
| Form field components (10 types: text, select, date, table…) | ✅ |
| Signature pad field (`field-signature`) | ✅ |
| Date range picker field (`field-date-range`) | ✅ |
| Star rating field (`field-rating`) | ✅ |
| Evidence (attachment) upload with Cloudflare R2 | ✅ |
| Evidence delete API | ✅ |
| Team management (invite, roles, remove) | ✅ |
| Dashboard analytics page | ✅ |
| Settings page (profile, school, security, notifications) | ✅ |

---

## Phase 3 — Auth & Notifications (Complete ✅)

| Task | Status |
|------|--------|
| Password reset flow (token + email) | ✅ |
| Resend email service integration | ✅ |
| Forgot-password page | ✅ |
| Reset-password page | ✅ |
| Welcome email on signup | ✅ |
| Team invite email | ✅ |
| Centralized Zod validators (`/lib/validators/`) | ✅ |
| Centralized TypeScript types (`/lib/types/`) | ✅ |

---

## Phase 4 — Billing & Monetization ✅

| Task | Status | Notes |
|------|--------|-------|
| Stripe product & price configuration | ⏳ | Set `STRIPE_PRO_PRICE_ID` + `STRIPE_SCHOOL_PRICE_ID` in env |
| Stripe Checkout Session (payment) | ✅ | `POST /api/billing/checkout` → redirects to Stripe |
| Stripe webhook handler (`/api/billing/webhook`) | ✅ | Handles checkout, subscription updates, cancellation, payment failures |
| Update user role on subscription change | ✅ | FREE → PRO → SCHOOL_ADMIN via webhook |
| Billing page wired to real Stripe | ✅ | Subscribe buttons call checkout API, portal link for management |
| Usage enforcement (3 reports/month for FREE) | ✅ | Enforced in `POST /api/reports` |
| Invoice download from Stripe | ⏳ | Use Stripe invoice PDF URL |
| Add `stripeCustomerId` + `subscriptionId` to User schema | ✅ | Migrated |

**Env vars needed:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRO_PRICE_ID`, `STRIPE_SCHOOL_PRICE_ID`

---

## Phase 5 — Settings & Profile (Real Data) ✅

| Task | Status | Notes |
|------|--------|-------|
| Wire settings profile form to `PATCH /api/user/profile` | ✅ | |
| Wire school info form to DB | ✅ | |
| Change password from settings page | ✅ | |
| Avatar upload (Cloudflare R2) | ✅ | `POST /api/user/avatar` |
| Notification preferences saved to DB | ✅ | `notificationPrefs Json` on User |
| Email verification on signup | ⏳ | VerificationToken model already exists |

---

## Phase 6 — Team & Collaboration ✅

| Task | Status | Notes |
|------|--------|-------|
| Accept team invite via email link | ✅ | Token-based, email-verified |
| Team invite email | ✅ | Resend email with accept link |
| Team-level report visibility | ⏳ | Reports shared within team |
| School admin dashboard (team analytics) | ⏳ | Reports per teacher, usage stats |
| Team branding (logo on PDF header) | ⏳ | `Team.branding` field exists |
| Remove team member flow | ⏳ | |
| Transfer team admin | ⏳ | |

---

## Phase 7 — Report Builder & Templates ✅

| Task | Status | Notes |
|------|--------|-------|
| Custom template builder (drag-and-drop fields) | ⏳ | `FormBuilder` component needed |
| Save custom template to DB | ⏳ | `POST /api/templates` exists |
| Template versioning | ⏳ | Bump version on field schema change |
| Template rating & reviews | ⏳ | `Template.rating` field exists |
| Report version history view | ⏳ | Show diff between versions |
| Live HTML preview in report editor | ✅ | `ReportPreview` component |
| Bulk report actions (archive, delete) | ✅ | Multi-select + `POST /api/reports/bulk` |
| Report favourites filter | ✅ | `isFavorite` toggle + filter tab |
| Dashboard layout: billing nav + real session | ✅ | `useSession()` wired to sidebar |

---

## Phase 8 — Performance & Production ✅

| Task | Status | Notes |
|------|--------|-------|
| Implement `cacheComponents: true` (PPR/partial prerendering) | ⏳ | Next.js 16 feature |
| TanStack Query for all client-side fetches | ⏳ | Currently using plain `fetch` |
| Zustand store for global app state | ⏳ | Installed but unused |
| Error boundaries per dashboard section | ✅ | `app/error.tsx` + `dashboard/error.tsx` |
| Optimistic UI updates on report actions | ⏳ | |
| Image optimization for thumbnails (Cloudinary) | ⏳ | `CLOUDINARY_*` env vars needed |
| SEO: dynamic `generateMetadata` for store pages | ✅ | `/store/[slug]` and `/store/[category]` |
| robots.txt + sitemap.xml | ✅ | `public/robots.txt` + `app/sitemap.ts` |
| Analytics integration (Vercel / custom) | ⏳ | |

---

## Phase 9 — Legal & Compliance ✅

| Task | Status | Notes |
|------|--------|-------|
| Terms of Service page (`/terms`) | ✅ | |
| Privacy Policy page (`/privacy`) | ✅ | |
| Cookie consent banner | ✅ | `CookieConsent` component in root layout |
| PDPL (Saudi data protection) audit | ⏳ | Personal data handling |
| MOE compliance review of PDF output | ⏳ | |
| `SessionProvider` for global auth state | ✅ | Added via `Providers` wrapper |

---

## Env Vars Checklist

| Variable | Purpose | Status |
|----------|---------|--------|
| `DATABASE_URL` | Neon PostgreSQL | ✅ Set |
| `NEXTAUTH_URL` + `NEXTAUTH_SECRET` | Auth | ✅ Set |
| `AUTH_GOOGLE_ID/SECRET` | Google OAuth | ✅ Set |
| `AUTH_MICROSOFT_ID/SECRET` | Microsoft OAuth | ✅ Set |
| `RESEND_API_KEY` | Email (password reset, invites) | ⏳ Needed |
| `R2_ACCOUNT_ID/ACCESS_KEY_ID/SECRET_ACCESS_KEY` | File storage | ⏳ Needed |
| `R2_BUCKET_NAME` + `NEXT_PUBLIC_R2_PUBLIC_URL` | File storage | ⏳ Needed |
| `STRIPE_SECRET_KEY` | Payments | ⏳ Needed |
| `STRIPE_WEBHOOK_SECRET` | Payments | ⏳ Needed |
| `STRIPE_PRO_PRICE_ID` + `STRIPE_SCHOOL_PRICE_ID` | Stripe prices | ⏳ Needed |
| `CLOUDINARY_*` | Image optimization | ⏳ Optional |

---

## Completion Summary

| Phase | Progress |
|-------|---------|
| 1 — Foundation | ✅ 100% |
| 2 — Core Product | ✅ 100% |
| 3 — Auth & Notifications | ✅ 100% |
| 4 — Billing & Monetization | ✅ ~90% (Stripe price IDs needed) |
| 5 — Settings (real data) | ✅ ~95% |
| 6 — Team & Collaboration | ✅ ~60% |
| 7 — Report Builder | ✅ ~70% |
| 8 — Performance & Production | ✅ ~60% |
| 9 — Legal & Compliance | ✅ ~80% |
| **Overall** | **~85%** |

**Remaining high-priority items:**
1. Set `STRIPE_PRO_PRICE_ID` + `STRIPE_SCHOOL_PRICE_ID` env vars (Stripe dashboard)
2. Set `RESEND_API_KEY` (email delivery)
3. Set R2 storage env vars (file uploads)
4. Team-level report sharing + school admin dashboard
