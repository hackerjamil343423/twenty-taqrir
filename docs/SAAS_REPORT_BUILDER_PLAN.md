# ReportPro SaaS — Comprehensive Build Plan

> A professional report generation platform inspired by Taqriri, built with Next.js 15, Tailwind CSS v4, the Titan design system, and TheYearofHandicrafts Arabic font.

---

## 1. Concept & Vision

**تقارير تونتي (Taqriri Twenty)** is a Saudi Arabian educational SaaS platform that enables teachers to create, manage, and export professionally designed PDF reports — initiatives, certificates, achievement portfolios, remediation plans, and surveys — with official Ministry of Education formatting.

**Core Value Proposition:** Teachers fill a form, get a beautifully designed PDF in seconds.

**Design Identity:** Titan-style monochrome financial ledger with a distinctive Arabic calligraphic touch. TheYearofHandicrafts font brings warmth and authenticity to Arabic content, paired with sharp black/white palette, subtle warm sage tones, and minimal orange accents. Pill-shaped interactive elements, generous whitespace, premium feel. The design bridges traditional Arabic aesthetics with modern SaaS precision.

---

## 2. Design System — Titan Monochrome

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `--color-midnight-ink` | `#111111` | Primary text, headers |
| `--color-canvas-white` | `#ffffff` | Page backgrounds |
| `--color-off-white-sage` | `#f3efeb` | Card backgrounds, secondary surfaces |
| `--color-faded-stone` | `#e9eaeb` | Borders, dividers, nav backgrounds |
| `--color-gunmetal-gray` | `#615e5b` | Secondary text, muted elements |
| `--color-soft-concrete` | `#d8d3cc` | Subtle borders on ghost buttons |
| `--color-action-black` | `#000000` | Primary CTA buttons |
| `--color-highlight-orange` | `#ff9900` | Accents, decorative strokes |

### Typography

| Role | Size | Weight | Token |
|------|------|--------|-------|
| Display | 60px | 700 | `--text-display` |
| Display SM | 40px | 700 | `--text-display-sm` |
| Heading LG | 32px | 700 | `--text-heading-lg` |
| Heading | 24px | 700 | `--text-heading` |
| Heading SM | 20px | 500 | `--text-heading-sm` |
| Body LG | 16px | 400 | `--text-body-lg` |
| Body | 14px | 400 | `--text-body` |
| Body SM | 12px | 400 | `--text-body-sm` |
| Caption | 10px | 400 | `--text-caption` |

**Font Family:**
- **TheYearofHandicrafts** — Primary Arabic font for all headings and body text. Google Font with distinctive Arabic calligraphy style that adds warmth and authenticity.
- **Geist** — For English text and numbers within the UI
- **Geist Mono** — For data/code elements, numerical displays

**Google Fonts Import:**
```
@import url('https://fonts.googleapis.com/css2?family=The+Year+of+Handicrafts:wght@400;500;600;700&display=swap');
```

### Spacing System (Base: 4px)

| Token | Value |
|-------|-------|
| `--spacing-4` | 4px |
| `--spacing-8` | 8px |
| `--spacing-16` | 16px |
| `--spacing-24` | 24px |
| `--spacing-28` | 28px |
| `--spacing-32` | 32px |
| `--spacing-40` | 40px |
| `--spacing-52` | 52px |
| `--spacing-56` | 56px |
| `--spacing-64` | 64px |
| `--spacing-80` | 80px |
| `--spacing-88` | 88px |

### Border Radii

| Element | Radius |
|---------|--------|
| Cards | 32px |
| Cards (secondary) | 20px |
| Buttons (Primary/Ghost) | 160px |
| Navigation links | 140px |
| Small elements | 10px |

### Component Specifications

**Primary Filled Button**
- Background: `#000000`
- Text: `#ffffff`
- Border-radius: 160px
- Padding: 24px horizontal, 11px vertical
- Font: Geist 500

**Ghost Button**
- Background: transparent
- Text: `#111111`
- Border: 1px `#d8d3cc`
- Border-radius: 160px
- Padding: 24px horizontal, 11px vertical

**Feature Card (Primary)**
- Background: `#f3efeb`
- Border-radius: 20px
- Padding: 28px

**Feature Card (Expanded)**
- Background: `#f3efeb`
- Border-radius: 32px
- Padding: 56px vertical, 28-56px horizontal

**Navigation Link**
- Border-radius: 140px
- Padding: 11px vertical, 18px horizontal
- Text: `#111111`

---

## 3. Tech Stack

### Frontend (Web)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| React | 19.x | UI library |
| Tailwind CSS | v4 | Utility-first CSS |
| TypeScript | 5.x | Type safety |
| shadcn/ui | latest | Base component library |
| Radix UI | latest | Headless primitives |
| Lucide React | latest | Icons |
| React Hook Form | latest | Form management |
| Zod | latest | Schema validation |
| TanStack Query | latest | Server state |
| Zustand | latest | Client state |
| NextAuth.js | v5 | Authentication |
| Stripe | latest | Payments |

### Mobile (Expo)

| Technology | Purpose |
|------------|---------|
| Expo | React Native framework |
| Expo Router | File-based routing |
| React Native | Mobile UI |
| expo-print | PDF generation on mobile |
| expo-sharing | Share/export PDFs |
| expo-file-system | Local file storage |

### Backend & Database

| Technology | Purpose |
|------------|---------|
| Next.js API Routes | Backend API |
| Prisma | ORM |
| **Neon** | Serverless PostgreSQL database |
| Supabase | Auth, Storage |
| Vercel | Hosting (Web) |

### PDF Generation

| Technology | Purpose |
|------------|---------|
| @react-pdf/renderer | React-based PDF generation (web) |
| expo-print | PDF generation (mobile) |
| html2canvas | DOM to image for complex layouts |
| jsPDF | Low-level PDF manipulation |

### Storage & Media

| Technology | Purpose |
|------------|---------|
| Cloudflare R2 | File uploads, evidence, PDF storage |
| Cloudinary | Image optimization |

---

## 4. Feature Specification

### 4.1 Authentication System

**Sign Up / Sign In**
- Email/password authentication
- Google OAuth
- Microsoft OAuth (for Saudi .edu emails)
- Email verification
- Password reset flow

**User Roles**
| Role | Permissions |
|------|------------|
| Free | 3 reports/month, basic templates |
| Pro | Unlimited reports, all templates, priority support |
| School Admin | Manage team, view all school reports |
| Super Admin | Platform management |

**Profile Management**
- School name
- Education region (Saudi regions)
- Grade levels taught
- Profile photo

### 4.2 Template Library

**Report Categories:**

| Category | Templates |
|----------|-----------|
| Educational Initiatives | 10 templates |
| Event Reports | 14 templates (National Day, Founding Day, etc.) |
| Program/Activity Reports | 4 templates |
| Professional Development | 5 templates |
| Teaching Strategy Reports | 3 templates |
| Parent Communication Reports | 3 templates |
| Student Performance Reports | 4 templates |
| Remediation & Enrichment Plans | 3 templates |
| Tech & Resources Reports | 3 templates |
| Certificates | 9 templates |
| Records & Sheets | 2 templates |
| Surveys | 3 templates |
| Classroom Management | 3 templates |
| Learning Environment | 3 templates |
| Assessment Diversity Reports | 2 templates |
| Job Function Reports | 3 templates |

**Template Features:**
- Preview thumbnails
- Category filtering
- Search functionality
- Favorite/bookmark templates
- Recently used

### 4.3 Store Page (Template Marketplace)

**Purpose:** Public-facing template storefront where users can browse, preview, and purchase/download templates.

**Store Sections:**

| Section | Content |
|---------|---------|
| Featured Templates | Highlighted premium templates |
| Categories | Grid of all template categories |
| New Arrivals | Recently added templates |
| Top Sellers | Most downloaded templates |
| Free Templates | No-cost basic templates |
| Premium Templates | Paid templates (Pro/School) |

**Store Features:**
- Template preview with full details
- Live form preview (interactive)
- Rating and review system
- Download count
- Price display (free/paid)
- "Try Now" button (creates report)
- "Buy Template" for premium
- Filter by: category, price, rating, date
- Sort by: newest, popular, price
- Search with autocomplete

**Template Card Component:**
```
┌─────────────────────────────┐
│  [Template Preview Image]   │
│                             │
│  Template Name              │
│  Category • 5.0 ★ ★ ★ ★ ★  │
│  Downloads: 1,234           │
│                             │
│  [Free] or [SAR 9.99]       │
│                             │
│  [Preview] [Use Template]   │
└─────────────────────────────┘
```

**Pricing Tiers for Templates:**
| Tier | Price Range | Access |
|------|-------------|--------|
| Free | 0 SAR | All users |
| Standard | 5-15 SAR | Pro users |
| Premium | 15-30 SAR | Pro users |
| School | Custom | School plan |

### 4.3 Report Builder (Form System)

**Field Types:**

| Field Type | Component | Description |
|------------|-----------|-------------|
| Text Input | `<Input>` | Single-line text |
| Textarea | `<Textarea>` | Multi-line text |
| Dropdown | `<Select>` | Single selection from options |
| Multi-Select | `<MultiSelect>` | Multiple selections |
| Checkbox Group | `<CheckboxGroup>` | Multiple checkboxes |
| Radio Group | `<RadioGroup>` | Single choice |
| Date Picker | `<DatePicker>` | Date selection |
| Date Range | `<DateRangePicker>` | Date range |
| Number | `<Input type="number">` | Numeric input |
| File Upload | `<FileUpload>` | Evidence upload |
| Signature | `<SignaturePad>` | Digital signature |
| Table | `<DynamicTable>` | Editable table |
| Rating | `<Rating>` | Star/numeric rating |

**Form Builder Schema Example:**
```typescript
interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // for dropdowns, checkboxes, radio
  validation?: ZodSchema;
  conditional?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains';
    value: any;
  };
}

interface FormTemplate {
  id: string;
  name: string;
  category: string;
  fields: FormField[];
  pdfTemplate: PDFTemplateConfig;
}
```

### 4.4 PDF Generation

**Generation Flow:**
1. User fills form
2. Client-side validation
3. Submit to API
4. Store in database
5. Generate PDF via `@react-pdf/renderer`
6. Store PDF in Supabase
7. Return download URL

**PDF Templates:**
- Ministry of Education header
- Official branding (can be customized by school)
- Arabic RTL layout
- Table-based data display
- Signature lines
- QR code for verification (optional)
- Watermark for draft/final

**Export Options:**
- PDF (primary)
- DOCX (future)
- Print-ready

### 4.5 Report History

**Features:**
- List all created reports
- Filter by: date range, template, status (draft/final)
- Search by title/content
- Sort by: newest, oldest, alphabetical
- Bulk actions: delete, duplicate, export
- Version history (track edits)
- Share link generation
- Report templates (save form as personal template)

### 4.6 Dashboard

**Sections:**
- **Overview Stats**
  - Total reports created
  - Reports this month
  - Favorite templates
  - Storage used

- **Recent Reports**
  - Last 5 created reports with quick actions

- **Quick Actions**
  - Create new report (grid of template categories)
  - Continue draft
  - View history

- **Calendar View**
  - Reports by date
  - Upcoming deadlines

### 4.7 Team Management (School Plan)

- Invite team members via email
- Role assignment (Admin, Editor, Viewer)
- Shared template library
- Team report analytics
- School branding settings

---

## 5. Database Schema

```prisma
// Core Models

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?
  emailVerified DateTime?
  image         String?
  role          Role      @default(FREE)
  schoolName    String?
  region        String?
  gradeLevels   String[]  // ["elementary", "middle", "high"]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  reports       Report[]
  templates     Template[]
}

enum Role {
  FREE
  PRO
  SCHOOL_ADMIN
  SUPER_ADMIN
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Report {
  id          String   @id @default(cuid())
  title       String
  templateId  String
  userId      String
  data        Json     // Form responses
  pdfUrl      String?
  status      ReportStatus @default(DRAFT)
  version     Int      @default(1)
  isFavorite  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  template    Template @relation(fields: [templateId], references: [id])
  user        User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum ReportStatus {
  DRAFT
  FINAL
  ARCHIVED
}

model Template {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  category    String
  fields      Json     // Form schema
  pdfConfig   Json     // PDF layout config
  thumbnail   String?
  isPublic    Boolean  @default(true)
  usageCount  Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  reports     Report[]
  user        User?    @relation(fields: [userId], references: [id])
  userId      String?
}

model Evidence {
  id        String   @id @default(cuid())
  reportId  String
  fileName  String
  fileUrl   String
  fileType  String
  fileSize  Int
  createdAt DateTime @default(now())
}

model Team {
  id          String   @id @default(cuid())
  name        String
  schoolName  String
  adminId     String
  createdAt   DateTime @default(now())
  members     TeamMember[]
  branding    Json?    // Custom colors, logo
}

model TeamMember {
  id        String     @id @default(cuid())
  teamId    String
  userId    String
  role      TeamRole   @default(MEMBER)
  joinedAt  DateTime   @default(now())
  team      Team       @relation(fields: [teamId], references: [id], onDelete: Cascade)
}

enum TeamRole {
  ADMIN
  EDITOR
  VIEWER
}
```

---

## 6. API Design

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | Sign in with credentials |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/signout` | Sign out |

### Template Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/templates` | List all templates (public) |
| GET | `/api/templates/[slug]` | Get template by slug |
| POST | `/api/templates` | Create custom template (authenticated) |
| PUT | `/api/templates/[id]` | Update template |
| DELETE | `/api/templates/[id]` | Delete template |
| GET | `/api/templates/categories` | List categories |
| GET | `/api/store/templates` | Store listing with filters |
| GET | `/api/store/featured` | Featured templates |
| GET | `/api/store/search` | Search templates |

### Report Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports` | List user's reports |
| GET | `/api/reports/[id]` | Get report details |
| POST | `/api/reports` | Create new report |
| PUT | `/api/reports/[id]` | Update report |
| DELETE | `/api/reports/[id]` | Delete report |
| POST | `/api/reports/[id]/generate-pdf` | Generate PDF |
| GET | `/api/reports/[id]/download` | Download PDF |
| POST | `/api/reports/[id]/duplicate` | Duplicate report |
| POST | `/api/reports/[id]/archive` | Archive report |

### Evidence Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/evidence/upload` | Upload evidence file |
| DELETE | `/api/evidence/[id]` | Delete evidence |
| GET | `/api/evidence/[id]` | Get evidence details |

### Team Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/team` | Get user's team |
| POST | `/api/team/invite` | Invite member |
| PUT | `/api/team/members/[id]` | Update member role |
| DELETE | `/api/team/members/[id]` | Remove member |

---

## 7. Page Structure

### Public Pages
- `/` — Landing page
- `/features` — Features overview
- `/pricing` — Pricing plans
- `/store` — Template marketplace/store
- `/store/[category]` — Templates by category
- `/store/[slug]` — Template detail/preview
- `/auth/signin` — Sign in
- `/auth/signup` — Sign up

### Dashboard (Authenticated)
- `/dashboard` — Overview with stats
- `/dashboard/reports` — Report history
- `/dashboard/reports/[id]` — Edit/view report
- `/dashboard/reports/new/[template]` — Create new report
- `/dashboard/templates` — My templates
- `/dashboard/templates/new` — Create template
- `/dashboard/team` — Team management
- `/dashboard/settings` — Account settings

---

## 8. Component Architecture

### Layout Components
```
<DashboardLayout>
  <Sidebar />          // Navigation
  <Header />           // Page title, actions
  <MainContent />      // Page content
</DashboardLayout>
```

### Form Components
```
<FormField>
  ├── <Input />
  ├── <Textarea />
  ├── <Select />
  ├── <MultiSelect />
  ├── <CheckboxGroup />
  ├── <RadioGroup />
  ├── <DatePicker />
  ├── <FileUpload />
  └── <SignaturePad />

<FormBuilder>
  ├── <FieldRenderer />
  └── <FormActions />
```

### Report Components
```
<ReportPreview />       // Live preview
<PDFDocument />         // PDF generation
<ReportCard />          // History list item
<ReportFilters />       // Filter bar
```

### UI Components (Titan Design)
```
<Button variant="primary" />   // Filled, 160px radius
<Button variant="ghost" />      // Outlined
<Button variant="navigation" /> // Text link style
<Card variant="default" />      // Off-white sage
<Card variant="expanded" />     // Larger padding
<Input />                       // Form input
<Select />                      // Dropdown
<Badge />                       // Status tags
<Avatar />                     // User profile
<Table />                      // Data tables
```

---

## 9. Implementation Phases

### Phase 1: Foundation (Weeks 1-3)
- [ ] Next.js 15 project setup with App Router
- [ ] Tailwind CSS v4 configuration with Titan tokens + TheYearofHandicrafts font
- [ ] shadcn/ui installation and theming
- [ ] Neon database setup (serverless PostgreSQL) + Prisma
- [ ] Authentication with NextAuth.js v5 (email, Google, Microsoft)
- [ ] Basic layout components (Dashboard, Sidebar, Header)
- [ ] Landing page with Titan styling + Arabic RTL support

### Phase 2: Core Features (Weeks 4-6)
- [ ] Template system (list, preview, categories)
- [ ] Form builder infrastructure
- [ ] All 10+ field types implementation
- [ ] Report creation flow
- [ ] Report list with filtering/sorting
- [ ] React Hook Form + Zod integration

### Phase 3: PDF Generation (Weeks 7-8)
- [ ] @react-pdf/renderer setup
- [ ] PDF templates (Health initiative, National Day, Certificate)
- [ ] Arabic RTL support in PDF
- [ ] Ministry of Education header/footer
- [ ] Evidence upload and attachment
- [ ] PDF download flow

### Phase 4: Advanced Features (Weeks 9-10)
- [ ] Team management
- [ ] Report sharing
- [ ] Dashboard analytics
- [ ] Search functionality
- [ ] Favorites/bookmarks
- [ ] Template ratings and reviews

### Phase 5: Polish & Launch (Weeks 11-12)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] SEO optimization
- [ ] Error handling & loading states
- [ ] Email notifications
- [ ] Documentation
- [ ] Beta testing
- [ ] Launch

---

## 10. File Structure

```
/
├── app/
│   ├── (auth)/
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── reports/
│   │   │   ├── templates/
│   │   │   ├── team/
│   │   │   ├── settings/
│   │   │   └── billing/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── features/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── store/
│   │   │   ├── page.tsx           # Store homepage
│   │   │   ├── [category]/page.tsx # Category listing
│   │   │   └── [slug]/page.tsx    # Template detail
│   │   └── template/[slug]/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── templates/
│   │   ├── reports/
│   │   ├── evidence/
│   │   └── team/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── forms/              # Form field components
│   ├── reports/            # Report-specific components
│   ├── layout/             # Layout components
│   ├── pdf/                # PDF generation components
│   └── store/              # Store-specific components
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── db.ts               # Prisma client
│   ├── r2.ts               # Cloudflare R2 config
│   ├── utils.ts            # Utility functions
│   └── validators/         # Zod schemas
├── prisma/
│   └── schema.prisma
├── public/
│   └── fonts/
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11. Key Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "typescript": "^5.0.0",
    "next-auth": "^5.0.0-beta.25",
    "@prisma/client": "^6.0.0",
    "@react-pdf/renderer": "^4.0.0",
    "react-hook-form": "^7.54.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.0",
    "@tanstack/react-query": "^5.60.0",
    "zustand": "^5.0.0",
    "lucide-react": "^0.460.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",
    "date-fns": "^4.1.0",
    "@supabase/supabase-js": "^2.46.0",
    "@aws-sdk/client-s3": "^3.0.0",
    "sonner": "^1.7.0",
    "radix-ui": "^1.1.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.0"
  }
}
```

---

## 12. Environment Variables

```env
# Database (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxx-xxx-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_MICROSOFT_ID="your-microsoft-client-id"
AUTH_MICROSOFT_SECRET="your-microsoft-client-secret"

# Supabase (Auth)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Cloudflare R2 (File Storage)
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key"
R2_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_BUCKET_NAME="your-bucket-name"
NEXT_PUBLIC_R2_PUBLIC_URL="https://pub-your-id.r2.dev"

# Cloudinary (Image Optimization)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---

## 13. Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Reports created per user
- Template usage distribution
- Average session duration

### Conversion
- Free → Pro conversion rate
- Trial start rate
- Monthly recurring revenue (MRR)

### Technical
- PDF generation time < 3 seconds
- Page load time < 2 seconds
- 99.9% uptime
- Error rate < 0.1%

---

## 14. Competitive Advantages

1. **Titan Design + TheYearofHandicrafts** — Distinctive monochrome aesthetic with authentic Arabic calligraphy font that stands out from typical Arabic SaaS
2. **Speed** — Instant PDF generation vs. manual formatting
3. **Template Variety** — 50+ Saudi-specific templates with Store marketplace
4. **RTL Excellence** — Perfect Arabic typography and layout
5. **Ministry Compliance** — Official formatting accepted by Saudi Education
6. **Evidence System** — Built-in file upload for documentation
7. **Multi-user** — Team collaboration for schools
8. **API Access** — School plan with API for integrations
9. **Mobile Ready** — Expo app for iOS/Android access

---

## 15. Future Roadmap

- **Mobile App** — React Native for iOS/Android
- **Offline Mode** — PWA with sync
- **AI Writing Assistant** — Auto-fill form suggestions
- **Bulk Generation** — Create multiple reports from spreadsheet
- **Integration APIs** — Madrasa, Nejaz, Saudi e-School
- **WhatsApp Integration** — Send reports to parents
- **Arabic Voice Input** — Speech-to-text for form filling
- **Analytics Dashboard** — School-wide reporting
