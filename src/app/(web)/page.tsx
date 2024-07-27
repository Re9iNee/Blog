import HeroSection from "@/components/homepage/hero";

import Search from "@/components/homepage/search";
import {
  SlideshowSkeleton,
  TrendingCategoriesSkeleton,
} from "@/components/homepage/skeletons";
import TrendingCategoriesWrapper from "@/components/homepage/trending-categories";
import { Suspense } from "react";
import PublishedPostsWrapper from "./published-posts-wrapper";
import SlideShowWrapper from "./slide-show-wrapper";

export const revalidate = 60;
type Props = {
  searchParams: {
    page?: string;
    query?: string;
    category?: string;
    selectedCategory?: string;
  };
};
export default async function Home({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const category = searchParams.category;
  const selectedCategory = searchParams.category;

  return (
    <main>
      <HeroSection />

      <Suspense
        fallback={<SlideshowSkeleton className="m-4 mb-3 mt-14 px-4" />}
      >
        <SlideShowWrapper />
      </Suspense>

      <section className="relative hidden min-h-80 flex-col items-center justify-center gap-6 md:flex">
        <Search />
        <Suspense fallback={<TrendingCategoriesSkeleton />}>
          <TrendingCategoriesWrapper selectedCategory={selectedCategory} />
        </Suspense>
      </section>

      <h1 className="px-4 pt-4 font-bold text-neutral-700 dark:text-neutral-50 md:pt-8">
        {query === "" ? "Published Posts" : "Searched Results"}
      </h1>
      <section aria-labelledby="published-posts" className="p-4 pb-14">
        <PublishedPostsWrapper page={page} query={query} category={category} />
      </section>
    </main>
  );
}
