import { Bell, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import ProfileButton from "./ProfileButton";

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
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <Show when="signed-out">
            <SignInButton />
          </Show>
          <Show when="signed-in">
            <ProfileButton />
          </Show>
        </header>
      </div>
    </nav>
  );
};

export default NavBar;
