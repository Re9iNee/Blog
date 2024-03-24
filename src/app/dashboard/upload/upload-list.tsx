import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUploadedFiles } from "@/service/upload.service";
import Image from "next/image";
import ImageCard from "./image-card";

async function UploadList() {
  const list = await getUploadedFiles();

  console.log(list);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Uploaded</CardTitle>
        <CardDescription>
          files that have been uploaded in s3 server
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageCard files={list} />
      </CardContent>
    </Card>
  );
}

export default UploadList;
