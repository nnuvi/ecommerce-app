import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { OrderType, ProductType } from "@packages/types";
import { auth } from "@clerk/nextjs/server";
import { logger } from "@packages/logger/browser";

const CardList = async ({ title }: { title: string }) => {
  let products: ProductType[] = [];
  let orders: OrderType[] = [];

  const { getToken } = await auth();
  const token = await getToken();

  if (title === "Popular Products") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?limit=5&popular=true`,
    ).then((res) => res.json());
    products = res.products || [];
  } else {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders?limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());
    orders = result.orders || [];
    console.log("Fetched orders:", orders);
    logger.info(
      {
        orders,
      },
      "Fetched recent orders for admin dashboard",
    );
  }

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Popular Products"
          ? products.map((item) => (
              <Card
                key={item.id}
                className="flex-row items-center justify-between gap-4 p-4"
              >
                <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={Object.values(item.images)[0] || ""}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
                  />
                </div>
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.name}
                  </CardTitle>
                </CardContent>
                <CardFooter className="p-0">${item.price}</CardFooter>
              </Card>
            ))
          : orders.map((item) => (
              <Card
                key={item._id}
                className="flex-row items-center justify-between gap-4 p-4"
              >
                {/* <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                  <Image
                    src={"/globe.svg"}
                    alt={item.products[0]?.name || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
                  />
                </div> */}
                <CardContent className="flex-1 p-0">
                  <CardTitle className="text-sm font-medium">
                    {item.products[0]?.name || ""}
                  </CardTitle>
                  <Badge variant="secondary">{item.status}</Badge>
                </CardContent>
                <CardFooter className="p-0">${item.amount / 100}</CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CardList;
