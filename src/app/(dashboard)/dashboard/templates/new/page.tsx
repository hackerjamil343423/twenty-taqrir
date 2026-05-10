import Link from "next/link";

export default function NewTemplatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-arabic text-2xl font-bold text-midnight-ink">قالب جديد</h1>
        <p className="text-gunmetal-gray text-sm mt-1">
          منشئ القوالب لم يكتمل بعد. استخدم سوق القوالب أو أنشئ تقريرا من قالب موجود.
        </p>
      </div>

      <div className="bg-off-white-sage rounded-[32px] p-8">
        <div className="flex gap-3">
          <Link
            href="/store"
            className="px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink transition-colors"
          >
            تصفح السوق
          </Link>
          <Link
            href="/dashboard/reports/new/active-learning-initiative"
            className="px-6 py-3 text-gunmetal-gray border border-soft-concrete rounded-[160px] text-sm font-medium hover:bg-faded-stone transition-colors"
          >
            إنشاء تقرير
          </Link>
        </div>
      </div>
    </div>
  );
}
