"use client";

import { useEffect, useState, use } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ params }) {

  const { addToCart } = useCart();

  // unwrap params promise
  const { id } = use(params);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <p className="text-center p-10 text-gray-500">
        Loading product...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">
            {product.title}
          </h1>

          <p className="text-2xl text-blue-600 font-semibold">
            ${product.price}
          </p>

          <p className="text-gray-600">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-4">

            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>

            <span className="text-lg">{quantity}</span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>

          </div>

          {/* Add to Cart */}
          <button
  onClick={() => addToCart(product, quantity)}
  className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
>
  Add to Cart
</button>

        </div>

      </div>

    </div>
  );
}