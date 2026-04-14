"use client";

import { useState } from "react";

export default function UploadProductPage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  //  handle submit (POST API)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: product.name,
          price: Number(product.price),
          description: product.description,
          image:
            product.image || "https://via.placeholder.com/200", // fallback image
        }),
      });

      if (!res.ok) {
        alert("Failed to add product ❌");
        return;
      }

      alert("Product added successfully ✅");

      //  reset form
      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Upload New Product
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Category (optional for now) */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Example: Electronics"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 font-medium">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Write product description..."
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
            />
          </div>

          {/* Image URL (instead of file for now) */}
          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
}