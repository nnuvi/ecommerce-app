import { Order } from "../models/order.model.js";
import type { OrderType } from "@packages/types";
import { getProductById } from "../clients/product.client.js";
import { producer } from "./kafka.js";

export const createOrder = async (orderData: OrderType) => {
  try {
    console.log("Creating order:", orderData);

    const safeProducts = Array.isArray(orderData.products)
      ? orderData.products
      : [];

    const productItems = await Promise.all(
      safeProducts.map(async (item) => {
        const product = await getProductById(item.id);

        return {
          id: item.id, //chg
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      }),
    );

    const orderDoc = new Order({
      userId: orderData.userId,
      amount: orderData.amount,
      status: orderData.status,
      products: productItems,
    });

    console.log("Saving order...");

    const order = await orderDoc.save();

    producer.send("order.created", {
      value: {
        userId: order.userId,
        amount: order.amount,
        status: order.status,
        products: productItems,
      },
    });

    console.log("ORDER SAVED:", order._id);

    return order;
  } catch (error) {
    console.error("CREATE ORDER FAILED:", error);
    throw error;
  }
};
