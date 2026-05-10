import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const report = await db.report.findFirst({ where: { id, userId: userId! } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  // Reuse existing token or generate a new one
  const shareToken = report.shareToken ?? randomBytes(24).toString("hex");
  if (!report.shareToken) {
    await db.report.update({ where: { id }, data: { shareToken, isShared: true } });
  } else if (!report.isShared) {
    await db.report.update({ where: { id }, data: { isShared: true } });
  }

  const origin = req.nextUrl.origin;
  return NextResponse.json({ token: shareToken, url: `${origin}/share/${shareToken}` });
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const report = await db.report.findFirst({ where: { id, userId: userId! } });
  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  await db.report.update({ where: { id }, data: { isShared: false } });
  return NextResponse.json({ ok: true });
}
