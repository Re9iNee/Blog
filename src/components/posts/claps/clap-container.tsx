"use client";

import { getPostsClaps } from "@/service/posts.service";
import { notFound } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import Claps, { ClapsProps } from "./claps";
import { ClassValue } from "clsx";

function getClapsFromLocalStorage(postId: string): number {
  return Number(localStorage.getItem(`clap-${postId}`)) ?? 0;
}

interface ClapContainerProps {
  postId: string;
  total: number;
  className: ClassValue;
  onClapChange: (addedClaps: number) => Promise<number>;
}
function ClapContainer({
  postId,
  onClapChange,
  total,
  ...rest
}: ClapContainerProps) {
  if (typeof window === "undefined") notFound();

  const [totalClaps, setTotalClaps] = useState<number>(total);

  const currentClaps = useMemo(
    () => getClapsFromLocalStorage(postId),
    [postId]
  );

  const onClap = useCallback(
    async (totalUserClaps: number) => {
      // get the updated version of the claps
      const savedLocalClaps = getClapsFromLocalStorage(postId);

      const addedClaps = totalUserClaps - savedLocalClaps;
      const updatedTotalClaps = await onClapChange(addedClaps);
      localStorage.setItem(`clap-${postId}`, String(totalUserClaps));
      setTotalClaps(updatedTotalClaps);
    },
    [postId, onClapChange, setTotalClaps]
  );

  return (
    <Claps
      {...rest}
      total={totalClaps}
      onClapChange={onClap}
      currentClaps={currentClaps}
    />
  );
}

export default ClapContainer;
