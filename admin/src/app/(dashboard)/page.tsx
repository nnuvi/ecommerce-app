import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { auth } from "@clerk/nextjs/server";
import { OrderChartType } from "@packages/types";

const Homepage = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  const orderChartData: Promise<OrderChartType[]> = fetch(
    `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/order-chart`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
      <div className="bg-primary p-4 rounded-lg shadow lg:col-span-2 2xl:col-span-2">
        <AppBarChart dataPromise={orderChartData} />
      </div>
      <div className="bg-primary p-4 rounded-lg shadow">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary p-4 rounded-lg shadow">
        <AppPieChart />
      </div>
      <div className="bg-primary p-4 rounded-lg shadow">
        <TodoList />
      </div>
      <div className="bg-primary p-4 rounded-lg shadow lg:col-span-2 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary p-4 rounded-lg shadow">
        <CardList title="Popular Products" />
      </div>
    </div>
  );
};

export default Homepage;
