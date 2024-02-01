"use client";

import { ClassValue } from "clsx";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Claps from "./claps";
import { clapToPost } from "@/service/posts.service";

function getClapsFromLocalStorage(postId: string): number {
  return Number(localStorage.getItem(`clap-${postId}`)) ?? 0;
}

interface ClapContainerProps {
  postId: string;
  total: number;
  className: ClassValue;
}
function ClapContainer({ total, postId, ...rest }: ClapContainerProps) {
  noStore();
  if (typeof window === "undefined") notFound();

  const currentClaps = useMemo(
    () => getClapsFromLocalStorage(postId),
    [postId]
  );

  const onClap = useCallback(
    async (totalUserClaps: number) => {
      // get the updated version of the claps
      const savedLocalClaps = getClapsFromLocalStorage(postId);

      const addedClaps = totalUserClaps - savedLocalClaps;
      await clapToPost(+postId, addedClaps);
      localStorage.setItem(`clap-${postId}`, String(totalUserClaps));
    },
    [postId]
  );

  return (
    <Claps
      {...rest}
      total={total}
      onClapChange={onClap}
      currentClaps={currentClaps}
    />
  );
}

export default ClapContainer;
