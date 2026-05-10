"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RatingProps {
  label?: string;
  error?: string;
  required?: boolean;
  max?: number;
  value?: number;
  onChange: (value: number) => void;
}

export const Rating = ({ label, error, required, max = 5, value = 0, onChange }: RatingProps) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}

      <div className="flex items-center gap-1" role="group" aria-label={label}>
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
          const filled = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              aria-label={`${star} من ${max}`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-highlight-orange rounded"
            >
              <svg
                className={cn(
                  "w-8 h-8 transition-colors",
                  filled ? "text-highlight-orange" : "text-soft-concrete"
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.953 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            </button>
          );
        })}

        {value > 0 && (
          <span className="mr-2 text-sm text-gunmetal-gray">
            {value}/{max}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
