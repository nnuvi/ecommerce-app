import { Suspense } from "react";
import ProductList from "../../components/ProductList";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    sort: string;
    search: string;
  }>;
}) {
  const { category, sort, search } = await searchParams;

  return (
    console.log("ProductsPage searchParams:", { category, sort, search }),
    (
      <div>
        <Suspense fallback={<ProductCardSkeleton count={8} />}>
          <ProductList
            category={category}
            sort={sort}
            search={search}
            params="products"
          />
        </Suspense>
        {/* <ProductList
          category={category}
          sort={sort}
          search={search}
          params="products"
        /> */}
      </div>
    )
  );
}
