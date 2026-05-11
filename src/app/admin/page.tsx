import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminDashboard() {
  const [total, usedCount, aggregate] = await Promise.all([
    db.sijil.count(),
    db.sijil.count({ where: { usageCount: { gt: 0 } } }),
    db.sijil.aggregate({ _sum: { usageCount: true } }),
  ]);

  const totalDownloads = aggregate._sum.usageCount ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-midnight-ink">الرئيسية</h1>
          <p className="text-sm text-gunmetal-gray mt-1">
            أنشئ روابط مشاركة من القوالب الجاهزة وتابع تحميلات PDF.
          </p>
        </div>
        <Link
          href="/admin/sijilat/new"
          className="px-6 py-2.5 bg-midnight-ink text-white text-sm font-medium rounded-[160px] hover:opacity-80 transition-opacity"
        >
          + إنشاء رابط من قالب جاهز
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <StatCard label="إجمالي الروابط" value={total} icon="📋" />
        <StatCard label="روابط مُستخدمة" value={usedCount} icon="✅" />
        <StatCard label="إجمالي التنزيلات" value={totalDownloads} icon="⬇️" />
      </div>

      <div className="bg-white rounded-[20px] p-6">
        <p className="text-sm text-gunmetal-gray text-center py-4">
          اختر قالباً جاهزاً، أنشئ رابطاً مخصصاً، ثم شاركه ليملأ المستخدم النموذج ويحمل ملف PDF مباشرةً.
        </p>
        <div className="flex justify-center">
          <Link
            href="/admin/sijilat"
            className="text-sm text-highlight-orange hover:underline"
          >
            عرض جميع الروابط ←
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="bg-white rounded-[20px] p-6">
      <div className="text-2xl mb-3">{icon}</div>
      <div className="text-3xl font-bold text-midnight-ink mb-1">{value.toLocaleString("ar-SA")}</div>
      <div className="text-sm text-gunmetal-gray">{label}</div>
    </div>
  );
}
