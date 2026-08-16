import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/services/orders";
import { useAuth } from "@clerk/nextjs";

export const useGetOrders = () => {
  const { getToken } = useAuth();
  const token = getToken();
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(token),
  });
};
