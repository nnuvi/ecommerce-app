import { OrdersType } from "@packages/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@clerk/nextjs/server";

const getData = async (): Promise<OrdersType> => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders`, {
    headers: {      
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log("Orders: ", data);
  return data.orders;
  } catch (error) {    
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function OrderPage() {
  const data = await getData();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Payments</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};
