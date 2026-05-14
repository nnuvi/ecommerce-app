import type { OrderProductType } from "@packages/types";
import Link from "next/link";

interface OrderProductCardProps {
  product: OrderProductType;
}

const OrderProductCard = ({ product }: OrderProductCardProps) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="
        flex items-center gap-3
        w-full sm:w-[320px] lg:w-85
        rounded-xl border border-gray-200
        bg-white p-3
        hover:shadow-md
        transition-shadow duration-200
      "
    >
      {/* PRODUCT IMAGE PLACEHOLDER */}
      <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100 border border-gray-100">
        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
          Image
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="flex-1 min-w-0">
        {/* Product Name */}
        <h4 className="font-medium text-sm sm:text-base text-gray-900 line-clamp-2">
          {product.name}
        </h4>

        {/* Quantity and Unit Price */}
        <div className="mt-1 space-y-0.5 text-xs sm:text-sm text-gray-500">
          <p>Qty: {product.quantity}</p>
          <p>${product.price.toFixed(2)} each</p>
        </div>

        {/* Total Price */}
        <p className="mt-2 text-sm font-semibold text-gray-900">
          ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default OrderProductCard;