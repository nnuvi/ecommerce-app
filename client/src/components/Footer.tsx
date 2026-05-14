import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image
            src="/lg9.png"
            alt="Ecom"
            width={1920}
            height={720}
            priority
            className="h-6 w-auto md:h-9 lg:h-10 xl:h-11"
          />
          {/* <p className="text-md font-medium tracking-wider">ECom</p> */}
        </Link>
        <p className="text-sm text-gray-400">© 2026 Ecom</p>
        <p className="text-sm text-gray-400">All Rights Reserved</p>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-center">
        <p className="text-sm text-amber-50">Links</p>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Privacy</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-center">
        <p className="text-sm text-amber-50">Links</p>
        <Link href={"/"}>All Products</Link>
        <Link href={"/"}>New Arrival</Link>
        <Link href={"/"}>Best Sellers</Link>
        <Link href={"/"}>Sale</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-center">
        <p className="text-sm text-amber-50">Links</p>
        <Link href={"/"}>About</Link>
        <Link href={"/"}>Contact</Link>
        <Link href={"/"}>Blog</Link>
        <Link href={"/"}>Affiliate Programs</Link>
      </div>
    </div>
  );
};

export default Footer;
