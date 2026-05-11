import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 rounded-full ring-1 ring-gray-200 bg-stone-200 px-3 py-1.5 min-w-0">
      <Search className="w-5 h-5 text-gray-500 shrink-0" />
      <input
        id="search"
        placeholder="Search..."
        className="text-sm outline-none bg-transparent w-20 sm:w-32 md:w-40 lg:w-56 min-w-0"
      />
    </div>
  );
};

export default SearchBar;
