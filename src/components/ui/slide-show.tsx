"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { Button } from "./button";
import { ClassValue } from "clsx";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: ClassValue;
};
export function SlideShow({ children, className }: Props) {
  return (
    // container
    <div className={cn("grid grid-cols-12 grid-rows-5 h-80", className)}>
      {/* left button */}
      <a
        className={`col-start-1 col-span-1 row-start-3 pr-0.5 slideshow-action z-20 place-self-center`}
      >
        <IoChevronBack />
      </a>

      <section className='col-start-1 col-span-full row-start-1 row-span-full'>
        {children}
      </section>

      {/* right button */}
      <a
        className={`col-start-12 col-span-1 row-start-3 pl-0.5 slideshow-action z-20 place-self-center`}
      >
        <IoChevronForward />
      </a>
    </div>
  );
}

type CardProps = {
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  imageAlt: string;

  categoryImageUrl: string;
};
export function SlideShowCard({
  title,
  author,
  category,
  imageUrl,
  imageAlt,
  categoryImageUrl,
}: CardProps) {
  return (
    <section className={cn("relative grid grid-cols-12 grid-rows-6 h-full")}>
      <Image
        width={96}
        height={96}
        src={categoryImageUrl}
        alt='Category image icon'
        className='absolute -top-8 left-0 z-10 pointer-events-none'
      />
      <Image
        fill
        src={imageUrl}
        alt={imageAlt}
        objectFit='cover'
        className='z-0 pointer-events-none rounded-3xl'
      />

      <section className='col-span-full row-start-4 row-span-full z-10 flex justify-between gap-11 items-end px-4 pb-4'>
        <div className='flex flex-col justify-end items-start gap-2 text-white'>
          <h5 className='bg-neutral-800 px-3 py-1 rounded-xl bg-opacity-40 text-xs font-light leading-none'>
            {category}
          </h5>
          <h3 className='text-white text-2xl font-bold'>{title}</h3>
          <h6 className='text-neutral-400 text-xs font-light leading-none'>
            By {author}
          </h6>
        </div>
        <motion.button className='group inline-flex border whitespace-nowrap bg-neutral-800 bg-opacity-0 rounded-3xl py-2 pl-8 pr-6 items-center justify-center w-40 hover:bg-opacity-30 hover:px-6 transition-all'>
          <span className='text-white text-sm font-medium group-active:scale-85 duration-500 origin-center'>
            Start Reading
          </span>
          <ArrowIcon className='opacity-0 w-2 h-5 text-white group-hover:opacity-100 group-hover:ml-2 text-xl group-active:scale-75 duration-500 pt-0.5' />
        </motion.button>
      </section>
    </section>
  );
}

//
const ArrowIcon = ({ className }: { className: ClassValue }) => {
  return (
    <svg
      width='8'
      height='20'
      fill='none'
      viewBox='0 0 8 20'
      className={cn(className)}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.5 4.1665L3.16667 6.11067M1.5 15.8332L6.5 9.99984L5.25 8.5415'
        stroke='white'
        stroke-width='1.2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
