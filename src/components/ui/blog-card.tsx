import Author from "@/types/author";
import Image from "next/image";
import Link from "next/link";
import { RxDotFilled } from "react-icons/rx";
import Chip from "@/components/ui/chips";

type Props = {
  date: string;
  title: string;
  author: Author;
  mainImageUrl: string;
  reading_duration: string;
};
function BlogCard({
  title,
  date,
  author,
  reading_duration,
  mainImageUrl,
}: Props) {
  return (
    <article className='flex gap-4'>
      <div className='flex-grow'>
        <Link href={`/author/${author.name}`} className='flex gap-2'>
          <Image
            className='rounded-full'
            objectFit='cover'
            width={20}
            height={20}
            alt="Author's profile picture"
            src={author.avatarUrl}
          />
          <p>{author.name}</p>
        </Link>
        <header>
          <h3 className='text-lg font-semibold'>
            <Link href='/posts/link-to-post-1'>{title}</Link>
          </h3>
        </header>
        <h6 className='flex gap-1 items-center text-neutral-500'>
          <time>{date}</time>
          <RxDotFilled />
          <span>{reading_duration} min read</span>
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
          objectFit='cover'
          src={mainImageUrl}
          alt={`${title} main image`}
        />
      </div>
    </article>
  );
}

export default BlogCard;
