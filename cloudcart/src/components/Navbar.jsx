"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          CloudCart
        </h1>
      </Link>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="hidden md:block w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Actions */}
      <div className="flex items-center gap-6">

        <Link href="/login">
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Login
          </span>
        </Link>

        <Link href="/cart" className="relative">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Cart
          </button>

          {/* Cart Badge */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}

        </Link>

      </div>
    </nav>
  );
}
