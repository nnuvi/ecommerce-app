interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = "Nothing found",
  description = "There is nothing to display here.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center text-center">
      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
