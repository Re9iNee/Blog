"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { HiOutlineChevronLeft } from "react-icons/hi";

import { toast } from "sonner";

function PostNavigationGroup({ postId }: { postId: number }) {
  const { status } = useSession();
  const isLoggedIn = useMemo(() => status === "authenticated", [status]);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // copy to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // show toast success
    toast("Copied to clipboard");
  };

  const handleEdit = () => {
    router.push(`/dashboard/posts/${postId}/edit`);
  };

  return (
    <div className='flex justify-between'>
      <Button
        variant={"link"}
        onClick={handleBack}
        className='gap-1 inline-flex items-center cursor-pointer py-1.5 pl-0 text-gray-500 leading-tight dark:text-gray-400'
      >
        <HiOutlineChevronLeft />
        Back
      </Button>

      <div>
        {isLoggedIn && (
          <Button
            variant={"link"}
            onClick={handleEdit}
            className='inline-flex gap-1 items-center py-1.5 cursor-pointer pr-0 text-gray-500 leading-tight dark:text-gray-400'
          >
            <FaRegEdit />
            Edit
          </Button>
        )}
        <Button
          variant={"link"}
          onClick={handleShare}
          className='inline-flex gap-1 items-center py-1.5 cursor-pointer pr-0 text-gray-500 leading-tight dark:text-gray-400'
        >
          <FaRegShareFromSquare />
          Share
        </Button>
      </div>
    </div>
  );
}

export default PostNavigationGroup;
