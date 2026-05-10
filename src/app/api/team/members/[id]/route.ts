import { NextRequest, NextResponse } from "next/server";
import { TeamRole } from "@prisma/client";
import { db } from "@/lib/db";
import { asString, parseJsonRecord, requireUser } from "@/lib/route-utils";

type RouteContext = { params: Promise<{ id: string }> };

async function requireAdmin(userId: string, memberId: string) {
  const target = await db.teamMember.findUnique({ where: { id: memberId } });
  if (!target) return { target: null, allowed: false };

  const admin = await db.teamMember.findFirst({
    where: { teamId: target.teamId, userId, role: "ADMIN" },
  });
  return { target, allowed: !!admin };
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const { target, allowed } = await requireAdmin(userId!, id);
  if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });
  if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = parseJsonRecord(await req.json().catch(() => ({})));
  const roleValue = asString(body.role, target.role).toUpperCase();
  const member = await db.teamMember.update({
    where: { id },
    data: { role: roleValue in TeamRole ? (roleValue as TeamRole) : target.role },
    include: { user: true },
  });

  return NextResponse.json({ member });
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const { id } = await params;
  const { target, allowed } = await requireAdmin(userId!, id);
  if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });
  if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await db.teamMember.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
