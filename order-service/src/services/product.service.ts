export const getProductById = async (id: number) => {
  console.log(`Client: Fetching product with ID: ${id}`);
  const res = await fetch(`http://localhost:8008/products/${id}`);
  if (!res.ok) throw new Error("Product not found");

  return res.json();
};