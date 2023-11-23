import { Separator } from "@/components/ui/separator";
import { convertDateToMonthAndDay } from "@/lib/utils";
import { getPost } from "@/service/posts.service";

import { RxDotFilled } from "react-icons/rx";

type Props = {
  params: { id: string };
};
async function PostPage({ params }: Props) {
  const id = params.id;

  const data = await getPost(+id);

  return (
    <div className='pt-8 flex flex-col gap-4 px-4 mb-8 max-w-screen-md mx-auto'>
      <h1 className='text-3xl font-extrabold leading-9'>{data.title}</h1>
      <h3 className='text-lg leading-6 text-neutral-500'>{data.summery}</h3>

      <section className='flex gap-1 items-center text-neutral-500 text-sm'>
        <time>{convertDateToMonthAndDay(data.publishedAt)}</time>
        <RxDotFilled />
        <span>{data.readingTime} min read</span>
      </section>

      <Separator />

      <article>
        <p>{data.body ?? "NO CONTENT"}</p>
      </article>
    </div>
  );
}

export default PostPage;
