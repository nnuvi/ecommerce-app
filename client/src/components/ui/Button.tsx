"use client";

import React from "react";

type Variant = "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-stone-800 text-white shadow-[0_3px_8px_rgba(0,0,0,0.18)] hover:bg-stone-700 hover:shadow-[0_5px_12px_rgba(0,0,0,0.22)]",
    secondary:
      "bg-gray-100 text-black border border-gray-200 shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:bg-gray-200 hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]",
    outline:
      "border border-gray-300 bg-white text-black shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:bg-gray-50 hover:border-gray-400 hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]",
    danger:
      "bg-red-600 text-white shadow-[0_3px_8px_rgba(220,38,38,0.25)] hover:bg-red-700 hover:shadow-[0_5px_12px_rgba(220,38,38,0.3)]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full font-medium
        border-b transition-all duration-150
        hover:-translate-y-0.5
        active:translate-y-0
        active:shadow-[0_1px_3px_rgba(0,0,0,0.15)]
        focus:outline-none
        focus:ring-2 focus:ring-stone-400/40
        focus:ring-offset-2
        disabled:pointer-events-none
        disabled:opacity-50
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
