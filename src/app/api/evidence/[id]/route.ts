import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/route-utils";

type RouteContext = { params: Promise<{ id: string }> };

async function getOwnedEvidence(id: string, userId: string) {
  return db.evidence.findFirst({
    where: { id, report: { userId } },
    include: { report: true },
  });
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const evidence = await getOwnedEvidence(id, userId!);
  if (!evidence) return NextResponse.json({ error: "Evidence not found" }, { status: 404 });

  return NextResponse.json({ evidence });
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const evidence = await getOwnedEvidence(id, userId!);
  if (!evidence) return NextResponse.json({ error: "Evidence not found" }, { status: 404 });

  await db.evidence.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
