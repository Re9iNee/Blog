"use client";

import { useCallback, useMemo } from "react";
import Claps, { ClapsProps } from "./claps";
import { notFound } from "next/navigation";

interface ClapContainerProps extends Omit<ClapsProps, "currentClaps"> {
  postId: string;
}
function ClapContainer({ postId, onClapChange, ...rest }: ClapContainerProps) {
  if (typeof window === "undefined") notFound();

  const currentClaps = useMemo(
    () => Number(localStorage.getItem(`clap-${postId}`)) ?? 0,
    [postId]
  );

  const onClap = useCallback(
    (count: number) => {
      localStorage.setItem(`clap-${postId}`, String(count));
      onClapChange(count);
    },
    [postId, onClapChange]
  );

  return <Claps {...rest} onClapChange={onClap} currentClaps={currentClaps} />;
}

export default ClapContainer;
