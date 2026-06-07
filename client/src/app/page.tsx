// import Link from "next/link";
// import Image from "next/image";
// import ProductList from "../../src/components/ProductList";

// const Homepage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ category: string }>;
// }) => {
//   const category = (await searchParams).category;
//   console.log("Homepage searchParams:", { category });
//   return (
//     <div className="">
//       <div className="relative aspect-3/1 mb-8">
//         <Image src={"/featured1.png"} alt={"Featured Product"} fill></Image>
//       </div>
//       <ProductList category={category} params={"homepage"} />
//     </div>
//   );
// };

// export default Homepage;

import Link from "next/link";
import Image from "next/image";
import ProductList from "../components/ProductList";

const Homepage = async ({
  searchParams,
}: {
  searchParams?: { category?: string };
}) => {
  const category = searchParams?.category;
  console.log("Homepage searchParams:", { category });
  return (
    <div className="">
      <div className="relative aspect-3/1 mb-8">
        <Image src={"/featured1.png"} alt={"Featured Product"} fill></Image>
      </div>
      <ProductList category={category} params={"homepage"} />
    </div>
  );
};

export default Homepage;
