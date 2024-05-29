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

type Props = {
  className?: ClassValue;
  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
};
export default function SearchInput({
  className,
  isTyping,
  setIsTyping,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const query = useMemo(
    () => new URLSearchParams(searchParams).get("query"),
    [searchParams]
  );

  const { set } = useSetManyUrlParams();

  const onChange = useDebouncedCallback((query: string) => {
    set([
      { key: "page", value: "1" },
      { key: "query", value: query },
    ]);

    setIsTyping(false);
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
        alt='little flame icon'
        className={cn(
          "w-[57px] h-[67px] object-none absolute right-3 -top-[67px] transition-all",
          isTyping && "top-0 scale-50"
        )}
      />
      <Input
        type='text'
        ref={inputRef}
        defaultValue={query ?? ""}
        className={cn(
          "pl-14 pr-20 text-md font-medium w-full min-h-14 shadow-xl rounded-2xl placeholder:text-neutral-400 relative"
        )}
        onChange={(e) => {
          setIsTyping(true);
          onChange(e.target.value);
        }}
        placeholder='Find your topic here...'
      />
      <FaMagnifyingGlass className='w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-4 text-purple-600 pointer-events-none' />
      {/* <Button
        variant={"ghost"}
        className='absolute top-1/2 transform -translate-y-1/2 right-1 text-neutral-500 items-center gap-1 text-xs font-bold flex cursor-pointer min-w-12 min-h-12 rounded-xl'
        onClick={() => {
          clearQuery();
        }}
      >
        {isTyping || inputRef.current?.value !== "" ? (
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
