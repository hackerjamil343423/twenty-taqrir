"use client";

import { cn } from "@/lib/utils";

export type DateRange = { from: string; to: string };

interface DateRangePickerProps {
  label?: string;
  error?: string;
  required?: boolean;
  value?: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangePicker = ({
  label,
  error,
  required,
  value,
  onChange,
}: DateRangePickerProps) => {
  const from = value?.from ?? "";
  const to = value?.to ?? "";

  const handleFrom = (newFrom: string) => {
    onChange({ from: newFrom, to: newFrom > to ? "" : to });
  };

  const handleTo = (newTo: string) => {
    onChange({ from, to: newTo });
  };

  const inputClass = cn(
    "w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink",
    "focus:outline-none focus:border-highlight-orange transition-colors",
    error && "border-red-500 focus:border-red-500"
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 space-y-1">
          <span className="text-xs text-gunmetal-gray">من</span>
          <input
            type="date"
            value={from}
            onChange={(e) => handleFrom(e.target.value)}
            required={required}
            className={inputClass}
          />
        </div>

        <div className="mt-5 text-gunmetal-gray">—</div>

        <div className="flex-1 space-y-1">
          <span className="text-xs text-gunmetal-gray">إلى</span>
          <input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => handleTo(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {from && to && (
        <p className="text-xs text-gunmetal-gray">
          {new Date(from).toLocaleDateString("ar-SA")} — {new Date(to).toLocaleDateString("ar-SA")}
        </p>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
