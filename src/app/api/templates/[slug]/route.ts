import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { ensureCatalogTemplate } from "@/lib/template-service";
import { asNumber, asString, parseJsonRecord, requireUser } from "@/lib/route-utils";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const template = await ensureCatalogTemplate(slug);

  if (!template) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }

  return NextResponse.json({ template });
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const { response, userId, role } = await requireUser();
  if (response) return response;

  const { slug } = await params;
  const current = await db.template.findFirst({
    where: { OR: [{ id: slug }, { slug }] },
  });

  if (!current) return NextResponse.json({ error: "Template not found" }, { status: 404 });
  if (current.userId !== userId && role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = parseJsonRecord(await req.json().catch(() => ({})));
  const template = await db.template.update({
    where: { id: current.id },
    data: {
      name: asString(body.name, current.name),
      description: body.description === undefined ? current.description : asString(body.description) || null,
      category: asString(body.category, current.category),
      fields: (Array.isArray(body.fields) ? body.fields : current.fields) as Prisma.InputJsonValue,
      pdfConfig: parseJsonRecord(body.pdfConfig) as Prisma.InputJsonValue,
      thumbnail: body.thumbnail === undefined ? current.thumbnail : asString(body.thumbnail) || null,
      price: asNumber(body.price, current.price),
      isPublic: typeof body.isPublic === "boolean" ? body.isPublic : current.isPublic,
    },
  });

  return NextResponse.json({ template });
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { response, userId, role } = await requireUser();
  if (response) return response;

  const { slug } = await params;
  const current = await db.template.findFirst({ where: { OR: [{ id: slug }, { slug }] } });

  if (!current) return NextResponse.json({ error: "Template not found" }, { status: 404 });
  if (current.userId !== userId && role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.template.delete({ where: { id: current.id } });
  return NextResponse.json({ ok: true });
}
