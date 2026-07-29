"use client";

import AppLoader from "./AppLoader";

interface LoadingWrapperProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoadingWrapper({
  loading,
  children,
}: LoadingWrapperProps) {
  if (loading) {
    return <AppLoader />;
  }

  return children;
}
