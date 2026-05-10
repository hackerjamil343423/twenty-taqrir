import { db } from "@/lib/db";
import { getCatalogTemplate } from "@/lib/template-catalog";
import { notFound } from "next/navigation";
import { FormClient } from "./form-client";

export default async function PublicFormPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const sijil = await db.sijil.findUnique({
    where: { token, isActive: true },
  });

  if (!sijil) notFound();

  const template = getCatalogTemplate(sijil.templateSlug);
  if (!template) notFound();

  return (
    <FormClient
      token={token}
      title={sijil.title}
      template={template}
    />
  );
}
