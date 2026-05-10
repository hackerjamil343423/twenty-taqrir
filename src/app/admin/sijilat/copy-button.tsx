"use client";

import { useState } from "react";

export function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs bg-faded-stone px-3 py-1.5 rounded-[8px] hover:bg-soft-concrete transition-colors font-medium text-gunmetal-gray"
    >
      {copied ? "✓ تم النسخ" : "نسخ الرابط"}
    </button>
  );
}
