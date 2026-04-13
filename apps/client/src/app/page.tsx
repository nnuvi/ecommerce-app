import Link from "next/link";
import Image from "next/image";
import ProductList from "../../src/components/ProductList";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="">
      <div className="relative aspect-3/1 mb-12">
        <Image src={"/featured.png"} alt={"Featured Product"} fill></Image>
      </div>
      <ProductList category={category} params={"products"} />
    </div>
  );
};

export default Homepage;
