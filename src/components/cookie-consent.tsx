"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "taqriri_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-50 bg-midnight-ink text-canvas-white rounded-[24px] p-6 shadow-2xl"
      dir="rtl"
    >
      <p className="text-sm leading-relaxed mb-4">
        نستخدم ملفات تعريف الارتباط الضرورية فقط للحفاظ على جلسة تسجيل دخولك.{" "}
        <Link href="/privacy" className="text-highlight-orange hover:underline text-sm">
          سياسة الخصوصية
        </Link>
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={accept}
          className="flex-1 py-2.5 bg-highlight-orange text-midnight-ink rounded-[160px] text-sm font-semibold hover:bg-orange-400 transition-colors"
        >
          قبول
        </button>
        <button
          onClick={decline}
          className="flex-1 py-2.5 border border-canvas-white/30 text-canvas-white rounded-[160px] text-sm hover:border-canvas-white/60 transition-colors"
        >
          رفض
        </button>
      </div>
    </div>
  );
}
