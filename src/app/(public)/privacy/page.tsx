import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | تقارير تونتي",
  description: "سياسة خصوصية منصة تقارير تونتي وكيفية معالجة بياناتك",
};

export default function PrivacyPage() {
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
          <h1 className="font-arabic text-3xl font-bold text-midnight-ink mb-3">سياسة الخصوصية</h1>
          <p className="text-gunmetal-gray text-sm">آخر تحديث: يناير 2026</p>
        </div>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">1. المعلومات التي نجمعها</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            نجمع المعلومات التي تقدمها مباشرة عند إنشاء حسابك مثل الاسم والبريد الإلكتروني ومعلومات المدرسة. كما نجمع بيانات الاستخدام تلقائياً مثل التقارير المُنشأة وأوقات الدخول.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">2. كيف نستخدم معلوماتك</h2>
          <ul className="list-disc list-inside text-gunmetal-gray space-y-2 leading-relaxed">
            <li>تقديم خدمات المنصة وتشغيلها</li>
            <li>إرسال إشعارات ضرورية تتعلق بحسابك</li>
            <li>تحسين تجربة المستخدم بناءً على أنماط الاستخدام</li>
            <li>الامتثال للمتطلبات القانونية في المملكة العربية السعودية</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">3. مشاركة البيانات</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            لا نبيع بياناتك الشخصية لأطراف ثالثة. قد نشارك المعلومات مع مزودي الخدمات (مثل بوابة الدفع Stripe) فقط بالقدر اللازم لتقديم الخدمة، وجميعهم ملزمون بسياسات حماية البيانات.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">4. تخزين البيانات وأمانها</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            تُخزَّن بياناتك على خوادم آمنة. نستخدم تشفير SSL/TLS لحماية البيانات أثناء النقل. كلمات المرور مشفرة ولا يمكن الاطلاع عليها لأي شخص.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">5. ملفات تعريف الارتباط (Cookies)</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            نستخدم ملفات تعريف الارتباط الضرورية للحفاظ على جلسة تسجيل الدخول. لا نستخدم ملفات تتبع لأغراض إعلانية.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">6. حقوقك</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            يحق لك طلب الاطلاع على بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت. يمكنك أيضاً تصدير بياناتك أو إلغاء حسابك من خلال صفحة الإعدادات أو عبر التواصل معنا.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">7. بيانات الأطفال</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            المنصة موجهة للمعلمين والإداريين البالغين. لا نجمع بيانات شخصية من الأطفال دون سن 18 عمداً. إذا علمنا بذلك، سنحذف تلك البيانات فوراً.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-arabic text-xl font-semibold text-midnight-ink">8. التواصل</h2>
          <p className="text-gunmetal-gray leading-relaxed">
            لممارسة حقوقك أو لأي استفسار حول الخصوصية، تواصل معنا على{" "}
            <a href="mailto:privacy@taqriri.sa" className="text-highlight-orange hover:underline">
              privacy@taqriri.sa
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-faded-stone py-8">
        <div className="max-w-4xl mx-auto px-8 flex items-center justify-between text-sm text-gunmetal-gray">
          <span>© 2026 تقارير تونتي. جميع الحقوق محفوظة.</span>
          <Link href="/terms" className="hover:text-midnight-ink">شروط الاستخدام</Link>
        </div>
      </footer>
    </div>
  );
}
