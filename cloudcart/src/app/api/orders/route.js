import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "@/lib/aws";
import { v4 as uuidv4 } from "uuid";

//  CREATE ORDER
export async function POST(req) {
  try {
    const body = await req.json();

    const { items, userEmail, address } = body;

    //  cart empty check
    if (!items || items.length === 0) {
      return Response.json(
        { message: "Cart is empty" },
        { status: 400 }
      );
    }

    //  address validation
    if (
      !address ||
      !address.name ||
      !address.phone ||
      !address.addressLine ||
      !address.city ||
      !address.pincode
    ) {
      return Response.json(
        { message: "Please fill all address details" },
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
      address,
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

//  GET ORDERS (for user)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");

    const data = await dynamoDB.send(
      new ScanCommand({
        TableName: "CloudCartOrders",
      })
    );

    let orders = data.Items || [];

    //  filter by user email
    if (userEmail) {
      orders = orders.filter(
        (order) => order.userEmail === userEmail
      );
    }

    return Response.json(orders);

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}