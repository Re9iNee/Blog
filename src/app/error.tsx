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
      role='alert'
      aria-label='404 Not Found'
      className='flex flex-col items-center justify-center min-h-screen p-4
      lg:flex-row lg:gap-8
      '
    >
      <div className='flex items-center'>
        <Image
          width={230}
          height={230}
          alt='planet icon'
          placeholder='blur'
          aria-hidden='true'
          src='/404/Planet.gif'
          blurDataURL='/404/Planet.svg'
        />
      </div>
      <div
        className='flex flex-col justify-center
        lg:max-w-96 lg:items-start
        '
      >
        <section
          aria-label='info'
          className='flex flex-col text-center gap-4 mb-14
          md:gap-6
          lg:text-left lg:mb-14
          '
        >
          <h1
            className='font-bold text-purple-600 text-xl font-poppins
            sm:text-2xl
            md:text-4xl
            '
          >
            Uh oh, Something went wrong
          </h1>
          <h3
            className={cn(
              "text-gray-500 text-sm",
              outfit.className,
              "md:text-lg"
            )}
          >
            Check browser console or try again later
          </h3>
        </section>
        <section
          aria-label='actions'
          className='flex flex-col gap-4 justify-center
          sm:flex-row
          '
        >
          <Button
            onClick={() => reset()}
            className={cn(
              "rounded-2xl bg-neutral-100 text-neutral-950 font-bold border-none",
              notoSans.className,
              "dark:bg-neutral-800 dark:text-neutral-50"
            )}
          >
            Retry
          </Button>
          <Button
            asChild
            variant={"outline"}
            className={cn(
              "rounded-2xl bg-neutral-100 text-neutral-950 font-bold border-none",
              notoSans.className,
              "dark:bg-neutral-800 dark:text-neutral-50"
            )}
          >
            <Link href='/'>Return Home</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
