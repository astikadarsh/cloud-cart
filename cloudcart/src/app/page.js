import products from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const categories = [
    "Books",
    "Notes",
    "Furniture",
    "Electronics",
    "Hostel Essentials",
  ];

  return (
    <main className="bg-gray-50 min-h-screen px-6 py-6">
      {/* Categories Section */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700 cursor-pointer hover:bg-blue-100 hover:text-blue-700"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
