export const OrderStatus = ["success", "failed"] as const;

export type OrderStatusType = (typeof OrderStatus)[number];

export type OrderProductType = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  userId: string;
  email: string;
  amount: number;
  status: OrderStatusType;
  products: OrderProductType[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type OrdersType = OrderType[]; 