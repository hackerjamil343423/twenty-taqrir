import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "شروط الاستخدام | تقارير تونتي",
  description: "شروط وأحكام استخدام منصة تقارير تونتي",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-canvas-white" dir="rtl">
      <header className="border-b border-faded-stone">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-center justify-between">
          <Link href="/" className="font-arabic text-2xl font-bold text-midnight-ink">
            تقارير تونتي
          </Link>
          <Link href="/" className="text-sm text-gunmetal-gray hover:text-midnight-ink">
            العودة للرئيسية
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-16 space-y-10">
        <div>
          <h1 className="font-arabic text-3xl font-bold text-midnight-ink mb-3">شروط الاستخدام</h1>
          <p className="text-gunmetal-gray text-sm">آخر تحديث: يناير 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">1. القبول بالشروط</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            باستخدامك لمنصة تقارير تونتي، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يُرجى عدم استخدام المنصة.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">2. وصف الخدمة</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            تقارير تونتي منصة إلكترونية تُمكّن المعلمين والإداريين في المدارس السعودية من إنشاء تقارير تعليمية متوافقة مع متطلبات وزارة التعليم بالمملكة العربية السعودية.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">3. حساب المستخدم</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور، وعن جميع الأنشطة التي تجري تحت حسابك. يجب إخطارنا فوراً عند أي استخدام غير مصرح به.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">4. الاشتراكات والمدفوعات</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            تتوفر المنصة بخطط مجانية ومدفوعة. تُجدَّد الاشتراكات المدفوعة تلقائياً ما لم يتم إلغاؤها قبل نهاية الدورة. لا تُسترد الرسوم المدفوعة إلا في حالات استثنائية يُقدّرها فريق الدعم.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">5. الملكية الفكرية</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            جميع القوالب والتصاميم والمحتوى المقدَّم من المنصة محمي بموجب حقوق الملكية الفكرية. يُمنح المستخدمون ترخيصاً محدوداً لاستخدامها لأغراض تعليمية غير تجارية.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">6. حدود المسؤولية</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            تُقدَّم المنصة "كما هي" دون ضمانات. لا تتحمل تقارير تونتي المسؤولية عن أي أضرار غير مباشرة أو عرضية ناتجة عن استخدام الخدمة أو عدم توفرها.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">7. التعديلات</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين النشطين بأي تغييرات جوهرية عبر البريد الإلكتروني.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">8. التواصل</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            لأي استفسار حول هذه الشروط، تواصل معنا على{" "}
            <a href="mailto:support@taqriri.sa" className="text-highlight-orange hover:underline">
              support@taqriri.sa
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-faded-stone py-8">
        <div className="max-w-4xl mx-auto px-8 flex items-center justify-between text-sm text-gunmetal-gray">
          <span>© 2026 تقارير تونتي. جميع الحقوق محفوظة.</span>
          <Link href="/privacy" className="hover:text-midnight-ink">سياسة الخصوصية</Link>
        </div>
      </footer>
    </div>
  );
}
