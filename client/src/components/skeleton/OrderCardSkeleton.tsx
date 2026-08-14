interface OrderListSkeletonProps {
  count?: number;
}

export function OrderListSkeleton({ count = 1 }: OrderListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-lg bg-white p-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>

            <div className="h-7 w-20 rounded-full bg-gray-200" />
          </div>

          {/* Items */}
          <div className="mt-4 space-y-3">
            {Array.from({ length: 2 }).map((_, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-200" />
                </div>

                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between pt-4">
            <div className="h-5 w-24 rounded bg-gray-200" />

            <div className="h-9 w-24 rounded-md bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
