"use client";

import { useCallback, useMemo } from "react";
import Claps, { ClapsProps } from "./claps";
import { notFound } from "next/navigation";

function getClapsFromLocalStorage(postId: string): number {
  return Number(localStorage.getItem(`clap-${postId}`)) ?? 0;
}

interface ClapContainerProps extends Omit<ClapsProps, "currentClaps"> {
  postId: string;
}
function ClapContainer({ postId, onClapChange, ...rest }: ClapContainerProps) {
  if (typeof window === "undefined") notFound();

  const currentClaps = useMemo(
    () => getClapsFromLocalStorage(postId),
    [postId]
  );

  const onClap = useCallback(
    (totalUserClaps: number) => {
      // get the updated version of the claps
      const savedLocalClaps = getClapsFromLocalStorage(postId);

      const addedClaps = totalUserClaps - savedLocalClaps;
      onClapChange(addedClaps);
      localStorage.setItem(`clap-${postId}`, String(totalUserClaps));
    },
    [postId, onClapChange]
  );

  return <Claps {...rest} onClapChange={onClap} currentClaps={currentClaps} />;
}

export default ClapContainer;
