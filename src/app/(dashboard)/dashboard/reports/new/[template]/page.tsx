"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/forms/field-input";
import { Textarea } from "@/components/forms/field-textarea";
import { Select } from "@/components/forms/field-select";
import { MultiSelect } from "@/components/forms/field-multi-select";
import { DatePicker } from "@/components/forms/field-date-picker";
import { FileUpload } from "@/components/forms/field-file-upload";
import { CheckboxGroup } from "@/components/forms/field-checkbox-group";
import { RadioGroup } from "@/components/forms/field-radio-group";
import { DynamicTable } from "@/components/forms/field-dynamic-table";
import type { TemplateField } from "@/lib/template-catalog";

type TemplateResponse = {
  template: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    fields: TemplateField[];
  };
};

type FormValue = string | string[] | File[] | Record<string, string>[];

function asString(value: FormValue | undefined) {
  return typeof value === "string" ? value : "";
}

function asStringArray(value: FormValue | undefined) {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function asRows(value: FormValue | undefined) {
  return Array.isArray(value) && value.every((item) => typeof item === "object" && !(item instanceof File))
    ? (value as Record<string, string>[])
    : [];
}

function serializeData(data: Record<string, FormValue>) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => !(Array.isArray(value) && value.some((item) => item instanceof File)))
  );
}

export default function NewReportPage() {
  const router = useRouter();
  const params = useParams<{ template: string }>();
  const templateSlug = params.template;
  const [template, setTemplate] = useState<TemplateResponse["template"] | null>(null);
  const [formData, setFormData] = useState<Record<string, FormValue>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch(`/api/templates/${templateSlug}`)
      .then((res) => res.json())
      .then((data: TemplateResponse) => {
        if (mounted) setTemplate(data.template);
      })
      .catch(() => {
        if (mounted) setError("تعذر تحميل القالب");
      });
    return () => {
      mounted = false;
    };
  }, [templateSlug]);

  const requiredMissing = useMemo(
    () =>
      template?.fields.filter((field) => {
        if (!field.required) return false;
        const value = formData[field.id];
        return value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
      }) ?? [],
    [formData, template]
  );

  const updateField = (id: string, value: FormValue) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const createReport = async (status: "DRAFT" | "FINAL") => {
    if (!template || requiredMissing.length > 0) {
      setError("أكمل الحقول المطلوبة قبل الحفظ");
      return null;
    }

    setSaving(true);
    setError("");

    try {
      const payload = serializeData(formData);
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateSlug: template.slug,
          title: asString(formData.title) || template.name,
          status,
          data: payload,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "تعذر حفظ التقرير");

      const files = Object.values(formData).flatMap((value) =>
        Array.isArray(value) && value.every((item) => item instanceof File) ? (value as File[]) : []
      );
      if (files.length > 0) {
        const uploadData = new FormData();
        uploadData.append("reportId", result.report.id);
        files.forEach((file) => uploadData.append("files", file));
        await fetch("/api/evidence/upload", { method: "POST", body: uploadData });
      }

      return result.report as { id: string };
    } catch (err) {
      setError(err instanceof Error ? err.message : "تعذر حفظ التقرير");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    const report = await createReport("DRAFT");
    if (report) router.push(`/dashboard/reports/${report.id}`);
  };

  const handleGeneratePDF = async () => {
    const report = await createReport("FINAL");
    if (!report) return;

    const response = await fetch(`/api/reports/${report.id}/generate-pdf`, { method: "POST" });
    if (!response.ok) {
      setError("تم حفظ التقرير لكن تعذر إنشاء PDF");
      router.push(`/dashboard/reports/${report.id}`);
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `report-${report.id}.pdf`;
    anchor.click();
    URL.revokeObjectURL(url);
    router.push(`/dashboard/reports/${report.id}`);
  };

  if (!template) {
    return <div className="bg-off-white-sage rounded-[32px] p-8 text-gunmetal-gray">جاري تحميل القالب...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-arabic text-2xl font-bold text-midnight-ink">تقرير جديد</h1>
          <p className="text-gunmetal-gray text-sm mt-1">{template.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPreview((value) => !value)} className="px-5 py-2.5 text-sm font-medium text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone">
            {showPreview ? "إخفاء المعاينة" : "معاينة PDF"}
          </button>
          <button onClick={handleSaveDraft} disabled={saving} className="px-5 py-2.5 text-sm font-medium text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone disabled:opacity-60">
            {saving ? "جاري الحفظ..." : "حفظ كمسودة"}
          </button>
          <button onClick={handleGeneratePDF} disabled={saving} className="px-6 py-2.5 text-sm font-medium text-canvas-white bg-action-black rounded-[160px] hover:bg-midnight-ink disabled:opacity-60">
            {saving ? "جاري الإنشاء..." : "إنشاء PDF"}
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-[20px] px-5 py-3 text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-off-white-sage rounded-[32px] p-8 space-y-6">
          {template.fields.map((field) => {
            const value = formData[field.id];
            if (field.type === "textarea") {
              return <Textarea key={field.id} label={field.label} required={field.required} placeholder={field.placeholder} value={asString(value)} onChange={(e) => updateField(field.id, e.target.value)} rows={4} />;
            }
            if (field.type === "select") {
              return <Select key={field.id} label={field.label} required={field.required} placeholder="اختر..." options={field.options || []} value={asString(value)} onChange={(next) => updateField(field.id, next)} />;
            }
            if (field.type === "multiselect") {
              return <MultiSelect key={field.id} label={field.label} options={field.options || []} value={asStringArray(value)} onChange={(next) => updateField(field.id, next)} placeholder="اختر..." />;
            }
            if (field.type === "checkbox") {
              return <CheckboxGroup key={field.id} label={field.label} required={field.required} options={field.options || []} value={asStringArray(value)} onChange={(next) => updateField(field.id, next)} />;
            }
            if (field.type === "radio") {
              return <RadioGroup key={field.id} label={field.label} required={field.required} options={field.options || []} value={asString(value)} onChange={(next) => updateField(field.id, next)} />;
            }
            if (field.type === "date") {
              return <DatePicker key={field.id} label={field.label} required={field.required} value={asString(value)} onChange={(next) => updateField(field.id, next)} />;
            }
            if (field.type === "file") {
              return <FileUpload key={field.id} label={field.label} accept=".pdf,.jpg,.jpeg,.png" multiple onChange={(files) => updateField(field.id, files)} />;
            }
            if (field.type === "table") {
              return <DynamicTable key={field.id} label={field.label} required={field.required} columns={field.columns || []} rows={asRows(value)} onChange={(rows) => updateField(field.id, rows)} />;
            }
            return <Input key={field.id} type={field.type === "number" || field.type === "rating" ? "number" : "text"} label={field.label} required={field.required} placeholder={field.placeholder} value={asString(value)} onChange={(e) => updateField(field.id, e.target.value)} />;
          })}
        </div>

        {showPreview && (
          <aside className="bg-off-white-sage rounded-[32px] p-6 h-fit sticky top-24">
            <h3 className="font-arabic text-lg font-semibold text-midnight-ink mb-4">معاينة التقرير</h3>
            <div className="bg-canvas-white rounded-[20px] border border-soft-concrete p-6 min-h-[360px] space-y-4 text-sm">
              <div className="text-center border-b border-soft-concrete pb-4">
                <div className="font-arabic text-lg font-bold text-midnight-ink">وزارة التعليم</div>
                <div className="text-gunmetal-gray text-xs">المملكة العربية السعودية</div>
              </div>
              <h4 className="font-arabic text-xl font-bold text-midnight-ink text-center">{asString(formData.title) || template.name}</h4>
              {template.fields.slice(0, 6).map((field) => {
                if (field.type === "file" || field.type === "table") return null;
                const value = formData[field.id];
                const display = Array.isArray(value) ? value.join("، ") : asString(value);
                return (
                  <div key={field.id}>
                    <span className="text-xs text-gunmetal-gray">{field.label}</span>
                    <p className="font-medium text-midnight-ink">{display || "_____"}</p>
                  </div>
                );
              })}
              <div className="border-t border-soft-concrete pt-4 mt-4 text-center text-xs text-gunmetal-gray">توقيع المسؤول: ____________</div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
