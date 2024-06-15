"use client";

import { DataTable } from "@/components/ui/table/data-table";
import { toast } from "@/components/ui/use-toast";
import { deleteManyCategories } from "@/service/category.service";
import { Category } from "@prisma/client";
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
  categories: Category[];
  columns: ColumnDef<Category, Category>[];
};
function CategoryTable({
  page,
  query,
  columns,
  perPage,
  rowCount,
  categories,
}: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    { id: "name", value: query ?? "" },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: perPage,
    pageIndex: page - 1,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: categories,
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
    [pathname, searchParams, replace]
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
    [pathname, searchParams, replace]
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
        toast({ variant: "default", title: "Deleting categories..." });
        const { count } = await deleteManyCategories(selectedRowIDs);
        toast({ variant: "default", title: `${count} Categories deleted!` });
      } catch (e) {
        console.error(e);
        toast({ variant: "destructive", title: "Error deleting categories!" });
      }
    },
    [table]
  );

  return (
    <DataTable
      table={table}
      columns={columns}
      toolbar={<DataTableToolbar table={table} />}
    />
  );
}

export default CategoryTable;
