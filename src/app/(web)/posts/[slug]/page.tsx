import { Separator } from "@/components/ui/separator";
import { markdownToHTML } from "@/lib/markdownToHTML";

import { getPostBySlug } from "@/service/posts.service";

import Image from "next/image";

import { RxDotFilled } from "react-icons/rx";

import ClapContainer from "@/components/posts/claps/clap-container";
import { notFound } from "next/navigation";
import PostNavigationGroup from "../nav";
import { Metadata, ResolvingMetadata } from "next";
import { convertDateToDayMonthAndYear } from "@/lib/utils";
import { PostModel } from "@/types/post.type";
import BlurImage from "@/components/global/image-blur";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const data = await getPostBySlug(slug);
  if (!data) notFound();

  const previousImage = (await parent).openGraph?.images || [];

  const openGraphImage = data.mainImageUrl ?? "/images/placeholder.png";

  const metadata: Metadata = {
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    title: data.title,
    openGraph: {
      type: "article",
      authors: data.author.name,
      description: data.summary,
      title: `${data.title} | Mora Blog`,
      url: `https://www.mora-ed.com/posts/${slug}`,
      images: [openGraphImage, ...previousImage],
      publishedTime: data?.publishedAt?.toUTCString(),
    },
  };

  return metadata;
}

function generateSchemaJson(post: PostModel) {
  const jsonLd = {
    name: post.title,
    identifier: post.id,
    headline: post.title,
    "@type": "NewsArticle",
    description: post.summary,
    image: [post.mainImageUrl],
    creator: [post.author.name],
    dateCreated: post.createdAt,
    dateModified: post.updatedAt,
    "@context": "https://schema.org",
    url: "https://www.mora-ed.com/posts/" + post.slug,
    datePublished: post.publishedAt ?? post.createdAt,
    mainEntityOfPage: "https://mora-ed.com/posts/" + post.slug,

    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      name: "Mora Blog",
      "@type": "Organization",
      url: "https://www.mora-ed.com",
      logo: {
        "@type": "ImageObject",
        url: "https://d1ntfq67otjmwh.cloudfront.net/mora-blog-files/1717948463820-logo-small.svg",
      },
    },
  };

  return jsonLd;
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
    <div className='pt-8 flex flex-col gap-4 px-4 mb-8 max-w-screen-md mx-auto'>
      {/* metadata */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <title>{data.title}</title>

      <PostNavigationGroup />

      <h1 className='text-3xl font-extrabold leading-9 pt-2'>{data.title}</h1>
      <BlurImage
        width={"288"}
        height={"160"}
        loading='lazy'
        alt={data.title + " " + "main image"}
        src={data.mainImageUrl ?? "/images/placeholder.png"}
        className='rounded-lg self-center w-full object-contain'
      />
      <h3 className='text-lg leading-6 text-neutral-500 dark:text-neutral-400'>
        {data.summary}
      </h3>

      <div className='flex flex-wrap gap-2 justify-between'>
        <section aria-labelledby='author' className='flex items-center gap-2'>
          <Image
            width={32}
            height={32}
            alt='Author Avatar'
            className='rounded-full aspect-square object-cover'
            src={data.author.avatarUrl ?? "/images/main-image-placeholder.png"}
          />
          <span className='text-neutral-500 text-sm leading-tight'>
            {data.author.name}
          </span>
        </section>

        <section className='flex gap-1 items-center text-neutral-500 text-sm'>
          <time>
            {convertDateToDayMonthAndYear(data.publishedAt ?? data.createdAt)}
          </time>
          <RxDotFilled />
          <span>{data.readingTime} min read</span>

          <ClapContainer slug={slug} className='pb-1' total={data.claps} />
        </section>
      </div>

      <Separator />

      <article className='prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:font-normal dark:prose-pre:text-white prose-img:rounded-xl prose-a:text-blue-600 max-w-full'>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </div>
  );
}

export default PostPage;
