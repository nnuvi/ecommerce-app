"use client";

import { ShippingFormInputs } from "@types";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ConfirmError, StripeError } from "@stripe/stripe-js";
import { useState } from "react";

const CheckoutForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StripeError | null>(null);

  const handleClick = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        receipt_email: shippingForm.email,
        shipping: {
          name: "Customer",
          address: {
            line1: shippingForm.address,
            city: shippingForm.city,
            country: "US",
          },
        },
        return_url: "http://localhost:3003/return",
      },
    });

    if (error) {
      setError(error || "Payment failed");
    }

    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />

      <div className={"w-full pt-2.5"}>
        <button
          type="button"
          disabled={loading}
          onClick={handleClick}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-gray-900 active:scale-95"
      }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {error && <div>{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
