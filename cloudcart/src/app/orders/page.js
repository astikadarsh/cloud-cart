"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first ❌");
        return;
      }

      const res = await fetch(`/api/orders?email=${user.email}`);
      const data = await res.json();

      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>No orders yet 🛒</h2>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold">My Orders</h1>

        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-lg shadow"
          >

            <div className="mb-2 text-sm text-gray-500">
              Order ID: {order.id}
            </div>

            <div className="mb-2 text-sm">
              Date: {new Date(order.createdAt).toLocaleString()}
            </div>

            <div className="mb-2 font-semibold">
              Total: ₹{order.total}
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600 mb-2">
              <p>{order.address.name}</p>
              <p>{order.address.phone}</p>
              <p>{order.address.addressLine}</p>
              <p>
                {order.address.city} - {order.address.pincode}
              </p>
            </div>

            {/* Items */}
            <div className="mt-3 space-y-1">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </main>
  );
}