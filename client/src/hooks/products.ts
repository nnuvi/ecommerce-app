"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/products";

export const useGetProducts = ({
  category,
  sort,
  search,
  params,
}: {
  category?: string;
  sort?: string;
  search?: string;
  params?: "homepage" | "products";
}) => {
  return useQuery({
    queryKey: ["products", { category, sort, search, params }],

    queryFn: () =>
      fetchProducts({
        ...(category ? { category } : {}),
        ...(sort ? { sort } : {}),
        ...(search ? { search } : {}),
        ...(params ? { params } : {}),
      }),
  });
};
