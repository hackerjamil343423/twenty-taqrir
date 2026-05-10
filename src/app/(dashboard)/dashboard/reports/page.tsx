"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Report = {
  id: string;
  title: string;
  status: "DRAFT" | "FINAL" | "ARCHIVED";
  isFavorite: boolean;
  version: number;
  updatedAt: string;
  template: { name: string; slug: string };
};

const statusConfig = {
  DRAFT: { label: "مسودة", bg: "bg-yellow-100", text: "text-yellow-700" },
  FINAL: { label: "نهائي", bg: "bg-green-100", text: "text-green-700" },
  ARCHIVED: { label: "مؤرشف", bg: "bg-gray-100", text: "text-gray-500" },
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data.reports || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredReports = useMemo(
    () =>
      reports.filter((report) => {
        const matchesFilter =
          filter === "all"
            ? true
            : filter === "favorites"
            ? report.isFavorite
            : report.status === filter;
        const matchesSearch = report.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    [filter, reports, search]
  );

  const allSelected =
    filteredReports.length > 0 && filteredReports.every((r) => selected.has(r.id));

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredReports.map((r) => r.id)));
    }
  };

  const bulkAction = async (action: string) => {
    const ids = [...selected];
    if (!ids.length) return;
    setBulkLoading(true);
    const res = await fetch("/api/reports/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ids }),
    });
    if (res.ok) {
      if (action === "delete") {
        setReports((curr) => curr.filter((r) => !ids.includes(r.id)));
      } else if (action === "archive") {
        setReports((curr) =>
          curr.map((r) => (ids.includes(r.id) ? { ...r, status: "ARCHIVED" as const } : r))
        );
      }
      setSelected(new Set());
    }
    setBulkLoading(false);
  };

  const toggleFavorite = async (id: string, current: boolean) => {
    const res = await fetch("/api/reports/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: current ? "unfavorite" : "favorite", ids: [id] }),
    });
    if (res.ok) {
      setReports((curr) =>
        curr.map((r) => (r.id === id ? { ...r, isFavorite: !current } : r))
      );
    }
  };

  const filters = [
    { id: "all", label: "الكل" },
    { id: "favorites", label: "المفضلة ★" },
    { id: "DRAFT", label: "مسودة" },
    { id: "FINAL", label: "نهائي" },
    { id: "ARCHIVED", label: "مؤرشف" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-arabic text-2xl font-bold text-midnight-ink">تقاريري</h1>
          <p className="text-gunmetal-gray text-sm mt-1">إجمالي {reports.length} تقرير</p>
        </div>
        <Link
          href="/dashboard/reports/new/active-learning-initiative"
          className="px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink"
        >
          + تقرير جديد
        </Link>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث في التقارير..."
          className="flex-1 min-w-[240px] max-w-md px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[160px] text-midnight-ink placeholder:text-gunmetal-gray/50 focus:outline-none focus:border-highlight-orange"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-[160px] text-sm font-medium ${
                filter === id
                  ? "bg-action-black text-canvas-white"
                  : "bg-off-white-sage text-gunmetal-gray hover:text-midnight-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-4 px-6 py-3 bg-midnight-ink text-canvas-white rounded-[20px]">
          <span className="text-sm font-medium">
            {selected.size} تقرير محدد
          </span>
          <div className="flex-1" />
          <button
            onClick={() => bulkAction("archive")}
            disabled={bulkLoading}
            className="px-4 py-1.5 text-xs bg-yellow-500 text-white rounded-[160px] hover:bg-yellow-400 disabled:opacity-60"
          >
            أرشفة
          </button>
          <button
            onClick={() => bulkAction("delete")}
            disabled={bulkLoading}
            className="px-4 py-1.5 text-xs bg-red-500 text-white rounded-[160px] hover:bg-red-400 disabled:opacity-60"
          >
            حذف
          </button>
          <button
            onClick={() => setSelected(new Set())}
            className="px-4 py-1.5 text-xs border border-canvas-white/30 text-canvas-white rounded-[160px] hover:border-canvas-white/60"
          >
            إلغاء
          </button>
        </div>
      )}

      <div className="bg-off-white-sage rounded-[32px] overflow-hidden">
        {loading ? (
          <div className="p-8 text-gunmetal-gray">جاري تحميل التقارير...</div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gunmetal-gray mb-4">لا توجد تقارير بعد</p>
            <Link
              href="/dashboard/reports/new/active-learning-initiative"
              className="inline-block px-5 py-2.5 bg-action-black text-canvas-white rounded-[160px] text-sm"
            >
              إنشاء أول تقرير
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-soft-concrete">
                <th className="px-4 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-soft-concrete accent-action-black cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">
                  التقرير
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">
                  القالب
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">
                  الحالة
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">
                  آخر تحديث
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gunmetal-gray">
                  الإصدار
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => {
                const status = statusConfig[report.status];
                const isChecked = selected.has(report.id);
                return (
                  <tr
                    key={report.id}
                    className={`border-b border-soft-concrete last:border-0 hover:bg-faded-stone/30 ${
                      isChecked ? "bg-faded-stone/50" : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelect(report.id)}
                        className="w-4 h-4 rounded border-soft-concrete accent-action-black cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleFavorite(report.id, report.isFavorite)}
                          className={`text-lg leading-none transition-colors ${
                            report.isFavorite
                              ? "text-yellow-400"
                              : "text-gunmetal-gray/30 hover:text-yellow-300"
                          }`}
                          title={report.isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                        >
                          ★
                        </button>
                        <Link
                          href={`/dashboard/reports/${report.id}`}
                          className="font-medium text-midnight-ink hover:text-highlight-orange"
                        >
                          {report.title}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gunmetal-gray">
                      {report.template.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${status.bg} ${status.text}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gunmetal-gray">
                      {new Date(report.updatedAt).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gunmetal-gray">
                      v{report.version}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          const res = await fetch(`/api/reports/${report.id}`, { method: "DELETE" });
                          if (res.ok) setReports((curr) => curr.filter((r) => r.id !== report.id));
                        }}
                        className="px-3 py-1.5 text-xs text-red-500 border border-red-200 rounded-[160px] hover:bg-red-50"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
