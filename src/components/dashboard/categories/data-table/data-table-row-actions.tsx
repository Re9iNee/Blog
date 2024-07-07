"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { deleteManyCategories } from "@/service/category.service";
import { categorySchema } from "@/types/schemas/category-schema";
import Link from "next/link";
import { useCallback } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const parsed = categorySchema.safeParse(row.original);

  const deleteCategory = useCallback(async (id: number) => {
    try {
      await deleteManyCategories([id]);
      toast({
        variant: "default",
        title: `Category deleted successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Couldn't remove category, error ${error}`,
      });
    }
  }, []);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);

    return <></>;
  }

  const category = parsed.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          data-cy='action-menu'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem data-cy='edit-post' asChild>
          <Link href={`/dashboard/categories/${category.id}/edit`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-not-allowed'>
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-not-allowed'>
          Favorite
        </DropdownMenuItem>
        {/* TODO: fetch categories to show in labels */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => deleteCategory(category.id!)}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
