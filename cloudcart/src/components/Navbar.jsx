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
      <div className="hidden md:flex w-1/3">

        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="px-4 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
          Search
        </button>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">

        {/* Login */}
        <Link href="/login">
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
            Login
          </button>
        </Link>

        {/* Signup */}
        <Link href="/signup">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Signup
          </button>
        </Link>

        {/* Seller Dashboard */}
        <Link href="/seller/dashboard">
  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
    Seller Dashboard
  </button>
</Link>

        {/* Cart */}
        <Link href="/cart" className="relative">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Cart
          </button>

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