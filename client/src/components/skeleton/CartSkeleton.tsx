type CartSkeletonProps = {
  count?: number;
};

export function CartSkeleton({ count = 1 }: CartSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex gap-4 rounded-lg bg-white p-4">
          {/* Product image */}
          <div className="h-24 w-24 shrink-0 animate-pulse rounded-lg bg-gray-200" />

          {/* Product information */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-gray-200" />

            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

            <div className="h-5 w-18 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Remove button */}
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
