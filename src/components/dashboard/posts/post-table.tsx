"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { toast } from "@/components/ui/use-toast";
import { deleteManyPosts } from "@/service/posts.service";
import { PostModel } from "@/types/post";
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
import path from "path";
import React, { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  query?: string;
  perPage: number;
  posts: PostModel[];
  columns: ColumnDef<PostModel, PostModel>[];
};
function PostTable({ perPage, posts, columns, query }: Props) {
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
    pageIndex: 0,
    pageSize: perPage,
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

  const changePagination = useCallback(
    ({ perPage }: { perPage: number }) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (perPage !== 10) {
        params.set("per_page", perPage.toString());
      } else {
        params.delete("per_page");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, replace]
  );

  useEffect(() => {
    // on pagination change
    console.log("pagination", pagination);
    changePagination({ perPage: pagination.pageSize });
  }, [pagination, changePagination]);

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
    [table]
  );

  return <DataTable table={table} columns={columns} />;
}

export default PostTable;
