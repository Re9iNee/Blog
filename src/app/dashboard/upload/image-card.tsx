"use client";

import { copyTextToClipboard } from "@/lib/utils";
import Image from "next/image";

type Props = {
  files: string[];
};
function ImageCard({ files }: Props) {
  return (
    <div className='flex gap-4 flex-wrap'>
      {files.map((file) => (
        <Image
          key={file}
          src={file}
          alt={file}
          width={250}
          height={250}
          onClick={() => copyTextToClipboard(file)}
          className='rounded-lg object-contain hover:shadow-lg transition-shadow duration-300 ease-in-out'
        />
      ))}
    </div>
  );
}

export default ImageCard;
