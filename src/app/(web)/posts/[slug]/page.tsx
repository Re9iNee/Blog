import BlurImage from "@/components/global/image-blur";
import ClapContainer from "@/components/posts/claps/clap-container";
import { Separator } from "@/components/ui/separator";
import { markdownToHTML } from "@/lib/markdownToHTML";
import { convertDateToDayMonthAndYear } from "@/lib/utils";
import { generateSchemaJson } from "@/lib/utils/jsonLD/postsJsonLd";
import { generateMetadataForPost } from "@/lib/utils/metadata/postsMetadata";
import { getPostBySlug } from "@/service/posts.service";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import placeholderImage from "public/images/placeholder.png";
import { RxDotFilled } from "react-icons/rx";
import PostNavigationGroup from "../nav";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const data = await getPostBySlug(slug);
  if (!data) notFound();

  return generateMetadataForPost(data);
}

type Props = {
  params: { slug: string };
};

async function PostPage({ params }: Props) {
  const slug = params.slug;

  const data = await getPostBySlug(slug);
  if (!data) notFound();

  const schema = generateSchemaJson(data);
  const htmlContent = await markdownToHTML(data.body ?? "");

  return (
    <div className="mx-auto mb-8 flex max-w-screen-md flex-col gap-4 px-4 pt-8">
      {/* metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <title>{data.title}</title>

      <PostNavigationGroup postId={data.id} />

      <h1 className="pt-2 text-3xl font-extrabold leading-9">{data.title}</h1>
      <BlurImage
        width={"288"}
        height={"160"}
        loading="lazy"
        alt={data.title + " " + "main image"}
        src={data.mainImageUrl ?? placeholderImage}
        className="w-full self-center rounded-lg object-contain"
      />
      <h3 className="text-lg leading-6 text-neutral-500 dark:text-neutral-400">
        {data.summary}
      </h3>

      <div className="flex flex-wrap justify-between gap-2">
        <section aria-labelledby="author" className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            alt="Author Avatar"
            className="aspect-square rounded-full object-cover"
            src={data.author.avatarUrl ?? "/images/main-image-placeholder.png"}
          />
          <span className="text-sm leading-tight text-neutral-500">
            {data.author.name}
          </span>
        </section>

        <section className="flex items-center gap-1 text-sm text-neutral-500">
          <time>
            {convertDateToDayMonthAndYear(data.publishedAt ?? data.createdAt)}
          </time>
          <RxDotFilled />
          <span>{data.readingTime} min read</span>

          <ClapContainer slug={slug} className="pb-1" total={data.claps} />
        </section>
      </div>

      <Separator />

      <article className="prose max-w-full dark:prose-invert prose-a:text-blue-600 prose-pre:bg-gray-100 prose-pre:font-normal prose-img:rounded-xl dark:prose-pre:bg-gray-900 dark:prose-pre:text-white">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </div>
  );
}

export default PostPage;
