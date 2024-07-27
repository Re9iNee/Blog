"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { toast } from "@/components/ui/use-toast";
import { deleteManyPosts } from "@/service/posts.service";
import { PostModel } from "@/types/post.type";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { DataTableToolbar } from "./data-table/data-table-toolbar";

type Props = {
  page: number;
  query?: string;
  perPage: number;
  rowCount: number;
  posts: PostModel[];
  columns: ColumnDef<PostModel, PostModel>[];
};
function PostTable({ perPage, rowCount, posts, columns, page, query }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "title", value: query ?? "" },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: perPage,
    pageIndex: page - 1,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: posts,
    columns,
    state: {
      sorting,
      pagination,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    rowCount,
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  table.getSelectedRowModel().rows.map((row) => row.original.id);

  const setPerPageToURL = useCallback(
    (perPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (perPage !== 10) {
        params.set("per_page", perPage.toString());
      } else {
        params.delete("per_page");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, replace],
  );

  const setCurrentPageToURL = useCallback(
    (pageIndex: number) => {
      const params = new URLSearchParams(searchParams);

      if (pageIndex !== 0) {
        params.set("page", (pageIndex + 1).toString());
      } else {
        params.delete("page");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, replace],
  );

  useEffect(() => {
    // triggered when pageSize changes
    setPerPageToURL(pagination.pageSize);
  }, [pagination.pageSize, setPerPageToURL]);

  useEffect(() => {
    // triggered when pageIndex changes
    setCurrentPageToURL(pagination.pageIndex);
  }, [pagination.pageIndex, setCurrentPageToURL]);

  useHotkeys(
    "meta+backspace",
    async () => {
      const selectedRowIDs = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original.id);

      if (!selectedRowIDs.length) return;

      try {
        toast({ variant: "default", title: "Deleting posts..." });
        const { count } = await deleteManyPosts(selectedRowIDs);
        toast({ variant: "default", title: `${count} Posts deleted!` });
      } catch (e) {
        console.error(e);
        toast({ variant: "destructive", title: "Error deleting posts!" });
      }
    },
    [table],
  );

  return (
    <DataTable
      table={table}
      columns={columns}
      toolbar={<DataTableToolbar table={table} />}
    />
  );
}

export default PostTable;
