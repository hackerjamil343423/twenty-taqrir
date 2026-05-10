"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) setError("الرابط غير صالح");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "حدث خطأ");
      } else {
        setDone(true);
        setTimeout(() => router.push("/signin"), 3000);
      }
    } catch {
      setError("حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-arabic text-xl font-bold text-midnight-ink mb-2">تم تغيير كلمة المرور</h2>
        <p className="text-gunmetal-gray text-sm">سيتم توجيهك لصفحة تسجيل الدخول تلقائياً...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="px-5 py-3 bg-red-50 border border-red-200 rounded-[20px] text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-midnight-ink mb-2">
          كلمة المرور الجديدة
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          minLength={8}
          required
          disabled={!token}
          className="w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink placeholder:text-gunmetal-gray/50 focus:outline-none focus:border-highlight-orange transition-colors disabled:opacity-60"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-midnight-ink mb-2">
          تأكيد كلمة المرور
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••••"
          required
          disabled={!token}
          className="w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink placeholder:text-gunmetal-gray/50 focus:outline-none focus:border-highlight-orange transition-colors disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !token}
        className="w-full py-3.5 bg-action-black text-canvas-white rounded-[160px] font-medium hover:bg-midnight-ink transition-colors disabled:opacity-60"
      >
        {loading ? "جاري الحفظ..." : "تعيين كلمة المرور الجديدة"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <Link href="/" className="font-arabic text-3xl font-bold text-midnight-ink inline-block mb-2">
          تقارير تونتي
        </Link>
        <p className="text-gunmetal-gray text-sm">أدخل كلمة المرور الجديدة لحسابك</p>
      </div>

      <Suspense fallback={<div className="text-center text-gunmetal-gray">جاري التحميل...</div>}>
        <ResetPasswordForm />
      </Suspense>

      <p className="text-center text-sm text-gunmetal-gray mt-8">
        <Link href="/signin" className="text-highlight-orange font-medium hover:underline">
          العودة لتسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
