"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { statuses } from "./data";

import { DataTableColumnHeader } from "@/components/dashboard/table/data-table-column-header";
import { Switch } from "@/components/ui/switch";
import { slideshowTogglePostVisibility } from "@/service/posts.service";
import { PostModel } from "@/types/post";
import { DataTableRowActions } from "./data-table-row-actions";
import { useState } from "react";
import SpinnerCheckbox from "@/components/dashboard/spinner-checkbox";

export const columns: ColumnDef<PostModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Post' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <div className='flex space-x-2'>
        <span className='max-w-[500px] truncate font-medium'>
          {row.getValue("title")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isSlideshow",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Show in slideshow' />
    ),
    cell: ({ row }) => {
      const isSlideshow: boolean = row.getValue("isSlideshow");

      if (typeof isSlideshow === "undefined") {
        return;
      }

      const postId: number = row.getValue("id");

      return (
        <div className='flex w-[100px] items-center'>
          <SpinnerCheckbox
            id={postId}
            checked={isSlideshow}
            onChange={slideshowTogglePostVisibility}
          />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
