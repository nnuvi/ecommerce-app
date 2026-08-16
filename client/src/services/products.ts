import { api } from "@/lib/api";
import { logger } from "@packages/logger/browser";
import { ProductsType, ProductType } from "@packages/types";
import { cache } from "react";

interface FetchProductsParams {
  category?: string;
  sort?: string;
  search?: string;
  params?: string;
}

export const fetchProducts = async ({
  category,
  sort,
  search,
  params,
}: FetchProductsParams): Promise<ProductsType> => {
  const res = await api.get<ProductsType>(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?` +
      new URLSearchParams({
        ...(category ? { category } : {}),
        sort: sort || "newest",
        ...(search ? { search } : {}),
        ...(params ? { params } : {}),
      }),
  );

  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch products: ${res.status}`);
  //   }

  //   const data = await res.json();

  //   logger.debug("Fetched products fetchProducts:", { data });

  logger.debug("Fetched products fetchProducts:", {
    data: res?.map((p: { name: string }) => p.name),
  });

  //   if (!data.success) {
  //     throw new Error(data.message || "Failed to fetch products");
  //   }

  return res;
};

export const fetchProduct = cache(async (id: string): Promise<ProductType> => {
  const res = await api.get<ProductType>(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`,
    {
      cache: "no-store",
    },
  );

  return res;
});
