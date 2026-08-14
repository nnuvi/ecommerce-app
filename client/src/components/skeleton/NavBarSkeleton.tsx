export function NavBarSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg">
      <div className="h-9 w-22 animate-pulse rounded bg-gray-200" />

      <div className="flex items-center justify-evenly gap-4 rounded-lg p-4">
        <div className="h-8 w-55 animate-pulse rounded-full bg-gray-200" />

        <div className="hidden h-8 w-11 animate-pulse rounded-full bg-gray-200 sm:block" />

        <div className="hidden h-8 w-11 animate-pulse rounded-full bg-gray-200 sm:block" />

        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
