interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center text-center">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white"
        >
          Try again
        </button>
      )}
    </div>
  );
}
