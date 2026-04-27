import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "@/lib/aws";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await dynamoDB.send(
      new GetCommand({
        TableName: "CloudCartUsers",
        Key: { email },
      })
    );

    if (!user.Item || user.Item.password !== password) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return Response.json({
      message: "Login successful",
      user: {
        email: user.Item.email,
        name: user.Item.name,
        role: user.Item.role, //  added
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Login failed" }, { status: 500 });
  }
}