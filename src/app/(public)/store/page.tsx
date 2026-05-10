"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CatalogTemplate } from "@/lib/template-catalog";

type StoreTemplate = CatalogTemplate & { id?: string };
type Category = { id: string; label: string; count: number };

export default function StorePage() {
  const [templates, setTemplates] = useState<StoreTemplate[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/templates/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (search) params.set("q", search);
    fetch(`/api/store/templates?${params}`)
      .then((res) => res.json())
      .then((data) => setTemplates(data.templates || []));
  }, [category, search]);

  const featured = useMemo(() => templates.slice(0, 4), [templates]);

  return (
    <div className="min-h-screen bg-canvas-white">
      <header className="sticky top-0 z-10 bg-canvas-white border-b border-faded-stone">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" className="font-arabic text-2xl font-bold text-midnight-ink">تقارير تونتي</Link>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="px-5 py-2.5 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[160px]">تسجيل الدخول</Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-medium text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink">ابدأ مجانا</Link>
          </div>
        </div>
      </header>

      <section className="bg-off-white-sage px-8 py-16 text-center">
        <h1 className="font-arabic text-5xl font-bold text-midnight-ink mb-4">سوق القوالب</h1>
        <p className="text-gunmetal-gray text-lg max-w-xl mx-auto mb-8">قوالب تعليمية سعودية جاهزة للتخصيص والتصدير PDF.</p>
        <div className="max-w-xl mx-auto relative">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن قالب..." className="w-full px-6 py-4 bg-canvas-white border border-soft-concrete rounded-[160px] text-midnight-ink placeholder:text-gunmetal-gray focus:outline-none focus:border-highlight-orange" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-2">
          <button onClick={() => setCategory("all")} className={`px-5 py-2.5 rounded-[160px] text-sm font-medium whitespace-nowrap ${category === "all" ? "bg-action-black text-canvas-white" : "bg-off-white-sage text-gunmetal-gray"}`}>الكل</button>
          {categories.map((item) => (
            <button key={item.id} onClick={() => setCategory(item.id)} className={`px-5 py-2.5 rounded-[160px] text-sm font-medium whitespace-nowrap ${category === item.id ? "bg-action-black text-canvas-white" : "bg-off-white-sage text-gunmetal-gray"}`}>
              {item.label} ({item.count})
            </button>
          ))}
        </div>

        <h2 className="font-arabic text-2xl font-bold text-midnight-ink mb-6">القوالب المميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featured.map((template) => <TemplateCard key={template.slug} template={template} />)}
        </div>

        <h2 className="font-arabic text-2xl font-bold text-midnight-ink mb-6">جميع القوالب</h2>
        {templates.length === 0 ? (
          <div className="bg-off-white-sage rounded-[32px] p-8 text-gunmetal-gray">لا توجد قوالب مطابقة</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => <TemplateCard key={template.slug} template={template} />)}
          </div>
        )}
      </section>
    </div>
  );
}

function TemplateCard({ template }: { template: StoreTemplate }) {
  return (
    <Link href={`/store/${template.slug}`} className="bg-off-white-sage rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow border border-transparent hover:border-highlight-orange group">
      <div className="bg-faded-stone h-40 flex items-center justify-center">
        <span className="text-gunmetal-gray text-sm">معاينة القالب</span>
      </div>
      <div className="p-5">
        <h3 className="font-arabic text-base font-semibold text-midnight-ink mb-2 group-hover:text-highlight-orange">{template.name}</h3>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-gunmetal-gray bg-canvas-white px-2 py-1 rounded-full">{template.category}</span>
          <span className="text-xs text-gunmetal-gray">★ {template.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gunmetal-gray">{template.usageCount.toLocaleString()} استخدام</span>
          <span className={`font-medium text-sm ${template.price === 0 ? "text-green-600" : "text-midnight-ink"}`}>
            {template.price === 0 ? "مجاني" : `${template.price} ر.س`}
          </span>
        </div>
      </div>
    </Link>
  );
}
