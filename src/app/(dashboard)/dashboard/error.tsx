"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center" dir="rtl">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-xl">⚠️</span>
      </div>
      <h2 className="font-arabic text-xl font-bold text-midnight-ink mb-2">حدث خطأ</h2>
      <p className="text-gunmetal-gray text-sm mb-6">تعذّر تحميل هذه الصفحة. يرجى المحاولة مجدداً.</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink transition-colors"
      >
        حاول مجدداً
      </button>
    </div>
  );
}
