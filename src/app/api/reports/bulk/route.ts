import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const body = await req.json().catch(() => ({}));
  const action = body?.action as string;
  const ids = Array.isArray(body?.ids) ? (body.ids as string[]) : [];

  if (!ids.length) {
    return NextResponse.json({ error: "لا توجد تقارير محددة" }, { status: 400 });
  }

  // Verify ownership of all reports
  const owned = await db.report.findMany({
    where: { id: { in: ids }, userId: userId! },
    select: { id: true },
  });
  const ownedIds = owned.map((r) => r.id);

  if (action === "delete") {
    await db.report.deleteMany({ where: { id: { in: ownedIds } } });
    return NextResponse.json({ deleted: ownedIds.length });
  }

  if (action === "archive") {
    await db.report.updateMany({
      where: { id: { in: ownedIds } },
      data: { status: "ARCHIVED" },
    });
    return NextResponse.json({ archived: ownedIds.length });
  }

  if (action === "favorite" || action === "unfavorite") {
    await db.report.updateMany({
      where: { id: { in: ownedIds } },
      data: { isFavorite: action === "favorite" },
    });
    return NextResponse.json({ updated: ownedIds.length });
  }

  return NextResponse.json({ error: "إجراء غير صالح" }, { status: 400 });
}
