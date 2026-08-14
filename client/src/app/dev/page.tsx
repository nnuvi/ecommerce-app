import { OrderListSkeleton } from "@/components/skeleton/OrderCardSkeleton";

const TestPage = async () => {
  return (
    <>
      <OrderListSkeleton count={3} />
    </>
  );
};
export default TestPage;
