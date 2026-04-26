import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

export async function POST(req) {
  try {
    console.log("=== UPLOAD API HIT ===");

    const formData = await req.formData();
    const file = formData.get("file");

    console.log("File received:", file?.name);

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    //  ENV DEBUG
    console.log("Bucket:", process.env.S3_BUCKET_NAME);
    console.log("Region:", process.env.AWS_REGION);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    console.log("Uploading file:", fileName);

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    const result = await s3.send(command);

    console.log("S3 Upload Success:", result);

    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

    return Response.json({ url: fileUrl });
  } catch (error) {
    console.error("UPLOAD ERROR FULL:", error);

    return Response.json(
      {
        error: "Upload failed",
        message: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}