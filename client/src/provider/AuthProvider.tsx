"use client";

import LoadingWrapper from "@/components/common/LoadingWrapper";
import { useAuth } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();

  return <LoadingWrapper loading={!isLoaded}>{children}</LoadingWrapper>;
}
