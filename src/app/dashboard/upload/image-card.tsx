"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { copyTextToClipboard, paginate } from "@/lib/utils";

import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const OFFSET = 10;

type Props = {
  files: string[];
};
function ImageCard({ files }: Props) {
  const [page, setPage] = useState(1);

  const hasMore = useMemo(() => files.length > OFFSET * page, [files, page]);

  const onImageContainerClick = (file: string) => {
    copyTextToClipboard(file);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      <div className='flex gap-4 flex-wrap'>
        {paginate(files, OFFSET, page).map((file) => (
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

      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((prev) => prev - 1)} />
            </PaginationItem>
          )}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink href='#'>{page - 1}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          {hasMore && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setPage((prev) => prev + 1)}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ImageCard;
