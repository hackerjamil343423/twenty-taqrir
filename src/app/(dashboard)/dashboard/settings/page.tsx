"use client";

import { useEffect, useState } from "react";

type NotifPrefs = Record<string, boolean>;

const settingsSections = [
  { id: "profile", label: "الملف الشخصي", icon: "👤" },
  { id: "school", label: "معلومات المدرسة", icon: "🏫" },
  { id: "security", label: "الأمان", icon: "🔒" },
  { id: "notifications", label: "الإشعارات", icon: "🔔" },
];

const DEFAULT_NOTIF: NotifPrefs = {
  "report-status": true,
  "team-invite": true,
  "template-update": false,
  "weekly-report": true,
};

const NOTIF_LABELS: Record<string, { label: string; desc: string }> = {
  "report-status": { label: "تغيير حالة التقرير", desc: "تصلك إشعار عند اعتماد أو أرشفة تقرير" },
  "team-invite": { label: "دعوات الفريق", desc: "تصلك إشعار عند دعوة عضو جديد" },
  "template-update": { label: "تحديثات القوالب", desc: "تصلك إشعار عند تحديث قوالبك المفضلة" },
  "weekly-report": { label: "التقرير الأسبوعي", desc: "ملخص أسبوعي لنشاطك" },
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({ name: "", email: "", region: "" });
  const [school, setSchool] = useState({ schoolName: "", region: "", gradeLevels: [] as string[] });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>(DEFAULT_NOTIF);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState("م");

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setProfile({ name: data.user.name ?? "", email: data.user.email ?? "", region: data.user.region ?? "" });
          setSchool({ schoolName: data.user.schoolName ?? "", region: data.user.region ?? "", gradeLevels: data.user.gradeLevels ?? [] });
          setNotifPrefs({ ...DEFAULT_NOTIF, ...(data.user.notificationPrefs ?? {}) });
          setAvatarPreview(data.user.image ?? null);
          setUserInitial((data.user.name ?? "م")[0]);
        }
      });
  }, []);

  const flash = (msg: string, isError = false) => {
    if (isError) setError(msg); else setMessage(msg);
    setTimeout(() => { setMessage(""); setError(""); }, 4000);
  };

  const saveProfile = async () => {
    setSaving(true);
    if (avatarFile) {
      const fd = new FormData();
      fd.append("avatar", avatarFile);
      await fetch("/api/user/avatar", { method: "POST", body: fd });
    }
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: profile.name, region: profile.region }),
    });
    setSaving(false);
    if (res.ok) flash("تم حفظ الملف الشخصي");
    else flash((await res.json()).error || "حدث خطأ", true);
  };

  const saveSchool = async () => {
    setSaving(true);
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schoolName: school.schoolName, region: school.region, gradeLevels: school.gradeLevels }),
    });
    setSaving(false);
    if (res.ok) flash("تم حفظ معلومات المدرسة");
    else flash((await res.json()).error || "حدث خطأ", true);
  };

  const changePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) { flash("كلمتا المرور غير متطابقتين", true); return; }
    setSaving(true);
    const res = await fetch("/api/user/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwords),
    });
    setSaving(false);
    const data = await res.json();
    if (res.ok) { flash("تم تغيير كلمة المرور"); setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" }); }
    else flash(data.error || "حدث خطأ", true);
  };

  const saveNotifications = async () => {
    setSaving(true);
    const res = await fetch("/api/user/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notifPrefs),
    });
    setSaving(false);
    if (res.ok) flash("تم حفظ تفضيلات الإشعارات");
    else flash("حدث خطأ", true);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const inputClass = "w-full px-5 py-3 bg-canvas-white border border-soft-concrete rounded-[20px] text-midnight-ink focus:outline-none focus:border-highlight-orange";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-arabic text-2xl font-bold text-midnight-ink">الإعدادات</h1>
        <p className="text-gunmetal-gray text-sm mt-1">إدارة حسابك ومعلوماتك</p>
      </div>

      {message && <div className="px-5 py-3 bg-green-50 border border-green-200 rounded-[20px] text-green-700 text-sm">{message}</div>}
      {error && <div className="px-5 py-3 bg-red-50 border border-red-200 rounded-[20px] text-red-600 text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-off-white-sage rounded-[32px] p-4">
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-5 py-3 rounded-[160px] text-sm font-medium transition-colors text-right ${
                  activeSection === section.id ? "bg-action-black text-canvas-white" : "text-gunmetal-gray hover:text-midnight-ink hover:bg-faded-stone"
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          {activeSection === "profile" && (
            <div className="bg-off-white-sage rounded-[32px] p-8 space-y-6">
              <h2 className="font-arabic text-xl font-semibold text-midnight-ink">الملف الشخصي</h2>
              <div className="flex items-center gap-6">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <div className="w-20 h-20 bg-highlight-orange rounded-full flex items-center justify-center text-canvas-white font-bold text-2xl">
                    {userInitial}
                  </div>
                )}
                <label className="px-5 py-2.5 text-sm text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone cursor-pointer transition-colors">
                  تغيير الصورة
                  <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={handleAvatarChange} />
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-midnight-ink mb-2">الاسم الكامل</label>
                  <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-ink mb-2">البريد الإلكتروني</label>
                  <input type="email" value={profile.email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-ink mb-2">المنطقة</label>
                  <select value={profile.region} onChange={(e) => setProfile({ ...profile, region: e.target.value })} className={inputClass}>
                    <option value="">اختر المنطقة</option>
                    {["الرياض","جدة","مكة","الدمام","المدينة المنورة","أبها","تبوك","القصيم"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={saveProfile} disabled={saving} className="px-8 py-3 bg-action-black text-canvas-white rounded-[160px] font-medium hover:bg-midnight-ink transition-colors disabled:opacity-60">
                {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </div>
          )}

          {activeSection === "school" && (
            <div className="bg-off-white-sage rounded-[32px] p-8 space-y-6">
              <h2 className="font-arabic text-xl font-semibold text-midnight-ink">معلومات المدرسة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-midnight-ink mb-2">اسم المدرسة</label>
                  <input type="text" value={school.schoolName} onChange={(e) => setSchool({ ...school, schoolName: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-midnight-ink mb-2">المنطقة التعليمية</label>
                  <select value={school.region} onChange={(e) => setSchool({ ...school, region: e.target.value })} className={inputClass}>
                    <option value="">اختر المنطقة</option>
                    {["الرياض","جدة","مكة","الدمام","المدينة المنورة","أبها"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-midnight-ink mb-3">المراحل الدراسية</label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "elementary", label: "ابتدائي" },
                    { id: "middle", label: "متوسط" },
                    { id: "high", label: "ثانوي" },
                  ].map((grade) => {
                    const checked = school.gradeLevels.includes(grade.id);
                    return (
                      <label key={grade.id} className="flex items-center gap-2 px-4 py-2 bg-canvas-white border border-soft-concrete rounded-full cursor-pointer hover:border-highlight-orange">
                        <input type="checkbox" checked={checked} className="sr-only" onChange={(e) => {
                          setSchool({ ...school, gradeLevels: e.target.checked ? [...school.gradeLevels, grade.id] : school.gradeLevels.filter(g => g !== grade.id) });
                        }} />
                        <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${checked ? "bg-action-black border-action-black" : "border-soft-concrete"}`}>
                          {checked && <span className="text-white text-xs">✓</span>}
                        </div>
                        <span className="text-sm text-midnight-ink">{grade.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <button onClick={saveSchool} disabled={saving} className="px-8 py-3 bg-action-black text-canvas-white rounded-[160px] font-medium hover:bg-midnight-ink disabled:opacity-60">
                {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-off-white-sage rounded-[32px] p-8 space-y-6">
              <h2 className="font-arabic text-xl font-semibold text-midnight-ink">الأمان</h2>
              <div>
                <h3 className="text-sm font-medium text-midnight-ink mb-4">تغيير كلمة المرور</h3>
                <div className="space-y-4">
                  <input type="password" placeholder="كلمة المرور الحالية" value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className={inputClass} />
                  <input type="password" placeholder="كلمة المرور الجديدة (8 أحرف على الأقل)" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className={inputClass} />
                  <input type="password" placeholder="تأكيد كلمة المرور الجديدة" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className={inputClass} />
                </div>
                <button onClick={changePassword} disabled={saving || !passwords.currentPassword || !passwords.newPassword} className="mt-4 px-8 py-3 bg-action-black text-canvas-white rounded-[160px] font-medium hover:bg-midnight-ink disabled:opacity-60">
                  {saving ? "جاري الحفظ..." : "تغيير كلمة المرور"}
                </button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-off-white-sage rounded-[32px] p-8 space-y-6">
              <h2 className="font-arabic text-xl font-semibold text-midnight-ink">الإشعارات</h2>
              <div className="space-y-4">
                {Object.entries(NOTIF_LABELS).map(([key, { label, desc }]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-canvas-white rounded-[20px] border border-soft-concrete">
                    <div>
                      <div className="font-medium text-midnight-ink">{label}</div>
                      <div className="text-sm text-gunmetal-gray">{desc}</div>
                    </div>
                    <button
                      onClick={() => setNotifPrefs({ ...notifPrefs, [key]: !notifPrefs[key] })}
                      className={`w-12 h-7 rounded-full relative transition-colors ${notifPrefs[key] ? "bg-highlight-orange" : "bg-soft-concrete"}`}
                    >
                      <div className={`w-5 h-5 bg-canvas-white rounded-full absolute top-1 transition-all ${notifPrefs[key] ? "right-1" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={saveNotifications} disabled={saving} className="px-8 py-3 bg-action-black text-canvas-white rounded-[160px] font-medium hover:bg-midnight-ink disabled:opacity-60">
                {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
