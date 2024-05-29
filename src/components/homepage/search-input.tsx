"use client";

import useSetURLParams from "@/hooks/useSetURLParams";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

export default function SearchInput({ className }: { className?: ClassValue }) {
  const { setToUrl } = useSetURLParams({ key: "query", defaultValue: "" });

  const onChange = useDebouncedCallback((query: string) => {
    setToUrl(query);
  }, 500);

  return (
    <Input
      type='text'
      className={cn(className)}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Find your topic here...'
    />
  );
}
