import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-faded-stone">
        <div className="font-arabic text-2xl font-bold text-midnight-ink">
          تقارير تونتي
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#features"
            className="px-4 py-2 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink transition-colors rounded-[140px]"
          >
            المميزات
          </a>
          <a
            href="#templates"
            className="px-4 py-2 text-sm font-medium text-gunmetal-gray hover:text-midnight-ink transition-colors rounded-[140px]"
          >
            القوالب
          </a>
          <Link
            href="/signin"
            className="px-6 py-2.5 text-sm font-medium text-midnight-ink border border-soft-concrete rounded-[160px] hover:bg-off-white-sage transition-colors"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2.5 text-sm font-medium text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink transition-colors"
          >
            ابدأ مجاناً
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-8 py-24 text-center bg-canvas-white">
        <div className="max-w-3xl">
          <h1 className="font-arabic text-6xl font-bold text-midnight-ink mb-6 leading-tight">
            تقارير تعليمية احترافية
            <br />
            <span className="text-highlight-orange">في ثوانٍ</span>
          </h1>
          <p className="text-lg text-gunmetal-gray mb-10 max-w-xl mx-auto leading-relaxed">
            أنشئ تقارير ministry-compliant بسهولة تامة. قوالب مخصصة للتعليم السعودي، تصدير PDF فوري، ومتابعة كل شيء من لوحة تحكم واحدة.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-3.5 text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink transition-colors font-medium"
            >
              ابدأ الآن مجاناً
            </Link>
            <Link
              href="#templates"
              className="px-8 py-3.5 text-midnight-ink border border-soft-concrete rounded-[160px] hover:bg-off-white-sage transition-colors font-medium"
            >
              تصفح القوالب
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-12 bg-off-white-sage">
        <div className="flex items-center justify-center gap-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="font-arabic text-4xl font-bold text-midnight-ink">50+</div>
            <div className="text-sm text-gunmetal-gray mt-1">قالب تعليمي</div>
          </div>
          <div className="w-px h-12 bg-soft-concrete" />
          <div className="text-center">
            <div className="font-arabic text-4xl font-bold text-midnight-ink">1000+</div>
            <div className="text-sm text-gunmetal-gray mt-1">معلم يستخدم المنصة</div>
          </div>
          <div className="w-px h-12 bg-soft-concrete" />
          <div className="text-center">
            <div className="font-arabic text-4xl font-bold text-midnight-ink">3 ثوانٍ</div>
            <div className="text-sm text-gunmetal-gray mt-1">متوسط وقت إنشاء التقرير</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20 bg-canvas-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-arabic text-4xl font-bold text-center text-midnight-ink mb-4">
            كل ما تحتاجه لإنشاء تقارير احترافية
          </h2>
          <p className="text-center text-gunmetal-gray mb-14 max-w-2xl mx-auto">
            منصة متكاملة مصممة خصيصاً للمعلمين في المملكة العربية السعودية
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="قوالب Ministry-compliant"
              description="نماذج جاهزة بمعايير وزارة التعليم السعودية، غلاف رسمي وأقسام منظمة."
            />
            <FeatureCard
              title="إنشاء PDF فوري"
              description="املأ النموذج واحصل على تقرير PDF جاهز للطباعة أو الإرسال خلال ثوانٍ."
            />
            <FeatureCard
              title="دعم كامل للعربية"
              description="تصميم RTL أصلي مع خط TheYearofHandicrafts للقراءة والكتابة المثالية."
            />
            <FeatureCard
              title="إدارة الفريق"
              description="ادعو زملاءك للمشاركة في القوالب وإدارة تقارير المدرسة معاً."
            />
            <FeatureCard
              title="سجل الأعمال"
              description="احتفظ بنسخ من جميع تقاريرك، تابع الإصدارات وعدّل متى شئت."
            />
            <FeatureCard
              title="رفع المرفقات"
              description="اربط صور ووثائق بنجاحاتك ومشاريعك داخل التقرير."
            />
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section id="templates" className="px-8 py-20 bg-off-white-sage">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-arabic text-4xl font-bold text-center text-midnight-ink mb-4">
            تقارير متنوعة لكل مناسبة
          </h2>
          <p className="text-center text-gunmetal-gray mb-14 max-w-2xl mx-auto">
            أكثر من 50 قالب تغطي جميع احتياجات العمل التعليمي
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <TemplateCard name="تقرير مبادرة" category="تعليمي" />
            <TemplateCard name="شهادة تقدير" category="شهادات" />
            <TemplateCard name="تقرير يوم الوطن" category="مناسبات" />
            <TemplateCard name="خطة علاجية" category="تعليم" />
            <TemplateCard name="تقرير دراسة" category="أبحاث" />
            <TemplateCard name="شهادة مشاركة" category="شهادات" />
            <TemplateCard name="تقرير نشاط" category="أنشطة" />
            <TemplateCard name="استبيان" category="تقييم" />
          </div>
          <div className="flex justify-center mt-10">
            <Link
              href="/store"
              className="px-8 py-3.5 text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink transition-colors font-medium"
            >
              عرض جميع القوالب
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 bg-midnight-ink text-canvas-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-arabic text-4xl font-bold mb-4">
            ابدأ الآن مجاناً
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            3 تقارير مجانية شهرياً. لا حاجة لبطاقة ائتمان. ابدأ واستكشف المنصة اليوم.
          </p>
          <Link
            href="/signup"
            className="inline-block px-10 py-4 text-midnight-ink bg-highlight-orange rounded-[160px] hover:bg-orange-500 transition-colors font-semibold"
          >
            إنشاء حساب مجاني
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 bg-faded-stone border-t border-soft-concrete">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="font-arabic text-lg font-bold text-midnight-ink">
            تقارير تونتي
          </div>
          <div className="text-sm text-gunmetal-gray">
            © 2026 Taqriri Twenty. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-off-white-sage rounded-[32px] p-7 hover:shadow-lg transition-shadow">
      <h3 className="font-arabic text-xl font-semibold text-midnight-ink mb-3">{title}</h3>
      <p className="text-gunmetal-gray text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function TemplateCard({ name, category }: { name: string; category: string }) {
  return (
    <div className="bg-canvas-white border border-soft-concrete rounded-[20px] p-5 hover:border-highlight-orange transition-colors cursor-pointer">
      <div className="bg-faded-stone rounded-[16px] h-28 mb-4 flex items-center justify-center">
        <div className="text-gunmetal-gray text-sm">معاينة القالب</div>
      </div>
      <h4 className="font-arabic text-base font-medium text-midnight-ink mb-1">{name}</h4>
      <span className="text-xs text-gunmetal-gray bg-faded-stone px-3 py-1 rounded-full">{category}</span>
    </div>
  );
}
