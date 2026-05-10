import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryLabel } from "@/lib/template-catalog";
import { ensureCatalogTemplate } from "@/lib/template-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await ensureCatalogTemplate(slug).catch(() => null);
  if (!template) return { title: "قالب غير موجود | تقارير تونتي" };
  return {
    title: `${template.name} | تقارير تونتي`,
    description: template.description ?? `قالب ${template.name} للتقارير التعليمية المدرسية`,
    openGraph: {
      title: template.name,
      description: template.description ?? undefined,
      locale: "ar_SA",
      type: "website",
    },
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await ensureCatalogTemplate(slug).catch(() => null);

  if (!template) notFound();

  const fields = Array.isArray(template.fields)
    ? (template.fields as { id: string; label?: string; type?: string; required?: boolean }[])
    : [];

  return (
    <div className="min-h-screen bg-canvas-white">
      <header className="sticky top-0 z-10 bg-canvas-white border-b border-faded-stone">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/store" className="text-gunmetal-gray hover:text-midnight-ink text-sm">العودة للسوق</Link>
            <Link href="/" className="font-arabic text-2xl font-bold text-midnight-ink">تقارير تونتي</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="px-5 py-2.5 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[160px]">تسجيل الدخول</Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-medium text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink">ابدأ مجانا</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <section>
            <div className="bg-off-white-sage rounded-[32px] p-8 mb-8">
              <div className="bg-canvas-white rounded-[20px] border border-soft-concrete h-64 flex items-center justify-center mb-6">
                <span className="text-gunmetal-gray">معاينة PDF للقالب</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gunmetal-gray bg-faded-stone px-3 py-1 rounded-full">{getCategoryLabel(template.category)}</span>
                <span className="text-sm text-gunmetal-gray">★ {template.rating}</span>
                <span className="text-sm text-gunmetal-gray">{template.usageCount.toLocaleString()} استخدام</span>
              </div>
              <h1 className="font-arabic text-3xl font-bold text-midnight-ink mb-4">{template.name}</h1>
              <p className="text-gunmetal-gray leading-relaxed">{template.description}</p>
            </div>

            <h2 className="font-arabic text-xl font-semibold text-midnight-ink mb-4">حقول النموذج</h2>
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.id} className="flex items-center justify-between px-5 py-3 bg-off-white-sage rounded-[16px]">
                  <div className="flex items-center gap-3">
                    <span className="text-gunmetal-gray text-sm">{field.type}</span>
                    <span className="text-midnight-ink text-sm font-medium">{field.label}</span>
                  </div>
                  {field.required && <span className="text-xs text-highlight-orange bg-orange-100 px-2 py-0.5 rounded-full">مطلوب</span>}
                </div>
              ))}
            </div>
          </section>

          <aside>
            <div className="bg-midnight-ink text-canvas-white rounded-[32px] p-8 mb-8 sticky top-24">
              <div className="mb-6">
                <span className="text-4xl font-bold">{template.price === 0 ? "مجاني" : `${template.price} ر.س`}</span>
                <p className="text-gray-400 text-sm mt-1">{template.price === 0 ? "متاح للجميع" : "متاح للمشتركين في الباقة الاحترافية"}</p>
              </div>
              <Link href={`/dashboard/reports/new/${template.slug}`} className="block w-full py-4 text-center bg-highlight-orange text-midnight-ink font-semibold rounded-[160px] hover:bg-orange-500 transition-colors mb-3">
                استخدم هذا القالب
              </Link>
              <Link href="/pricing" className="block w-full py-4 text-center border border-gray-600 text-canvas-white font-medium rounded-[160px] hover:bg-gray-800 transition-colors">
                عرض الباقات
              </Link>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>PDF جاهز للطباعة</li>
                  <li>دعم كامل للعربية RTL</li>
                  <li>إمكانية رفع الشواهد</li>
                  <li>حفظ في سجل التقارير</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
