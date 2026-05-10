import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "تقارير تونتي <noreply@taqriri.sa>";
const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

export async function sendPasswordResetEmail(to: string, name: string, token: string) {
  const resetUrl = `${BASE_URL}/reset-password?token=${token}`;
  await resend.emails.send({
    from: FROM,
    to,
    subject: "إعادة تعيين كلمة المرور - تقارير تونتي",
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#111111;margin-bottom:8px;">مرحباً ${name}</h2>
        <p style="color:#555;line-height:1.7;">طلبت إعادة تعيين كلمة المرور لحسابك في تقارير تونتي. انقر على الزر أدناه لإعادة التعيين:</p>
        <div style="margin:28px 0;">
          <a href="${resetUrl}"
            style="display:inline-block;padding:14px 28px;background:#ff9900;color:#111111;text-decoration:none;border-radius:100px;font-weight:700;font-size:15px;">
            إعادة تعيين كلمة المرور
          </a>
        </div>
        <p style="color:#888;font-size:13px;">هذا الرابط صالح لمدة ساعة واحدة فقط. إذا لم تطلب إعادة التعيين، تجاهل هذه الرسالة.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#aaa;font-size:12px;text-align:center;">تقارير تونتي — منصة التقارير التعليمية السعودية</p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "مرحباً بك في تقارير تونتي! 🎉",
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#111111;">مرحباً ${name}!</h2>
        <p style="color:#555;line-height:1.7;">يسعدنا انضمامك إلى تقارير تونتي، منصة التقارير التعليمية الأولى في المملكة. يمكنك الآن إنشاء تقارير احترافية وتصديرها PDF بمعايير وزارة التعليم.</p>
        <div style="margin:28px 0;">
          <a href="${BASE_URL}/dashboard"
            style="display:inline-block;padding:14px 28px;background:#111111;color:#ffffff;text-decoration:none;border-radius:100px;font-weight:700;font-size:15px;">
            ابدأ الآن
          </a>
        </div>
        <p style="color:#888;font-size:13px;">تقارير مجانية: 3 تقارير شهرياً في الباقة المجانية. رقّ إلى الباقة الاحترافية لتقارير غير محدودة.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#aaa;font-size:12px;text-align:center;">تقارير تونتي — منصة التقارير التعليمية السعودية</p>
      </div>
    `,
  });
}

export async function sendTeamInviteEmail(
  to: string,
  inviterName: string,
  teamName: string,
  inviteToken: string
) {
  const inviteUrl = `${BASE_URL}/api/team/accept-invite?token=${inviteToken}`;
  await resend.emails.send({
    from: FROM,
    to,
    subject: `دعوة للانضمام إلى فريق ${teamName}`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#111111;">دعوة للانضمام إلى فريق</h2>
        <p style="color:#555;line-height:1.7;">قام <strong>${inviterName}</strong> بدعوتك للانضمام إلى فريق <strong>${teamName}</strong> على منصة تقارير تونتي.</p>
        <div style="margin:28px 0;">
          <a href="${inviteUrl}"
            style="display:inline-block;padding:14px 28px;background:#ff9900;color:#111111;text-decoration:none;border-radius:100px;font-weight:700;font-size:15px;">
            قبول الدعوة
          </a>
        </div>
        <p style="color:#888;font-size:13px;">إذا لم تكن تتوقع هذه الدعوة، يمكنك تجاهلها.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="color:#aaa;font-size:12px;text-align:center;">تقارير تونتي — منصة التقارير التعليمية السعودية</p>
      </div>
    `,
  });
}
