"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CatalogTemplate } from "@/lib/template-catalog";

type Template = CatalogTemplate & {
  id?: string;
  isPublic?: boolean;
  updatedAt?: string;
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data.templates || []));
  }, []);

  const filtered = useMemo(
    () => templates.filter((template) => template.name.toLowerCase().includes(search.toLowerCase())),
    [search, templates]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-arabic text-2xl font-bold text-midnight-ink">القوالب</h1>
          <p className="text-gunmetal-gray text-sm mt-1">{templates.length} قالب متاح</p>
        </div>
        <Link href="/dashboard/templates/new" className="px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink">
          + قالب جديد
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث في القوالب..." className="flex-1 max-w-md px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[160px] text-midnight-ink placeholder:text-gunmetal-gray/50 focus:outline-none focus:border-highlight-orange" />
        <div className="flex items-center gap-2 border border-soft-concrete rounded-[160px] p-1">
          <button onClick={() => setView("grid")} className={`px-4 py-2 rounded-[160px] text-sm font-medium ${view === "grid" ? "bg-action-black text-canvas-white" : "text-gunmetal-gray"}`}>شبكة</button>
          <button onClick={() => setView("list")} className={`px-4 py-2 rounded-[160px] text-sm font-medium ${view === "list" ? "bg-action-black text-canvas-white" : "text-gunmetal-gray"}`}>قائمة</button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => <TemplateCard key={template.slug} template={template} />)}
        </div>
      ) : (
        <div className="bg-off-white-sage rounded-[32px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-soft-concrete">
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">القالب</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">الفئة</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">الاستخدام</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">السعر</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((template) => (
                <tr key={template.slug} className="border-b border-soft-concrete last:border-0">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/templates/${template.slug}`} className="font-medium text-midnight-ink hover:text-highlight-orange">{template.name}</Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gunmetal-gray">{template.category}</td>
                  <td className="px-6 py-4 text-sm text-gunmetal-gray">{template.usageCount}</td>
                  <td className="px-6 py-4 text-sm text-gunmetal-gray">{template.price === 0 ? "مجاني" : `${template.price} ر.س`}</td>
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/reports/new/${template.slug}`} className="px-3 py-1.5 text-xs text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone">استخدام</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="bg-off-white-sage rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow border border-transparent hover:border-highlight-orange">
      <div className="bg-faded-stone h-32 flex items-center justify-center">
        <span className="text-gunmetal-gray text-sm">معاينة القالب</span>
      </div>
      <div className="p-5">
        <span className="text-xs text-gunmetal-gray bg-canvas-white px-2 py-1 rounded-full">{template.category}</span>
        <h3 className="font-arabic text-base font-semibold text-midnight-ink my-3">{template.name}</h3>
        <div className="flex items-center justify-between text-xs text-gunmetal-gray">
          <span>{template.usageCount} استخدام</span>
          <span>{template.price === 0 ? "مجاني" : `${template.price} ر.س`}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <Link href={`/dashboard/templates/${template.slug}`} className="flex-1 px-3 py-2 text-center text-xs text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone">عرض</Link>
          <Link href={`/dashboard/reports/new/${template.slug}`} className="flex-1 px-3 py-2 text-center text-xs text-canvas-white bg-action-black rounded-[160px]">استخدام</Link>
        </div>
      </div>
    </div>
  );
}
