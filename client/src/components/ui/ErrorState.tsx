"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
  retryText = "Try again",
}: ErrorStateProps) {
  const router = useRouter();
  return (
    <div className="flex min-h-75 flex-col items-center justify-center text-center">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>

      {onRetry ? (
        <Button onClick={onRetry} className="mt-4">
          {retryText}
        </Button>
      ) : (
        <Button onClick={() => router.refresh()} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  );
}
