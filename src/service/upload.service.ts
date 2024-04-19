"use server";

import { getS3ObjectURLFromKey } from "@/lib/utils";
import { S3File } from "@/types/s3file";
import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3 = new S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadToS3(data: FormData): Promise<string> {
  if (process.env.S3_UPLOAD_DIR === undefined)
    throw new Error("S3_UPLOAD_DIR is not set");

  const file = data.get("file") as File;
  const body = (await file.arrayBuffer()) as Buffer;

  // create a unique file name
  const fileName = `${Date.now()}-${file.name}`;
  const fileKey = `${process.env.S3_UPLOAD_DIR}/${fileName}`;

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

export async function getUploadedFiles(): Promise<S3File[]> {
  if (process.env.S3_UPLOAD_DIR === undefined)
    throw new Error("S3_UPLOAD_DIR is not set");

  // get all files from /mora-blog-files directory in s3 and use pagination to get all files
  const params = {
    Bucket: process.env.S3_BUCKET,
    Prefix: process.env.S3_UPLOAD_DIR,
  };

  const command = new ListObjectsV2Command(params);
  const response = await s3.send(command);

  if (response?.Contents === undefined) return [];

  const files: S3File[] = response.Contents.map((file) => {
    if (!file.Key) return;
    if (!file.Size) return;

    const obj: S3File = {
      id: file.Key,
      key: file.Key,
      size: file.Size,
      url: getS3ObjectURLFromKey(file.Key),
      // removes the date prefix and removes the number prefix
      name: file.Key.replace(`${process.env.S3_UPLOAD_DIR}/`, "").replace(
        /\d+\-/g,
        ""
      ),
    };

    return obj;
  })
    //  filter out the undefined values after mapping
    .filter((file): file is S3File => file !== undefined);

  // get the latest files first
  return files.reverse();
}

export async function deleteFileFromS3(key: string) {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Key: key,
        Bucket: process.env.S3_BUCKET,
      })
    );

    revalidatePath("/dashboard/upload");
  } catch (e) {
    throw new Error("Error deleting file from s3");
  }
}
