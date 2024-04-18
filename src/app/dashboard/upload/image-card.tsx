"use client";

import { TypographyMuted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaTrash, FaRegCopy } from "react-icons/fa6";
import {
  copyTextToClipboard,
  getFilenamesFromAmazonS3Url,
  paginate,
} from "@/lib/utils";

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
            className='border w-full rounded-sm flex relative justify-between p-4'
          >
            <div className='flex gap-2 items-center'>
              <Image
                width={150}
                height={50}
                key={file}
                src={file}
                alt={file}
                loading='lazy'
                className='rounded-lg object-cover aspect-square hover:shadow-lg transition-shadow duration-300 ease-in-out'
              />
              <TypographyMuted>
                {getFilenamesFromAmazonS3Url(file)}
              </TypographyMuted>
            </div>
            <div className='flex items-center gap-4'>
              <Button disabled variant={"outline"} size={"icon"}>
                <FaTrash className='w-4 h-4' />
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                onClick={() => onImageContainerClick(file)}
              >
                <FaRegCopy className='w-4 h-4' />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Pagination className='mt-6'>
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
