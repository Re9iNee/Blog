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
import Modal from "@/components/ui/modal";
import { toast } from "@/components/ui/use-toast";
import {
  deletePost as deletePostService,
  updatePost,
} from "@/service/posts.service";
import { useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useCallback } from "react";
import PostForm from "../form";
import { postSchema } from "../post-schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const post = postSchema.parse(row.original);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const deletePost = useCallback(async (id: number) => {
    try {
      const deletedPost = await deletePostService(id);
      toast({
        variant: "default",
        title: `Post ${deletedPost.title} deleted successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Couldn't remove post, error ${error}`,
      });
    }
  }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem onClick={onOpen}>Edit</DropdownMenuItem>
          <Link href={`/posts/${post.id}`} target='_blank'>
            <DropdownMenuItem>Visit post</DropdownMenuItem>
          </Link>
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
            onClick={() => deletePost(post.id!)}
          >
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal isOpen={isOpen} header={`Edit Post`} onOpenChange={onOpenChange}>
        <PostForm
          closeModal={onClose}
          initialValues={post}
          actionFn={updatePost}
        />
      </Modal>
    </>
  );
}
