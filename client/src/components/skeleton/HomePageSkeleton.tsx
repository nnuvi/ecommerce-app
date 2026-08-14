import { NavBarSkeleton } from "./NavBarSkeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

type HomePageSkeletonProps = {
  navBar?: boolean;
};

export function HomePageSkeleton({ navBar = true }: HomePageSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-lg gap-y-4">
      {navBar && <NavBarSkeleton />}
      {/* Image */}
      <div className="aspect-16/7 w-full animate-pulse rounded bg-gray-200 mt-2" />

      <div className="h-9 w-full animate-pulse rounded bg-gray-200 my-6" />

      {/* Content */}
      <div className="space-y-3">
        {/* Category */}
        <ProductCardSkeleton count={8} />
      </div>
    </div>
  );
}
