import Link from "next/link";

export default function Navbar() {
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
      <div className="flex items-center gap-4">
        <Link href="/login">
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Login
          </span>
        </Link>

        <Link href="/cart">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Cart
          </button>
        </Link>
      </div>
    </nav>
  );
}
