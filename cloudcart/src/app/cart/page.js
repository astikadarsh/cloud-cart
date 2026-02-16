"use client";

import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import Button from "@/components/Button";

export default function CartPage() {

  const { cartItems, removeFromCart } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="mt-6 flex justify-between border-t pt-4">
              <p className="font-semibold">Total</p>
              <p className="text-blue-600 font-bold">
                ₹{totalAmount}
              </p>
            </div>

            <div className="mt-6 max-w-xs">
              <Button text="Proceed to Checkout" />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
