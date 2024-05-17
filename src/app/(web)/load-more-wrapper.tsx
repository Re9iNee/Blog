"use client";

import { Button } from "@/components/ui/button";
import useSetURLParams from "@/hooks/useSetURLParams";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import React from "react";

type Props = {
  perPage: number;
  className?: ClassValue;
};
export default function LoadMoreWrapper({ perPage, className }: Props) {
  const { setToUrl: setPerPage } = useSetURLParams({
    key: "per_page",
    defaultValue: "12",
  });

  const clickHandler = () => {
    setPerPage("24");
  };

  return (
    <section
      aria-label='load more section'
      className={cn("text-center", className)}
    >
      {perPage <= 12 && (
        <Button
          variant={"secondary"}
          onClick={() => clickHandler()}
          className='px-16 text-neutral-950 font-bold'
        >
          Load More
        </Button>
      )}
    </section>
  );
}
