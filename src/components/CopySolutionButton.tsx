"use client";

import { useState } from "react";

export function CopySolutionButton({ code }: { code: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function copySolution() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  const label = status === "copied" ? "Copied" : status === "error" ? "Copy failed" : "Copy code";

  return (
    <button
      type="button"
      onClick={copySolution}
      aria-label="Copy solution code"
      className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-emerald-500/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
    >
      {label}
    </button>
  );
}