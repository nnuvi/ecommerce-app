"use client";

import { ShoppingCart } from "lucide-react";
import useCartStore from "../app/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductType } from "../app/types";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const { addToCart } = useCartStore();

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: productTypes.size,
      selectedColor: productTypes.color,
    });
    toast.success("Product added to cart");
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-stone-50">
      <Link href={"/products/$product.id"}>
        <div className="relative aspect-2/3">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            className="object-cover hover:scale-105 transition-all duration-300"
            fill
          />
        </div>
      </Link>
      {/** Product Detail */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-sans text-black">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        <div className="flex items-center gap-4 text-xs">
          {/**Size */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-500 text-gray-500 rounded-md px-2 py-1"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option
                  key={size}
                  value={size}
                  className="bg-white text-gray-500"
                >
                  {size.toLocaleUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/**Color */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                  className={`w-3.5 h-3.5 rounded-full cursor-pointer border ${
                    productTypes.color === color
                      ? "border-gray-500"
                      : "border-gray-100"
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {/** Price and Cart */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-500">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="ring-1 ring-gray-500 text-gray-500 shadow-lg rounded-md px-2 py- 1 text-sm hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2 "
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
