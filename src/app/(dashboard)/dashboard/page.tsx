"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Report = {
  id: string;
  title: string;
  status: "DRAFT" | "FINAL" | "ARCHIVED";
  updatedAt: string;
  template: { name: string };
};

type Template = { slug: string; name: string; category: string };

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    fetch("/api/reports").then((res) => res.json()).then((data) => setReports(data.reports || []));
    fetch("/api/templates").then((res) => res.json()).then((data) => setTemplates(data.templates || []));
  }, []);

  const reportsThisMonth = useMemo(() => {
    const now = new Date();
    return reports.filter((report) => {
      const date = new Date(report.updatedAt);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;
  }, [reports]);

  const recentReports = reports.slice(0, 5);
  const quickTemplates = templates.slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Metric label="إجمالي التقارير" value={String(reports.length)} />
        <Metric label="هذا الشهر" value={String(reportsThisMonth)} />
        <Metric label="القوالب المتاحة" value={String(templates.length)} />
        <Metric label="التقارير النهائية" value={String(reports.filter((report) => report.status === "FINAL").length)} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">التقارير الأخيرة</h2>
          <Link href="/dashboard/reports" className="text-sm text-highlight-orange hover:underline">عرض الكل</Link>
        </div>
        <div className="bg-off-white-sage rounded-[20px] overflow-hidden">
          {recentReports.length === 0 ? (
            <div className="p-8 text-center text-gunmetal-gray">لا توجد تقارير بعد</div>
          ) : (
            recentReports.map((report, index) => (
              <Link key={report.id} href={`/dashboard/reports/${report.id}`} className={`flex items-center justify-between px-6 py-4 hover:bg-faded-stone/40 ${index !== recentReports.length - 1 ? "border-b border-soft-concrete" : ""}`}>
                <div>
                  <div className="font-medium text-midnight-ink">{report.title}</div>
                  <div className="text-xs text-gunmetal-gray">{report.template.name} · {new Date(report.updatedAt).toLocaleDateString("ar-SA")}</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-canvas-white text-gunmetal-gray">{report.status}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="font-arabic text-xl font-semibold text-midnight-ink mb-5">إنشاء تقرير جديد</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickTemplates.map((template) => (
            <Link key={template.slug} href={`/dashboard/reports/new/${template.slug}`} className="bg-off-white-sage rounded-[20px] p-5 text-center hover:shadow-lg transition-shadow border border-transparent hover:border-highlight-orange">
              <div className="font-arabic text-sm font-medium text-midnight-ink mb-1">{template.name}</div>
              <div className="text-xs text-gunmetal-gray">{template.category}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-off-white-sage rounded-[20px] p-6">
      <div className="text-sm text-gunmetal-gray mb-1">{label}</div>
      <div className="font-arabic text-3xl font-bold text-midnight-ink">{value}</div>
    </div>
  );
}
