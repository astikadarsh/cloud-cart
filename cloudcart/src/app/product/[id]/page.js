import products from "@/data/products";
import CategoryBadge from "@/components/CategoryBadge";
import Button from "@/components/Button";

export default function ProductDetailPage({ params }) {
  const { id } = params;

  // Dummy data se product nikal rahe hain
  const product = products.find((p) => p.id === id);

  // Safety check (agar product na mile)
  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Product not found
        </h2>
        <p className="text-gray-500 mt-2">
          The product you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-6">
        {/* Top section: Image + Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-lg border"
            />
          </div>

          {/* Product Info */}
          <div>
            <CategoryBadge text={product.category} />

            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="mt-2 text-2xl font-semibold text-blue-600">
              ₹{product.price}
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              This is a well-maintained used item, ideal for college students.
              The product is in good condition and available for quick pickup
              within the campus.
            </p>

            <div className="mt-6 max-w-xs">
              <Button text="Add to Cart" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* Seller Info */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-800">
            Seller Information
          </h3>

          <p className="mt-2 text-gray-700">
            <span className="font-medium">Name:</span> College Student
          </p>

          <p className="text-gray-700">
            <span className="font-medium">Contact:</span> student@email.com
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Contact details are visible only to logged-in users (future feature).
          </p>
        </div>
      </div>
    </main>
  );
}
