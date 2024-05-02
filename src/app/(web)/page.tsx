import DottedBackground from "@/components/homepage/dotted-background";
import HeroSection from "@/components/homepage/hero";

import {
  BlogCardsSkeleton,
  SlideshowSkeleton,
} from "@/components/homepage/skeletons";
import { Suspense } from "react";
import PublishedPostsWrapper from "./published-posts-wrapper";
import SlideShowWrapper from "./slide-show-wrapper";

export const revalidate = 60;
export default async function Home() {
  return (
    <main>
      <DottedBackground position='right' top={2} className='hidden md:block' />
      <DottedBackground position='left' top={18} className='hidden md:block' />
      <DottedBackground
        top={35}
        position='right'
        className='md:hidden scale-110'
      />
      <HeroSection />

      <Suspense
        fallback={<SlideshowSkeleton className='px-4 mt-14 mb-3 m-4' />}
      >
        <SlideShowWrapper />
      </Suspense>

      <h1
        className='text-neutral-700 font-bold pt-4 px-4
        md:pt-8
        '
      >
        Published Posts
      </h1>
      <section
        aria-labelledby='published-posts'
        className='flex p-4 flex-col gap-8 pb-14
        md:grid md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        '
      >
        <Suspense fallback={<BlogCardsSkeleton />}>
          <PublishedPostsWrapper />
        </Suspense>
      </section>
    </main>
  );
}
