"use client";

import { fetchClientSecret } from "@/services/payments";
import { useAuth } from "@clerk/nextjs";
import { ShippingFormInputs } from "@packages/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import useCartStore from "../app/store/cartStore";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const StripePaymentForm = ({
  shippingForm,
}: {
  shippingForm: ShippingFormInputs;
}) => {
  const { cart } = useCartStore();
  const { getToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    getToken().then((token) => setToken(token));
  }, [getToken]);

  useEffect(() => {
    if (token && cart.length > 0) {
      fetchClientSecret(cart, token).then((secret) => {
        setClientSecret(secret);
      });
    }
  }, [cart, token]);

  if (!token || !clientSecret) {
    // console.log(" But Here, Payment intent secret key: ", clientSecret);
    return <div className="p-4">Loading secure checkout...</div>;
  }

  return (
    <div id="checkout">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm shippingForm={shippingForm} />
      </Elements>
    </div>
  );
};

export default StripePaymentForm;
