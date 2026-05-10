import Link from "next/link";
import { notFound } from "next/navigation";
import { ensureCatalogTemplate } from "@/lib/template-service";

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = await ensureCatalogTemplate(id).catch(() => null);
  if (!template) notFound();

  const fields = Array.isArray(template.fields)
    ? (template.fields as { id: string; label?: string; type?: string; required?: boolean }[])
    : [];

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/templates" className="text-sm text-gunmetal-gray hover:text-midnight-ink">العودة للقوالب</Link>
        <h1 className="font-arabic text-2xl font-bold text-midnight-ink mt-3">{template.name}</h1>
        <p className="text-gunmetal-gray text-sm mt-1">{template.description}</p>
      </div>

      <div className="bg-off-white-sage rounded-[32px] p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <Metric label="الفئة" value={template.category} />
          <Metric label="التقييم" value={String(template.rating)} />
          <Metric label="الاستخدام" value={String(template.usageCount)} />
        </div>
        <Link href={`/dashboard/reports/new/${template.slug}`} className="inline-block px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink transition-colors">
          إنشاء تقرير من القالب
        </Link>
      </div>

      <div className="bg-off-white-sage rounded-[32px] p-8">
        <h2 className="font-arabic text-xl font-semibold text-midnight-ink mb-5">حقول النموذج</h2>
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex items-center justify-between bg-canvas-white rounded-[16px] px-4 py-3">
              <span className="text-midnight-ink">{field.label}</span>
              <span className="text-xs text-gunmetal-gray">{field.type}{field.required ? " · مطلوب" : ""}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-canvas-white rounded-[20px] p-5">
      <div className="text-xs text-gunmetal-gray">{label}</div>
      <div className="font-medium text-midnight-ink">{value}</div>
    </div>
  );
}
