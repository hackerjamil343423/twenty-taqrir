import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const sijil = await db.sijil.findUnique({ where: { id } });
  if (!sijil) {
    return NextResponse.json({ error: "السجل غير موجود" }, { status: 404 });
  }

  await db.sijil.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const sijil = await db.sijil.update({
    where: { id },
    data: {
      ...(body.title && { title: body.title }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
  });

  return NextResponse.json(sijil);
}
