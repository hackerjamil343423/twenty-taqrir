import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { catalogTemplates } from "@/lib/template-catalog";
import { ensureCatalogTemplates } from "@/lib/template-service";
import { asNumber, asString, parseJsonRecord, requireUser } from "@/lib/route-utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const q = searchParams.get("q") || undefined;

  try {
    await ensureCatalogTemplates();
    const templates = await db.template.findMany({
      where: {
        isPublic: true,
        ...(category ? { category } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: [{ usageCount: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ templates });
  } catch {
    const filtered = catalogTemplates.filter((template) => {
      const matchesCategory = !category || template.category === category;
      const matchesQuery = !q || `${template.name} ${template.description}`.toLowerCase().includes(q.toLowerCase());
      return matchesCategory && matchesQuery;
    });
    return NextResponse.json({ templates: filtered, fallback: true });
  }
}

export async function POST(req: NextRequest) {
  const { response, userId } = await requireUser();
  if (response) return response;

  const body = parseJsonRecord(await req.json().catch(() => ({})));
  const name = asString(body.name);
  const slug = asString(body.slug || name.toLowerCase().replace(/\s+/g, "-"));
  const category = asString(body.category, "custom");

  if (!name || !slug) {
    return NextResponse.json({ error: "Template name and slug are required" }, { status: 400 });
  }

  const template = await db.template.create({
    data: {
      name,
      slug,
      description: asString(body.description) || null,
      category,
      fields: (Array.isArray(body.fields) ? body.fields : []) as Prisma.InputJsonValue,
      pdfConfig: parseJsonRecord(body.pdfConfig) as Prisma.InputJsonValue,
      thumbnail: asString(body.thumbnail) || null,
      price: asNumber(body.price),
      isPublic: body.isPublic !== false,
      userId: userId!,
    },
  });

  return NextResponse.json({ template }, { status: 201 });
}
