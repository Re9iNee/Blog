"use client";

import { ClassValue } from "clsx";
import { AnimatePresence, DragHandlers, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { cn, getPostUrl } from "@/lib/utils";
import { PostModel } from "@/types/post.type";
import Link from "next/link";

type Props = {
  cards: PostModel[];
  className?: ClassValue;
};
export function SlideShow({ className, cards }: Props) {
  const swipeConfidenceThreshold = 2500;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd: DragHandlers["onDragEnd"] = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(-1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(+1);
    }
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    let newPage;
    if (page + newDirection < 0) newPage = cards.length - 1;
    else if (page + newDirection >= cards.length) newPage = 0;
    else newPage = page + newDirection;

    setPage([newPage, newDirection]);
  };

  return (
    <div className='flex flex-col justify-center items-center overflow-x-hidden'>
      {/* container */}
      <div
        className={cn(
          "grid grid-cols-6 md:grid-cols-12 grid-rows-5 h-[432px] self-stretch",
          className
        )}
      >
        {/* left button */}
        <button
          aria-label='Previous slide'
          onClick={() => paginate(1)}
          className={`slideshow-action col-start-1 col-span-1 row-start-3 pr-0.5 z-20 place-self-center justify-self-center`}
        >
          <IoChevronBack />
        </button>

        <section className='col-start-1 col-span-12 row-start-1 row-span-full'>
          <SlideShowCard
            {...cards[page]}
            page={page}
            direction={direction}
            onDragEndFn={onDragEnd}
          />
        </section>

        {/* right button */}
        <button
          aria-label='Next slide'
          onClick={() => paginate(-1)}
          className={`slideshow-action col-start-6 md:col-start-12 col-span-1 row-start-3 pl-0.5 z-20 place-self-center justify-self-center`}
        >
          <IoChevronForward />
        </button>
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

function SlideShowCard({
  slug,
  page,
  title,
  author,
  direction,
  onDragEndFn,
  mainImageUrl,
}: PostModel & { direction: number; page: number; onDragEndFn: any }) {
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
        drag='x'
        exit='exit'
        initial='enter'
        dragElastic={1}
        animate='center'
        custom={direction}
        variants={variants}
        onDragEnd={onDragEndFn}
        transition={{ duration: 0.4 }}
        dragConstraints={{ left: 0, right: 0 }}
        className={cn(
          "relative grid grid-cols-6 md:grid-cols-12 grid-rows-6 min-h-full"
        )}
      >
        {/* <Image
          width={96}
          height={96}
          src={categoryImageUrl}
          alt='Category image icon'
          className='absolute -top-8 left-0 z-10 pointer-events-none'
        /> */}

        {/* overlay and main image */}
        <div className='z-0 col-span-full row-span-full'>
          <Image
            fill
            loading='eager'
            alt={`main image of post: ${title}`}
            src={mainImageUrl ?? "/slideshow/mainImagePlaceholder.svg"}
            className='pointer-events-none rounded-2xl aspect-video object-cover -z-10'
          />
          <div className='w-full h-full bg-gradient-to-t from-black/80 rounded-2xl' />
        </div>

        {/* only xs */}
        {/* <h5 className='bg-neutral-800 px-3 text-white py-1.5 rounded-xl bg-opacity-40 text-xs font-light leading-none col-start-5 col-span-2 z-10 max-h-6 grid place-items-center self-center justify-self-start md:hidden'>
          {category}
        </h5> */}

        {/* only xs */}
        <section
          className='col-span-full row-start-4 row-span-full z-10 flex flex-col gap-1 justify-end px-2
          md:hidden
          '
        >
          <h3 className='text-white font-bold'>{title}</h3>
          <span className='text-neutral-400 text-xs font-light leading-none'>
            By {author.name}
          </span>
          <Link
            href={getPostUrl(slug)}
            className='group inline-flex border-1.5 border-white whitespace-nowrap bg-neutral-800 bg-opacity-0 rounded-lg py-2 pl-8 pr-6 items-center justify-center hover:bg-opacity-30 hover:px-6 transition-all mt-3 mb-2'
          >
            <span className='text-white text-sm font-medium group-active:scale-85 duration-500 origin-center'>
              Start Reading
            </span>
            <ArrowIcon className='opacity-0 w-2 h-5 text-white group-hover:opacity-100 group-hover:ml-2 text-xl group-active:scale-75 duration-500 pt-0.5' />
          </Link>
        </section>

        <section className='hidden col-span-full row-start-4 row-span-full z-10 md:flex justify-between gap-11 items-end px-4 pb-4'>
          <div className='flex flex-col justify-end items-start gap-2 text-white'>
            {/* <h5 className='bg-neutral-800 px-3 py-1 rounded-xl bg-opacity-40 text-xs font-light leading-none'>
              {category}
            </h5> */}
            <h3 className='text-white text-2xl font-bold max-w-lg'>{title}</h3>
            <span className='text-neutral-100 text-xs font-light leading-none'>
              By {author.name}
            </span>
          </div>
          <Link
            href={getPostUrl(slug)}
            className='group inline-flex border whitespace-nowrap bg-neutral-800 bg-opacity-0 rounded-3xl py-2 pl-8 pr-6 items-center justify-center w-40 hover:bg-opacity-30 hover:px-6 transition-all'
          >
            <span className='text-white text-sm font-medium group-active:scale-85 duration-500 origin-center'>
              Start Reading
            </span>
            <ArrowIcon className='opacity-0 w-2 h-5 text-white group-hover:opacity-100 group-hover:ml-2 text-xl group-active:scale-75 duration-500 pt-0.5' />
          </Link>
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
        strokeWidth='1.2'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M1.5 4.1665L3.16667 6.11067M1.5 15.8332L6.5 9.99984L5.25 8.5415'
      />
    </svg>
  );
};
