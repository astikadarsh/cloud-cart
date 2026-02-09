export default function CartItem({ item }) {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm">
          Quantity: {item.quantity}
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold text-blue-600">
          ₹{item.price}
        </p>
        <button className="text-sm text-red-500 hover:underline mt-1">
          Remove
        </button>
      </div>
    </div>
  );
}
