"use client";

import { useGetProducts } from "@/hooks/products";
import Link from "next/link";
import { Suspense } from "react";
import Categories from "./Categories";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import { EmptyState } from "./ui/EmptyState";
import { ErrorState } from "./ui/ErrorState";
import { ProductCardSkeleton } from "./skeleton/ProductCardSkeleton";
import { logger } from "@packages/logger/browser";

const ProductList = ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  const {
    data: products,
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useGetProducts({
    params,
    ...(category && { category }),
    ...(sort && { sort }),
    ...(search && { search }),
  });

  logger.debug("Fetched products ProductList:", {
    isPending,
    isError,
    isRefetching,
  });

  if (isPending || isRefetching) {
    return <ProductCardSkeleton count={8} />;
  }

  if (products?.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description={
          search
            ? `No products found for "${search}".`
            : category
              ? `No products found in category "${category}".`
              : "Try changing your search or filters."
        }
        action={
          search || category ? (
            <Link href="/products" className="text-sm text-gray-500 underline">
              View all products
            </Link>
          ) : null
        }
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title={"Couldn't load products"}
        description={
          "Something went wrong while loading the products. Please try again."
        }
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="w-full">
      <Suspense fallback={null}>
        <Categories />
      </Suspense>
      {params === "products" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
