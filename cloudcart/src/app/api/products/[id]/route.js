import { dynamoDB } from "@/lib/aws";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const id = context.params?.id;

    console.log("PARAM ID:", id, typeof id);

    // 🔥 TEMP: get all products
    const allData = await dynamoDB.send(
      new ScanCommand({
        TableName: "CloudCartProducts",
      })
    );

    console.log("ALL ITEMS:", allData.Items);

    // 🔥 FIND manually
    const product = allData.Items.find(
      (p) => String(p.id).trim() === String(id).trim()
    );

    console.log("FOUND PRODUCT:", product);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { message: "Error fetching product" },
      { status: 500 }
    );
  }
}