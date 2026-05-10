import { NextRequest, NextResponse } from "next/server";
import { Prisma, ReportStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { asString, parseJsonRecord, requireUser } from "@/lib/route-utils";

type RouteContext = { params: Promise<{ id: string }> };

async function getOwnedReport(id: string, userId: string) {
  return db.report.findFirst({
    where: { id, userId },
    include: { template: true, evidence: true },
  });
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const report = await getOwnedReport(id, userId!);
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  return NextResponse.json({ report });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const current = await getOwnedReport(id, userId!);
  if (!current) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const body = parseJsonRecord(await req.json().catch(() => ({})));
  const statusValue = asString(body.status, current.status).toUpperCase();

  const report = await db.report.update({
    where: { id },
    data: {
      title: asString(body.title, current.title),
      data: (body.data === undefined ? current.data : parseJsonRecord(body.data)) as Prisma.InputJsonValue,
      status: statusValue in ReportStatus ? (statusValue as ReportStatus) : current.status,
      version: { increment: 1 },
    },
    include: { template: true, evidence: true },
  });

  return NextResponse.json({ report });
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const current = await getOwnedReport(id, userId!);
  if (!current) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  await db.report.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
