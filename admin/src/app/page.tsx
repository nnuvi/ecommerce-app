import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";

const Homepage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-6">
      <div className="bg-primary p-4 rounded-lg shadow lg:col-span-2 2xl:col-span-2">
        <AppBarChart />
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
