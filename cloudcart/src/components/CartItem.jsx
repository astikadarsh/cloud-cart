export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="font-semibold">
          {item.title}
        </h3>
        <p>Quantity: {item.quantity}</p>
      </div>

      <div className="text-right">
        <p className="text-blue-600 font-semibold">
          ₹{item.price * item.quantity}
        </p>

        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-red-500 hover:underline mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
