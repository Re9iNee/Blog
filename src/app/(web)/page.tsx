import HeroSection from "@/components/homepage/hero";

import Search from "@/components/homepage/search";
import {
  SlideshowSkeleton,
  TrendingCategoriesSkeleton,
} from "@/components/homepage/skeletons";
import TrendingCategoriesWrapper from "@/components/homepage/trending-categories";
import { SITE_URL } from "@/lib/utils";
import { Metadata } from "next";
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

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const isSearching = !!searchParams.query;

  return {
    alternates: {
      canonical: isSearching ? `${SITE_URL}/search` : `${SITE_URL}`,
    },
  };
}

export default async function Home({ searchParams }: Props) {
  const page = Number(searchParams.page) || 1;
  const query = searchParams.query || "";
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

      <PublishedPostsWrapper
        page={page}
        query={query}
        selectedCategory={selectedCategory}
      />
    </main>
  );
}
