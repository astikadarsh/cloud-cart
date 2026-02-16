import products from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({ params }) {

  const { id } = await params;

  const product = products.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  return <ProductDetailClient product={product} />;
}
