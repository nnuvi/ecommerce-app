import { Order } from "../models/order.model.js";
import type { OrderType } from "@packages/types";
import { getProductById } from "../clients/product.client.js";
import { producer } from "./kafka.js";

export const createOrder = async (orderData: OrderType) => {
  try {
    console.log(`Libs: Creating order with data:`, orderData);
    const productItems = await Promise.all(
      orderData.products.map(async (item) => {
        const product = await getProductById(item.id);
        console.log(`Libs: Fetched product for ID ${item.id}:`, product);

        return {
          productId: item.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      })
    );

    const newOrder = new Order({
      ...orderData,
      products: productItems,
    });

    const order = await newOrder.save();

    console.log(`Libs: Order created:`, order);

    console.log(`Libs: Sending order created message to Kafka:`, order);
    await producer.send("order.created", {
      value: {
        userId: order.userId,
        email: order.email,
        amount: order.amount,
        status: order.status,
        products: order.products,
      },
    });

    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
};