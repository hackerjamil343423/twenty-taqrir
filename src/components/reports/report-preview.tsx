"use client";

import { cn } from "@/lib/utils";

type Field = { id: string; label?: string; type?: string };

interface ReportPreviewProps {
  title: string;
  templateName: string;
  schoolName?: string;
  fields: Field[];
  data: Record<string, unknown>;
  className?: string;
}

function displayValue(value: unknown): string {
  if (value === undefined || value === null || value === "") return "____________________";
  if (Array.isArray(value)) return value.map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v))).join("، ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function ReportPreview({ title, templateName, schoolName, fields, data, className }: ReportPreviewProps) {
  const today = new Date().toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      className={cn(
        "bg-white border border-soft-concrete rounded-[20px] overflow-hidden text-sm font-arabic",
        className
      )}
      dir="rtl"
    >
      {/* Ministry Header */}
      <div className="bg-midnight-ink text-canvas-white px-6 py-4 text-center">
        <p className="text-xs mb-1">المملكة العربية السعودية — وزارة التعليم</p>
        {schoolName && <p className="text-xs text-gray-300">{schoolName}</p>}
        <h2 className="text-base font-bold mt-2">{templateName}</h2>
      </div>

      {/* Report Title */}
      <div className="px-6 py-4 border-b border-faded-stone flex items-center justify-between">
        <h3 className="font-bold text-midnight-ink">{title}</h3>
        <span className="text-xs text-gunmetal-gray">{today}</span>
      </div>

      {/* Fields */}
      <div className="px-6 py-4 space-y-4">
        {fields.map((field) => {
          const value = data[field.id];
          const hasValue = value !== undefined && value !== null && value !== "";

          return (
            <div key={field.id} className="space-y-1">
              {field.label && (
                <label className="text-xs font-semibold text-gunmetal-gray">{field.label}</label>
              )}
              <div
                className={cn(
                  "px-3 py-2 rounded-[12px] border text-sm min-h-[36px]",
                  hasValue
                    ? "bg-off-white-sage border-soft-concrete text-midnight-ink"
                    : "bg-white border-dashed border-soft-concrete text-gunmetal-gray/40"
                )}
              >
                {displayValue(value)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-faded-stone bg-off-white-sage flex items-center justify-between text-xs text-gunmetal-gray">
        <span>تقارير تونتي</span>
        <span>معاينة — غير رسمية</span>
      </div>
    </div>
  );
}
