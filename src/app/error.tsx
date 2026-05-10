"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
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
    <div className="min-h-screen bg-canvas-white flex items-center justify-center px-4" dir="rtl">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="font-arabic text-2xl font-bold text-midnight-ink mb-3">حدث خطأ غير متوقع</h1>
        <p className="text-gunmetal-gray text-sm mb-8">
          نعتذر عن هذا الخلل. يمكنك المحاولة مجدداً أو العودة للصفحة الرئيسية.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink transition-colors"
          >
            حاول مجدداً
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-soft-concrete text-gunmetal-gray rounded-[160px] text-sm hover:bg-off-white-sage transition-colors"
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
