"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function TestCard() {
  const [copied, setCopied] = useState(false);

  const copyCardNumber = async () => {
    await navigator.clipboard.writeText("4242424242424242");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center mb-4 rounded-xl border bg-gray-50 p-4">
      <h3 className="mb-4 font-semibold">Stripe Test Card</h3>
      <button
        type="button"
        onClick={copyCardNumber}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-100"
      >
        <span className="font-mono">4242 4242 4242 4242</span>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
