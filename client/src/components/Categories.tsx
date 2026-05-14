"use client";
import {
  ShoppingBasket,
  Shirt,
  Glasses,
  Briefcase,
  Venus,
  Hand,
  Footprints,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    // icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "",
  },
  {
    name: "T-shirts",
    // icon: <Shirt className="w-4 h-4" />,
    slug: "tshirts",
  },
  {
    name: "Hoodies",
    // icon: <Glasses className="w-4 h-4" />,
    slug: "hoodies",
  },
  {
    name: "Jackets",
    // icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Pants",
    // icon: <Briefcase className="w-4 h-4" />,
    slug: "pants",
  },
  {
    name: "Jeans",
    // icon: <Venus className="w-4 h-4" />,
    slug: "jeans",
  },
  {
    name: "Leggings",
    // icon: <Hand className="w-4 h-4" />,
    slug: "leggings",
  },
  {
    name: "Shoes",
    // icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "") {
      // Clicking "All" removes the category parameter completely
      params.delete("category");
    } else if (selectedCategory === value) {
      // Clicking the same category again toggles it off
      params.delete("category");
    } else {
      // Set selected category
      params.set("category", value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-stone-200 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center font-20% gap-2 cursor-pointer px-2 py-1 rounded-md ${
            category.slug === selectedCategory ? "bg-white" : "text-gray-500"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          {/* {category.icon} */}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
