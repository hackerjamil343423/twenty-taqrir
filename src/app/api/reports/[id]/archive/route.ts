import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const current = await db.report.findFirst({ where: { id, userId: userId! } });
  if (!current) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  const report = await db.report.update({
    where: { id },
    data: { status: "ARCHIVED" },
    include: { template: true, evidence: true },
  });

  return NextResponse.json({ report });
}
