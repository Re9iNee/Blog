import { Input } from "@/components/ui/input";
import { uploadToS3 } from "@/service/upload.service";
import { ChangeEventHandler } from "react";
import { toast } from "./use-toast";

// TODO: Progress bar
type Props = {
  onUploadFinished: (url: string) => void;
};
export function Uploader({ onUploadFinished, ...props }: Props) {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files?.item(0) as File);

    uploadToS3(formData)
      .then(onUploadFinished)
      .catch(() => {
        toast({
          title: "Error uploading",
        });
      });
  };

  return (
    <Input
      type='file'
      data-cy='uploader'
      onChange={changeHandler}
      accept='audio/*,video/*,image/*'
      {...props}
    />
  );
}
