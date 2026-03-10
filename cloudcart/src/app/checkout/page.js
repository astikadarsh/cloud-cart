import Button from "@/components/Button";

export default function CheckoutPage() {
  // Dummy summary data
  const orderSummary = [
    {
      id: "1",
      title: "Engineering Mathematics Book",
      price: 250,
    },
    {
      id: "2",
      title: "Wooden Study Table",
      price: 1800,
    },
  ];

  const totalAmount = orderSummary.reduce(
    (sum, item) => sum + item.price,
    0
  );

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
              type="text"
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3">
            {orderSummary.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-gray-700"
              >
                <span>{item.title}</span>
                <span>₹{item.price}</span>
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
            <Button text="Pay Now" />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Payment gateway integration will be added in the next phase.
          </p>
        </div>
      </div>
    </main>
  );
}
