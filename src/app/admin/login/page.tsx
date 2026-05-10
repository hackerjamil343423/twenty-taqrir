"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "كلمة المرور غير صحيحة");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white-sage">
      <div className="bg-white rounded-[32px] p-10 w-full max-w-sm shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-midnight-ink rounded-[10px] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">ت</span>
          </div>
          <h1 className="text-xl font-bold text-midnight-ink">تقارير</h1>
          <p className="text-sm text-gunmetal-gray mt-1">لوحة تحكم المشرف</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-midnight-ink mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 border border-soft-concrete rounded-[10px] text-midnight-ink focus:outline-none focus:border-highlight-orange transition-colors"
              placeholder="أدخل كلمة المرور"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-[10px]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-midnight-ink text-white py-3 rounded-[160px] font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {loading ? "جارٍ التحقق..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
