import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDB } from "@/lib/aws";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, name, role } = body;

    const existingUser = await dynamoDB.send(
      new GetCommand({
        TableName: "CloudCartUsers",
        Key: { email },
      })
    );

    if (existingUser.Item) {
      return Response.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    await dynamoDB.send(
      new PutCommand({
        TableName: "CloudCartUsers",
        Item: {
          email,
          password,
          name,
          role, //  added
        },
      })
    );

    return Response.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Signup failed" }, { status: 500 });
  }
}