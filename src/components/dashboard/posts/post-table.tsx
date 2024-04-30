"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { toast } from "@/components/ui/use-toast";
import { deleteManyPosts } from "@/service/posts.service";
import { PostModel } from "@/types/post";
import {
  ColumnDef,
  ColumnFiltersState,
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
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";

type Props = {
  query?: string;
  posts: PostModel[];
  columns: ColumnDef<PostModel, PostModel>[];
};
function PostTable({ posts, columns, query }: Props) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "title", value: query ?? "" },
  ]);

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: posts,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
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
