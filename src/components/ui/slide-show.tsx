"use client";

import { ClassValue } from "clsx";
import { AnimatePresence, DragHandlers, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import { cn, getPostUrl } from "@/lib/utils";
import { PostModel } from "@/types/post.type";
import Image from "next/image";
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
    <div className="flex flex-col items-center justify-center overflow-x-hidden">
      {/* container */}
      <div
        className={cn(
          "grid h-[432px] grid-cols-6 grid-rows-5 self-stretch md:grid-cols-12",
          className,
        )}
      >
        {/* left button */}
        <button
          aria-label="Previous slide"
          onClick={() => paginate(1)}
          className={`slideshow-action z-20 col-span-1 col-start-1 row-start-3 place-self-center justify-self-center pr-0.5`}
        >
          <IoChevronBack />
        </button>

        <section className="col-span-12 col-start-1 row-span-full row-start-1">
          <SlideShowCard
            {...cards[page]}
            page={page}
            direction={direction}
            onDragEndFn={onDragEnd}
          />
        </section>

        {/* right button */}
        <button
          aria-label="Next slide"
          onClick={() => paginate(-1)}
          className={`slideshow-action z-20 col-span-1 col-start-6 row-start-3 place-self-center justify-self-center pl-0.5 md:col-start-12`}
        >
          <IoChevronForward />
        </button>
      </div>

      {/* pagination */}
      <div className="z-10 mb-12 mt-4 inline-flex items-center justify-center gap-2 md:hidden">
        {cards.map((card) => (
          <div
            key={card.title}
            className={cn(
              "rounded-full duration-400",
              cards[page].title === card.title
                ? "h-2.5 w-2.5 bg-purple-700"
                : "h-2 w-2 bg-violet-200",
            )}
          />
        ))}
      </div>
    </div>
  );
}

type SlideShowCardProps = PostModel & {
  direction: number;
  page: number;
  onDragEndFn: DragHandlers["onDragEnd"];
};
function SlideShowCard({
  slug,
  page,
  title,
  author,
  direction,
  onDragEndFn,
  mainImageUrl,
}: SlideShowCardProps) {
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
    [],
  );

  return (
    <AnimatePresence initial={false} custom={direction} mode="wait">
      <motion.section
        key={page}
        drag="x"
        exit="exit"
        initial="enter"
        dragElastic={1}
        animate="center"
        custom={direction}
        variants={variants}
        onDragEnd={onDragEndFn}
        transition={{ duration: 0.4 }}
        dragConstraints={{ left: 0, right: 0 }}
        className={cn(
          "relative grid min-h-full grid-cols-6 grid-rows-6 md:grid-cols-12",
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
        <div className="z-0 col-span-full row-span-full">
          <Image
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            alt={`main image of post: ${title}`}
            src={mainImageUrl ?? "/slideshow/mainImagePlaceholder.svg"}
            className="pointer-events-none -z-10 aspect-video rounded-2xl object-cover"
          />
          <div className="h-full w-full rounded-2xl bg-gradient-to-t from-black/80" />
        </div>

        {/* only xs */}
        {/* <h5 className='bg-neutral-800 px-3 text-white py-1.5 rounded-xl bg-opacity-40 text-xs font-light leading-none col-start-5 col-span-2 z-10 max-h-6 grid place-items-center self-center justify-self-start md:hidden'>
          {category}
        </h5> */}

        {/* only xs */}
        <section className="z-10 col-span-full row-span-full row-start-4 flex flex-col justify-end gap-1 px-2 md:hidden">
          <h3 className="font-bold text-white">{title}</h3>
          <span className="text-xs font-light leading-none text-neutral-400">
            By {author.name}
          </span>
          <Link
            href={getPostUrl(slug)}
            className="group mb-2 mt-3 inline-flex items-center justify-center whitespace-nowrap rounded-lg border-1.5 border-white bg-neutral-800 bg-opacity-0 py-2 pl-8 pr-6 transition-all hover:bg-opacity-30 hover:px-6"
          >
            <span className="origin-center text-sm font-medium text-white duration-500 group-active:scale-85">
              Start Reading
            </span>
            <ArrowIcon className="h-5 w-2 pt-0.5 text-xl text-white opacity-0 duration-500 group-hover:ml-2 group-hover:opacity-100 group-active:scale-75" />
          </Link>
        </section>

        <section className="z-10 col-span-full row-span-full row-start-4 hidden items-end justify-between gap-11 px-4 pb-4 md:flex">
          <div className="flex flex-col items-start justify-end gap-2 text-white">
            {/* <h5 className='bg-neutral-800 px-3 py-1 rounded-xl bg-opacity-40 text-xs font-light leading-none'>
              {category}
            </h5> */}
            <h3 className="max-w-lg text-2xl font-bold text-white">{title}</h3>
            <span className="text-xs font-light leading-none text-neutral-100">
              By {author.name}
            </span>
          </div>
          <Link
            href={getPostUrl(slug)}
            className="group inline-flex w-40 items-center justify-center whitespace-nowrap rounded-3xl border bg-neutral-800 bg-opacity-0 py-2 pl-8 pr-6 transition-all hover:bg-opacity-30 hover:px-6"
          >
            <span className="origin-center text-sm font-medium text-white duration-500 group-active:scale-85">
              Start Reading
            </span>
            <ArrowIcon className="h-5 w-2 pt-0.5 text-xl text-white opacity-0 duration-500 group-hover:ml-2 group-hover:opacity-100 group-active:scale-75" />
          </Link>
        </section>
      </motion.section>
    </AnimatePresence>
  );
}

const ArrowIcon = ({ className }: { className: ClassValue }) => {
  return (
    <svg
      width="8"
      height="20"
      fill="none"
      viewBox="0 0 8 20"
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1.5 4.1665L3.16667 6.11067M1.5 15.8332L6.5 9.99984L5.25 8.5415"
      />
    </svg>
  );
};
