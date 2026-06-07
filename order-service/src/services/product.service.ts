export const getProductById = async (id: number) => {
  console.log(`Client: Fetching product with ID: ${id}`);
  const res = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");

  return res.json();
};