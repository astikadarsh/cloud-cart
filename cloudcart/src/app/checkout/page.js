"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first ❌");
        router.push("/login");
        return;
      }

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          userEmail: user.email,
          address: form, // 🔥 address send
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Order placed successfully ✅");

      setCartItems([]); // clear cart
      router.push("/order-success");

    } catch (error) {
      console.error(error);
      alert("Order failed ❌");
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2>Your cart is empty 🛒</h2>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Shipping Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Shipping Details
          </h2>

          <div className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-md"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
              placeholder="Phone Number"
              className="w-full border px-4 py-2 rounded-md"
              required
            />

            <input
              name="addressLine"
              value={form.addressLine}
              onChange={handleChange}
              type="text"
              placeholder="Address"
              className="w-full border px-4 py-2 rounded-md"
              required
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              type="text"
              placeholder="City"
              className="w-full border px-4 py-2 rounded-md"
              required
            />

            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              type="text"
              placeholder="Pincode"
              className="w-full border px-4 py-2 rounded-md"
              required
            />

          </div>

        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-gray-700"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

          </div>

          <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>

            <span className="text-blue-600">
              ₹{totalAmount}
            </span>
          </div>

          <div className="mt-6">
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Payment gateway integration will be added in the next phase.
          </p>

        </div>

      </div>
    </main>
  );
}