import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الأسعار | تقارير تونتي",
  description: "خطط أسعار مرنة للمعلمين والمدارس. ابدأ مجاناً أو اشترك في الباقة الاحترافية للحصول على ميزات متقدمة.",
  openGraph: {
    title: "خطط أسعار تقارير تونتي",
    description: "اختر الخطة المناسبة لك - مجانية أو احترافية أو للمدرسة",
    url: "https://taqriri.sa/pricing",
    siteName: "تقارير تونتي",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://taqriri.sa/pricing",
  },
};

const plans = [
  {
    id: "free",
    name: "مجاني",
    price: "0",
    period: "شهرياً",
    description: "مثالي للبدء واستكشاف المنصة",
    features: [
      "3 تقارير شهرياً",
      "10 قوالب أساسية",
      "PDF تحميل عادي",
      "دعم عبر البريد",
    ],
    cta: "ابدأ مجاناً",
    highlight: false,
  },
  {
    id: "pro",
    name: "احترافي",
    price: "29",
    period: "شهرياً",
    description: "للمعلمين المحترفين الذين يحتاجون المزيد",
    features: [
      "تقارير غير محدودة",
      "جميع القوالب (50+)",
      "PDF بجودة عالية",
      "رفع مرفقات",
      "إدارة الفريق",
      "دعم أولوي",
    ],
    cta: "اشترك الآن",
    highlight: true,
  },
  {
    id: "school",
    name: "المدرسة",
    price: "199",
    period: "شهرياً",
    description: "للمدارس والفرق التعليمية",
    features: [
      "كل ميزات الاحترافي",
      "مستخدمين غير محدودين",
      "قوالب مخصصة",
      "API وصول",
      "تقارير الفريق",
      "دعم مخصص",
      "تدريب الفريق",
    ],
    cta: "تواصل معنا",
    highlight: false,
  },
];

const faqs = [
  {
    q: "هل يمكنني إلغاء اشتراكي في أي وقت؟",
    a: "نعم، يمكنك إلغاء اشتراكك في أي وقت. ستظل قادراً على استخدام الخدمة حتى نهاية فترة الفوترة الحالية.",
  },
  {
    q: "ما هي طرق الدفع المتاحة؟",
    a: "نقبل بطاقات الائتمان (Visa، Mastercard)، وبطاقات مدى، والتحويل البنكي للاشتراكات السنوية.",
  },
  {
    q: "هل هناك فترة تجريبية مجانية؟",
    a: "نعم! الخطة المجانية متاحة دائماً، وبالإضافة يمكنك تجربة الباقة الاحترافية مجاناً لمدة 7 أيام.",
  },
  {
    q: "هل يمكنني ترقية أو تخفيض خطتي؟",
    a: "نعم، يمكنك تغيير خطتك في أي وقت. التغييرات تسري فوراً مع تسعير تناسبي.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-canvas-white border-b border-faded-stone">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" className="font-arabic text-2xl font-bold text-midnight-ink">تقارير تونتي</Link>
          <div className="flex items-center gap-4">
            <Link href="/features" className="px-4 py-2 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[140px]">المميزات</Link>
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-midnight-ink bg-off-white-sage rounded-[140px]">الأسعار</Link>
            <Link href="/store" className="px-4 py-2 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[140px]">السوق</Link>
            <Link href="/signin" className="px-5 py-2.5 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[140px]">تسجيل الدخول</Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-medium text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink">ابدأ مجاناً</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-20 text-center bg-off-white-sage">
        <h1 className="font-arabic text-5xl font-bold text-midnight-ink mb-4">خطط مرنة لكل الاحتياجات</h1>
        <p className="text-xl text-gunmetal-gray max-w-xl mx-auto">
          ابدأ مجاناً وانتقل للباقة الاحترافية عندما تحتاج المزيد
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="px-8 py-16 bg-canvas-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-[32px] p-8 ${
                plan.highlight
                  ? "bg-midnight-ink text-canvas-white ring-4 ring-highlight-orange"
                  : "bg-off-white-sage"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block px-3 py-1 bg-highlight-orange text-midnight-ink text-xs font-medium rounded-full mb-4">الأكثر شعبية</span>
              )}
              <h3 className={`font-arabic text-2xl font-bold mb-2 ${plan.highlight ? "text-canvas-white" : "text-midnight-ink"}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className={`font-arabic text-5xl font-bold ${plan.highlight ? "text-canvas-white" : "text-midnight-ink"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlight ? "text-gray-400" : "text-gunmetal-gray"}`}>
                  ر.س / {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-gray-400" : "text-gunmetal-gray"}`}>
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className={plan.highlight ? "text-highlight-orange" : "text-green-600"}>✓</span>
                    <span className={plan.highlight ? "text-gray-300" : "text-midnight-ink"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.id === "free" ? "/signup" : plan.id === "pro" ? "/signup?plan=pro" : "/contact"}
                className={`block w-full py-3.5 text-center rounded-[160px] font-medium transition-colors ${
                  plan.highlight
                    ? "bg-highlight-orange text-midnight-ink hover:bg-orange-500"
                    : "bg-action-black text-canvas-white hover:bg-midnight-ink"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20 bg-off-white-sage">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-arabic text-3xl font-bold text-center text-midnight-ink mb-10">الأسئلة الشائعة</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-canvas-white rounded-[20px] p-6">
                <h3 className="font-medium text-midnight-ink mb-2">{faq.q}</h3>
                <p className="text-gunmetal-gray text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 bg-midnight-ink text-canvas-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-arabic text-4xl font-bold mb-4">لديك أسئلة؟</h2>
          <p className="text-lg text-gray-400 mb-8">فريقنا جاهز لمساعدتك</p>
          <Link href="/contact" className="inline-block px-8 py-4 border border-gray-600 text-canvas-white rounded-[160px] font-medium hover:bg-gray-800 transition-colors">
            تواصل معنا
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 bg-faded-stone border-t border-soft-concrete">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="font-arabic text-lg font-bold text-midnight-ink">تقارير تونتي</div>
          <div className="text-sm text-gunmetal-gray">© 2026 Taqriri Twenty</div>
        </div>
      </footer>
    </div>
  );
}