import { logger } from "@packages/logger";
import { OrderType } from "@packages/types";

export async function createOrderInOrderService(
  order: OrderType
) {
  logger.info(
    {
      order,
    },
    "Creating order in Order Service",
  );
  const response = await fetch(
    `${process.env.ORDER_SERVICE_URL}/save-orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-api-key":
          process.env.INTERNAL_API_KEY ?? "",
      },
      body: JSON.stringify(order),
    },
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Order service failed (${response.status}): ${error}`,
    );
  }

  return response.json();
}