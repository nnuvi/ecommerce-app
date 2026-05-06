"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CartItemsType, ShippingFormInputs } from "@types";
import CheckoutForm from "./CheckoutForm";
import useCartStore from "../app/store/cartStore";
// import { CheckoutProvider } from "@stripe/react-stripe-js";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

// import { fetchClientSecret } from '../app/actions/stripe'
import { CheckoutProvider } from "@clerk/nextjs/experimental";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const fetchClientSecret = async (cart: CartItemsType, token: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({
        cart,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then((response) => response.json())
    .then((json) => json.clientSecret);
};

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
  }, []);

  useEffect(() => {
    if (token && cart.length > 0) {
      fetchClientSecret(cart, token).then((secret) => {
        console.log("RAW SECRET:", secret); // ✅ correct
        setClientSecret(secret);
      });
      console.log("Here, Payment intent secret key: ", clientSecret);
    }
  }, [cart, token]);

  if (!token || !clientSecret) {
    console.log(" But Here, Payment intent secret key: ", clientSecret);
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

// return (
//   <div id="checkout">
//     <EmbeddedCheckoutProvider
//       stripe={stripePromise}
//       options={{ fetchClientSecret: () => fetchClientSecret(cart, token) }}
//     >
//       <CheckoutForm shippingForm={shippingForm} />
//     </EmbeddedCheckoutProvider>
//   </div>
// );

// export default function Checkout() {
//   return (
//     <div id="checkout">
//       <EmbeddedCheckoutProvider
//         stripe={stripePromise}
//         options={{ fetchClientSecret }}
//       >
//         <EmbeddedCheckout />
//       </EmbeddedCheckoutProvider>
//     </div>
//   )
// }

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const StripePaymentForm = ({
//   shippingForm,
// }: {
//   shippingForm: ShippingFormInputs;
// }) => {
//   const { cart } = useCartStore();
//   const [token, setToken] = useState<string | null>(null);
//   const { getToken } = useAuth();

//   useEffect(() => {
//     getToken().then((token) => setToken(token));
//   }, []);

//   if (!token) {
//     return <div className="">Loading...</div>;
//   }

//   return (
//     <CheckoutProvider
//       stripe={stripe}
//       options={{ fetchClientSecret: () => fetchClientSecret(cart, token) }}
//     >
//       <CheckoutForm shippingForm={shippingForm} />
//     </CheckoutProvider>
//   );
// };
