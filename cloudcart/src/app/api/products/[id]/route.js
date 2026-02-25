import products from "@/data/products";
import { NextResponse } from "next/server";

export async function GET(request, context) {

  const { id } = await context.params;   

  const product = products.find(
    (p) => p.id === id
  );

  if (!product) {
    return NextResponse.json(
      { message: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}