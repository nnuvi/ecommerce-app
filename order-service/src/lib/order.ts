import { Order } from "../models/order.model.js";
import type { OrderType } from "@packages/types";
import { getProductById } from "../services/product.service.js";
import { producer } from "./kafka.js";
import { logger } from "@packages/logger";
import { sendOrderConfirmationEmail } from "../services/email.service.js";

export const createOrder = async (orderData: OrderType) => {
  try {
    logger.info(
      {
        userId: orderData.userId,
        email: orderData.email,
        amount: orderData.amount,
        status: orderData.status,
      },
      "Creating new order",
    );

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

    logger.info(
      {
        productItems,
      },
      "Fetched product details for order",
    );

    const orderDoc = new Order({
      userId: orderData.userId,
      email: orderData.email,
      amount: orderData.amount,
      status: orderData.status,
      products: productItems,
    });

    logger.info(
      {
        orderDoc,
      },
      "Saving order",
    );

    const order = await orderDoc.save();

    if (process.env.NODE_ENV === "development") {
      producer.send("order.created", {
        value: {
          orderId: order._id.toString(),
          userId: order.userId,
          email: order.email,
          amount: order.amount,
          status: order.status,
          products: productItems,
        },
      });
    } else {
      await sendOrderConfirmationEmail({
        _id: order._id.toString(),
        userId: order.userId,
        email: order.email,
        amount: order.amount,
        status: order.status,
        products: productItems,
      });
    }

    logger.info(
      {
        userId: order.userId,
        email: order.email,
        amount: order.amount,
        status: order.status,
        products: productItems,
      },
      "ORDER SAVED",
    );

    return order;
  } catch (error) {
    logger.error({ error }, "CREATE ORDER FAILED:");
    throw error;
  }
};
