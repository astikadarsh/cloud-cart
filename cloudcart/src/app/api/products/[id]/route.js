import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "@/lib/aws";

export async function GET(req, { params }) {
  try {
    const { id } = await params; // important

    const command = new GetCommand({
      TableName: "CloudCartProducts",
      Key: {
        id: String(id),
      },
    });

    const data = await dynamoDB.send(command);

    if (!data.Item) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(data.Item);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error fetching product" }, { status: 500 });
  }
}