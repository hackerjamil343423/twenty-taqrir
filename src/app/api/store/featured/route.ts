import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { catalogTemplates } from "@/lib/template-catalog";
import { ensureCatalogTemplates } from "@/lib/template-service";

export async function GET() {
  try {
    await ensureCatalogTemplates();
    const templates = await db.template.findMany({
      where: { isPublic: true },
      orderBy: [{ rating: "desc" }, { usageCount: "desc" }],
      take: 8,
    });
    return NextResponse.json({ templates });
  } catch {
    return NextResponse.json({ templates: catalogTemplates.filter((template) => template.featured), fallback: true });
  }
}
