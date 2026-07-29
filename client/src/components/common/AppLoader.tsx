"use client";

import Loader from "../ui/Loader";

export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Loader />
    </div>
  );
}
