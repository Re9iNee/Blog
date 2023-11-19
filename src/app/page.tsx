"use client";

import BlogCard from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/chips";
import { Separator } from "@/components/ui/separator";
import useDynamicHeight from "@/hooks/useDynamicHeight";
import Link from "next/link";

import author from "@/mocks/author.json";

export default function Home() {
  useDynamicHeight("hero-container", "header");

  return (
    <main>
      <section
        id='hero-container'
        className='bg-yellow-500 px-4 border-b border-black min-h-screen'
      >
        <h1 className='py-16 text-6xl text-black font-medium'>Stay curious.</h1>
        <h3 className='text-2xl text-black py-4'>
          Discover stories, thinking, and expertise from writers on any topic.
        </h3>
        <Button
          variant={"outline"}
          className='rounded-3xl font-light text-xl px-8 my-8'
        >
          Start reading
        </Button>
      </section>

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
            <Chip>Programming</Chip>
            <Chip>Data Science</Chip>
            <Chip>Technology</Chip>
            <Chip>Self Improvement</Chip>
            <Chip>Writing</Chip>
            <Chip>Relationships</Chip>
            <Chip>Machine Learning</Chip>
            <Chip>Productivity</Chip>
            <Chip>Politics</Chip>
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
        <BlogCard
          date='Nov 16'
          author={author}
          reading_duration='8'
          title="It's the End of Feminist Media. Again."
          mainImageUrl='https://mora-uploads.s3.eu-central-1.amazonaws.com/1*M2Kg81dKdity7YM8n3s8Fg.jpg'
        />
        <BlogCard
          date='Nov 16'
          author={author}
          reading_duration='8'
          title="It's the End of Feminist Media. Again."
          mainImageUrl='https://mora-uploads.s3.eu-central-1.amazonaws.com/1*M2Kg81dKdity7YM8n3s8Fg.jpg'
        />
        <BlogCard
          date='Nov 16'
          author={author}
          reading_duration='8'
          title="It's the End of Feminist Media. Again."
          mainImageUrl='https://mora-uploads.s3.eu-central-1.amazonaws.com/1*M2Kg81dKdity7YM8n3s8Fg.jpg'
        />
        <BlogCard
          date='Nov 16'
          author={author}
          reading_duration='8'
          title="It's the End of Feminist Media. Again."
          mainImageUrl='https://mora-uploads.s3.eu-central-1.amazonaws.com/1*M2Kg81dKdity7YM8n3s8Fg.jpg'
        />
        <BlogCard
          date='Nov 16'
          author={author}
          reading_duration='8'
          title="It's the End of Feminist Media. Again."
          mainImageUrl='https://mora-uploads.s3.eu-central-1.amazonaws.com/1*M2Kg81dKdity7YM8n3s8Fg.jpg'
        />
        <BlogCard
          date='Nov 16'
          author={author}
          reading_duration='8'
          title="It's the End of Feminist Media. Again."
          mainImageUrl='https://mora-uploads.s3.eu-central-1.amazonaws.com/1*M2Kg81dKdity7YM8n3s8Fg.jpg'
        />

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
          {/* Infinite scrolls */}
          <BlogCard
            date='Nov 16'
            author={author}
            reading_duration='8'
            title="It's the End of Feminist Media. Again."
            mainImageUrl='https://mora-uploads.s3.eu-central-1.amazonaws.com/1*M2Kg81dKdity7YM8n3s8Fg.jpg'
          />
        </section>
        {/* Tags container */}
        <div className='flex flex-col gap-8 p-4 sticky top-0'>
          <h2 className='text-l font-semibold'>
            Discover of what matters to you.
          </h2>
          <section aria-label='Tags'>
            <ul className='inline-flex gap-1 flex-wrap'>
              <Chip>Programming</Chip>
              <Chip>Data Science</Chip>
              <Chip>Technology</Chip>
              <Chip>Self Improvement</Chip>
              <Chip>Writing</Chip>
              <Chip>Relationships</Chip>
              <Chip>Machine Learning</Chip>
              <Chip>Productivity</Chip>
              <Chip>Politics</Chip>
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
