"use client";

import { useState, useRef } from "react";

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
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Image upload failed ❌");
        return;
      }

      setProduct((prev) => ({
        ...prev,
        image: data.url,
      }));

      alert("Image uploaded ✅");
    } catch (error) {
      console.error(error);
      alert("Upload error ❌");
    } finally {
      setUploading(false);
    }
  };

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
            product.image || "https://via.placeholder.com/200",
        }),
      });

      if (!res.ok) {
        alert("Failed to add product ❌");
        return;
      }

      alert("Product added successfully ✅");

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
          
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
            />
          </div>

          {/* 🔥 UPDATED IMAGE UPLOAD UI */}
          <div>
            <label className="block mb-2 font-medium">Upload Image</label>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Custom Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
            >
              Choose Image
            </button>

            {uploading && (
              <p className="text-sm text-gray-500 mt-2">
                Uploading image...
              </p>
            )}

            {product.image && (
              <img
                src={product.image}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>
    </div>
  );
}