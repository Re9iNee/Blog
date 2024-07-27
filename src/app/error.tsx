"use client";

import GoBackButton from "@/components/global/GoBackButton";
import { Button } from "@/components/ui/button";
import { notoSans, outfit } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

type Props = {
  error: Error;
  reset: () => void;
};
export default function ErrorPage({ error, reset }: Props) {
  return (
    <div
      role="alert"
      aria-label="404 Not Found"
      className="flex min-h-screen flex-col items-center justify-center p-4 lg:flex-row lg:gap-8"
    >
      <div className="flex items-center">
        <Image
          width={230}
          height={230}
          alt="planet icon"
          placeholder="blur"
          aria-hidden="true"
          src="/404/Planet.gif"
          blurDataURL="/404/Planet.svg"
        />
      </div>
      <div className="flex flex-col justify-center lg:max-w-96 lg:items-start">
        <section
          aria-label="info"
          className="mb-14 flex flex-col gap-4 text-center md:gap-6 lg:mb-14 lg:text-left"
        >
          <h1 className="font-poppins text-xl font-bold text-purple-600 sm:text-2xl md:text-4xl">
            Uh oh, Something went wrong
          </h1>
          <h3
            className={cn(
              "text-sm text-gray-500",
              outfit.className,
              "md:text-lg",
            )}
          >
            Check browser console or try again later
          </h3>
        </section>
        <section
          aria-label="actions"
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Button
            onClick={() => reset()}
            className={cn(
              "rounded-2xl border-none bg-neutral-100 font-bold text-neutral-950",
              notoSans.className,
              "dark:bg-neutral-800 dark:text-neutral-50",
            )}
          >
            Retry
          </Button>
          <Button
            asChild
            variant={"outline"}
            className={cn(
              "rounded-2xl border-none bg-neutral-100 font-bold text-neutral-950",
              notoSans.className,
              "dark:bg-neutral-800 dark:text-neutral-50",
            )}
          >
            <Link href="/">Return Home</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
