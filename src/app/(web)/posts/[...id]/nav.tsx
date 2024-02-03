"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import BackArrowIcon from "public/icons/BackArrow.svg";
import ShareIcon from "public/icons/Share.svg";
import { useRouter } from "next/navigation";

function PostNavigationGroup() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className='flex justify-between'>
      <Button
        variant={"link"}
        onClick={handleBack}
        className='gap-1 inline-flex items-center cursor-pointer py-1.5 pl-0 text-gray-500 leading-tight'
      >
        <BackArrowIcon />
        Back
      </Button>

      <Button
        variant={"link"}
        className='inline-flex gap-1 items-center py-1.5 cursor-pointer pr-0 text-gray-500 leading-tight'
      >
        <ShareIcon />
        Share
      </Button>
    </div>
  );
}

export default PostNavigationGroup;
