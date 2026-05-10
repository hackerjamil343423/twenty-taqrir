import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { templateCategories, catalogTemplates } from "@/lib/template-catalog";
import { db } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = templateCategories.find((c) => c.id === category);
  if (!cat) return { title: "تصنيف غير موجود | تقارير تونتي" };
  return {
    title: `قوالب ${cat.label} | تقارير تونتي`,
    description: `تصفح قوالب ${cat.label} للتقارير التعليمية المدرسية المتوافقة مع وزارة التعليم`,
    openGraph: {
      title: `قوالب ${cat.label}`,
      locale: "ar_SA",
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return templateCategories.map((c) => ({ category: c.id }));
}

export default async function StoreCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryMeta = templateCategories.find((c) => c.id === category);
  if (!categoryMeta) notFound();

  const filteredTemplates = catalogTemplates.filter((t) => t.category === category);

  // Fetch from DB to get live usage counts & ratings
  const slugs = filteredTemplates.map((t) => t.slug);
  const dbTemplates = await db.template.findMany({
    where: { slug: { in: slugs }, isPublic: true },
    select: { slug: true, usageCount: true, rating: true },
  });
  const dbMap = Object.fromEntries(dbTemplates.map((t) => [t.slug, t]));

  const templates = filteredTemplates.map((t) => ({
    ...t,
    usageCount: dbMap[t.slug]?.usageCount ?? t.usageCount,
    rating: dbMap[t.slug]?.rating ?? t.rating,
  }));

  return (
    <div className="min-h-screen bg-canvas-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-canvas-white border-b border-faded-stone">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/store" className="text-gunmetal-gray hover:text-midnight-ink text-sm">
              ← السوق
            </Link>
            <Link href="/" className="font-arabic text-2xl font-bold text-midnight-ink">
              تقارير تونتي
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="px-5 py-2.5 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[160px]"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 text-sm font-medium text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink"
            >
              ابدأ مجانا
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Category Header */}
        <div className="mb-10">
          <h1 className="font-arabic text-3xl font-bold text-midnight-ink mb-2">
            {categoryMeta.label}
          </h1>
          <p className="text-gunmetal-gray">
            {templates.length} قالب متاح في هذه الفئة
          </p>
        </div>

        {/* Category Nav */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {templateCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/store/${cat.id}`}
              className={`flex-none px-5 py-2.5 rounded-[160px] text-sm font-medium whitespace-nowrap transition-colors ${
                cat.id === category
                  ? "bg-action-black text-canvas-white"
                  : "bg-off-white-sage text-gunmetal-gray hover:text-midnight-ink hover:bg-faded-stone"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gunmetal-gray text-lg mb-4">لا توجد قوالب في هذه الفئة بعد</p>
            <Link href="/store" className="text-highlight-orange hover:underline text-sm">
              تصفح جميع القوالب
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <Link key={template.slug} href={`/store/${template.slug}`} className="group">
                <div className="bg-off-white-sage rounded-[28px] overflow-hidden hover:shadow-md transition-shadow">
                  {/* Thumbnail */}
                  <div className="bg-faded-stone h-44 flex items-center justify-center">
                    <div className="text-center text-gunmetal-gray/50">
                      <div className="text-4xl mb-2">📄</div>
                      <p className="text-xs">معاينة PDF</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-arabic font-semibold text-midnight-ink text-sm mb-2 group-hover:text-highlight-orange transition-colors line-clamp-2">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gunmetal-gray line-clamp-2 mb-4">
                      {template.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gunmetal-gray">
                        <span>★ {template.rating.toFixed(1)}</span>
                        <span>·</span>
                        <span>{template.usageCount.toLocaleString()}</span>
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          template.price === 0 ? "text-green-600" : "text-midnight-ink"
                        }`}
                      >
                        {template.price === 0 ? "مجاني" : `${template.price} ر.س`}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
