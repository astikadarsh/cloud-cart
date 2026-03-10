"use client";

import Button from "@/components/Button";

export default function ManageProductsPage() {

  // Dummy seller products
  const products = [
    {
      id: 1,
      title: "Engineering Mathematics Book",
      price: 250,
      stock: 20,
    },
    {
      id: 2,
      title: "Wooden Study Table",
      price: 1800,
      stock: 5,
    },
    {
      id: 3,
      title: "Laptop Stand",
      price: 799,
      stock: 12,
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6">

        <h1 className="text-2xl font-bold mb-6">
          Manage Products
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>
              <tr className="border-b text-left text-gray-600">

                <th className="py-3">Product</th>
                <th className="py-3">Price</th>
                <th className="py-3">Stock</th>
                <th className="py-3">Actions</th>

              </tr>
            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-4">
                    {product.title}
                  </td>

                  <td className="py-4">
                    ₹{product.price}
                  </td>

                  <td className="py-4">
                    {product.stock}
                  </td>

                  <td className="py-4 flex gap-3">

                    <Button text="Edit" />

                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}