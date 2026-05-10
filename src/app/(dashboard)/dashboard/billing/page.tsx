"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const plans = [
  {
    id: "free",
    name: "مجاني",
    nameEn: "Free",
    price: 0,
    period: "دائماً",
    color: "bg-off-white-sage border-soft-concrete",
    highlight: false,
    features: [
      "3 تقارير شهرياً",
      "الوصول لجميع القوالب المجانية",
      "تصدير PDF",
      "حفظ في سجل التقارير",
      "دعم عبر البريد الإلكتروني",
    ],
    missing: ["تقارير غير محدودة", "رفع الشواهد", "التعاون مع الفريق", "قوالب احترافية", "أولوية الدعم"],
  },
  {
    id: "pro",
    name: "احترافي",
    nameEn: "Pro",
    price: 49,
    period: "شهرياً",
    color: "bg-midnight-ink border-midnight-ink text-canvas-white",
    highlight: true,
    features: [
      "تقارير غير محدودة",
      "جميع القوالب (50+ قالب)",
      "رفع الشواهد (حتى 100MB)",
      "مشاركة التقارير برابط",
      "إصدارات التقارير",
      "أولوية الدعم",
    ],
    missing: ["التعاون مع الفريق", "لوحة تحكم المدرسة", "تقارير تحليلية"],
  },
  {
    id: "school",
    name: "المدرسة",
    nameEn: "School",
    price: 199,
    period: "شهرياً",
    color: "bg-off-white-sage border-soft-concrete",
    highlight: false,
    features: [
      "كل ميزات الاحترافي",
      "حتى 20 معلم",
      "لوحة تحكم مدير المدرسة",
      "تقارير تحليلية للمدرسة",
      "تخصيص شعار المدرسة",
      "مساحة تخزين 1GB",
      "دعم مخصص",
    ],
    missing: [],
  },
];

const invoices = [
  { id: "INV-001", date: "2026-04-01", amount: 49, status: "مدفوع", plan: "احترافي" },
  { id: "INV-002", date: "2026-03-01", amount: 49, status: "مدفوع", plan: "احترافي" },
  { id: "INV-003", date: "2026-02-01", amount: 49, status: "مدفوع", plan: "احترافي" },
];

function roleToplan(role?: string): string {
  if (role === "PRO") return "pro";
  if (role === "SCHOOL_ADMIN") return "school";
  return "free";
}

export default function BillingPage() {
  const { data: session } = useSession();
  const currentPlan = roleToplan(session?.user?.role);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [flashMsg, setFlashMsg] = useState("");
  const [flashError, setFlashError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setFlashMsg("تم الاشتراك بنجاح! مرحباً بك في الخطة الاحترافية.");
      router.replace("/dashboard/billing");
    } else if (searchParams.get("canceled") === "1") {
      setFlashError("تم إلغاء عملية الدفع.");
      router.replace("/dashboard/billing");
    }
  }, [searchParams, router]);

  const subscribe = async (planId: string) => {
    if (planId === "free") return;
    setCheckoutLoading(planId);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setFlashError(data.error || "حدث خطأ في عملية الدفع");
      }
    } catch {
      setFlashError("حدث خطأ في الاتصال بخادم الدفع");
    }
    setCheckoutLoading(null);
  };

  const openPortal = async () => {
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-arabic text-2xl font-bold text-midnight-ink">الاشتراك والفواتير</h1>
        <p className="text-gunmetal-gray text-sm mt-1">إدارة خطة اشتراكك وعرض الفواتير</p>
      </div>

      {flashMsg && (
        <div className="px-5 py-3 bg-green-50 border border-green-200 rounded-[20px] text-green-700 text-sm">
          {flashMsg}
        </div>
      )}
      {flashError && (
        <div className="px-5 py-3 bg-red-50 border border-red-200 rounded-[20px] text-red-600 text-sm">
          {flashError}
        </div>
      )}

      {/* Current Plan Banner */}
      <div className="bg-off-white-sage rounded-[32px] p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gunmetal-gray mb-1">خطتك الحالية</p>
          <p className="font-arabic text-xl font-bold text-midnight-ink">مجاني</p>
          <p className="text-sm text-gunmetal-gray mt-1">تقاريرك هذا الشهر: 0 / 3</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-faded-stone rounded-full overflow-hidden">
            <div className="h-full bg-highlight-orange rounded-full" style={{ width: "0%" }} />
          </div>
          <button
            onClick={() =>
              document.getElementById("plans-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-6 py-3 bg-highlight-orange text-midnight-ink rounded-[160px] text-sm font-semibold hover:bg-orange-500 transition-colors"
          >
            ترقية الخطة
          </button>
        </div>
      </div>

      {/* Billing Cycle Toggle */}
      <div id="plans-section" className="flex justify-center">
        <div className="inline-flex bg-off-white-sage rounded-[160px] p-1 gap-1">
          {(["monthly", "yearly"] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`px-6 py-2.5 rounded-[160px] text-sm font-medium transition-colors ${
                billingCycle === cycle
                  ? "bg-action-black text-canvas-white"
                  : "text-gunmetal-gray hover:text-midnight-ink"
              }`}
            >
              {cycle === "monthly" ? "شهري" : "سنوي"}
              {cycle === "yearly" && (
                <span className="mr-2 text-xs bg-highlight-orange text-midnight-ink px-2 py-0.5 rounded-full">
                  وفر 20%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price =
            billingCycle === "yearly" ? Math.floor(plan.price * 0.8) : plan.price;
          const isCurrent = plan.id === currentPlan;

          return (
            <div
              key={plan.id}
              className={`rounded-[32px] border-2 p-8 relative ${plan.color} ${
                plan.highlight ? "" : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-highlight-orange text-midnight-ink text-xs font-bold px-4 py-1.5 rounded-full">
                    الأكثر شيوعاً
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`font-arabic text-xl font-bold mb-1 ${
                    plan.highlight ? "text-canvas-white" : "text-midnight-ink"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-3xl font-bold ${
                      plan.highlight ? "text-canvas-white" : "text-midnight-ink"
                    }`}
                  >
                    {price === 0 ? "مجاني" : `${price} ر.س`}
                  </span>
                  {price > 0 && (
                    <span
                      className={`text-sm ${plan.highlight ? "text-gray-300" : "text-gunmetal-gray"}`}
                    >
                      /{billingCycle === "monthly" ? "شهر" : "سنة"}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`w-4 h-4 mt-0.5 flex-none ${
                        plan.highlight ? "text-highlight-orange" : "text-green-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={plan.highlight ? "text-gray-200" : "text-gunmetal-gray"}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm opacity-40">
                    <svg
                      className="w-4 h-4 mt-0.5 flex-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className={plan.highlight ? "text-gray-400" : "text-gunmetal-gray"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <button
                  disabled
                  className={`w-full py-3.5 rounded-[160px] text-sm font-medium opacity-60 cursor-not-allowed ${
                    plan.highlight
                      ? "bg-canvas-white text-midnight-ink"
                      : "bg-action-black text-canvas-white"
                  }`}
                >
                  خطتك الحالية
                </button>
              ) : plan.price === 0 ? (
                <button
                  disabled
                  className="w-full py-3.5 rounded-[160px] text-sm font-medium opacity-60 cursor-not-allowed bg-action-black text-canvas-white"
                >
                  الخطة المجانية
                </button>
              ) : (
                <button
                  className={`w-full py-3.5 rounded-[160px] text-sm font-semibold transition-colors disabled:opacity-60 ${
                    plan.highlight
                      ? "bg-highlight-orange text-midnight-ink hover:bg-orange-400"
                      : "bg-action-black text-canvas-white hover:bg-midnight-ink"
                  }`}
                  disabled={checkoutLoading === plan.id}
                  onClick={() => subscribe(plan.id)}
                >
                  {checkoutLoading === plan.id ? "جاري التحويل..." : `الاشتراك في ${plan.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Payment Methods */}
      <div className="bg-off-white-sage rounded-[32px] p-8">
        <h2 className="font-arabic text-xl font-semibold text-midnight-ink mb-6">
          طرق الدفع
        </h2>
        <div className="flex items-center justify-between p-5 bg-canvas-white rounded-[20px] border border-dashed border-soft-concrete">
          <p className="text-gunmetal-gray text-sm">إدارة طرق الدفع والاشتراك عبر بوابة Stripe الآمنة</p>
          <button
            onClick={openPortal}
            className="px-5 py-2.5 text-sm font-medium bg-action-black text-canvas-white rounded-[160px] hover:bg-midnight-ink transition-colors"
          >
            إدارة الاشتراك
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-off-white-sage rounded-[32px] p-8">
        <h2 className="font-arabic text-xl font-semibold text-midnight-ink mb-6">
          سجل الفواتير
        </h2>
        {invoices.length === 0 ? (
          <p className="text-gunmetal-gray text-sm">لا توجد فواتير بعد</p>
        ) : (
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between p-4 bg-canvas-white rounded-[20px] border border-soft-concrete"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-midnight-ink">{inv.id}</span>
                  <span className="text-sm text-gunmetal-gray">
                    {new Date(inv.date).toLocaleDateString("ar-SA")}
                  </span>
                  <span className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full">
                    {inv.status}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-semibold text-midnight-ink">{inv.amount} ر.س</span>
                  <button className="text-xs text-highlight-orange hover:underline">
                    تحميل
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Support */}
      <div className="text-center py-4">
        <p className="text-sm text-gunmetal-gray">
          لأي استفسار حول الاشتراك{" "}
          <Link href="mailto:support@taqriri.sa" className="text-highlight-orange hover:underline">
            تواصل معنا
          </Link>
        </p>
      </div>
    </div>
  );
}
