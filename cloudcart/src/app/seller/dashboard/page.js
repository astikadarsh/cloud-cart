import Link from "next/link";
export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Seller Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">38</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold mt-2">1,240</p>
        </div>

      </div>

      {/* Actions */}
      <div className="flex gap-4">

        <Link href="/seller/upload-product">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Upload Product
          </button>
        </Link>

        

<Link href="/seller/products">
  <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
    Manage Products
  </button>
</Link>

      </div>

    </div>
  );
}