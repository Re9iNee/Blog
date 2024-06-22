import {
  convertDateToDayMonthAndYear,
  getAvatarPlaceholderUrl,
  getMainImagePlaceholderUrl,
  getPostUrl,
} from "@/lib/utils";
import { PostModel } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Omit<PostModel, "categories">;
};
function BlogCard({ data }: Props) {
  const { slug, title, author, mainImageUrl, publishedAt, summary, createdAt } =
    data;

  return (
    <article className='flex flex-col gap-2'>
      <Link
        href={getPostUrl(slug)}
        className='group relative w-full h-32 rounded-xl cursor-pointer'
      >
        <Image
          fill
          loading='lazy'
          alt={`${title} main image`}
          className='object-cover rounded-xl'
          src={mainImageUrl ?? getMainImagePlaceholderUrl()}
        />
        <div className='w-full h-full absolute opacity-0 group-hover:opacity-75 bg-gradient-to-l from-violet-500 to-violet-900 rounded-xl backdrop-blur-none group-active:opacity-100 duration-400 text-white font-bold grid place-items-center'>
          Read More
          <span className='sr-only'>read more about {title}</span>
        </div>
      </Link>

      <h2 className='text-neutral-950 flex-grow font-bold leading-tight dark:text-neutral-300'>
        <Link href={getPostUrl(slug)}>{title}</Link>
      </h2>
      <summary
        className='text-neutral-700 dark:text-neutral-500 text-xs leading-none max-h-max line-clamp-2
          md:text-sm md:leading-normal
          '
      >
        {summary}
      </summary>

      <section
        aria-labelledby='post info'
        className='flex justify-between text-neutral-500 text-xs leading-none items-center pt-2'
      >
        <div className='flex items-center gap-2'>
          <Image
            width={20}
            height={20}
            loading='lazy'
            alt="Author's profile picture"
            className='rounded-full aspect-square object-cover'
            src={author.avatarUrl ?? getAvatarPlaceholderUrl()}
          />
          <p>{author.name}</p>
        </div>

        <time>{convertDateToDayMonthAndYear(publishedAt ?? createdAt)}</time>
      </section>
    </article>
  );
}

export default BlogCard;
