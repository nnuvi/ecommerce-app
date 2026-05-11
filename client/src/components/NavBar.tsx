"use client";

import { useState } from "react";
import { Search, Bell, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import ProfileButton from "./ProfileButton";

const NavBar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <nav className="w-full flex items-center justify-between pb-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/lg9.png"
            alt="Ecom"
            width={1920}
            height={720}
            priority
            className="h-6 w-auto md:h-9 lg:h-10 xl:h-11"
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4 flex-1 justify-end min-w-0">
          {/* Desktop Search */}
          <div className="hidden sm:block shrink-0">
            <SearchBar />
          </div>

          {/* Mobile Search Icon */}
          <button
            type="button"
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="sm:hidden"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          <Link href="/">
            <Home className="w-5 h-5 text-gray-600" />
          </Link>

          <Bell className="w-5 h-5 text-gray-600" />

          <ShoppingCartIcon />

          <header className="flex items-center gap-4 shrink-0">
            <Show when="signed-out">
              <SignInButton />
            </Show>

            <Show when="signed-in">
              <ProfileButton />
            </Show>
          </header>
        </div>
      </nav>

      {/* Mobile Search Bar (appears below navbar) */}
      {showMobileSearch && (
        <div className="sm:hidden pb-3">
          <SearchBar />
        </div>
      )}
    </>
  );
};

export default NavBar;
