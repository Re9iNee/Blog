import useSetURLParams, { useSetManyUrlParams } from "@/hooks/useSetURLParams";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import LittleFlame from "public/images/little-flame.avif";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { EnterIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";

type Props = {
  className?: ClassValue;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
};
export default function SearchInput({
  className,
  isFocused,
  setIsFocused,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const query = useMemo(
    () => new URLSearchParams(searchParams).get("query"),
    [searchParams],
  );

  const { set } = useSetManyUrlParams();

  const onChange = useDebouncedCallback((query: string) => {
    set([
      { key: "page", value: "1" },
      { key: "query", value: query },
    ]);
  }, 500);

  // const clearQuery = () => {
  //   if (!inputRef.current) return;

  //   setPage("1");
  //   setQuery("");
  //   setIsTyping(false);
  //   inputRef.current.value = "";
  // };

  return (
    <div className={cn(className)}>
      <Image
        aria-hidden
        src={LittleFlame}
        placeholder={"empty"}
        alt="little flame icon"
        className={cn(
          "absolute -top-[65px] right-3 h-[67px] w-[57px] object-none transition-all",
          isFocused && "top-0 scale-50",
        )}
      />
      <Input
        type="text"
        ref={inputRef}
        defaultValue={query ?? ""}
        className={cn(
          "text-md relative min-h-14 w-full rounded-2xl pl-14 pr-20 font-medium shadow-xl placeholder:text-neutral-400 focus:shadow-2xl focus-visible:ring-violet-500 focus-visible:ring-opacity-30 active:shadow-2xl dark:placeholder:text-neutral-600",
        )}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder="Find your topic here..."
      />
      <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform text-purple-600" />
      {/* <Button
        variant={"ghost"}
        className='absolute top-1/2 transform -translate-y-1/2 right-1 text-neutral-500 items-center gap-1 text-xs font-bold flex cursor-pointer min-w-12 min-h-12 rounded-xl'
        onClick={() => {
          // clearQuery();
        }}
      >
        {isFocused || inputRef.current?.value !== "" ? (
          <>
            <EnterIcon />
            Enter
          </>
        ) : (
          <>
            <XIcon />
            Clear
          </>
        )}
      </Button> */}
    </div>
  );
}
