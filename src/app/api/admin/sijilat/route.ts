import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCatalogTemplate } from "@/lib/template-catalog";

export async function GET() {
  const sijilat = await db.sijil.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(sijilat);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, templateSlug } = body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "الاسم مطلوب" }, { status: 400 });
  }

  if (!templateSlug || !getCatalogTemplate(templateSlug)) {
    return NextResponse.json({ error: "نوع السجل غير صالح" }, { status: 400 });
  }

  const sijil = await db.sijil.create({
    data: { title: title.trim(), templateSlug },
  });

  return NextResponse.json(sijil, { status: 201 });
}
