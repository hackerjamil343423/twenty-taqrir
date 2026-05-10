"use client";

import { cn } from "@/lib/utils";

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const DatePicker = ({ label, error, className, onChange, ...props }: DatePickerProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {props.required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}
      <input
        type="date"
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink",
          "focus:outline-none focus:border-highlight-orange transition-colors",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};