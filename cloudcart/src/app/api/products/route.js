import { dynamoDB } from "@/lib/aws";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export async function GET() {
  try {
    const command = new ScanCommand({
      TableName: "CloudCartProducts",
    });

    const data = await dynamoDB.send(command);

    return Response.json(data.Items);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

//  NEW: ADD PRODUCT
export async function POST(req) {
  try {
    const body = await req.json();

    const { name, price, description, image } = body;

    // basic validation
    if (!name || !price) {
      return Response.json(
        { error: "Name and price are required" },
        { status: 400 }
      );
    }

    const newProduct = {
      id: Date.now().toString(), // simple unique id
      name,
      price,
      description,
      image,
    };

    const command = new PutCommand({
      TableName: "CloudCartProducts",
      Item: newProduct,
    });

    await dynamoDB.send(command);

    return Response.json(newProduct);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to add product" }, { status: 500 });
  }
}