import { dynamoDB } from "@/lib/aws";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export async function GET() {
  try {
    const data = await dynamoDB.send(
      new ScanCommand({
        TableName: "CloudCartProducts",
      })
    );

    return Response.json(data.Items);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}