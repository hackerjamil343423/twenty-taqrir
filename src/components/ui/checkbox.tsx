"use client";

import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 rounded border border-input accent-primary cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };
