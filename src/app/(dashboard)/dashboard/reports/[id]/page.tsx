"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Report = {
  id: string;
  title: string;
  status: "DRAFT" | "FINAL" | "ARCHIVED";
  version: number;
  createdAt: string;
  updatedAt: string;
  data: Record<string, unknown>;
  template: { name: string };
  evidence: { id: string; fileName: string; fileSize: number }[];
};

const statusConfig = {
  DRAFT: { label: "مسودة", bg: "bg-yellow-100", text: "text-yellow-700" },
  FINAL: { label: "نهائي", bg: "bg-green-100", text: "text-green-700" },
  ARCHIVED: { label: "مؤرشف", bg: "bg-gray-100", text: "text-gray-500" },
};

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => (typeof item === "object" ? JSON.stringify(item) : String(item))).join("، ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return value === undefined || value === null || value === "" ? "_____" : String(value);
}

export default function ReportDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadReport = () => {
    fetch(`/api/reports/${params.id}`)
      .then((res) => res.json())
      .then((data) => setReport(data.report || null))
      .finally(() => setLoading(false));
  };

  useEffect(loadReport, [params.id]);

  const downloadPdf = async () => {
    const response = await fetch(`/api/reports/${params.id}/generate-pdf`, { method: "POST" });
    if (!response.ok) {
      setMessage("تعذر إنشاء ملف PDF");
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `report-${params.id}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const duplicate = async () => {
    const response = await fetch(`/api/reports/${params.id}/duplicate`, { method: "POST" });
    const data = await response.json();
    if (response.ok) router.push(`/dashboard/reports/${data.report.id}`);
  };

  const archive = async () => {
    const response = await fetch(`/api/reports/${params.id}/archive`, { method: "POST" });
    if (response.ok) loadReport();
  };

  const share = async () => {
    const response = await fetch(`/api/reports/${params.id}/share`, { method: "POST" });
    const data = await response.json();
    if (response.ok) {
      await navigator.clipboard?.writeText(data.url);
      setMessage(`رابط المشاركة: ${data.url}`);
    }
  };

  if (loading) return <div className="bg-off-white-sage rounded-[32px] p-8 text-gunmetal-gray">جاري تحميل التقرير...</div>;
  if (!report) return <div className="bg-off-white-sage rounded-[32px] p-8 text-gunmetal-gray">لم يتم العثور على التقرير</div>;

  const status = statusConfig[report.status];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <button onClick={() => router.back()} className="text-sm text-gunmetal-gray hover:text-midnight-ink mb-2">العودة</button>
          <h1 className="font-arabic text-2xl font-bold text-midnight-ink">{report.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-gunmetal-gray">
            <span>{report.template.name}</span>
            <span>v{report.version}</span>
            <span className={`text-xs px-3 py-1 rounded-full ${status.bg} ${status.text}`}>{status.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={duplicate} className="px-5 py-2.5 text-sm text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone">نسخ</button>
          {report.status !== "ARCHIVED" && <button onClick={archive} className="px-5 py-2.5 text-sm text-yellow-700 border border-yellow-200 rounded-[160px] hover:bg-yellow-50">أرشفة</button>}
          <button onClick={share} className="px-5 py-2.5 text-sm text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone">مشاركة</button>
          <button onClick={downloadPdf} className="px-6 py-2.5 text-sm text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink">تحميل PDF</button>
        </div>
      </div>

      {message && <div className="bg-off-white-sage border border-soft-concrete rounded-[20px] px-5 py-3 text-sm text-gunmetal-gray">{message}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-off-white-sage rounded-[32px] p-8">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink mb-6">محتوى التقرير</h2>
          <div className="space-y-4">
            {Object.entries(report.data).map(([key, value]) => (
              <div key={key} className="bg-canvas-white rounded-[16px] border border-soft-concrete px-4 py-3">
                <div className="text-xs text-gunmetal-gray mb-1">{key}</div>
                <div className="text-midnight-ink">{displayValue(value)}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="bg-off-white-sage rounded-[32px] p-6">
            <h3 className="font-arabic text-lg font-semibold text-midnight-ink mb-4">معلومات</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gunmetal-gray">تاريخ الإنشاء</span><span>{new Date(report.createdAt).toLocaleDateString("ar-SA")}</span></div>
              <div className="flex justify-between"><span className="text-gunmetal-gray">آخر تحديث</span><span>{new Date(report.updatedAt).toLocaleDateString("ar-SA")}</span></div>
              <div className="flex justify-between"><span className="text-gunmetal-gray">المرفقات</span><span>{report.evidence.length}</span></div>
            </div>
          </div>
          <div className="bg-off-white-sage rounded-[32px] p-6">
            <h3 className="font-arabic text-lg font-semibold text-midnight-ink mb-4">الشواهد</h3>
            {report.evidence.length === 0 ? (
              <p className="text-sm text-gunmetal-gray">لا توجد مرفقات</p>
            ) : (
              <div className="space-y-2">
                {report.evidence.map((item) => (
                  <div key={item.id} className="bg-canvas-white rounded-[16px] px-4 py-3 text-sm">
                    {item.fileName}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
