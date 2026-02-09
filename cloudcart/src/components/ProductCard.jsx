import CategoryBadge from "./CategoryBadge";
import Button from "./Button";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <CategoryBadge text={product.category} />

        <h3 className="mt-2 font-semibold text-gray-900">
          {product.title}
        </h3>

        <p className="mt-1 text-blue-600 font-bold">
          ₹{product.price}
        </p>

        <div className="mt-4">
          <Button text="View Product" />
        </div>
      </div>
    </div>
  );
}
