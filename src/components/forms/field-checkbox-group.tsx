"use client";

import { cn } from "@/lib/utils";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label?: string;
  error?: string;
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
}

export const CheckboxGroup = ({
  label,
  error,
  options,
  value,
  onChange,
  required,
}: CheckboxGroupProps) => {
  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}
      <div className="space-y-3">
        {options.map((opt) => {
          const isChecked = value.includes(opt.value);
          return (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={cn(
                  "w-5 h-5 border-2 rounded flex items-center justify-center transition-colors",
                  isChecked ? "bg-action-black border-action-black" : "border-soft-concrete group-hover:border-gunmetal-gray"
                )}
                onClick={() => toggle(opt.value)}
              >
                {isChecked && <span className="text-canvas-white text-xs">✓</span>}
              </div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(opt.value)}
                className="sr-only"
              />
              <span className="text-midnight-ink text-sm">{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};