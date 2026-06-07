import { ProductsType } from "@packages/types";
import Link from "next/link";
import Categories from "./Categories";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import { Suspense } from "react";

const fetchProducts = async ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params?: string;
}): Promise<ProductsType> => {
  console.log("Fetching products with params:", {
    category,
    sort,
    search,
    params,
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?` +
      new URLSearchParams({
        ...(category ? { category } : {}),
        sort: sort || "newest",
        ...(search ? { search } : {}),
        ...(params ? { params } : {}),
      }),
  );
  const data = await res.json();
  return data.products;
};

const ProductList = async ({
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
  const products = await fetchProducts({ category, sort, search, params });
  return (
    <div className="w-full">
      <Suspense fallback={null}>
        <Categories />
      </Suspense> 
      {params === "products" && <Filter />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
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
