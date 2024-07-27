import DottedBackground from "@/components/homepage/dotted-background";
import HeroSection from "@/components/homepage/hero";

import Search from "@/components/homepage/search";
import { SlideshowSkeleton } from "@/components/homepage/skeletons";
import { fetchCategoriesName } from "@/service/category.service";
import { Suspense } from "react";
import PublishedPostsWrapper from "./published-posts-wrapper";
import SlideShowWrapper from "./slide-show-wrapper";

export const revalidate = 60;
type Props = {
  searchParams: {
    page?: string;
    query?: string;
    category?: string;
  };
};
export default async function Home({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
  const category = searchParams.category;

  const topCategories = (await fetchCategoriesName()).slice(0, 4);

  return (
    <main>
      <DottedBackground position="right" top={2} className="hidden md:block" />
      <DottedBackground position="left" top={18} className="hidden md:block" />
      <DottedBackground
        top={35}
        position="right"
        className="scale-110 md:hidden"
      />

      <HeroSection />

      <Suspense
        fallback={<SlideshowSkeleton className="m-4 mb-3 mt-14 px-4" />}
      >
        <SlideShowWrapper />
      </Suspense>

      <Search categories={topCategories} />

      <h1 className="px-4 pt-4 font-bold text-neutral-700 dark:text-neutral-50 md:pt-8">
        {query === "" ? "Published Posts" : "Searched Results"}
      </h1>
      <section aria-labelledby="published-posts" className="p-4 pb-14">
        <PublishedPostsWrapper page={page} query={query} category={category} />
      </section>
    </main>
  );
}
