export default function CartItem({ item, onRemove, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg">
      
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="font-semibold">
          {item.name}
        </h3>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">

          <button
            onClick={() => onDecrease(item.id)}
            className="px-2 py-1 border rounded"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => onIncrease(item.id)}
            className="px-2 py-1 border rounded"
          >
            +
          </button>

        </div>

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