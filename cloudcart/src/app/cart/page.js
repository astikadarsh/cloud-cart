import CartItem from "@/components/CartItem";
import Button from "@/components/Button";

export default function CartPage() {
  // Dummy cart data (UI phase)
  const cartItems = [
    {
      id: "1",
      title: "Engineering Mathematics Book",
      price: 250,
      quantity: 1,
      image: "/images/products/book.jpg",
    },
    {
      id: "2",
      title: "Wooden Study Table",
      price: 1800,
      quantity: 1,
      image: "/images/products/table.jpg",
    },
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <p className="text-lg font-semibold text-gray-800">
            Total Amount
          </p>
          <p className="text-xl font-bold text-blue-600">
            ₹{totalAmount}
          </p>
        </div>

        {/* Checkout Button */}
        <div className="mt-6 max-w-xs">
          <Button text="Proceed to Checkout" />
        </div>
      </div>
    </main>
  );
}
