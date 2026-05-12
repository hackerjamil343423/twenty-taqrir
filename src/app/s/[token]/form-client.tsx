"use client";

import { useState } from "react";
import { toast } from "sonner";
import { TemplatePreview } from "@/components/templates/template-preview";
import type { CatalogTemplate, TemplateField } from "@/lib/template-catalog";

interface FormClientProps {
  token: string;
  title: string;
  template: CatalogTemplate;
}

type FieldValue = string | string[] | number | Record<string, string>[];

export function FormClient({ token, title, template }: FormClientProps) {
  const [values, setValues] = useState<Record<string, FieldValue>>({});
  const [loading, setLoading] = useState(false);

  function setValue(id: string, value: FieldValue) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/s/${token}/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: values }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error ?? "حدث خطأ أثناء إنشاء الملف");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
      const action = submitter?.value;

      if (action === "preview") {
        window.open(url, "_blank", "noopener,noreferrer");
        toast.success("تم إنشاء المعاينة");
        return;
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("تم تحميل الملف بنجاح");
    } catch {
      toast.error("تعذّر الاتصال بالخادم، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  }

  if (
    template.pdfConfig.layout === "student-follow-up-record" ||
    template.pdfConfig.layout === "national-day-thanks-certificate"
  ) {
    const inputClass =
      "w-full h-11 rounded-[6px] border border-[#00b5cc] px-4 text-right text-[#666] outline-none transition-colors focus:border-[#0ab28b]";
    const textareaClass =
      "w-full min-h-56 rounded-[6px] border border-[#00b5cc] px-4 py-3 text-right text-[#666] outline-none transition-colors focus:border-[#0ab28b] resize-y";
    const isCertificate = template.pdfConfig.layout === "national-day-thanks-certificate";
    const fields = isCertificate
      ? [
          ["introLine", "تتقدم إدارة مدرسة .. بالشكر والتقدير لـ"],
          ["message1", "يعجز البيان عن وصف قيمتك وأثرك على النشء شكرًا لك من القلب"],
          ["message2", "وبدورنا نقدم له هذا الشكر كتقدير لجهوده المبذولة"],
          ["message3", "سائلين الله لها مزيدًا من التفوق والنجاح"],
          ["optionalLine", "سطر اختياري"],
          ["teacherTitle", "معلم المادة"],
          ["teacherName", "فلان الفلاني"],
          ["principalTitle", "مدير المدرسة"],
          ["principalName", "فلان الفلاني"],
        ]
      : [
          ["region", "بمنطقة ..."],
          ["educationOffice", "مكتب التعليم"],
          ["schoolName", "اسم المدرسة"],
          ["className", "الشعبة / الفصل"],
          ["teacherName", "معلم المادة"],
          ["principalName", "مدير المدرسة"],
        ];

    return (
      <div className="min-h-screen bg-white" dir="rtl">
        <main className="mx-auto flex max-w-[1360px] flex-col items-center px-5 py-8 font-[Cairo]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://eid-yat.info/twentyStore/ND93/img/logo.png"
            alt="logo"
            className="mb-3 w-[250px] max-w-full"
          />

          <h1 className="mb-2 text-center text-xl font-bold text-[#00b5cc]">
            {isCertificate ? "شهادة شكر فارغة لكتابة النصوص" : "كشف متابعة الطلاب"}
          </h1>
          <h2 className="mb-8 text-center text-xl font-bold text-[#00b5cc]">
            {isCertificate
              ? "قم بكتابة العبارات في المرة الأولى وبعد ذلك يتم فقط تغيير اسم صاحب الشكر"
              : "اكتب الاسماء ليتم تحميلها"}
          </h2>

          <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)]">
            <div className="lg:sticky lg:top-6">
              <TemplatePreview layout={template.pdfConfig.layout} values={values} />
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {isCertificate &&
                fields.slice(0, 1).map(([id, placeholder]) => (
                  <input
                    key={id}
                    type="text"
                    className={inputClass}
                    value={(values[id] as string) ?? ""}
                    onChange={(e) => setValue(id, e.target.value)}
                    placeholder={placeholder}
                  />
                ))}

              <textarea
                className={textareaClass}
                value={(values.studentNames as string) ?? ""}
                onChange={(e) => setValue("studentNames", e.target.value)}
                placeholder="اكتب (الصق) الاسماء هنا (كل اسم في سطر )"
                required
              />

              {(isCertificate ? fields.slice(1) : fields).map(([id, placeholder]) => (
                <input
                  key={id}
                  type="text"
                  className={inputClass}
                  value={(values[id] as string) ?? ""}
                  onChange={(e) => setValue(id, e.target.value)}
                  placeholder={placeholder}
                />
              ))}

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {isCertificate && (
                  <button
                    type="submit"
                    value="preview"
                    disabled={loading}
                    className="h-11 w-[200px] rounded-[6px] bg-[#00b5cc] px-3 text-[17px] font-bold text-white transition-colors hover:bg-[#0ab28b] disabled:opacity-60"
                  >
                    معاينة الشهادة
                  </button>
                )}
                <button
                  type="submit"
                  value="download"
                  disabled={loading}
                  className="h-11 w-[200px] rounded-[6px] bg-[#00b5cc] px-3 text-[17px] font-bold text-white transition-colors hover:bg-[#0ab28b] disabled:opacity-60"
                >
                  {loading ? "جاري التحميل..." : isCertificate ? "تحميل الشهادات" : "بي دي اف"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white-sage">
      <header className="bg-white border-b border-faded-stone">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center gap-3">
          <div className="w-7 h-7 bg-midnight-ink rounded-[5px] flex items-center justify-center">
            <span className="text-white font-bold text-xs">ت</span>
          </div>
          <span className="text-sm font-medium text-midnight-ink">تقارير</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-midnight-ink">{title}</h1>
          <p className="text-sm text-gunmetal-gray mt-1">{template.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {template.fields.map((field) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={values[field.id]}
              onChange={(v) => setValue(field.id, v)}
            />
          ))}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-midnight-ink text-white py-4 rounded-[160px] font-medium text-base hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {loading ? "جارٍ إنشاء الملف..." : "⬇ تحميل PDF"}
            </button>
            <p className="text-xs text-gunmetal-gray text-center mt-3">
              سيُحفظ الملف مباشرةً على جهازك — لا يتم رفع بياناتك
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}

interface FieldRendererProps {
  field: TemplateField;
  value: FieldValue | undefined;
  onChange: (v: FieldValue) => void;
}

function FieldRenderer({ field, value, onChange }: FieldRendererProps) {
  const labelEl = (
    <label className="block text-sm font-medium text-midnight-ink mb-2">
      {field.label}
      {field.required && <span className="text-highlight-orange mr-1">*</span>}
    </label>
  );

  const inputClass =
    "w-full px-4 py-3 border border-soft-concrete rounded-[10px] text-midnight-ink focus:outline-none focus:border-highlight-orange transition-colors bg-white text-sm";

  if (field.type === "text" || field.type === "number") {
    return (
      <div>
        {labelEl}
        <input
          type={field.type}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          className={inputClass}
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {labelEl}
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          rows={4}
          className={inputClass + " resize-none"}
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        {labelEl}
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={inputClass}
        >
          <option value="">اختر...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "multiselect") {
    const selected = (value as string[]) ?? [];
    return (
      <div>
        {labelEl}
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(
                    checked
                      ? selected.filter((v) => v !== opt.value)
                      : [...selected, opt.value]
                  );
                }}
                className={`px-4 py-2 text-sm rounded-[160px] border transition-colors ${
                  checked
                    ? "bg-midnight-ink text-white border-midnight-ink"
                    : "bg-white text-gunmetal-gray border-soft-concrete hover:border-midnight-ink"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div>
        {labelEl}
        <div className="flex flex-col gap-2">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name={field.id}
                value={opt.value}
                checked={(value as string) === opt.value}
                onChange={() => onChange(opt.value)}
                required={field.required}
                className="w-4 h-4 accent-midnight-ink"
              />
              <span className="text-sm text-midnight-ink">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "checkbox") {
    const selected = (value as string[]) ?? [];
    return (
      <div>
        {labelEl}
        <div className="flex flex-col gap-2">
          {field.options?.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    onChange(
                      checked
                        ? selected.filter((v) => v !== opt.value)
                        : [...selected, opt.value]
                    );
                  }}
                  className="w-4 h-4 accent-midnight-ink"
                />
                <span className="text-sm text-midnight-ink">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div>
        {labelEl}
        <input
          type="date"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={inputClass}
        />
      </div>
    );
  }

  if (field.type === "rating") {
    const current = (value as number) ?? 0;
    return (
      <div>
        {labelEl}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={`text-2xl transition-transform hover:scale-110 ${
                star <= current ? "opacity-100" : "opacity-30"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "table") {
    const rows = (value as Record<string, string>[]) ?? [{}];
    const cols = field.columns ?? [];

    function updateCell(rowIdx: number, colKey: string, cellValue: string) {
      const newRows = rows.map((row, i) =>
        i === rowIdx ? { ...row, [colKey]: cellValue } : row
      );
      onChange(newRows);
    }

    function addRow() {
      onChange([...rows, {}]);
    }

    function removeRow(idx: number) {
      onChange(rows.filter((_, i) => i !== idx));
    }

    return (
      <div>
        {labelEl}
        <div className="overflow-x-auto rounded-[10px] border border-soft-concrete">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-faded-stone">
                {cols.map((col) => (
                  <th key={col.key} className="text-right px-3 py-2 text-xs font-medium text-gunmetal-gray border-b border-soft-concrete">
                    {col.label}
                  </th>
                ))}
                <th className="w-8 border-b border-soft-concrete" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-faded-stone last:border-0">
                  {cols.map((col) => (
                    <td key={col.key} className="px-2 py-1">
                      <input
                        type={col.type === "date" ? "date" : "text"}
                        value={row[col.key] ?? ""}
                        onChange={(e) => updateCell(i, col.key, e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-transparent focus:border-highlight-orange rounded-[6px] focus:outline-none bg-transparent"
                      />
                    </td>
                  ))}
                  <td className="px-2 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(i)}
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="mt-2 text-xs text-gunmetal-gray hover:text-midnight-ink bg-faded-stone px-3 py-1.5 rounded-[8px] transition-colors"
        >
          + إضافة صف
        </button>
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div>
        {labelEl}
        <div className="px-4 py-3 border border-dashed border-soft-concrete rounded-[10px] text-sm text-gunmetal-gray text-center bg-faded-stone">
          المرفقات غير متاحة في هذا النموذج
        </div>
      </div>
    );
  }

  return null;
}
