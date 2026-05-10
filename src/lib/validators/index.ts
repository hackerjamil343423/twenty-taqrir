import { z } from "zod";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const signupSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100),
  email: z.string().email("بريد إلكتروني غير صالح").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .max(128),
  schoolName: z.string().max(200).optional(),
  region: z.string().max(100).optional(),
  gradeLevels: z
    .array(z.enum(["elementary", "middle", "high"]))
    .optional()
    .default([]),
});

export const signinSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح").toLowerCase().trim(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").max(128),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirm"],
  });

// ─── Reports ─────────────────────────────────────────────────────────────────

export const createReportSchema = z.object({
  title: z.string().min(1, "عنوان التقرير مطلوب").max(200),
  templateId: z.string().cuid(),
  data: z.record(z.string(), z.unknown()),
});

export const updateReportSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(["DRAFT", "FINAL", "ARCHIVED"]).optional(),
  isFavorite: z.boolean().optional(),
});

// ─── Templates ───────────────────────────────────────────────────────────────

export const createTemplateSchema = z.object({
  name: z.string().min(1, "اسم القالب مطلوب").max(200),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "الـ slug يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط"),
  description: z.string().max(1000).optional(),
  category: z.string().min(1),
  fields: z.array(z.record(z.string(), z.unknown())),
  pdfConfig: z.record(z.string(), z.unknown()).optional().default({}),
  price: z.number().min(0).optional().default(0),
});

// ─── Team ─────────────────────────────────────────────────────────────────────

export const inviteMemberSchema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).default("VIEWER"),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]),
});

// ─── Settings ─────────────────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  schoolName: z.string().max(200).optional(),
  region: z.string().max(100).optional(),
  gradeLevels: z.array(z.enum(["elementary", "middle", "high"])).optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

// ─── Types inferred from schemas ──────────────────────────────────────────────

export type SignupInput = z.infer<typeof signupSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
export type UpdateReportInput = z.infer<typeof updateReportSchema>;
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
