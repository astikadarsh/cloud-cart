import {
  GetCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "@/lib/aws";

//  GET SINGLE PRODUCT
export async function GET(req, { params }) {
  try {
    const { id } = await params;

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

//  DELETE PRODUCT
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const command = new DeleteCommand({
      TableName: "CloudCartProducts",
      Key: {
        id: String(id),
      },
    });

    await dynamoDB.send(command);

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

//  ADD THIS: UPDATE PRODUCT
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { name, price, description, image } = body;

    const command = new UpdateCommand({
      TableName: "CloudCartProducts",
      Key: {
        id: String(id),
      },
      UpdateExpression:
        "set #name = :name, price = :price, description = :description, image = :image",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":price": price,
        ":description": description,
        ":image": image,
      },
      ReturnValues: "ALL_NEW",
    });

    const data = await dynamoDB.send(command);

    return Response.json(data.Attributes);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}