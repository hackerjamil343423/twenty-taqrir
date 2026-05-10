"use client";

import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label?: string;
  error?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const RadioGroup = ({
  label,
  error,
  options,
  value,
  onChange,
  required,
}: RadioGroupProps) => {
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
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={cn(
                  "w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors",
                  isSelected ? "border-action-black" : "border-soft-concrete group-hover:border-gunmetal-gray"
                )}
              >
                {isSelected && <div className="w-2.5 h-2.5 bg-action-black rounded-full" />}
              </div>
              <input
                type="radio"
                checked={isSelected}
                onChange={() => onChange(opt.value)}
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