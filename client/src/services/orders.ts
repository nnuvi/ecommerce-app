import { logger } from "@packages/logger/browser";
import { OrdersType } from "@packages/types";

export const fetchOrders = async (
  token: Promise<string | null>,
): Promise<OrdersType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/user-orders`,
    {
      headers: {
        Authorization: `Bearer ${await token}`,
      },
      cache: "no-store",
    },
  );

  logger.debug("Fetched products res:", { res });

  const data = await res.json();
  logger.debug("Fetched products res:", { data });
  return data.orders;
};

// services/orders.ts

// import type { OrdersType } from "@packages/types";

// export interface FetchOrdersParams {
//   page?: number;
//   limit?: number;
// }

// export const fetchOrders = async ({
//   page,
//   limit,
// }: FetchOrdersParams = {}): Promise<OrdersType> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders?` +
//       new URLSearchParams({
//         ...(page ? { page: String(page) } : {}),
//         ...(limit ? { limit: String(limit) } : {}),
//       }),
//   );

//   if (!res.ok) {
//     throw new Error(`Failed to fetch orders: ${res.status}`);
//   }

//   const data = await res.json();

//   if (!data.success) {
//     throw new Error(data.message || "Failed to fetch orders");
//   }

//   return data.orders;
// };
