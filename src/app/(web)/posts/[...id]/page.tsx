import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { convertDateToDayMonthAndYear } from "@/lib/utils";
import { getPost } from "@/service/posts.service";
import { Metadata } from "next";

import Image from "next/image";
import BackArrowIcon from "public/icons/BackArrow.svg";
import ShareIcon from "public/icons/Share.svg";

import { RxDotFilled } from "react-icons/rx";

type Props = {
  params: { id: string };
};
async function PostPage({ params }: Props) {
  const id = params.id;

  const data = await getPost(+id);

  return (
    <div className='pt-8 flex flex-col gap-4 px-4 mb-8 max-w-screen-md mx-auto'>
      {/* metadata */}
      <title>{data.title}</title>

      {/* NavigationGroup */}
      <div className='flex justify-between'>
        <Button
          variant={"link"}
          className='gap-1 inline-flex items-center cursor-pointer py-1.5 pl-0 text-gray-500 leading-tight'
        >
          <BackArrowIcon />
          Back
        </Button>

        <Button
          variant={"link"}
          className='inline-flex gap-1 items-center py-1.5 cursor-pointer pr-0 text-gray-500 leading-tight'
        >
          <ShareIcon />
          Share
        </Button>
      </div>

      <h1 className='text-3xl font-extrabold leading-9 pt-2'>{data.title}</h1>
      <Image
        width={"288"}
        height={"160"}
        className='rounded-lg self-center'
        alt={data.title + " " + "main image"}
        src={data.mainImageUrl ?? "/images/placeholder.png"}
      />
      <h3 className='text-lg leading-6 text-neutral-500'>{data.summery}</h3>

      <div className='flex flex-wrap gap-2 justify-between'>
        <section aria-labelledby='author' className='flex items-center gap-2'>
          <Image
            width={32}
            height={32}
            objectFit='cover'
            alt='Author Avatar'
            className='rounded-full aspect-square'
            src={data.author.avatarUrl ?? "/images/main-image-placeholder.png"}
          />
          <span className='text-neutral-600 text-sm leading-tight'>
            {data.author.name}
          </span>
        </section>

        <section className='flex gap-1 items-center text-neutral-600 text-sm'>
          <time>{convertDateToDayMonthAndYear(data.publishedAt)}</time>
          <RxDotFilled />
          <span>{data.readingTime} min read</span>
        </section>
      </div>

      <Separator />

      <article>
        <p>{data.body ?? "NO CONTENT"}</p>
      </article>
    </div>
  );
}

export default PostPage;
