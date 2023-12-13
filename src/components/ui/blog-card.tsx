"use client";

import {
  convertDateToDayMonthAndYear,
  getAvatarPlaceholderUrl,
  getMainImagePlaceholderUrl,
} from "@/lib/utils";
import { PostModel } from "@/types/post";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionImage = motion(Image);

type Props = {
  data: Omit<PostModel, "categories">;
};
function BlogCard({ data }: Props) {
  const { id, title, readingTime, author, mainImageUrl, publishedAt, summery } =
    data;

  return (
    <article className='flex flex-col gap-2'>
      <div className='group relative w-72 h-32 rounded-xl cursor-pointer'>
        <Image
          fill
          alt={`${title} main image`}
          className='object-cover rounded-xl'
          src={mainImageUrl ?? getMainImagePlaceholderUrl()}
        />
        <div className='w-full h-full absolute opacity-0 group-hover:opacity-75 bg-gradient-to-l from-violet-500 to-violet-900 rounded-xl backdrop-blur-none group-active:opacity-100 duration-400 text-white font-bold grid place-items-center'>
          Read More
        </div>
      </div>

      <h3 className='text-neutral-950 font-bold leading-tight'>
        <Link href={`/posts/${id}`}>{title}</Link>
      </h3>
      <summary
        className='text-neutral-700 text-xs leading-none line-clamp-2
          md:text-sm md:leading-normal
          '
      >
        {summery}
      </summary>

      <section
        aria-labelledby='post info'
        className='flex justify-between text-neutral-500 text-xs leading-none items-center pt-2'
      >
        <div className='flex items-center gap-2'>
          <Image
            width={20}
            height={20}
            alt="Author's profile picture"
            className='rounded-full aspect-square object-cover'
            src={author.avatarUrl ?? getAvatarPlaceholderUrl()}
          />
          <p>{author.name}</p>
        </div>

        <time>{convertDateToDayMonthAndYear(publishedAt)}</time>
      </section>
    </article>
  );
}

export default BlogCard;
