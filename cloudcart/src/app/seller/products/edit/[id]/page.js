"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { protectSeller } from "@/utils/protectSellerRoute";

export default function EditProductPage({ params }) {
  const router = useRouter();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  //  PROTECT ROUTE
  useEffect(() => {
    protectSeller(user, router);
  }, [user]);

  //  prevent UI flash
  if (!user || user.role !== "seller") return null;

  // fetch existing product
  useEffect(() => {
    async function fetchProduct() {
      const resolvedParams = await params;

      const res = await fetch(`/api/products/${resolvedParams.id}`);
      const data = await res.json();

      setForm({
        name: data.name || "",
        price: data.price || "",
        description: data.description || "",
        image: data.image || "",
      });

      setLoading(false);
    }

    if (user && user.role === "seller") {
      fetchProduct();
    }
  }, [params, user]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const resolvedParams = await params;

    await fetch(`/api/products/${resolvedParams.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    alert("Product updated ✅");
    router.push("/seller/products");
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 rounded"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded"
          />

          <button className="bg-blue-500 text-white py-2 rounded">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}