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

type Props = {
  totalPages: number;
  currentPage: number;
  className: ClassValue;
};
export function MyPagination({ className, currentPage, totalPages }: Props) {
  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        {currentPage - 1 >= 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious
                href={{
                  pathname: "/",
                  query: { page: currentPage - 1 },
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href={{
                  pathname: "/",
                  query: { page: currentPage - 1 },
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
              href={{
                pathname: "/",
                query: { page: currentPage + 1 },
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
              href={{
                pathname: "/",
                query: { page: currentPage + 1 },
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
