"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // important

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); //

  useEffect(() => {
    async function fetchProduct() {
      const resolvedParams = await params;
      const res = await fetch(`/api/products/${resolvedParams.id}`);
      const data = await res.json();
      setProduct(data);
    }

    fetchProduct();
  }, [params]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">₹{product.price}</p>
      <p>{product.description}</p>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={() => addToCart(product)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}