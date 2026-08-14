"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { ShippingFormInputs } from "@packages/types";
import { ArrowRight, Trash2 } from "lucide-react";
import ShippingForm from "../../components/ShippingForm";
import useCartStore from "../store/cartStore";
import StripePaymentForm from "../../components/StripePaymentForm";
import { CartSkeleton } from "../../components/skeleton/CartSkeleton";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

const CartPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const { cart, removeFromCart, hasHydrated } = useCartStore();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!hasHydrated) {
    return <CartSkeleton count={3} />;
  }

  return (
    <div className="flex flex-col gap-8 items-center mt-12">
      {/* Title */}
      <h1 className="text-2xl font-medium text-stone-600">
        Your Shopping Cart
      </h1>

      {/* Steps */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            // onClick={() => {
            //   if (step.id <= activeStep) {
            //     setActiveStep(step.id);
            //   }
            // }}
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep
                ? "border-gray-800 cursor-pointer"
                : "border-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full p-4 flex items-center justify-center ${
                step.id === activeStep
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300"
              }`}
            >
              {step.id}
            </div>

            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* Left Section */}
        <div className="w-full lg:w-7/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-8">
                    <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.images[item.selectedColor]!}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{item.name}</p>

                        <p className="text-xs text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-xs text-gray-500">
                          Size: {item.selectedSize}
                        </p>

                        <p className="text-xs text-gray-500">
                          Color: {item.selectedColor}
                        </p>
                      </div>

                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item)}
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )
          ) : activeStep === 2 ? (
            <ShippingForm
              setShippingForm={(data) => {
                setShippingForm(data);
                setActiveStep(3);
              }}
            />
          ) : shippingForm ? (
            <StripePaymentForm shippingForm={shippingForm} />
          ) : (
            <p className="text-sm text-gray-500">
              Please fill in the shipping form to continue.
            </p>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-5/12 shadow-lg border border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount (10%)</p>
              <p className="font-medium">$10.00</p>
            </div>

            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Shipping Fee</p>
              <p className="font-medium">$10.00</p>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">${subtotal.toFixed(2)}</p>
            </div>
          </div>

          {activeStep === 1 && cart.length > 0 && (
            <button
              onClick={() => setActiveStep(2)}
              className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {activeStep > 1 && (
            <button
              onClick={() => setActiveStep(activeStep - 1)}
              className="w-full border border-gray-300 hover:bg-gray-100 transition-all duration-300 p-2 rounded-lg cursor-pointer"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
