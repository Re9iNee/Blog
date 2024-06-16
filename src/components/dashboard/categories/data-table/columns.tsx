"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";

import { DataTableRowActions } from "./data-table-row-actions";
import { CategoryModel } from "@/types/category.type";

export const columns: ColumnDef<CategoryModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        aria-label='Select all'
        className='translate-y-[2px]'
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label='Select row'
        checked={row.getIsSelected()}
        className='translate-y-[2px]'
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-[500px] truncate font-medium cursor-pointer'>
          {row.getValue("name")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created at' />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Updated at' />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("updatedAt")).toLocaleDateString()}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
