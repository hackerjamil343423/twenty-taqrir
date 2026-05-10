"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { catalogTemplates } from "@/lib/template-catalog";
import Link from "next/link";

export default function NewSijilPage() {
  const [title, setTitle] = useState("");
  const [templateSlug, setTemplateSlug] = useState(catalogTemplates[0]?.slug ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/sijilat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), templateSlug }),
    });

    if (res.ok) {
      router.push("/admin/sijilat");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "حدث خطأ، حاول مجدداً");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <Link href="/admin/sijilat" className="text-sm text-gunmetal-gray hover:text-midnight-ink mb-2 inline-block">
          ← العودة للسجلات
        </Link>
        <h1 className="text-2xl font-bold text-midnight-ink">إنشاء سجل جديد</h1>
        <p className="text-sm text-gunmetal-gray mt-1">
          بعد الإنشاء ستحصل على رابط تشاركه مع عميلك
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[20px] p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-midnight-ink mb-2">
            اسم السجل <span className="text-highlight-orange">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-soft-concrete rounded-[10px] text-midnight-ink focus:outline-none focus:border-highlight-orange transition-colors"
            placeholder="مثال: سجل متابعة الطلاب - الفصل الأول"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-midnight-ink mb-2">
            نوع السجل <span className="text-highlight-orange">*</span>
          </label>
          <select
            value={templateSlug}
            onChange={(e) => setTemplateSlug(e.target.value)}
            className="w-full px-4 py-3 border border-soft-concrete rounded-[10px] text-midnight-ink focus:outline-none focus:border-highlight-orange transition-colors bg-white"
          >
            {catalogTemplates.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
          {templateSlug && (
            <p className="text-xs text-gunmetal-gray mt-2">
              {catalogTemplates.find((t) => t.slug === templateSlug)?.description}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-[10px]">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="w-full bg-midnight-ink text-white py-3 rounded-[160px] font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {loading ? "جارٍ الإنشاء..." : "إنشاء السجل"}
        </button>
      </form>
    </div>
  );
}
