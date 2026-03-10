"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";
import Link from "next/link";

export default function CartPage() {

  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Your cart is empty 🛒
          </h2>

          <Link href="/" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">

          <h1 className="text-2xl font-bold mb-6">
            Shopping Cart
          </h1>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            ))}
          </div>

        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="mt-6">
            <Link href="/checkout">
              <Button text="Proceed to Checkout" />
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}