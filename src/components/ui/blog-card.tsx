import {
  convertDateToDayMonthAndYear,
  getAvatarPlaceholderUrl,
  getMainImagePlaceholderUrl,
  getPostUrl,
} from "@/lib/utils";
import { PostModel } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import BlurImage from "../global/image-blur";
import { Suspense } from "react";
import { BlogCardMainImageSkeleton } from "../homepage/skeletons";

type Props = {
  data: Omit<PostModel, "categories">;
};
function BlogCard({ data }: Props) {
  const { slug, title, author, mainImageUrl, publishedAt, summary, createdAt } =
    data;

  return (
    <article className="flex flex-col gap-2">
      <Link
        prefetch={false}
        href={getPostUrl(slug)}
        className="group relative h-32 w-full cursor-pointer rounded-xl"
      >
        <Suspense fallback={<BlogCardMainImageSkeleton slug={slug} />}>
          <BlurImage
            fill
            loading="lazy"
            alt={`${title} main image`}
            className="rounded-xl object-cover"
            src={mainImageUrl ?? getMainImagePlaceholderUrl()}
          />
          <div className="absolute grid h-full w-full place-items-center rounded-xl bg-gradient-to-l from-violet-500 to-violet-900 font-bold text-white opacity-0 backdrop-blur-none duration-400 group-hover:opacity-75 group-active:opacity-100">
            Read More
            <span className="sr-only">read more about {title}</span>
          </div>
        </Suspense>
      </Link>

      <h2 className="flex-grow font-bold leading-tight text-neutral-950 dark:text-neutral-300">
        <Link href={getPostUrl(slug)} prefetch={false}>
          {title}
        </Link>
      </h2>
      <summary className="line-clamp-2 max-h-max text-xs leading-none text-neutral-700 dark:text-neutral-500 md:text-sm md:leading-normal">
        {summary}
      </summary>

      <section
        aria-labelledby="post info"
        className="flex items-center justify-between pt-2 text-xs leading-none text-neutral-500"
      >
        <div className="flex items-center gap-2">
          <Image
            width={20}
            height={20}
            loading="lazy"
            alt="Author's profile picture"
            className="aspect-square rounded-full object-cover"
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
