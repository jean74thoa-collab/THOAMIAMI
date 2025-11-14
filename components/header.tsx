"use client";

import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Vertical layout */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-[10px] font-light tracking-[0.15em]">THE</span>
            <span className="text-4xl font-bold tracking-tight -mt-1">HOUSE</span>
            <span className="text-[10px] font-light tracking-[0.15em] -mt-1">OF ARTS</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm tracking-wide hover:text-red-600 transition-colors ${
                isActive("/") ? "text-red-600 font-medium" : "text-black"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/artists"
              className={`text-sm tracking-wide hover:text-red-600 transition-colors ${
                pathname?.startsWith("/artists") ? "text-red-600 font-medium" : "text-black"
              }`}
            >
              ARTISTS
            </Link>
            <Link
              href="/contact"
              className={`text-sm tracking-wide hover:text-red-600 transition-colors ${
                isActive("/contact") ? "text-red-600 font-medium" : "text-black"
              }`}
            >
              CONTACT
            </Link>

            {/* Icons */}
            <button className="hover:text-red-600 transition-colors" aria-label="Search">
              <Search size={18} />
            </button>
            <button className="hover:text-red-600 transition-colors" aria-label="Shopping Cart">
              <ShoppingCart size={18} />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
