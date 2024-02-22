"use server";

import { getS3ObjectURLFromKey } from "@/lib/utils";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadToS3(data: FormData): Promise<string> {
  const file = data.get("file") as File;
  const body = (await file.arrayBuffer()) as Buffer;

  // create a unique file name
  const fileName = `${Date.now()}-${file.name}`;
  const fileKey = `mora-blog-files/${fileName}`;

  await s3.send(
    new PutObjectCommand({
      Body: body,
      Key: fileKey,
      Bucket: process.env.S3_BUCKET,
      ACL: "bucket-owner-full-control",
    })
  );

  const url = getS3ObjectURLFromKey(fileKey);

  return url;
}
