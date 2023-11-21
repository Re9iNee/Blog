import Chip from "@/components/ui/chips";
import {
  getAvatarPlaceholderUrl,
  getMainImagePlaceholderUrl,
} from "@/lib/utils";
import { PostModel } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { RxDotFilled } from "react-icons/rx";

type Props = {
  data: Omit<PostModel, "categories">;
};
function BlogCard({ data }: Props) {
  const { title, readingTime, author, mainImageUrl, publishedAt } = data;

  return (
    <article className='flex gap-4'>
      <div className='flex-grow'>
        <Link href={`/author/${author.name}`} className='flex gap-2'>
          <Image
            width={20}
            height={20}
            alt="Author's profile picture"
            className='rounded-full object-cover'
            src={author.avatarUrl ?? getAvatarPlaceholderUrl()}
          />
          <p>{author.name}</p>
        </Link>
        <header>
          <h3 className='text-lg font-semibold'>
            <Link href='/posts/link-to-post-1'>{title}</Link>
          </h3>
        </header>
        <h6 className='flex gap-1 items-center text-neutral-500'>
          {/* format date to show: Nov 16 */}
          <time>
            {publishedAt?.toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </time>
          <RxDotFilled />
          <span>{readingTime} min read</span>
          <RxDotFilled className='hidden lg:block' />
          <ul className='hidden lg:block'>
            <Chip>Programming</Chip>
          </ul>
        </h6>
      </div>
      <div
        className='relative h-24 w-24
        lg:w-48 lg:h-32
        '
      >
        <Image
          fill
          className='object-cover'
          alt={`${title} main image`}
          src={mainImageUrl ?? getMainImagePlaceholderUrl()}
        />
      </div>
    </article>
  );
}

export default BlogCard;
