"use client";

import { cn } from "@/lib/utils";

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  error?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  required?: boolean;
}

export const MultiSelect = ({
  label,
  error,
  options,
  value,
  onChange,
  placeholder = "اختر...",
  required,
}: MultiSelectProps) => {
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
      <div className="relative">
        <div
          className={cn(
            "min-h-[52px] w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] cursor-pointer",
            "focus-within:border-highlight-orange transition-colors",
            error && "border-red-500"
          )}
          onClick={() => document.getElementById("multiselect-dropdown")?.focus()}
        >
          {value.length === 0 ? (
            <span className="text-gunmetal-gray/50">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {value.map((v) => {
                const opt = options.find((o) => o.value === v);
                return (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-canvas-white border border-soft-concrete rounded-full text-sm text-midnight-ink"
                  >
                    {opt?.label || v}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(v);
                      }}
                      className="text-gunmetal-gray hover:text-midnight-ink mr-1"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div
          id="multiselect-dropdown"
          className="absolute z-20 w-full mt-2 bg-canvas-white border border-soft-concrete rounded-[20px] shadow-lg overflow-hidden"
          tabIndex={0}
        >
          {options.map((opt) => {
            const isSelected = value.includes(opt.value);
            return (
              <div
                key={opt.value}
                className={cn(
                  "px-5 py-3 cursor-pointer hover:bg-off-white-sage transition-colors",
                  isSelected && "bg-off-white-sage"
                )}
                onClick={() => toggle(opt.value)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 border-2 rounded flex items-center justify-center transition-colors",
                      isSelected ? "bg-action-black border-action-black" : "border-soft-concrete"
                    )}
                  >
                    {isSelected && <span className="text-canvas-white text-xs">✓</span>}
                  </div>
                  <span className="text-midnight-ink">{opt.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};