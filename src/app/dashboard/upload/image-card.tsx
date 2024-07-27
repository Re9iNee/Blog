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
import { copyTextToClipboard, paginate } from "@/lib/utils";
import { FaRegCopy, FaTrash } from "react-icons/fa6";

import { deleteFileFromS3 } from "@/service/upload.service";
import { S3File } from "@/types/s3file";
import Image from "next/image";
import { useMemo, useState } from "react";
import { toast } from "sonner";

const OFFSET = 5;

type Props = {
  files: S3File[];
};
function ImageCard({ files }: Props) {
  const [page, setPage] = useState(1);

  const hasMore = useMemo(() => files.length > OFFSET * page, [files, page]);

  const onImageContainerClick = (file: string) => {
    copyTextToClipboard(file);
    toast.success("Copied to clipboard");
  };

  const onDelete = (key: string) => {
    // delete the file from s3
    deleteFileFromS3(key)
      .then(() => {
        toast.success("File deleted successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {paginate(files, OFFSET, page).map((file) => {
          return (
            <div
              key={file.id}
              className="relative flex w-full justify-between rounded-sm border p-4"
            >
              <div className="flex items-center gap-2">
                <Image
                  width={150}
                  height={50}
                  key={file.key}
                  src={file.url}
                  alt={file.name}
                  loading="lazy"
                  className="aspect-square rounded-lg object-cover transition-shadow duration-300 ease-in-out hover:shadow-lg"
                />
                <TypographyMuted>{file.name}</TypographyMuted>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  data-cy="delete-btn"
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => onDelete(file.key)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => onImageContainerClick(file.url)}
                >
                  <FaRegCopy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Pagination className="mt-6">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={{}}
                className="cursor-pointer"
                onClick={() => setPage((prev) => prev - 1)}
              />
            </PaginationItem>
          )}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                className="cursor-pointer"
                onClick={() => setPage((prev) => prev - 1)}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          {hasMore && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="cursor-pointer"
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  className="cursor-pointer"
                  onClick={() => setPage((prev) => prev + 1)}
                />
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ImageCard;
