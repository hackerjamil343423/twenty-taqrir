import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "المميزات | تقارير تونتي",
  description: "اكتشف كل مميزات منصة تقارير تونتي لإنشاء تقارير تعليمية احترافية. قوالب متعددة، PDF فوري، دعم كامل للعربية، وإدارة الفريق.",
  openGraph: {
    title: "مميزات تقارير تونتي",
    description: "منصة شاملة لإنشاء التقارير التعليمية بمعايير وزارة التعليم السعودية",
    url: "https://taqriri.sa/features",
    siteName: "تقارير تونتي",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مميزات تقارير تونتي",
    description: "إنشاء تقارير تعليمية احترافية في ثوانٍ",
  },
  alternates: {
    canonical: "https://taqriri.sa/features",
  },
};

export default function FeaturesPage() {
  const features = [
    {
      icon: "📋",
      title: "50+ قالب احترافي",
      description: "قوالب مصممة لمعايير وزارة التعليم السعودية، تغطي جميع احتياجات العمل التعليمي.",
    },
    {
      icon: "⚡",
      title: "إنشاء PDF فوري",
      description: "املأ النموذج واحصل على تقرير PDF جاهز للطباعة خلال ثوانٍ معدودة.",
    },
    {
      icon: "🌐",
      title: "دعم كامل للعربية",
      description: "تصميم RTL أصلي مع خط TheYearofHandicrafts للقراءة والكتابة المثالية.",
    },
    {
      icon: "👥",
      title: "إدارة الفريق",
      description: "ادعو زملاءك للمشاركة في القوالب وإدارة تقارير المدرسة معاً.",
    },
    {
      icon: "📎",
      title: "رفع المرفقات",
      description: "اربط صور ووثائق بنجاحاتك ومشاريعك داخل التقرير.",
    },
    {
      icon: "🔒",
      title: "أمان عالي",
      description: "مصادقة ثنائية وإمكانية المشاركة مع تحكم كامل في الصلاحيات.",
    },
    {
      icon: "📊",
      title: "تحليلات متقدمة",
      description: "تتبع أداء التقارير وتفاعل الفريق مع لوحات تحكم شاملة.",
    },
    {
      icon: "📱",
      title: "متعدد الأجهزة",
      description: "ادخل من أي جهاز - حاسوب أو لوحي أو جوال.",
    },
    {
      icon: "🔄",
      title: "تحديثات مستمرة",
      description: "قوالب جديدة وإصلاحات أمنية بشكل مستمر.",
    },
  ];

  const benefits = [
    { label: "توفير الوقت", value: "85%", desc: "تقليل وقت إنشاء التقارير" },
    { label: "تحسين الجودة", value: "95%", desc: "تقارير احترافية دائماً" },
    { label: "رضا المستخدمين", value: "4.9/5", desc: "تقييم المستخدمين" },
    { label: "المناطق التعليمية", value: "13", desc: "منطقة في المملكة" },
  ];

  return (
    <div className="min-h-screen bg-canvas-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-canvas-white border-b border-faded-stone">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" className="font-arabic text-2xl font-bold text-midnight-ink">تقارير تونتي</Link>
          <div className="flex items-center gap-4">
            <Link href="/features" className="px-4 py-2 text-sm font-medium text-midnight-ink bg-off-white-sage rounded-[140px]">المميزات</Link>
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[140px]">الأسعار</Link>
            <Link href="/store" className="px-4 py-2 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[140px]">السوق</Link>
            <Link href="/signin" className="px-5 py-2.5 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink rounded-[140px]">تسجيل الدخول</Link>
            <Link href="/signup" className="px-5 py-2.5 text-sm font-medium text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink">ابدأ مجاناً</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-24 text-center bg-off-white-sage">
        <h1 className="font-arabic text-5xl font-bold text-midnight-ink mb-6">كل ما تحتاجه لإنشاء تقارير احترافية</h1>
        <p className="text-xl text-gunmetal-gray max-w-2xl mx-auto mb-10">
          منصة متكاملة مصممة خصيصاً للمعلمين في المملكة العربية السعودية
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/signup" className="px-8 py-4 text-canvas-white bg-action-black rounded-[160px] font-medium hover:bg-midnight-ink transition-colors">
            ابدأ مجاناً
          </Link>
          <Link href="/store" className="px-8 py-4 text-midnight-ink border border-soft-concrete rounded-[160px] font-medium hover:bg-canvas-white transition-colors">
            تصفح القوالب
          </Link>
        </div>
      </section>

      {/* Benefits Stats */}
      <section className="px-8 py-16 bg-canvas-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((b) => (
            <div key={b.label} className="text-center">
              <div className="font-arabic text-4xl font-bold text-highlight-orange mb-2">{b.value}</div>
              <div className="font-medium text-midnight-ink mb-1">{b.label}</div>
              <div className="text-sm text-gunmetal-gray">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-8 py-20 bg-canvas-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-arabic text-4xl font-bold text-center text-midnight-ink mb-4">المميزات</h2>
          <p className="text-center text-gunmetal-gray mb-14 max-w-2xl mx-auto">كل شيء تحتاجه لإنشاء تقارير تعليمية احترافية</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-off-white-sage rounded-[32px] p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-arabic text-xl font-semibold text-midnight-ink mb-3">{f.title}</h3>
                <p className="text-gunmetal-gray text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-8 py-20 bg-off-white-sage">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-arabic text-4xl font-bold text-center text-midnight-ink mb-14">كيف يعمل؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-highlight-orange rounded-full flex items-center justify-center text-canvas-white font-bold text-2xl mx-auto mb-4">1</div>
              <h3 className="font-arabic text-lg font-semibold text-midnight-ink mb-2">اختر القالب</h3>
              <p className="text-gunmetal-gray text-sm">اختر من أكثر من 50 قالب احترافي</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-highlight-orange rounded-full flex items-center justify-center text-canvas-white font-bold text-2xl mx-auto mb-4">2</div>
              <h3 className="font-arabic text-lg font-semibold text-midnight-ink mb-2">املأ النموذج</h3>
              <p className="text-gunmetal-gray text-sm">أدخل البيانات المطلوبة بسهولة</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-highlight-orange rounded-full flex items-center justify-center text-canvas-white font-bold text-2xl mx-auto mb-4">3</div>
              <h3 className="font-arabic text-lg font-semibold text-midnight-ink mb-2">احصل على PDF</h3>
              <p className="text-gunmetal-gray text-sm">تحميل فوري تقرير احترافي</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 bg-midnight-ink text-canvas-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-arabic text-4xl font-bold mb-4">ابدأ الآن مجاناً</h2>
          <p className="text-lg text-gray-400 mb-10">3 تقارير مجانية شهرياً. لا حاجة لبطاقة ائتمان.</p>
          <Link href="/signup" className="inline-block px-10 py-4 text-midnight-ink bg-highlight-orange rounded-[160px] font-semibold hover:bg-orange-500 transition-colors">
            إنشاء حساب مجاني
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