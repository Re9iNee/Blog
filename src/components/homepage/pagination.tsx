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
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
  currentPage: number;
  className: ClassValue;
};
export function MyPagination({ className, currentPage, totalPages }: Props) {
  const searchParams = useSearchParams();

  const allQueryParams = new URLSearchParams(searchParams);
  allQueryParams.delete("page");

  const generateSearchQuery = (page: number): string => {
    if (allQueryParams.toString() === "") return `?page=${page}`;
    return `?page=${page}&${allQueryParams.toString()}`;
  };

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        {currentPage - 1 >= 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                scroll={false}
                href={{
                  pathname: "/",
                  search: generateSearchQuery(currentPage - 1),
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                scroll={false}
                href={{
                  pathname: "/",
                  search: generateSearchQuery(currentPage - 1),
                }}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink href='#' isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage + 1 <= totalPages && (
          <PaginationItem>
            <PaginationLink
              scroll={false}
              href={{
                pathname: "/",
                search: generateSearchQuery(currentPage + 1),
              }}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage + 2 <= totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage + 1 <= totalPages && (
          <PaginationItem>
            <PaginationNext
              scroll={false}
              href={{
                pathname: "/",
                search: generateSearchQuery(currentPage + 1),
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
