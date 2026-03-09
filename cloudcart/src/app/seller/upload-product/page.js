"use client";

import { useState } from "react";

export default function UploadProductPage() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", product);
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
            <label className="block mb-1 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Example: Electronics"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 font-medium">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Write product description..."
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">
              Product Image
            </label>
            <input
              type="file"
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Upload Product
          </button>

        </form>

      </div>

    </div>
  );
}