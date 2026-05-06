"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ReturnPage() {
  const searchParams = useSearchParams();

  const status = searchParams.get("redirect_status");
  const paymentIntent = searchParams.get("payment_intent");

  if (!paymentIntent) {
    return <div>No payment intent found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        Payment {status === "succeeded" ? "Successful" : "Failed"}
      </h1>

      <p className="mt-2">Payment Intent ID: {paymentIntent}</p>

      <Link href="/orders" className="text-blue-500 underline mt-4 block">
        See your orders
      </Link>
    </div>
  );
}