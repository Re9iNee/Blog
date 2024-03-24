"use client";

import { copyTextToClipboard } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  files: string[];
};
function ImageCard({ files }: Props) {
  const onImageContainerClick = (file: string) => {
    copyTextToClipboard(file);
    toast.success("Copied to clipboard");
  };

  return (
    <div className='flex gap-4 flex-wrap'>
      {files.map((file) => (
        <div
          key={file}
          onClick={() => onImageContainerClick(file)}
          className='group relative w-32 h-32 rounded-xl cursor-pointer'
        >
          <Image
            fill
            key={file}
            src={file}
            alt={file}
            loading='lazy'
            className='rounded-lg object-cover hover:shadow-lg transition-shadow duration-300 ease-in-out'
          />

          <div className='w-full h-full absolute opacity-0 group-hover:opacity-75 bg-gradient-to-l from-violet-500 to-violet-900 rounded-xl backdrop-blur-none group-active:opacity-100 duration-400 text-white font-bold grid place-items-center'>
            Copy URL
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageCard;
