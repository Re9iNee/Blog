import { Input } from "@/components/ui/input";
import { uploadToS3 } from "@/service/upload.service";
import { Loader2 } from "lucide-react";
import { MouseEventHandler, useRef, useState } from "react";
import { Button } from "./button";
import { toast } from "./use-toast";

type Props = {
  name: string;
  defaultValue?: string;
  onUploadFinished: (url: string) => void;
};
export function Uploader({
  name,
  defaultValue,
  onUploadFinished,
  ...props
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange: MouseEventHandler<HTMLButtonElement> = async (
    ev
  ) => {
    ev.preventDefault();
    const files = ref.current?.files;

    if (!files?.length) {
      toast({ title: "No file selected" });
      return;
    }

    setIsLoading(true);

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
    <div className='flex flex-col gap-4'>
      <input type='hidden' name={name} defaultValue={defaultValue} />
      <Input
        ref={ref}
        type='file'
        data-cy='uploader'
        accept='audio/*,video/*,image/*'
        {...props}
      />
      <Button
        disabled={isLoading}
        data-cy='upload-btn'
        className='self-end'
        variant={"secondary"}
        onClick={handleImageChange}
      >
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Uploading...
          </>
        ) : (
          "Upload"
        )}
      </Button>
    </div>
  );
}
