import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { catalogTemplates, getCatalogTemplate } from "@/lib/template-catalog";

export async function ensureCatalogTemplate(slug: string) {
  const existing = await db.template.findUnique({ where: { slug } });
  if (existing) return existing;

  const template = getCatalogTemplate(slug);
  if (!template) return null;

  return db.template.create({
    data: {
      name: template.name,
      slug: template.slug,
      description: template.description,
      category: template.category,
      fields: template.fields as unknown as Prisma.InputJsonValue,
      pdfConfig: template.pdfConfig as Prisma.InputJsonValue,
      thumbnail: template.thumbnail,
      price: template.price,
      rating: template.rating,
      usageCount: template.usageCount,
      isPublic: true,
    },
  });
}

export async function ensureCatalogTemplates() {
  await Promise.all(catalogTemplates.map((template) => ensureCatalogTemplate(template.slug)));
}
