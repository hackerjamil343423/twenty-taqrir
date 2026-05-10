"use client";

import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  error?: string;
  accept?: string;
  onChange: (files: File[]) => void;
  required?: boolean;
  multiple?: boolean;
}

export const FileUpload = ({
  label,
  error,
  accept,
  onChange,
  required,
  multiple = false,
}: FileUploadProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange(files);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-midnight-ink">
          {label}
          {required && <span className="text-highlight-orange mr-1">*</span>}
        </label>
      )}
      <label
        className={cn(
          "flex flex-col items-center justify-center w-full px-5 py-8 bg-off-white-sage border-2 border-dashed border-soft-concrete rounded-[20px] cursor-pointer",
          "hover:border-highlight-orange hover:bg-faded-stone transition-colors",
          error && "border-red-500"
        )}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 bg-faded-stone rounded-full flex items-center justify-center">
            <span className="text-2xl">📎</span>
          </div>
          <div>
            <p className="text-sm font-medium text-midnight-ink">اسحب الملفات هنا أو انقر للرفع</p>
            <p className="text-xs text-gunmetal-gray mt-1">PDF, JPG, PNG حتى 10MB</p>
          </div>
        </div>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="sr-only"
        />
      </label>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};