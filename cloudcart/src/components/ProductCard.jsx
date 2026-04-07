import Link from "next/link";
import CategoryBadge from "./CategoryBadge";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden">
        
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}   
          className="h-40 w-full object-cover"
        />

        {/* Content */}
        <div className="p-4">
          {/* Optional: category (handle if missing) */}
          {product.category && (
            <CategoryBadge text={product.category} />
          )}

          <h3 className="mt-2 font-semibold text-gray-900">
            {product.name}   {/* fixed */}
          </h3>

          <p className="mt-1 text-blue-600 font-bold">
            ₹{product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}