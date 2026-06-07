"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, Receipt, ArrowRight } from "lucide-react";
import useCartStore from "../store/cartStore";

interface Props {
  status?: string;
  paymentIntent?: string;
}

export default function ReturnClient({
  status,
  paymentIntent,
}: Props) {
  const clearCart = useCartStore((state) => state.clearCart);

  const isSuccess = status === "succeeded";

  useEffect(() => {
    if (isSuccess && paymentIntent) {
      clearCart();
    }
  }, [isSuccess, paymentIntent, clearCart]);

  if (!paymentIntent) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-3xl border border-gray-200 bg-white shadow-sm p-8 text-center">
          <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />

          <h1 className="text-2xl font-semibold text-gray-900">
            Payment Information Not Found
          </h1>

          <p className="mt-2 text-gray-500 text-sm">
            We could not find a valid payment reference for this transaction.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center justify-center rounded-4xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-8 sm:p-10 text-center border-b border-gray-100">
          <div
            className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="h-10 w-10 text-green-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>

          <h1 className="text-3xl font-semibold text-gray-900">
            Payment {isSuccess ? "Successful" : "Failed"}
          </h1>

          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            {isSuccess
              ? "Thank you for your purchase. Your payment has been processed successfully and your order is now available in your account."
              : "Your payment could not be completed. Please try again or use a different payment method."}
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-stone-50">
          <div className="rounded-lg bg-white border border-gray-200 p-5">
            <div className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
                  Payment Intent ID
                </p>

                <p className="text-sm font-mono text-gray-900 break-all">
                  {paymentIntent}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/orders"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-4xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              See Your Orders
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex flex-1 items-center justify-center rounded-4xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}