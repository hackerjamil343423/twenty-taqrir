import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.map((item) => (typeof item === "object" ? JSON.stringify(item) : String(item))).join("، ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return value === undefined || value === null || value === "" ? "_____" : String(value);
}

export default async function SharedReportPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Look up by shareToken only — report ID is never exposed here
  const report = await db.report.findFirst({
    where: { shareToken: token, isShared: true },
    include: { template: true, user: true },
  }).catch(() => null);

  if (!report || report.status === "ARCHIVED") notFound();

  const data = typeof report.data === "object" && report.data !== null && !Array.isArray(report.data)
    ? (report.data as Record<string, unknown>)
    : {};

  return (
    <div className="min-h-screen bg-canvas-white">
      <header className="px-8 py-4 border-b border-soft-concrete">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-arabic text-xl font-bold text-midnight-ink">تقارير تونتي</Link>
          <div className="text-sm text-gunmetal-gray">مشاركة بواسطة: {report.user.name || report.user.email}</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="bg-off-white-sage rounded-[32px] p-8 mb-8">
          <div className="text-center border-b border-soft-concrete pb-6 mb-6">
            <div className="font-arabic text-sm text-gunmetal-gray mb-2">وزارة التعليم - المملكة العربية السعودية</div>
            <h1 className="font-arabic text-3xl font-bold text-midnight-ink mb-2">{report.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gunmetal-gray">
              <span>{report.template.name}</span>
              <span>{new Date(report.createdAt).toLocaleDateString("ar-SA")}</span>
              <span className="bg-green-100 text-green-700 px-3 py-0.5 rounded-full text-xs">{report.status}</span>
            </div>
          </div>

          <div className="space-y-5">
            {Object.entries(data).map(([key, value]) => (
              <div key={key}>
                <span className="text-xs text-gunmetal-gray">{key}</span>
                <p className="font-medium text-midnight-ink">{displayValue(value)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-10 pt-6 border-t border-soft-concrete">
            <div className="text-center">
              <div className="h-16 border-t border-midnight-ink w-40 mb-2" />
              <span className="text-xs text-gunmetal-gray">توقيع المسؤول</span>
            </div>
            <div className="text-center">
              <div className="h-16 border-t border-midnight-ink w-40 mb-2" />
              <span className="text-xs text-gunmetal-gray">الختم</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          {/* Pass shareToken so the download endpoint can authorize without a session */}
          <Link
            href={`/api/reports/${report.id}/download?shareToken=${token}`}
            className="px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink"
          >
            تحميل PDF
          </Link>
          <Link href="/signup" className="px-6 py-3 text-midnight-ink border border-soft-concrete rounded-[160px] text-sm font-medium hover:bg-off-white-sage">
            إنشاء تقرير مشابه
          </Link>
        </div>
      </main>
    </div>
  );
}
