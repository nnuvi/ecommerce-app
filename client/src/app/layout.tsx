import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./../components/Footer";
import NavBar from "../components/NavBar";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import AuthProvider from "@/provider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecom-client-xi.vercel.app"),

  title: "Ecom - Best Casual Clothing",
  description:
    "Ecom is the best place to find the best casual clothing for all seasons.",
  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "Ecom - Best Casual Clothing",
    description:
      "Ecom is the best place to find the best casual clothing for all seasons.",
    url: "https://ecom-client-xi.vercel.app",
    siteName: "Ecom",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Ecom - Best Casual Clothing",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ecom - Best Casual Clothing",
    description:
      "Ecom is the best place to find the best casual clothing for all seasons.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon1.ico" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-100`}
        >
          <AuthProvider>
            <div className="mx-auto p-4 text-stone-700 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
              <NavBar />
              {children}
              <Footer />
              <ToastContainer />
            </div>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
