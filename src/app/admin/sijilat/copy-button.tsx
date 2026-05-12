"use client";

import { useState } from "react";

export function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function copyWithFallback() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }

  return (
    <div className="flex max-w-[260px] flex-col items-start gap-2">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="max-w-full truncate text-xs font-medium text-midnight-ink hover:underline"
        title={url}
      >
        {url}
      </a>
      <button
        type="button"
        onClick={copyWithFallback}
        className="text-xs bg-faded-stone px-3 py-1.5 rounded-[8px] hover:bg-soft-concrete transition-colors font-medium text-gunmetal-gray"
      >
        {copied ? "✓ تم النسخ" : failed ? "حدد الرابط وانسخه" : "نسخ الرابط"}
      </button>
    </div>
  );
}
