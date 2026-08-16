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
      title="Couldn't load orders"
      description="Something went wrong while loading your orders. Please try again."
      onRetry={reset}
    />
  );
}
