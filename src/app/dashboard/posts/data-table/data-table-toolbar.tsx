"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { FaPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "../../../../components/dashboard/table/data-table-faceted-filter";
import { DataTableViewOptions } from "../../../../components/dashboard/table/data-table-view-options";
import { statuses } from "./data";
import { useDisclosure } from "@nextui-org/react";
import Modal from "@/components/ui/modal";
import PostForm from "../form";
import { createPost } from "@/service/posts.service";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Button size='sm' onClick={onOpen}>
          <FaPlus className='mr-2 h-4 w-4' />
          Create a post
        </Button>
        <Input
          placeholder='Filter posts...'
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title='Status'
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} header={"Create Post"}>
        <PostForm closeModal={onClose} actionFn={createPost}></PostForm>
      </Modal>
    </div>
  );
}
