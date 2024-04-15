import { Input } from "@/components/ui/input";
import { uploadToS3 } from "@/service/upload.service";
import { MouseEventHandler, useRef } from "react";
import { Button } from "./button";
import { toast } from "./use-toast";

// TODO: Progress bar
type Props = {
  onUploadFinished: (url: string) => void;
};
export function Uploader({ onUploadFinished, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleImageChange: MouseEventHandler<HTMLButtonElement> = async (
    ev
  ) => {
    ev.preventDefault();
    const files = ref.current?.files;

    if (!files?.length) {
      toast({ title: "No file selected" });
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);

    uploadToS3(formData)
      .then(onUploadFinished)
      .catch(() => {
        toast({
          title: "Error uploading",
        });
      });
  };

  return (
    <div className='flex flex-col gap-4'>
      <Input
        ref={ref}
        type='file'
        data-cy='uploader'
        accept='audio/*,video/*,image/*'
        {...props}
      />
      <Button
        className='self-end'
        variant={"secondary"}
        onClick={handleImageChange}
      >
        Upload
      </Button>
    </div>
  );
}
