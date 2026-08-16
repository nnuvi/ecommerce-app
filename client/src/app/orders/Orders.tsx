"use client";

import { OrderListSkeleton } from "@/components/skeleton/OrderCardSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useGetOrders } from "@/hooks/orders";
import OrderProductCard from "@/components/OrderProductCard";

export default function OrdersPage() {
  const {
    data: orders,
    isPending,
    isError,
    isRefetching,
    refetch,
  } = useGetOrders();

  if (isPending || isRefetching) {
    return <OrderListSkeleton count={5} />;
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No orders found!"
        description="No orders found currently"
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title={"Error fetching orders"}
        description={"Failed to fetch orders. Please try again later."}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-stone-600 text-center mb-4">
          Your Orders
        </h1>
        <p className="text-gray-500 mt-1">
          View your purchase history and ordered products.
        </p>
      </div>

      {/* ORDERS */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* LEFT COLUMN - ORDER DETAILS */}
              <div className="lg:col-span-1 bg-stone-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-6">Order Details</h2>

                <div className="space-y-5">
                  {/* Order ID */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Order ID
                    </p>
                    <p className="text-sm font-medium break-all">{order._id}</p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Total Amount
                    </p>
                    <p className="text-2xl font-semibold">
                      ${(order.amount / 100).toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Payment Status
                    </p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Order Date
                    </p>
                    <p className="text-sm">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                        : "-"}
                    </p>
                  </div>

                  {/* Number of Items */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                      Items Ordered
                    </p>
                    <p className="text-sm font-medium">
                      {order.products?.length || 0} item
                      {(order.products?.length || 0) !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - PRODUCT CARDS */}
              <div className="lg:col-span-2 p-6">
                <h2 className="text-lg font-semibold mb-6">Ordered Products</h2>

                <div className="flex flex-wrap gap-3">
                  {order.products?.map((product) => (
                    <OrderProductCard
                      key={`${order._id}-${product.id}`}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
