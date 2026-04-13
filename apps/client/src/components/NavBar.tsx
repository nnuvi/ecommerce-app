import { Bell, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";

const NavBar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      {/* Left */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Ecom"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="text-md font-medium tracking-wider">ECom</p>
      </Link>
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href={"/"}>
          <Home className="w-5 h-5 text-gray-600" />
        </Link>
        <Bell className="w-5 h-5 text-gray-600" />
        <ShoppingCartIcon />
        <Link href={""}>Sign in</Link>
      </div>
    </nav>
  );
};

export default NavBar;
