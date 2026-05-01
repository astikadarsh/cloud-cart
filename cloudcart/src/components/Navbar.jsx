"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          CloudCart
        </h1>
      </Link>

      <div className="hidden md:flex w-1/3">
        <input className="w-full px-4 py-2 border border-gray-300 rounded-l-md" />
        <button className="px-4 bg-blue-600 text-white rounded-r-md">
          Search
        </button>
      </div>

      <div className="flex items-center gap-4">

        {/* AUTH */}
        {user ? (
          <>
            <span className="text-sm font-medium">
              Hi, {user.name} ({user.role})
            </span>

            <button
              onClick={logout}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md">
                Login
              </button>
            </Link>

            <Link href="/signup">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Signup
              </button>
            </Link>
          </>
        )}

        {/*  SHOW ONLY TO SELLER */}
        {user?.role === "seller" && (
          <Link href="/seller/dashboard">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md">
              Seller Dashboard
            </button>
          </Link>
        )}

        <Link href="/cart" className="relative">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Cart
          </button>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
}