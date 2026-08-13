import Image from "next/image";
import ProductList from "../components/ProductList";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;

  return (
    <div className="">
      <div className="relative w-full aspect-3/1 mb-8">
        <Image
          src={"/feat.png"}
          alt={"Featured Product"}
          fill
          priority
          sizes="100vw"
        />
      </div>
      {/* <div className="relative aspect-1920/800 mb-8">
        <Image
          src="/feat.png"
          alt="Featured Product"
          fill
          className="object-cover"
        />
      </div> */}
      <ProductList category={category} params={"homepage"} />
    </div>
  );
};

export default Homepage;
