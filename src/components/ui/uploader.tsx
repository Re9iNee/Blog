import { Input } from "@/components/ui/input";
import { uploadToS3 } from "@/service/upload.service";
import { toast } from "./use-toast";

type Props = {
  name: string;
  defaultValue?: string;
  onUploadFinished: (url: string) => void;
};
export function Uploader({ onUploadFinished, ...props }: Props) {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const formData = new FormData();
    formData.append("file", files[0]);

    uploadToS3(formData)
      .then(onUploadFinished)
      .catch(() => {
        toast({
          title: "Error uploading",
        });
      })
      .finally(() => {
        setIsLoading(false);
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
