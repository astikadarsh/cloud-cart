"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  //  Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  //  Delete product
  async function handleDelete(id) {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      // Update UI instantly
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  //  Edit navigation
  function handleEdit(id) {
    router.push(`/seller/products/edit/${id}`);
  }

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-3">Product</th>
                <th className="py-3">Price</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">{product.name}</td>

                  <td className="py-4">₹{product.price}</td>

                  <td className="py-4 flex gap-3">
                    
                    {/*  Edit button */}
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    {/*  Delete button */}
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {products.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}