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
      title="Couldn't load page"
      description="Something went wrong while loading the page. Please try again."
      onRetry={reset}
    />
  );
}
