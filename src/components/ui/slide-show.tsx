"use client";

import { ClassValue } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { cn } from "@/lib/utils";

type Props = {
  cards: CardProps[];
  className?: ClassValue;
};
export function SlideShow({ className, cards }: Props) {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    let newPage;
    if (page + newDirection < 0) newPage = cards.length - 1;
    else if (page + newDirection >= cards.length) newPage = 0;
    else newPage = page + newDirection;

    setPage([newPage, newDirection]);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      {/* container */}
      <div
        className={cn(
          "grid grid-cols-6 md:grid-cols-12 grid-rows-5 h-80",
          className
        )}
      >
        {/* left button */}
        <a
          onClick={() => paginate(-1)}
          className={`col-start-1 col-span-1 row-start-3 pr-0.5 slideshow-action z-20 place-self-center justify-self-center`}
        >
          <IoChevronBack />
        </a>

        <section className='col-start-1 col-span-12 row-start-1 row-span-full'>
          <SlideShowCard {...cards[page]} direction={direction} page={page} />
        </section>

        {/* right button */}
        <a
          onClick={() => paginate(1)}
          className={`col-start-6 md:col-start-12 col-span-1 row-start-3 pl-0.5 slideshow-action z-20 place-self-center justify-self-center`}
        >
          <IoChevronForward />
        </a>
      </div>

      {/* pagination */}
      <div className='mt-4 mb-12 gap-2 inline-flex justify-center items-center z-10 md:hidden'>
        {cards.map((card) => (
          <div
            key={card.title}
            className={cn(
              "rounded-full duration-400",
              cards[page].title === card.title
                ? "w-2.5 h-2.5 bg-purple-700"
                : "w-2 h-2 bg-violet-200"
            )}
          />
        ))}
      </div>
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
  page,
  title,
  author,
  category,
  imageUrl,
  imageAlt,
  direction,
  categoryImageUrl,
}: CardProps & { direction: number; page: number }) {
  const variants = useMemo(
    () => ({
      enter: (direction: number) => {
        return {
          scale: 0.3,
          opacity: 0,
          translateX: direction < 0 ? "+100%" : "-100%",
        };
      },
      center: {
        scale: 1,
        opacity: 1,
        translateX: 0,
        transformOrigin: "bottom left",
      },
      exit: (direction: number) => {
        return {
          scale: 0.3,
          opacity: 0,
          translateX: direction < 0 ? "-100%" : "+100%",
        };
      },
    }),
    []
  );

  return (
    <AnimatePresence initial={false} custom={direction} mode='wait'>
      <motion.section
        key={page}
        exit='exit'
        initial='enter'
        animate='center'
        custom={direction}
        variants={variants}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative grid grid-cols-6 md:grid-cols-12 grid-rows-6 min-h-full"
        )}
      >
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

        {/* only xs */}
        <h5 className='bg-neutral-800 px-3 text-white py-1 rounded-xl bg-opacity-40 text-xs font-light leading-none col-start-5 col-span-2 z-10 max-h-6 grid place-items-center self-center justify-self-start md:hidden'>
          {category}
        </h5>

        {/* only xs */}
        <section
          className='col-span-full row-start-4 row-span-full z-10 flex flex-col gap-1 justify-end px-2
          md:hidden
          '
        >
          <h3 className='text-white font-bold'>{title}</h3>
          <h6 className='text-neutral-400 text-xs font-light leading-none'>
            By {author}
          </h6>
          <button className='group inline-flex border whitespace-nowrap bg-neutral-800 bg-opacity-0 rounded-3xl py-2 pl-8 pr-6 items-center justify-center hover:bg-opacity-30 hover:px-6 transition-all mt-3 mb-2'>
            <span className='text-white text-sm font-medium group-active:scale-85 duration-500 origin-center'>
              Start Reading
            </span>
            <ArrowIcon className='opacity-0 w-2 h-5 text-white group-hover:opacity-100 group-hover:ml-2 text-xl group-active:scale-75 duration-500 pt-0.5' />
          </button>
        </section>

        <section className='hidden col-span-full row-start-4 row-span-full z-10 md:flex justify-between gap-11 items-end px-4 pb-4'>
          <div className='flex flex-col justify-end items-start gap-2 text-white'>
            <h5 className='bg-neutral-800 px-3 py-1 rounded-xl bg-opacity-40 text-xs font-light leading-none'>
              {category}
            </h5>
            <h3 className='text-white text-2xl font-bold'>{title}</h3>
            <h6 className='text-neutral-400 text-xs font-light leading-none'>
              By {author}
            </h6>
          </div>
          <button className='group inline-flex border whitespace-nowrap bg-neutral-800 bg-opacity-0 rounded-3xl py-2 pl-8 pr-6 items-center justify-center w-40 hover:bg-opacity-30 hover:px-6 transition-all'>
            <span className='text-white text-sm font-medium group-active:scale-85 duration-500 origin-center'>
              Start Reading
            </span>
            <ArrowIcon className='opacity-0 w-2 h-5 text-white group-hover:opacity-100 group-hover:ml-2 text-xl group-active:scale-75 duration-500 pt-0.5' />
          </button>
        </section>
      </motion.section>
    </AnimatePresence>
  );
}

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
        stroke='white'
        stroke-width='1.2'
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M1.5 4.1665L3.16667 6.11067M1.5 15.8332L6.5 9.99984L5.25 8.5415'
      />
    </svg>
  );
};
