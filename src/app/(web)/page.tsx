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

  return (
    <main>
      <DottedBackground position='right' top={20} />
      <DottedBackground position='left' top={75} />
      <HeroSection />

      <SlideShow className='px-4' cards={SlideShowContents} />

      <h1 className='text-neutral-700 font-bold pt-4 px-3'>Published Posts</h1>
      <section
        aria-labelledby='published-posts'
        className='flex p-4 flex-col gap-8 pb-14'
      >
        {recentPosts.map((post) => (
          <BlogCard key={post.id} data={post} />
        ))}
      </section>
    </main>
  );
}
