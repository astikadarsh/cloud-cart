import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "@/lib/aws";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();

    const { items, userEmail } = body;

    if (!items || items.length === 0) {
      return Response.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    //  total calculate
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      id: uuidv4(),
      userEmail,
      items,
      total,
      createdAt: new Date().toISOString(),
    };

    await dynamoDB.send(
      new PutCommand({
        TableName: "CloudCartOrders",
        Item: order,
      })
    );

    return Response.json({
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}