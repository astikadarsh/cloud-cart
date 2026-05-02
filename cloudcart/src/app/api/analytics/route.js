import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "@/lib/aws";

export async function GET() {
  try {
    //  fetch products
    const productsData = await dynamoDB.send(
      new ScanCommand({
        TableName: "CloudCartProducts",
      })
    );

    const products = productsData.Items || [];

    //  fetch orders
    const ordersData = await dynamoDB.send(
      new ScanCommand({
        TableName: "CloudCartOrders",
      })
    );

    const orders = ordersData.Items || [];

    //  calculate revenue
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    return Response.json({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      recentOrders: orders.slice(-5).reverse(), // last 5
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}