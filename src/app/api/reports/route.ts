import { NextRequest, NextResponse } from "next/server";
import { Prisma, ReportStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { ensureCatalogTemplate } from "@/lib/template-service";
import { asString, parseJsonRecord, requireUser } from "@/lib/route-utils";
import { PLAN_LIMITS } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q");

  const reports = await db.report.findMany({
    where: {
      userId: userId!,
      ...(status && status in ReportStatus ? { status: status as ReportStatus } : {}),
      ...(q ? { title: { contains: q, mode: "insensitive" } } : {}),
    },
    include: { template: true, evidence: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ reports });
}

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  // Usage enforcement
  const user = await db.user.findUnique({
    where: { id: userId! },
    select: { role: true },
  });
  const limit = PLAN_LIMITS[user?.role ?? "FREE"].reportsPerMonth;
  if (isFinite(limit)) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const usedThisMonth = await db.report.count({
      where: { userId: userId!, createdAt: { gte: startOfMonth } },
    });
    if (usedThisMonth >= limit) {
      return NextResponse.json(
        { error: "وصلت للحد الأقصى للتقارير في خطتك المجانية. رقّ للخطة الاحترافية للحصول على تقارير غير محدودة.", limitReached: true },
        { status: 403 }
      );
    }
  }

  const body = parseJsonRecord(await req.json().catch(() => ({})));
  const templateSlug = asString(body.templateSlug || body.templateId);
  const title = asString(body.title || parseJsonRecord(body.data).title, "تقرير جديد");
  const statusValue = asString(body.status, "DRAFT").toUpperCase();

  if (!templateSlug) {
    return NextResponse.json({ error: "Template is required" }, { status: 400 });
  }

  const template = await ensureCatalogTemplate(templateSlug);
  if (!template) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  const report = await db.report.create({
    data: {
      title,
      templateId: template.id,
      userId: userId!,
      data: parseJsonRecord(body.data) as Prisma.InputJsonValue,
      status: statusValue in ReportStatus ? (statusValue as ReportStatus) : "DRAFT",
    },
    include: { template: true, evidence: true },
  });

  await db.template.update({
    where: { id: template.id },
    data: { usageCount: { increment: 1 } },
  });

  return NextResponse.json({ report }, { status: 201 });
}
