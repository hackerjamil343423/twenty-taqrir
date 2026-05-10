import type { Role, ReportStatus, TeamRole } from "@prisma/client";

// ─── User ────────────────────────────────────────────────────────────────────

export type UserRole = Role;

export type UserProfile = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  schoolName: string | null;
  region: string | null;
  gradeLevels: string[];
  createdAt: Date;
};

// ─── Reports ─────────────────────────────────────────────────────────────────

export type ReportStatusType = ReportStatus;

export type ReportSummary = {
  id: string;
  title: string;
  status: ReportStatusType;
  version: number;
  updatedAt: string;
  template: { name: string; slug: string };
};

export type ReportDetail = ReportSummary & {
  data: Record<string, unknown>;
  createdAt: string;
  isFavorite: boolean;
  evidence: EvidenceFile[];
};

// ─── Evidence ────────────────────────────────────────────────────────────────

export type EvidenceFile = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  createdAt: string;
};

// ─── Templates ───────────────────────────────────────────────────────────────

export type TemplateSummary = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  thumbnail: string | null;
  price: number;
  rating: number;
  usageCount: number;
  isPublic: boolean;
};

// ─── Team ────────────────────────────────────────────────────────────────────

export type TeamMemberRole = TeamRole;

export type TeamMember = {
  id: string;
  userId: string;
  role: TeamMemberRole;
  joinedAt: string;
  user: { name: string | null; email: string; image: string | null };
};

// ─── API Responses ───────────────────────────────────────────────────────────

export type ApiError = { error: string };
export type ApiSuccess<T> = { data: T };
export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
