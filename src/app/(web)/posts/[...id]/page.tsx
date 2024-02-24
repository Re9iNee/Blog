import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { markdownToHTML } from "@/lib/markdownToHTML";
import { convertDateToDayMonthAndYear, wait } from "@/lib/utils";
import { getPost } from "@/service/posts.service";

import Image from "next/image";

import { RxDotFilled } from "react-icons/rx";

import ClapContainer from "@/components/posts/claps/clap-container";
import { unstable_noStore as noStore } from "next/cache";
import PostNavigationGroup from "../nav";

type Props = {
  params: { id: string };
};

async function PostPage({ params }: Props) {
  noStore();
  const id = params.id;

  const data = await getPost(+id);
  const htmlContent = await markdownToHTML(data.body ?? "");

  return (
    <div className='pt-8 flex flex-col gap-4 px-4 mb-8 max-w-screen-md mx-auto'>
      {/* metadata */}
      <title>{data.title}</title>

      <PostNavigationGroup />

      <h1 className='text-3xl font-extrabold leading-9 pt-2'>{data.title}</h1>
      <Image
        width={"288"}
        height={"160"}
        loading='lazy'
        alt={data.title + " " + "main image"}
        src={data.mainImageUrl ?? "/images/placeholder.png"}
        className='rounded-lg self-center w-full object-contain'
      />
      <h3 className='text-lg leading-6 text-neutral-500'>{data.summary}</h3>

      <div className='flex flex-wrap gap-2 justify-between'>
        <section aria-labelledby='author' className='flex items-center gap-2'>
          <Image
            width={32}
            height={32}
            alt='Author Avatar'
            className='rounded-full aspect-square object-cover'
            src={data.author.avatarUrl ?? "/images/main-image-placeholder.png"}
          />
          <span className='text-neutral-600 text-sm leading-tight'>
            {data.author.name}
          </span>
        </section>

        <section className='flex gap-1 items-center text-neutral-600 text-sm'>
          <time>
            {convertDateToDayMonthAndYear(data.publishedAt ?? data.createdAt)}
          </time>
          <RxDotFilled />
          <span>{data.readingTime} min read</span>

          <ClapContainer postId={id} className='pb-1' total={data.claps} />
        </section>
      </div>

      <Separator />

      <article className='prose md:prose-lg lg:prose-xl dark:prose-invert prose-img:rounded-xl prose-a:text-blue-600 max-w-full'>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </div>
  );
}

export default PostPage;
