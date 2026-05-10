"use client";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = ({ label, error, className, ...props }: TextareaProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {props.required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink placeholder:text-gunmetal-gray/50",
          "focus:outline-none focus:border-highlight-orange transition-colors resize-none",
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