"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      title="Couldn't load products"
      description="Something went wrong while loading the products. Please try again."
      onRetry={reset}
    />
  );
}
