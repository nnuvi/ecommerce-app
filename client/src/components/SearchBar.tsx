"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2 rounded-full ring-1 ring-gray-200 bg-stone-200 px-3 py-1.5 min-w-0">
      <Search className="w-5 h-5 text-gray-500 shrink-0" />
      <input
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(value);
        }}
        className="flex-1 text-sm outline-none bg-stone-200 text-gray-700 w-20 sm:w-32 md:w-40 lg:w-56"
      />
    </div>
  );
};

export default SearchBar;
