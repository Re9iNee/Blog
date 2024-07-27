"use client";

import { Button } from "@/components/ui/button";
import { isLoggedIn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { HiOutlineChevronLeft } from "react-icons/hi";

import { toast } from "sonner";

function PostNavigationGroup({ postId }: { postId: number }) {
  const { status } = useSession();

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
    <div className="flex justify-between">
      <Button
        variant={"link"}
        onClick={handleBack}
        className="inline-flex cursor-pointer items-center gap-1 py-1.5 pl-0 leading-tight text-gray-500 dark:text-gray-400"
      >
        <HiOutlineChevronLeft />
        Back
      </Button>

      <div>
        {isLoggedIn(status) && (
          <Button
            variant={"link"}
            onClick={handleEdit}
            className="inline-flex cursor-pointer items-center gap-1 py-1.5 pr-0 leading-tight text-gray-500 dark:text-gray-400"
          >
            <FaRegEdit />
            Edit
          </Button>
        )}
        <Button
          variant={"link"}
          onClick={handleShare}
          className="inline-flex cursor-pointer items-center gap-1 py-1.5 pr-0 leading-tight text-gray-500 dark:text-gray-400"
        >
          <FaRegShareFromSquare />
          Share
        </Button>
      </div>
    </div>
  );
}

export default PostNavigationGroup;
