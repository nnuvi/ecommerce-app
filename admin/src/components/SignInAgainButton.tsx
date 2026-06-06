"use client";

import { useClerk } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";

export default function SignInAgainButton() {
  const { signOut } = useClerk();

  const handleClick = async () => {
    await signOut({
      redirectUrl: "/sign-in",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 inline-flex items-center justify-center gap-2 rounded-4xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Sign In Again
    </button>
  );
}