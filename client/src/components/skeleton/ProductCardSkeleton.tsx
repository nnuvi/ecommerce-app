interface ProductCardSkeletonProps {
  count?: number;
}

export function ProductCardSkeleton({ count = 1 }: ProductCardSkeletonProps) {
  return (
    // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg bg-white shadow-md"
        >
          {/* Image */}
          <div className="aspect-3/4 w-full animate-pulse bg-gray-200" />

          {/* Content */}
          <div className="space-y-3 p-4">
            {/* Category */}
            <div className="h-4 w-28 animate-pulse rounded-full bg-gray-200" />

            {/* Title */}
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />

            {/* Description */}
            <div className="h-6 w-full animate-pulse rounded bg-gray-200" />

            {/* Bottom row */}
            <div className="flex gap-4 items-center justify-between">
              <div className="h-6 w-18 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
