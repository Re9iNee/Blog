"use client";

import { clapToPost } from "@/service/posts.service";
import { ClassValue } from "clsx";
import { notFound } from "next/navigation";
import { useCallback, useMemo } from "react";
import Claps from "./claps";

function getClapsFromLocalStorage(slug: string): number {
  return Number(localStorage.getItem(`clap-${slug}`)) ?? 0;
}

interface ClapContainerProps {
  slug: string;
  total: number;
  className: ClassValue;
}
function ClapContainer({ total, slug, ...rest }: ClapContainerProps) {
  if (typeof window === "undefined") notFound();

  const currentClaps = useMemo(() => getClapsFromLocalStorage(slug), [slug]);

  const onClap = useCallback(
    async (totalUserClaps: number) => {
      // get the updated version of the claps
      const savedLocalClaps = getClapsFromLocalStorage(slug);

      const addedClaps = totalUserClaps - savedLocalClaps;
      await clapToPost(slug, addedClaps);
      localStorage.setItem(`clap-${slug}`, String(totalUserClaps));
    },
    [slug],
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
