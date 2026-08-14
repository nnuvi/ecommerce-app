import Image from "next/image";
import ProductList from "../components/ProductList";
import { Suspense } from "react";
import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";

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
      <Suspense fallback={<ProductCardSkeleton count={8} />}>
        <ProductList category={category} params={"homepage"} />
      </Suspense>
    </div>
  );
};

export default Homepage;
