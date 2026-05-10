"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "حدث خطأ، حاول مجدداً");
      }
    } catch {
      setError("حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 bg-highlight-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-highlight-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="font-arabic text-2xl font-bold text-midnight-ink mb-3">تحقق من بريدك</h1>
        <p className="text-gunmetal-gray text-sm leading-relaxed mb-8">
          إذا كان هذا البريد مرتبطاً بحساب، ستصلك رسالة بها رابط إعادة التعيين. الرابط صالح لساعة واحدة.
        </p>
        <Link href="/signin" className="text-highlight-orange hover:underline text-sm font-medium">
          العودة لتسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <Link href="/" className="font-arabic text-3xl font-bold text-midnight-ink inline-block mb-2">
          تقارير تونتي
        </Link>
        <p className="text-gunmetal-gray text-sm">أدخل بريدك وسنرسل لك رابط إعادة تعيين كلمة المرور</p>
      </div>

      {error && (
        <div className="mb-5 px-5 py-3 bg-red-50 border border-red-200 rounded-[20px] text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-midnight-ink mb-2">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@school.edu.sa"
            className="w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink placeholder:text-gunmetal-gray/50 focus:outline-none focus:border-highlight-orange transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-action-black text-canvas-white rounded-[160px] font-medium hover:bg-midnight-ink transition-colors disabled:opacity-60"
        >
          {loading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
        </button>
      </form>

      <p className="text-center text-sm text-gunmetal-gray mt-8">
        <Link href="/signin" className="text-highlight-orange font-medium hover:underline">
          العودة لتسجيل الدخول
        </Link>
      </p>
    </div>
  );
}
