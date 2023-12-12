import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/chips";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import HeroSection from "@/components/homepage/hero";
import { getAllCategories as getRecentCategories } from "@/service/category.service";
import { getAllPublishedPosts as getRecentPosts } from "@/service/posts.service";
import DottedBackground from "@/components/homepage/dotted-background";
import { SlideShow, SlideShowCard } from "@/components/ui/slide-show";

const SlideShowContents = [
  {
    postLink: "posts/1",
    category: "Trending",
    author: "Mobin Khani",
    imageAlt: "Picture of a desk",
    imageUrl: "https://placehold.co/768x400",
    categoryImageUrl: "/slideshow/trending-hashtag.svg",
    title: "How does your workspace affect the quality of your work?",
  },
  {
    postLink: "posts/2",
    category: "Popular",
    author: "Mobin Khani",
    imageAlt: "Picture of a desk",
    imageUrl: "https://placehold.co/768x400",
    categoryImageUrl: "/slideshow/trending-hashtag.svg",
    title: "Did you wash your ass today?",
  },
  {
    postLink: "posts/3",
    category: "Most Rated",
    author: "Reza Attarzadeh",
    imageAlt: "Picture of a desk",
    imageUrl: "https://placehold.co/768x400",
    categoryImageUrl: "/slideshow/trending-hashtag.svg",
    title: "Mikhorish?",
  },
];

export default async function Home() {
  const recentPosts = await getRecentPosts(3);
  const recentCategories = await getRecentCategories(9);

  return (
    <main>
      <DottedBackground position='right' top={20} />
      <DottedBackground position='left' top={75} />
      <HeroSection />

      <SlideShow className='px-4' cards={SlideShowContents} />

      <div
        className='flex flex-col gap-8 p-4
        lg:hidden
        '
      >
        <h2 className='text-l font-semibold'>
          Discover of what matters to you.
        </h2>
        <section aria-label='Tags'>
          <ul className='inline-flex gap-1 flex-wrap'>
            {recentCategories?.map((category) => (
              <Chip key={category.id}>{category.name}</Chip>
            ))}
          </ul>
        </section>
        <Link
          href='/tags'
          className='text-green-600 hover:text-black cursor-pointer hover:dark:text-white'
        >
          See more topics
        </Link>
      </div>

      <Separator />

      <section
        aria-labelledby='recent-posts'
        className='flex p-4 flex-col gap-8
        lg:hidden
        '
      >
        {recentPosts.map((post) => (
          <BlogCard key={post.id} data={post} />
        ))}

        <Button
          variant={"outline"}
          className='self-center rounded-3xl px-4 font-light border-neutral-950 text-neutral-950 my-4'
        >
          Load more stories
        </Button>
      </section>

      <section className='hidden lg:inline-flex p-8'>
        <section
          aria-labelledby='recent-posts'
          className='flex p-4 flex-col gap-8 min-w-[60%]'
        >
          {/* TODO: Infinite scrolls */}
          {recentPosts.map((post) => (
            <BlogCard key={post.id} data={post} />
          ))}
        </section>
        {/* Tags container */}
        <div className='flex flex-col gap-8 p-4 sticky top-0'>
          <h2 className='text-l font-semibold'>
            Discover of what matters to you.
          </h2>
          <section aria-label='Tags'>
            <ul className='inline-flex gap-1 flex-wrap'>
              {recentCategories.map((category) => (
                <Chip key={category.id}>{category.name}</Chip>
              ))}
            </ul>
          </section>
          <Link
            href='/tags'
            className='text-green-600 hover:text-black cursor-pointer hover:dark:text-white'
          >
            See more topics
          </Link>
        </div>
      </section>
    </main>
  );
}
