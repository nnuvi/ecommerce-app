import ProductList from "../../components/ProductList";

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
        <ProductList
          category={category}
          sort={sort}
          search={search}
          params="products"
        />
      </div>
    )
  );
}
