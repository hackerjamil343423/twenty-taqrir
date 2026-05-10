"use client";

import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Select = ({
  label,
  error,
  options,
  placeholder,
  className,
  onChange,
  ...props
}: SelectProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {props.required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}
      <select
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink",
          "focus:outline-none focus:border-highlight-orange transition-colors appearance-none cursor-pointer",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23615e5b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left 16px center",
          backgroundSize: "20px",
          paddingLeft: "48px",
        }}
        {...props}
      >
        <option value="">{placeholder || "اختر..."}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};