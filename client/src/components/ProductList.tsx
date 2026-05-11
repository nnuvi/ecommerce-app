import { ProductsType } from "@packages/types";
import Link from "next/link";
import Categories from "./Categories";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

// TEMPORARY
const products: ProductsType = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "tshirts",
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: {
      gray: "/products/2g.png",
      green: "/products/2gr.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "jackets",
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "hoodies",
  },
  {
    id: 4,
    name: "Nike Dri Flex T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 29.9,
    sizes: ["s", "m", "l"],
    colors: ["white", "pink"],
    images: {
      white: "/products/4w.png",
      pink: "/products/4p.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "tshirts",
  },
  {
    id: 5,
    name: "Under Armour StormFleece",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 49.9,
    sizes: ["s", "m", "l"],
    colors: ["red", "orange", "black"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "jackets",
  },
  {
    id: 6,
    name: "Nike Air Max 270",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["40", "42", "43", "44"],
    colors: ["gray", "white"],
    images: {
      gray: "/products/6g.png",
      white: "/products/6w.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "shoes",
  },
  {
    id: 7,
    name: "Nike Ultraboost Pulse",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["40", "42", "43"],
    colors: ["gray", "pink"],
    images: {
      gray: "/products/7g.png",
      pink: "/products/7p.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "shoes",
  },
  {
    id: 8,
    name: "Levi’s Classic Denim",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l"],
    colors: ["blue", "green"],
    images: {
      blue: "/products/8b.png",
      green: "/products/8gr.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "jeans",
  },

  {
    id: 9,
    name: "Nike Pro Training Leggings",
    shortDescription: "High-waisted, moisture-wicking leggings for high-intensity workouts.",
    description: "Experience ultimate comfort and support with the Nike Pro Training Leggings. Featuring Dri-FIT technology to keep you dry and a wide elastic waistband for a secure fit.",
    price: 45.0,
    sizes: ["xs", "s", "m", "l", "xl"],
    colors: ["black", "purple", "gray"],
    images: {
      black: "/products/9bl.png",
      purple: "/products/9p.png",
      gray: "/products/9g.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "leggings",
  },
  {
    id: 10,
    name: "Adidas Originals Trefoil Hoodie",
    shortDescription: "Classic cozy fleece hoodie with the iconic trefoil logo.",
    description: "This hoodie stays true to its sporty roots with a bold logo on the chest. Made of soft cotton French territory for a premium feel.",
    price: 65.0,
    sizes: ["s", "m", "l"],
    colors: ["pink", "white", "black"],
    images: {
      pink: "/products/10p.png",
      white: "/products/10w.png",
      black: "/products/10bl.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "hoodies",
  },
  {
    id: 11,
    name: "Puma Run Favorite Jacket",
    shortDescription: "Lightweight windbreaker designed for evening runs.",
    description: "Stay visible and protected with wind-resistant fabric and reflective elements. Features a zip guard at the collar for extra comfort.",
    price: 75.0,
    sizes: ["s", "m", "l", "xl"],
    colors: ["teal", "black"],
    images: {
      teal: "/products/11t.png",
      black: "/products/11bl.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "jackets",
  },
  // {
  //   id: 12,
  //   name: "Reebok Seamless Sports Bra",
  //   shortDescription: "Medium impact support with a seamless, irritation-free design.",
  //   description: "Designed for cycling, boxing, and gym sessions. The seamless knit construction prevents chafing while providing a breathable fit.",
  //   price: 30.0,
  //   sizes: ["xs", "s", "m", "l"],
  //   colors: ["red", "blue", "gray"],
  //   images: {
  //     red: "/products/12r.png",
  //     blue: "/products/12b.png",
  //     gray: "/products/12g.png",
  //   },
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   categorySlug: "sports-bras",
  // },
  // {
  //   id: 12,
  //   name: "Lululemon Align High-Rise Pant",
  //   shortDescription: "Buttery-soft fabric that feels weightless.",
  //   description: "Perfect for yoga and low-impact workouts. These pants offer a naked sensation and 4-way stretch for maximum mobility.",
  //   price: 98.0,
  //   sizes: ["2", "4", "6", "8", "10"],
  //   colors: ["maroon", "green", "black"],
  //   images: {
  //     maroon: "/products/12m.png",
  //     green: "/products/12gr.png",
  //     black: "/products/12bl.png",
  //   },
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   categorySlug: "leggings",
  // },
  {
    id: 12,
    name: "Under Armour Tech V-Neck",
    shortDescription: "Quick-drying, ultra-soft V-neck gym shirt.",
    description: "UA Tech fabric is quick-drying, ultra-soft and has a more natural feel. Anti-odor technology prevents the growth of odor-causing microbes.",
    price: 25.0,
    sizes: ["s", "m", "l", "xl"],
    colors: ["white", "orange", "blue"],
    images: {
      white: "/products/12w.png",
      orange: "/products/12o.png",
      blue: "/products/12b.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "tshirts",
  },
  {
    id: 13,
    name: "The North Face Westcliffe Down Jacket",
    shortDescription: "Eco-friendly insulation for extreme winter warmth.",
    description: "A premium puffer jacket filled with 600-fill down. Features a water-repellent finish and a relaxed fit for layering.",
    price: 230.0,
    sizes: ["s", "m", "l"],
    colors: ["brown", "black"],
    images: {
      brown: "/products/13br.png",
      black: "/products/13bl.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "jackets",
  },
  {
    id: 14,
    name: "Champion Reverse Weave Joggers",
    shortDescription: "Heavyweight fleece joggers for a relaxed aesthetic.",
    description: "The gold standard of sweatpants. Tailored fit with signature ribbed gusset for movement and durability.",
    price: 55.0,
    sizes: ["s", "m", "l"],
    colors: ["gray", "navy"],
    images: {
      gray: "/products/14g.png",
      navy: "/products/14n.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "pants",
  },
  {
    id: 15,
    name: "Levi’s 501 Original Shorts",
    shortDescription: "The first-ever denim shorts, now with a high-waist.",
    description: "An iconic silhouette that defines the waist and hugs you in all the right places. Finished with a raw hem for a vintage look.",
    price: 60.0,
    sizes: ["24", "25", "26", "27", "28"],
    colors: ["light-blue", "white"],
    images: {
      "light-blue": "/products/15lb.png",
      white: "/products/15w.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "shorts",
  },
  {
    id: 16,
    name: "ASICS Gel-Kayano 29",
    shortDescription: "Premium stability running shoes for smooth strides.",
    description: "Creates a stable running experience and a more responsive feel underfoot. Featuring a low-profile external heel counter for advanced rearfoot support.",
    price: 160.0,
    sizes: ["37", "38", "39", "40", "41"],
    colors: ["white", "pink"],
    images: {
      white: "/products/16w.png",
      pink: "/products/16p.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    categorySlug: "shoes",
  },
];

const ProductList = ({ category, params }: { category: string, params:"homepage" | "products" }) => {
  return (
    <div className="w-full">
      <Categories />
      {params === "products" && <Filter/>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;