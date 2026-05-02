"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { protectSeller } from "@/utils/protectSellerRoute";

export default function SellerDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  //  protect route
  useEffect(() => {
    protectSeller(user, router);
  }, [user]);

  //  fetch analytics
  useEffect(() => {
    if (user && user.role === "seller") {
      fetchAnalytics();
    }
  }, [user]);

  async function fetchAnalytics() {
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // prevent UI flash
  if (!user || user.role !== "seller") return null;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Seller Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold mt-2">
            {loading ? "..." : analytics?.totalProducts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold mt-2">
            {loading ? "..." : analytics?.totalOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold mt-2">
            ₹{loading ? "..." : analytics?.totalRevenue}
          </p>
        </div>

      </div>

      {/*  Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : analytics?.recentOrders?.length === 0 ? (
          <p className="text-gray-500">No recent orders</p>
        ) : (
          <div className="space-y-3">

            {analytics.recentOrders.map((order) => (
              <div
                key={order.id}
                className="border p-3 rounded-md flex justify-between text-sm"
              >
                <div>
                  <p className="font-medium">
                    ₹{order.total}
                  </p>
                  <p className="text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-gray-600">
                  {order.address?.city}
                </div>
              </div>
            ))}

          </div>
        )}

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