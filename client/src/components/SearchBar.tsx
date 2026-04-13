import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hiddem sm:flex items-center gap-2 rounded-4xl ring-1 ring-gray-200 bg-stone-200">
      <Search className="w-7 h-7 pl-2 text-gray-500" />
      <input id="search" placeholder="Search.." className="text:sm outline-0 p-1" />
    </div>
  );
};
export default SearchBar;
