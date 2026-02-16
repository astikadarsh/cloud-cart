"use client";

import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ product }) {

  const { addToCart } = useCart();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-blue-600">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
